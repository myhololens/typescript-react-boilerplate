const path = require("path");

const ROOT_PATH = path.resolve(__dirname, "../../");
const BUILD_PATH = path.join(ROOT_PATH, "./dist");

module.exports = {
    context: ROOT_PATH,
    entry: {
        index: ["./src"]
    },
    output: {
        path: BUILD_PATH,
        publicPath: "/",
        filename: "[name].js",
        chunkFilename: "[name].chunk.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.tsx?$/,
                loader: "eslint-loader",
                options: { cache: true },
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                use: [
                    "cache-loader",
                    {
                        loader: "ts-loader",
                        options: { transpileOnly: true }
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
    plugins: [],
    stats: {
        children: false,
        modules: false
    }
};
