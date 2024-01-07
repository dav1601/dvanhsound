/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
        "./node_modules/tw-elements/dist/js/**/*.js",
    ],
    theme: {
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
