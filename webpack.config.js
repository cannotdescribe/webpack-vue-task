const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const glob = require("glob");

const srcDir = path.join(__dirname, "./src");

const jsDir = path.join(srcDir, "./js");


function resolve(relPath) {
    return path.join(__dirname, relPath);
}

const entryMap = {};
const htmlPlugins = [];
const jsFiles = glob.sync(jsDir + "/*.{js, jsx}");

jsFiles.forEach((jsFile) => {
    let jsName = jsFile.substring(jsFile.lastIndexOf('\/') + 1, jsFile.lastIndexOf('.'));
    // console.log();
    let htmlPlugin = new HTMLPlugin({
        title: jsName,
        filename: `${jsName}.html`,
        template: resolve('./index.tpl.html'),
        chunks: [jsName, 'common', 'vendors', 'manifest'],
        minify: {
            removeComments: true,
            collapseWhitespace: true
        }
    });

    htmlPlugins.push(htmlPlugin);
    entryMap[jsName] = resolve(`./src/js/${jsName}.js`);
});

const config = {
    // entry: entryMap,
    // entry: resolve("src/index.js"),

    entry: {
        pageA: resolve('./src/page/pageA/pageA.js'),
        pageB: resolve('./src/page/pageB/pageB.js')
    },
    // entry: resolve('./src/js/pageA.js'),

    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    },
    // plugins: [].concat(htmlPlugins),
    // resolveLoader: {
    //     moduleExtensions: ['-loader']
    // },
    plugins:[
        new HTMLPlugin({
            title: "pageA",
            filename: "pageA",
            template: resolve('./index.tpl.html'),
            chunks: ["pageA", 'common', 'vendors', 'manifest'],
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
                    loader: "vue-loader"
                }]
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
                    query: {
                        presets: ['es2015', 'react']
                    }
                },
            }
        ]
    },

};

module.exports=config;