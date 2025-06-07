// module.exports = {
//   plugins: {
//     'nativewind/postcss': {
//       tailwindConfig: './tailwind.config.js',
//     },
//   },
// }; 

// postcss.config.js
module.exports = {
  plugins: [
    require("nativewind/postcss")({
      tailwindConfig: "./tailwind.config.js",
    }),
  ],
};
