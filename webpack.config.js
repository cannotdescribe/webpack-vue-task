const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const glob = require("glob");

const srcDir = path.join(__dirname, "./src");

const jsDir = path.join(srcDir, "./views");


function resolve(relPath) {
    return path.join(__dirname, relPath);
}

const entryMap = {};
const htmlPlugins = [];
const jsFiles = glob.sync(jsDir + "/*.{js, jsx}");

jsFiles.forEach((jsFile) => {
    let jsName = jsFile.substring(jsFile.lastIndexOf('\/') + 1, jsFile.lastIndexOf('.'));
    let htmlPlugin = new HTMLPlugin({
        title: jsName,
        filename: jsName,
        template: resolve('./index.tpl.html'),
        chunks: [jsName, 'common', 'vendors', 'manifest'],
        minify: {
            removeComments: true,
            collapseWhitespace: true
        }
    });

    htmlPlugins.push(htmlPlugin);
    entryMap[jsName] = jsFile;
});
console.log(entryMap);
const config = {
    entry: entryMap,

    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
        // publicPath: "" // 类似项目名
    },
    plugins: [].concat(htmlPlugins),
    // resolveLoader: {
    //     moduleExtensions: ['-loader']
    // },
    module:{
        rules:[
            {
                test: /\.vue/,
                use:[{
                    loader: "vue-loader"
                }]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.html/,
                use:[{
                    loader: "html-loader"
                }]
            },
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    // query: {
                    //     presets: ['es2015', 'react']
                    // }
                },
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg|woff|eot|ttf)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 50000,   // 小于50K 就会将图片转换为base64代码，写入到输出文件中
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },

};

module.exports=config;