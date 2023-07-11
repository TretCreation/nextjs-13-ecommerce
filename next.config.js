/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false
  },
  compilerOptions: {
    baseUrl: 'src'
  },
  env: {
    API_URL: process.env.API_URL,
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
    NODEMAILER_USER: process.env.NODEMAILER_USER,
    NODEMAILER_PASS: process.env.NODEMAILER_PASS,
    AUTHORIZATION_VIBER: process.env.AUTHORIZATION_VIBER,
    AUTHORIZATION_SMS: process.env.AUTHORIZATION_SMS
  },
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'scontent.fiev22-2.fna.fbcdn.net',
      'z-p3-scontent.flwo7-2.fna.fbcdn.net'
    ],
    formats: ['image/avif', 'image/webp']
  },
  i18n: {
    locales: ['en', 'ua'],
    defaultLocale: 'en'
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }]
    })
    return config
  }
}

module.exports = nextConfig
