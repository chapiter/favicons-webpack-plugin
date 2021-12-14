const path = require('path');

const FaviconsWebpackPlugin = require("../src/main.js");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const paths = {
    src: path.resolve(__dirname, "./src"),
    public: path.resolve(__dirname, "./public"),
    build: path.resolve(__dirname, "./build"),
    static: path.resolve(__dirname, "./public/static"),
    favicons: path.resolve(__dirname, "../assets")
}

module.exports = {

    mode: "production",

    entry: {
        test: [
            `${paths.src}/index.js`
        ],
    },

    output: {
        path: paths.build,
        filename: 'assets/js/[name].js?v=[hash:10]',
        publicPath: '/',
        clean: false,
    },

    resolve: {
        // modules: [paths.src, '../../node_modules'],
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@': paths.src,
        },
    },

    plugins: [
        // Favicon Plugin
        new FaviconsWebpackPlugin({
            faviconJson: 'test/public/favicon/favicon.json',
            outputPath: 'assets/favicons',
            inject: true
        }),

        // Removes/cleans build folders and unused assets when rebuilding
        // new CleanWebpackPlugin(),

        // Copies files from target to destination folder
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: paths.static,
                    to: paths.build,
                    globOptions: {
                        ignore: ['*.DS_Store'],
                    },
                    noErrorOnMissing: true,
                },
                // {
                //     from: paths.favicons,
                //     to: `${paths.build}/assets`,
                //     globOptions: {
                //         ignore: ['*.DS_Store'],
                //     },
                //     noErrorOnMissing: true,
                // }
            ],
        }),

        new HtmlWebpackPlugin({
            title: 'Welcome to Favicons Webpack Plugin',
            template: paths.public + '/index.html', // template file
            inject: "body",
            minify: {
                removeComments: true
            },
            filename: 'index.html', // output file
        }),
    ],
}