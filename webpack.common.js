const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const ImageMinimizerWebpackPlugin = require("image-minimizer-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");
const { ProvidePlugin } = require("webpack");
const json5 = require("json5");

module.exports = {
  // https://webpack.js.org/concepts/entry-points/
  entry: {
    main: {
      import: "./src/js/main.js",
      filename: "js/main.[contenthash].js",
    },
    index: {
      import: "./src/js/index.js",
      filename: "js/index.[contenthash].js",
      dependOn: "main",
    },
    about: {
      import: "./src/js/about.js",
      filename: "js/about.[contenthash].js",
      dependOn: "main",
    },
  },

  // https://webpack.js.org/concepts/output/
  output: {
    path: `${__dirname}/dist`,
    assetModuleFilename: "img/[hash][ext]",
    clean: true,
  },

  // https://webpack.js.org/concepts/plugins/
  plugins: [
    // https://webpack.js.org/plugins/html-webpack-plugin/
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "body",
      chunks: ["main", "index"],
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/about.html",
      inject: "body",
      chunks: ["main", "about"],
      filename: "about.html",
    }),

    // https://webpack.js.org/plugins/mini-css-extract-plugin/
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
    }),

    // https://webpack.js.org/plugins/image-minimizer-webpack-plugin/
    new ImageMinimizerWebpackPlugin({
      minimizerOptions: {
        // Lossless optimization with custom option
        plugins: [
          ["gifsicle", { interlaced: true }],
          ["jpegtran", { progressive: true }],
          ["optipng", { optimizationLevel: 5 }],
          // Svgo configuration here https://github.com/svg/svgo#configuration
          [
            "svgo",
            {
              plugins: extendDefaultPlugins([
                {
                  name: "removeViewBox",
                  active: false,
                },
                {
                  name: "addAttributesToSVGElement",
                  params: {
                    attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                  },
                },
              ]),
            },
          ],
        ],
      },
    }),

    // https://webpack.js.org/plugins/provide-plugin/
    new ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],

  // https://webpack.js.org/concepts/modules/
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.json5$/i,
        type: "json",
        parser: {
          parse: json5.parse,
        },
      },
    ],
  },

  // https://webpack.js.org/configuration/optimization/
  optimization: {
    // https://webpack.js.org/guides/tree-shaking/
    usedExports: true,

    minimizer: [
      // https://webpack.js.org/plugins/terser-webpack-plugin/
      new TerserWebpackPlugin({
        extractComments: false,
      }),

      // https://webpack.js.org/plugins/css-minimizer-webpack-plugin/
      new CssMinimizerWebpackPlugin(),
    ],
  },
};
