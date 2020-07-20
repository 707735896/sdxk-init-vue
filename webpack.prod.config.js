const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const fs = require('fs');

fs.open('./src/config/env.js', 'w', function (err, fd) {
    const buf = 'export default "production";';
    // fs.write(fd, buf, 0, buf.length, 0, function (err, written, buffer) {});
    fs.write(fd, buf, 0, 'utf-8', function(err, written, buffer) {});
});

const publicPath = '/';
module.exports = merge(webpackBaseConfig, {
    output: {
        publicPath: publicPath,
        filename: 'js/[name].[hash].js',
        // chunkFilename: 'js/[name].[hash].js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/[name].[hash].css',
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'js/vendors.[hash].js'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new CleanWebpackPlugin(['dist/'], {
            root: path.resolve(__dirname, './'),
            verbose: true,
            dry: false
        }),
        new HtmlWebpackPlugin({
            filename: '/index.html',
            template: './src/template/index.ejs',
            favicon:'./src/assets/common/logo.png',
            inject: true
        })
    ]
});
