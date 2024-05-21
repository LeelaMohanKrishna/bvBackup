const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    },
    devServer: {
        compress: true,
        port: 3003,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
            exclude: ['index.html'],
            cacheId: 'cache.js',
            maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
            runtimeCaching: [
                {
                    urlPattern: /^https?:\/\//,
                    handler: 'NetworkFirst',
                },
            ],
        }),
    ],
};
