/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	
	// Enables dark mode using a class toggle
	darkMode: 'class',

	// Theme customization
	theme: {
	  extend: {
		// Custom color palette
		colors: {
		  primary: {
			50: '#f0f9ff',
			100: '#e0f2fe',
			200: '#bae6fd',
			300: '#7dd3fc',
			400: '#38bdf8',
			500: '#0ea5e9',
			600: '#0284c7',
			700: '#0369a1',
			800: '#075985',
			900: '#0c4a6e',
		  },
		  accent: {
			orange: {
			  500: '#f97316',
			  600: '#ea580c',
			  700: '#c2410c',
			},
			steel: {
			  500: '#64748b',
			  600: '#475569',
			  700: '#334155',
			},
		  },
		  dark: {
			bg: '#0f172a',
			'bg-soft': '#1e293b',
			surface: '#1e293b',
			'surface-soft': '#334155',
			'text-primary': '#f8fafc',
			'text-secondary': '#cbd5e1',
		  },
		},
  
		// Custom font families
		fontFamily: {
		  sans: ['Poppins', 'system-ui', 'sans-serif'],
		  heading: ['Outfit', 'system-ui', 'sans-serif'],
		},
  
		// Custom animations
		animation: {
		  'spin-slow': 'spin 20s linear infinite',
		  'spin-slow-reverse': 'spin 25s linear infinite reverse',
		  'fade-in': 'fadeIn 0.5s ease-in-out',
		  'slide-up': 'slideUp 0.5s ease-out',
		},
  
		// Keyframes for animations
		keyframes: {
		  fadeIn: {
			'0%': { opacity: '0' },
			'100%': { opacity: '1' },
		  },
		  slideUp: {
			'0%': { transform: 'translateY(20px)', opacity: '0' },
			'100%': { transform: 'translateY(0)', opacity: '1' },
		  },
		},
	  },
	},
  
	// Plugins section
	plugins: [
	  // Custom plugin for content visibility utilities
	  function ({ addUtilities }) {
		addUtilities({
		  '.content-visibility-auto': {
			'content-visibility': 'auto',
		  },
		  '.content-visibility-hidden': {
			'content-visibility': 'hidden',
		  },
		});
	  },
	  // Add other plugins here if needed
	],
  
	// Future features for performance optimizations
	future: {
	  hoverOnlyWhenSupported: true,
	  respectDefaultRingColorOpacity: true,
	  // Enable other future features as needed
	},
  };

