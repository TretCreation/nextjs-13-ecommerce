/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: false
	},
	compilerOptions: {
		baseUrl: 'src'
	},
	env: {
		API_URL: process.env.API_URL
	},
	images: {
		domains: ['lh3.googleusercontent.com', 'scontent.fiev22-2.fna.fbcdn.net'],
		formats: ['image/avif', 'image/webp']
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
