/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./app/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			colors: {
				primary: { main: '#F53C57' },
				white: { main: '#FFFFFF', dark: '#E4E6EB' },
				blue: { dark: '#152335' }
			},
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
				roboto: ['Roboto', 'sans-serif']
			},
			fontSize: {
				l: '0.8rem'
			},
			container: {
				screens: {
					sm: '640px',
					md: '768px',
					lg: '1024px',
					xl: '1280px',
					'2xl': '1496px'
				}
			},
			maxWidth: {
				'btn-search': '7.5rem'
			},
			borderRadius: {
				'btn-search': '0.25rem'
			}
		}
	},

	plugins: []
}
