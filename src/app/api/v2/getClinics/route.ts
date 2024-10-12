import axios from "axios";
import { verify } from "@/lib/entropy-src";
import OpenAI from "openai";

export type Clinic = {
  name: string;
  link: string;
  logo_image: string;
  images: string[];
  distance: number; // in meters
  phone: string;
  open_now: boolean;
  city: string;
  state: string;
};

type YelpResponse = {
  businesses: Array<{
    name: string;
    url: string;
    image_url: string;
    categories: Array<{
      title: string;
    }>;
    distance: number;
    display_phone: string;
    business_hours: {
      is_open_now: boolean;
    };
    location: {
      city: string;
      state: string;
    };
  }>;
};

const ICONS_LIST: string[] = [
  "lgbtq: /rainbow.svg",
  "urban: /building.svg",
  "medical: /medicalCross.svg",
  "appointment: /calendar.svg",
  "youth: /figure.svg",
  "blood: /blood.svg",
  "click: /click.svg",
  "desktop: /desktop.svg",
  "glassplus: /glassplus.svg",
  "home: /home.svg",
  "package: /package.svg",
  "step2: /step2.svg",
  "testTube: /testTube.svg",
  "timer: /timer.svg",
];

async function callGptLabels(yelp_categories: string[]) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are generating [label_title, label_image] pairs. Your task is to match the categories with the appropriate icons.

        **Important:** The output must follow this exact format:
        - Each service must be represented as a list of two elements: [service_name, service_key].
        - service_name is a string describing the service.
        - service_key is a string that matches the icons dictionary.
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
        Yelp Categories for clinic: ${yelp_categories.join(", ")}
        System images to use to label: ${ICONS_LIST.join(", ")}
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
    if (tagging) {
      const parsedTagging = JSON.parse(tagging);

      // Check if the parsed result is an array
      if (Array.isArray(parsedTagging)) {
        return parsedTagging;
      } else {
        console.error("Expected an array but got:", parsedTagging);
        return [];
      }
    } else {
      console.error("Tagging result is null or not a string:", tagging);
      return [];
    }
  } catch (error) {
    console.error("Error generating clinic tagging:", error);
    return [];
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const zipcode = searchParams.get("zipcode");

  if (!zipcode || !verify(zipcode, request.headers.get("Entropy"))) {
    return new Response(
      JSON.stringify({ error: "Zipcode is required and must be a string" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  try {
    // Get nearby clinics using Yelp API
    const yelpResponse = await axios.get<YelpResponse>(
      "https://api.yelp.com/v3/businesses/search",
      {
        headers: {
          Authorization: `Bearer ${process.env.YELP_API_KEY}`,
        },
        params: {
          term: "STI clinic",
          location: zipcode,
          radius: 40000,
          sort_by: "best_match",
          limit: 10,
        },
      },
    );

    const clinics: Clinic[] = yelpResponse.data.businesses.map((business) => {
      return {
        name: business.name,
        link: business.url,
        logo_image: business.image_url,
        images: [business.image_url],
        distance: business.distance / 1609,
        open_now: business.business_hours?.is_open_now ?? undefined,
        city: business.location.city,
        state: business.location.state,
        phone: business.display_phone,
      };
    });

    return new Response(JSON.stringify(clinics), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://screening.poppyml.com",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
        NOTE: "This is just an MVP, please don't abuse this API or I'll have to lock it up :(",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
