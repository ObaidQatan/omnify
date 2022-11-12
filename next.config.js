const nextTranslate = require('next-translate')

/** @type {import('next').NextConfig} */
const nextConfig = nextTranslate({
  reactStrictMode: true,
  swcMinify: true,

  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
})

nextConfig.images = {
  domains: [
    "xjhrfldvdasjxazqxgox.supabase.co"
  ],
}

module.exports = nextConfig