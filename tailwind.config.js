module.exports = {
	mode: 'jit',
	content: ['./src/**/*.{jsx,tsx,ts,js}', './**/*.html'],
	theme: {
		extend: {
			backgroundImage: {
				home: "url('/media/background.png')"
			},
			fontFamily: {
				sans: ['"Poppins"', 'sans-serif'],
				serif: ['"Playfair Display"', 'serif']
			}
		}
	}
};
