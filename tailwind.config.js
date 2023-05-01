module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	media: false, // darkmode
	theme: {
		extend: {
			colors: {
				tapio: 'var(--tapio)',
				'tapio-darker': 'var(--darker)',
			},
			fontFamily: {
				merriweather: ['Merriweather', 'sans-serif'],
			},
		},
		screens: {
			'phone-xs': '240px',
			'phone-md': '360px',
			'phone-xl': '480px',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px',
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
	safelist: [],
};
