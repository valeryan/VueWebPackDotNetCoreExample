const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const bundleOutputDir = './wwwroot/dist/js';

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    const extractCSS = new ExtractTextPlugin('../css/site.css');

    return [{
        stats: { modules: false },
        context: __dirname,
        resolve: {
            extensions: ['.js', '.ts'],
            alias: {
                vue: 'vue/dist/vue.js'
            }
        },
        entry: {
            'main': './Resources/js/boot.ts'
        },
        module: {
            rules: [
                { test: /\.vue\.html$/, include: /Resources/, loader: 'vue-loader', options: { loaders: { js: 'awesome-typescript-loader?silent=true' } } },
                { test: /\.ts$/, include: /Resources/, use: 'awesome-typescript-loader?silent=true' },
                { 
                    test: /\.css(\?|$)/,
                    use: extractCSS.extract({ use: isDevBuild ? 'css-loader' : 'css-loader?minimize' })
                },
                {
                    test: /\.scss(\?|$)/,
                    use: extractCSS.extract({ use: isDevBuild ? ['css-loader', 'sass-loader'] : ['css-loader?minimize', 'sass-loader?minimize']})
                },
                { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' }
            ]
        },
        output: {
            path: path.join(__dirname, bundleOutputDir),
            filename: '[name].js',
            publicPath: 'dist/js/'
        },
        plugins: [
            extractCSS,
            new CheckerPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(isDevBuild ? 'development' : 'production')
                }
            }),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./wwwroot/dist/js/vendor-manifest.json')
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
        ].concat(isDevBuild ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [
            // Plugins that apply in production builds only
            new webpack.optimize.UglifyJsPlugin()
        ])
    }];
};
