"use strict";

let path = require("path");

module.exports = {
  // режим в котором работает webpack
  mode: "development",
  // тот файл с которого будем начинать
  entry: "./js/script.js",
  // конфигурируем файл который будет в итоге
  output: {
    // название файла
    filename: "general.js",
    // путь
    path: __dirname + "/js",
  },
  // отслеживае файлов автоматом собирает
  watch: true,
  // исходники
  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  debug: true,
                  corejs: 3,
                  useBuiltIns: "usage",
                },
              ],
            ],
          },
        },
      },
    ],
  },
};
