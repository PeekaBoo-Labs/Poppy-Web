import axios from 'axios';

interface Clinic {
  name: string;
  link: string;
  logo_image: string;
  images: string[];
  categories: string[]; // extracted from yelp 
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
        radius: 40000
      },
    });

    const clinics: Clinic[] = yelpResponse.data.businesses.map((business) => ({
      name: business.name,
      link: business.url,
      logo_image: business.image_url,
      images: [business.image_url], // Assuming only one image is available
      categories: business.categories.map(category => category.title), // Extracting category titles
      distance: business.distance, // Adding distance
    }));

    return new Response(JSON.stringify({ clinics }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://screening.poppyml.com',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        NOTE: "This is just a MVP, please don't abuse this API or I'll have to lock it up :(",
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
