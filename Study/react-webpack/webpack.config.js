const path = require('path');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new WebpackManifestPlugin(),
        new InjectManifest({
            swSrc: './src/service-worker.js',
            swDest: 'service-worker.js',
            maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 3000,
    },
};
