module.exports = {
  env: {
    'STRIPE_API_PUBLIC_KEY': process.env.STRIPE_API_PUBLIC_KEY,
    'LIGHTSPEED_ID': process.env.LIGHTSPEED_ID,
    'LIGHTSPEED_SECRET': process.env.LIGHTSPEED_SECRET,
    'LIGHTSPEED_REFRESH_TOKEN': process.env.LIGHTSPEED_REFRESH_TOKEN
  },
  images: {
    domains: ['res.cloudinary.com'],
    loader: 'default',
  },
}