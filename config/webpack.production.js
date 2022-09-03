const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');

const modulesCollection = [
    {
        'jobs':
            [
                'JobsMain',
            ]
    }
]

let paths = modulesCollection.map((module) => {
    return module[Object.keys(module)[0]].reduce((config, main) => {
        config[main] = `./module/${Object.keys(module)[0]}/assets/js/${main}.js`;
        return config;
    }, {})
}, {})

paths = paths.reduce((pathConfig, currentObject) => {

    pathConfig = {...pathConfig, ...currentObject}
    return pathConfig
})

const config = {
    mode: "production",
    output: {
        path: path.resolve(__dirname, './../public/dist'),
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(), //minify css
            new TerserPlugin({
                                 extractComments: false
                             }) //minify js
        ],
    },
    plugins: [new MiniCssExtractPlugin(), new MiniCssExtractPlugin()]
}

module.exports = merge(common, config);