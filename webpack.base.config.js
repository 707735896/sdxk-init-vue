const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        main: ['babel-polyfill', './src/main.js'],
        vendors: './src/vendors'
    },
    externals: {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'iview':'iview'
    },
    output: {
        path: path.join(__dirname, './dist')
    },
    module: {
        rules: [{
            test: /.vue$/,
            use: [{
                loader: 'vue-loader',
                options: {
                    loaders: {
                        less: ExtractTextPlugin.extract({
                            use: ['css-loader?minimize', 'autoprefixer-loader', 'less-loader'],
                            fallback: 'vue-style-loader'
                        }),
                        css: ExtractTextPlugin.extract({
                            use: ['css-loader', 'autoprefixer-loader', 'less-loader'],
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
                {
                    loader: 'iview-loader',
                    options: {
                        prefix: false
                    }
                }
            ]
        },
            {
                test: /iview\/.*?js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader?minimize', 'autoprefixer-loader'],
                    fallback: 'style-loader'
                })
            },

            {
                test: /\.sass/,
                use: ExtractTextPlugin.extract({
                    use: ['autoprefixer-loader', 'sass-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(gif|jpg|png|svg)\??.*$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024 * 5,
                        name: path.posix.join('static', 'img/[name].[hash:7].[ext]')
                    }
                }]
                // loader: 'url-loader?limit=1024'
            },
            {
                test: /\.(woff|eot|ttf|otf)\??.*$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024 * 5,
                        name: path.posix.join('static', 'fonts/[name].[hash:7].[ext]')
                    }
                }]
                // loader: 'url-loader?limit=1024'
            },
            {
                test: /\.(html|tpl)$/,
                loader: 'html-loader'
            }
        ]
    },
    devServer:{
        host: 'localhost',
        allowedHosts:[
            '0.0.0.0'
        ],
        disableHostCheck: true
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, './src')
        }
    }
};
