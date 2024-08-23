import axios from 'axios';
import OpenAI from "openai";

interface Clinic {
  name: string;
  link: string;
  logo_image: string;
  images: string[];
  services: string[]; // extracted from Yelp // categories
  distance: number; // in meters
}

interface GeoapifyResponse {
  features: Array<{
    geometry: {
      coordinates: [number, number];
    };
  }>;
}

interface YelpResponse {
  businesses: Array<{
    name: string;
    url: string;
    image_url: string;
    categories: Array<{
      title: string;
    }>;
    distance: number;
  }>;
}

const ICONS_LIST: string[] = [
  "lgbtq: /icons/health-labels/rainbow.svg",
  "urban: /icons/health-labels/building.svg",
  "medical: /icons/health-labels/medicalCross.svg",
  "appointment: /icons/health-labels/calendar.svg",
  "youth: /icons/health-labels/figure.svg",
  "blood: /icons/health-labels/blood.svg",
  "click: /icons/health-labels/click.svg",
  "desktop: /icons/health-labels/desktop.svg",
  "glassplus: /icons/health-labels/glassplus.svg",
  "home: /icons/health-labels/home.svg",
  "package: /icons/health-labels/package.svg",
  "step2: /icons/health-labels/step2.svg",
  "testTube: /icons/health-labels/testTube.svg",
  "timer: /icons/health-labels/timer.svg",
];

async function callGptLabels(yelp_categories: string[]) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are generating {label_title : label_image} pairs. I will provide you with a list of icon names and their image paths, as well as a list of clinic categories from Yelp. Your task is to match the categories with the appropriate icons to create {label_title : image} pairs. 

        **Important:** The output must follow this exact format:
        - Each service must be represented as a list of two elements: [service_name, service_key].
        - service_name is a string describing the service.
        - service_key is the corresponding key that matches the icons dictionary.
        - The output must be a JSON list of these pairs without any markdown text, just a plain string of the list.

        Example Output:
        [
          ["LGBTQ+ Friendly", "lgbtq"],
          ["Urban Area", "urban"],
          ["Medical Services", "medical"]
        ]

        Ensure that the keys used match the predefined keys in the icons dictionary and are aligned with the correct file image paths.`,
      },
      {
        role: "user",
        content: `
        Yelp Categories for clinic: ${yelp_categories.join(', ')}
        System images to use to label: ${ICONS_LIST.join(', ')}
        `,
      },
    ],
  });

  return response.choices[0].message.content;
}


async function getClinicTagging(clinic_categories: string[]) {
  try {
    const tagging = await callGptLabels(clinic_categories);

    // Check if tagging is not null and is a string
    if (tagging && typeof tagging === 'string') {
      const parsedTagging = JSON.parse(tagging);

      // Check if the parsed result is an array
      if (Array.isArray(parsedTagging)) {
        return parsedTagging;
      } else {
        console.error('Expected an array but got:', parsedTagging);
        return [];
      }
    } else {
      console.error('Tagging result is null or not a string:', tagging);
      return [];
    }
  } catch (error) {
    console.error('Error generating clinic tagging:', error);
    return [];
  }
}


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const zipcode = searchParams.get('zipcode');

  if (!zipcode) {
    return new Response(JSON.stringify({ error: 'Zipcode is required and must be a string' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Get the latitude and longitude for the zipcode
    const geoapifyResponse = await axios.get<GeoapifyResponse>(`https://api.geoapify.com/v1/geocode/search`, {
      params: {
        text: zipcode,
        lang: 'en',
        limit: 1,
        type: 'postcode',
        filter: 'countrycode:us',
        apiKey: process.env.GEOAPIFY_API_KEY,
      },
    });

    const [lon, lat] = geoapifyResponse.data.features[0].geometry.coordinates;

    // Get nearby clinics using Yelp API
    const yelpResponse = await axios.get<YelpResponse>('https://api.yelp.com/v3/businesses/search', {
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
      params: {
        term: 'STI clinic',
        latitude: lat,
        longitude: lon,
        radius: 40000,
      },
    });

    const clinics: Clinic[] = await Promise.all(
      yelpResponse.data.businesses.map(async (business) => {
        const categories = business.categories.map(category => category.title);
        const taggings = await getClinicTagging(categories);

        return {
          name: business.name,
          link: business.url,
          logo_image: business.image_url,
          images: [business.image_url], // Assuming only one image is available
          services: taggings, // Adding the generated taggings
          distance: business.distance, // Adding distance
        };
      })
    );

    return new Response(JSON.stringify({ clinics }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://screening.poppyml.com',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        NOTE: "This is just an MVP, please don't abuse this API or I'll have to lock it up :(",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

