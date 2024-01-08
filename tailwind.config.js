/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
        "./node_modules/tw-elements/dist/js/**/*.js",
    ],
    theme: {
        screens: {
            sm: "600px",
            // => @media (min-width: 600px) { ... }

            md: "768px",
            // => @media (min-width: 768px) { ... }

            lg: "1024px",
            // => @media (min-width: 1024px) { ... }

            xl: "1280px",
            // => @media (min-width: 1280px) { ... }

            "2xl": "1536px",
            // => @media (min-width: 1536px) { ... }
        },
        extend: {
            colors: {
                "dvs-dark": "#121212",
                "dvs-gray-1": "#2a2a2a",
                "green-main": "#1db954",
                "dvs-gray-2": "#181818",
                "dvs-gray-3": "#282828",
                "dvs-gray-4": "#161616",
            },
            spacing: {
                "nav-left": "240px",
                "nav-top": "64px",
                "nav-bottom": "88px",
            },
        },
    },

    plugins: [require("tw-elements/dist/plugin.cjs")],
};
