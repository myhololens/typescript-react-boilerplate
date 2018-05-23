const path = require("path");
const webpack = require("webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const ROOT_PATH = path.resolve(__dirname, "../../");
const BUILD_PATH = path.join(ROOT_PATH, "./dist");

const vendorEntry = {};
const { dependencies } = require(path.resolve(ROOT_PATH, "./package.json"));
if (dependencies)
{
    vendorEntry.vendor = Object.keys(dependencies);
}

module.exports = {
    context: ROOT_PATH,
    entry: {
        ...vendorEntry,
        index: ["./src/index"]
    },
    devtool: "source-map",
    output: {
        path: BUILD_PATH,
        publicPath: "/assets/",
        filename: "[name].js",
        chunkFilename: "[name].js"
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin()
        ],
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: "vendor",
                    chunks: "all",
                    enforce: true,
                    test: /[\\/]node_modules[\\/]/
                }
            }
        }
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    "cache-loader",
                    {
                        loader: "thread-loader",
                        options: { workers: require("os").cpus().length - 1 }
                    },
                    {
                        loader: "ts-loader",
                        options: { happyPackMode: true, transpileOnly: true }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                            name: "images/[name].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                            mimetype: "application/font-woff",
                            name: "fonts/[name].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use:
                    [
                        {
                            loader: "file-loader",
                            options: {
                                limit: 8192,
                                name: "fonts/[name].[ext]"
                            }
                        }
                    ]
            }
        ]
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true, tslint: true }),
        new webpack.WatchIgnorePlugin([
            /less\.d\.ts$/
        ])
    ],
    stats: {
        children: false,
        modules: false
    }
};
