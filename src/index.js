// import Vue from "Vue"
//
// import App from "./app.vue"
//
const $ = require("jquery");
//
// var root = $("<div></div>");
//
// $("body").append(root);
//
// new Vue({
//     render: (h)=>h(App)
// }).$mount(root[0]);
//
//
import Vue from "Vue"
import App from "./app.vue"

var body = $("body")[0];

var v = new Vue({
    // el: "body",
    render: h=>h(App)
}).$mount(body);