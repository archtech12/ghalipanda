// Single source for the public site URL used in metadata, sitemap, robots and share links.
// Override per environment with NEXT_PUBLIC_SITE_URL (e.g. once a custom domain is live).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ghalipanda.com').replace(/\/$/, '')

export const SITE_NAME = 'Hon. Dr. Ghali Panda'
