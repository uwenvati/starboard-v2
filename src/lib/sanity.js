import { createClient } from "@sanity/client";

let _sanityClient = null;

export function getSanityClient() {
  if (!_sanityClient) {
    _sanityClient = createClient({
      projectId: process.env.SANITY_PROJECT_ID,
      dataset: process.env.SANITY_DATASET,
      apiVersion: process.env.SANITY_API_VERSION || "2024-01-01",
      useCdn: true, // faster for reads
    });
  }
  return _sanityClient;
}

// For backward compatibility
export const sanityClient = {
  fetch: (...args) => getSanityClient().fetch(...args),
};

export async function sanityTest() {
  const docs = await getSanityClient().fetch(`*[_type == "test"][0...5]`);
  return docs;
}
