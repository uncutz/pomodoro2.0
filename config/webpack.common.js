const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const modulesCollection = [
    {
        'index':
            [
                'IndexMain'
            ]
    }
];

let paths = modulesCollection.map((module) => {
    return module[Object.keys(module)[0]].reduce((config, main) => {
        config[main] = `./web/${Object.keys(module)[0]}/${main}.js`;
        return config;
    }, {});
}, {});

paths = paths.reduce((pathConfig, currentObject) => {
    pathConfig = {...pathConfig, ...currentObject};
    return pathConfig;
});

const config = {
    entry:   paths,
    output:  {
        library:       'Module',
        libraryTarget: 'umd'
    },
    module:  {
        rules: [
            {
                test:    /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use:     {
                    loader:  'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.less$/,
                use:  [
                    MiniCssExtractPlugin.loader, // creates style sheets from JS strings
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                        options: {
                            url: false,
                        },
                    },
                    'less-loader' // compiles Less to CSS
                ]
            },
            /*
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use:  [
                    {
                        loader:  'file-loader',
                        options: {
                            name:       '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
             */
            {
                test:   /\.(png|jpg)$/,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [new MiniCssExtractPlugin()]
};

module.exports = config;