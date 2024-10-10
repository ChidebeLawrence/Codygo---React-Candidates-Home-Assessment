module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  theme: {
    extend: {
      // keyframes: {
      //   fadeInZoomOut: {
      //     '0%': {
      //       opacity: '0',
      //       transform: 'scale(1.2)',  // Slightly zoomed in at the start
      //     },
      //     '100%': {
      //       opacity: '1',
      //       transform: 'scale(1)',    // Zooms back out to normal size
      //     },

      //     fadeInZoomIn: {
      //       '0%': {
      //         opacity: '0',           // Start with opacity 0 (invisible)
      //         transform: 'scale(0.8)', // Start slightly smaller
      //       },
      //       '100%': {
      //         opacity: '1',           // Fade to fully visible
      //         transform: 'scale(1)',   // Scale to original size
      //       },
      //     },
      //   },
      // },
      // animation: {
      //   fadeInZoomOut: 'fadeInZoomOut 0.5s ease-in-out', // Duration and easing for the effect
      //     : 'fadeInZoomIn 0.5s ease-in-out', // Duration and easing for the effect
      // },

      keyframes: {
        fadeInZoomOut: {
          '0%': {
            opacity: '0',
            transform: 'scale(1.2)',  // Slightly zoomed in at the start
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',    // Zooms back out to normal size
          },
        },
        fadeInZoomIn: {
          '0%': {
            opacity: '0',           // Start with opacity 0 (invisible)
            transform: 'scale(0.8)', // Start slightly smaller
          },
          '100%': {
            opacity: '1',           // Fade to fully visible
            transform: 'scale(1)',   // Scale to original size
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
            transform: 'scale(1)',  // Normal size at the start
          },
          '100%': {
            opacity: '0',
            transform: 'scale(0.8)', // Zooms out slightly
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
