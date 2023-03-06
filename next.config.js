/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: false
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
