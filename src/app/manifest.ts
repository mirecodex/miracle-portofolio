import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Christian Miracle Rumawung Portfolio',
    short_name: 'CMR Portfolio',
    description: 'Portfolio of Christian Miracle Rumawung - AI Engineer & Software Engineer',
    start_url: '/',
    display: 'standalone',
    background_color: '#111827',
    theme_color: '#f97316',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
