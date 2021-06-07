const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = ({ mode = 'production' }) => {
    const isDev = mode === 'development';

    const config =  {
        mode,
        target: 'node',
        entry: './src/js/cli.js',
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist'),
        },
        externals: [nodeExternals()],
        optimization: {
            runtimeChunk: true, // Remove generated `webpackBootstrap` code.
            minimize: isDev,
            minimizer: [new TerserPlugin({ extractComments: false })], // Omit `bundle.js.LICENSE.txt`.
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        },
                        { loader: 'shebang-loader' }
                    ]
                }
            ]
        }
    }

    if (isDev) config.devtool = 'source-map';

    return config;
};