const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const glob = require("glob");

const srcDir = path.join(__dirname, "./src");

const jsDir = path.join(srcDir, "./js");

function entries(){
    let jsFiles = glob.sync(jsDir + "/*.{js, jsx}");
    let map = {};
    for(let i=0;i<jsFiles.length;i++){
        let jsFile = jsFiles[i];
        let jsName = jsFile.substring(jsFile.lastIndexOf('\/') + 1, jsFile.lastIndexOf('.'));
        map[jsName] = jsFile;
    }
    return map;
}

function htmlPlugins(){
    var plugins = [];
    let jsFiles = glob.sync(jsDir + "/*.{js, jsx}");
    for(let i=0;i<jsFiles.length;i++){
        let jsFile = jsFiles[i];
        let jsName = jsFile.substring(jsFile.lastIndexOf('\/') + 1, jsFile.lastIndexOf('.'));
        var htmlPlugin = new HTMLPlugin({
            filename: path.join(__dirname, `/${jsName}.html`),
            template:path.join(__dirname, './index.tpl.html')
        });
        plugins.push(htmlPlugin);
    }
}

function resolve(relPath) {
    return path.join(__dirname, relPath);
}

let config = {
    entry:entries(),
    // entry: resolve("src/index.js"),
    output: {
        filename: '[name].js',
        path: resolve("dist")
    },
    plugins: [

    ].concat(htmlPlugins()),
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