import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION || "2024-01-01",
  useCdn: true, // faster for reads
});

export async function sanityTest() {
  const docs = await sanityClient.fetch(`*[_type == "test"][0...5]`);
  return docs;
}
