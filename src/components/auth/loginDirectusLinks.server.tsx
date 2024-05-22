import {
  createDirectus,
  rest,
  readProviders,
} from "@directus/sdk";

export default async function getDirectusProviders() {
  const directusApiUrl = process.env.NEXT_PUBLIC_DIRECTUS_API ?? "";
  console.log('Directus API URL:', directusApiUrl);
  
  const directus = createDirectus(directusApiUrl).with(rest());
  try {
    const providers = await directus.request(readProviders());
    return providers;
  } catch (error) {
    console.error('Error fetching providers from Directus:', error);
    throw error;
  }
}
