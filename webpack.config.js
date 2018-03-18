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

let config = {
    entry:entries(),
    output: {
        // filename: "bundle.js",
        path: path.join(__dirname, "dist")
    },
    plugins: [
        new HTMLPlugin({
            filename: path.join(__dirname, 'index.html'),
        }),
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
            }
        ]
    }
};

module.exports=config;