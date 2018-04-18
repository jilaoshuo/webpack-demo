const path = require('path'),
    webpack = require('webpack'),
    glob = require('glob'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin'),
    PurifyWebpack = require("purifycss-webpack");

if (process.env.type == "build") {
    var website = {
        publicPath: "http://10.16.212.20/webpack-demo/dist/"
    }
} else {
    var website = {
        publicPath: "http://10.16.212.20:8080/"
    }
}

module.exports = {
    devtool: 'source-map',
    entry: {
        index: './src/js/index.js',
        list: './src/js/list.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: website.publicPath,
        filename: 'js/[name].js',
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            }, {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'file-loader?name=./fonts/[name].[ext]'
            }, {
                test: /\.(png|jpg|gif)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        outputPath: 'images/',
                    }
                }]
            }, {
                test: /\.(htm|html)$/i,
                use: ['html-withimg-loader']
            }
            // {
            //     test: /\.(jsx|js)$/,
            //     use: {
            //         loader: 'babel-loader',
            //         options: {
            //             presets: [
            //                 "es2015", "react"
            //             ]
            //         }
            //     },
            //     exclude: /node_modules/
            // }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        // new UglifyjsWebpackPlugin(), //js压缩
        new ExtractTextPlugin('css/[name].css'),
        // new PurifyWebpack({
        //     paths: glob.sync(path.join(__dirname, 'src/view/*.html')),
        // }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            chunks: ['index', 'list'],
            minChunks: 2
        }),
        new HtmlWebpackPlugin({
            filename: './view/index.html',
            template: './src/view/index.html',
            inject: 'true',
            hash: true,
            chunks: ['vendors', 'index'],
            minify: {
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false, //删除空白符与换行符
                minifyJS: false, //是否压缩html里的js
                minifyCSS: false //是否压缩html里的css
            }
        }),
        new HtmlWebpackPlugin({
            filename: './view/list.html',
            template: './src/view/list.html',
            inject: 'true',
            hash: true,
            chunks: ['vendors', 'list'],
            minify: {
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false, //删除空白符与换行符
                minifyJS: false, //是否压缩html里的js
                minifyCSS: false //是否压缩html里的css
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: '10.16.212.20',
        port: 8080
    }
}