const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    const extractCSS = new ExtractTextPlugin('../css/vendor.css');

    return [{
        stats: { modules: false },
        resolve: { extensions: [ '.js' ] },
        entry: {
            vendor: [
                'bootstrap',
                'bootstrap/scss/bootstrap.scss',
                'event-source-polyfill',
                'axios',
                'popper.js',
                'jquery',
                'vue'
            ],
        },
        module: {
            rules: [
                { 
                    test: /\.css(\?|$)/,
                    use: extractCSS.extract({ use: isDevBuild ? 'css-loader' : 'css-loader?minimize' })
                },
                {
                    test: /\.scss(\?|$)/,
                    use: extractCSS.extract({ use: isDevBuild ? ['css-loader', 'sass-loader'] : ['css-loader?minimize', 'sass-loader?minimize']})
                },
                { test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000' }
            ]
        },
        output: { 
            path: path.join(__dirname, 'wwwroot', 'dist/js'),
            publicPath: 'dist/js/',
            filename: '[name].js',
            library: '[name]_[hash]'
        },
        plugins: [
            extractCSS,
            new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }), // Maps these identifiers to the jQuery package (because Bootstrap expects it to be a global variable)
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': isDevBuild ? '"development"' : '"production"'
            }),
            new webpack.DllPlugin({
                path: path.join(__dirname, 'wwwroot', 'dist/js', '[name]-manifest.json'),
                name: '[name]_[hash]'
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                Popper: ['popper.js', 'default'],
                // In case you imported plugins individually, you must also require them here:
                Util: "exports-loader?Util!bootstrap/js/dist/util",
                Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
            })
        ].concat(isDevBuild ? [] : [
            new webpack.optimize.UglifyJsPlugin()
        ])
    }];
};
