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
                "dvs-gray-1": "#2a2a2a",
            },
        },
    },

    plugins: [require("tw-elements/dist/plugin.cjs")],
};
