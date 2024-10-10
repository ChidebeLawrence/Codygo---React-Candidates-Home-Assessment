module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  theme: {
    extend: {
      keyframes: {
        fadeInZoomOut: {
          '0%': {
            opacity: '0',
            transform: 'scale(1.2)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },

        fadeInZoomIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.8)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },

        slideInLeft: {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },

        slideInRight: {
          '0%': {
            transform: 'translateX(100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },

        fadeOutZoomOut: {
          '0%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '100%': {
            opacity: '0',
            transform: 'scale(0.8)',
          },
        },
      },

      animation: {
        fadeInZoomOut: 'fadeInZoomOut 0.5s ease-in-out',
        fadeInZoomIn: 'fadeInZoomIn 0.5s ease-in-out',
        slideInLeft: 'slideInLeft 0.5s ease-in-out',
        slideInRight: 'slideInRight 0.5s ease-in-out',
        fadeOutZoomOut: 'fadeOutZoomOut 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
};
