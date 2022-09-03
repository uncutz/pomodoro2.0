const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');

const config = {
    mode: "development",
    output: {
        path: path.resolve(__dirname, './../public/dist_dev'),
    },
    plugins: [new MiniCssExtractPlugin()]
}

module.exports = merge(common, config);