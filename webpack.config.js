const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const glob = require("glob");

const srcDir = path.join(__dirname, "./src");

const jsDir = path.join(srcDir, "./page");


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
    entryMap[jsName] = resolve(`./src/page/${jsName}.js`);
});

const config = {
    // entry: entryMap,
    // entry: resolve("src/index.js"),

    entry: {
        pageA: resolve('./src/page/pageA.js'),  //输入所对应的绝对路径
        pageB: resolve('./src/page/pageB.js')
    },
    // entry: resolve('./src/js/pageA.js'),

    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
        // publicPath: "" // 类似项目名
    },
    // plugins: [].concat(htmlPlugins),
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    plugins:[
        new HTMLPlugin({
            title: "pageA", //title名字
            filename: "pageA", //输出的文件名
            template: resolve('./index.tpl.html'), //模板所对的绝对路径位置
            chunks: ["pageA", 'common', 'vendors', 'manifest'], //那些js需要被加入进来
        }),
        new HTMLPlugin({
            title: "pageB",
            filename: "pageB",
            template: resolve('./index.tpl.html'),
            chunks: ["pageB", 'common', 'vendors', 'manifest'],
        })
    ],
    module:{
        rules:[
            {
                test: /\.vue/,
                use:[{
                    loader: "vue"
                }]
            },
            {
                test: /\.html/,
                use:[{
                    loader: "html"
                }]
            },
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel',
                    query: {
                        presets: ['es2015', 'react']
                    }
                },
            }
        ]
    },

};

module.exports=config;