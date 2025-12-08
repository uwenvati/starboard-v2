import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

let _client = null

function getClient() {
  if (!_client) {
    _client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
    })
  }
  return _client
}

// Export a proxy object for backward compatibility
export const client = {
  fetch: (...args) => getClient().fetch(...args),
  withConfig: (...args) => getClient().withConfig(...args),
}
