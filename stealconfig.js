steal.config({
        map: {
                "*": {
                        "jquery/jquery.js" : "jquery",
                        "sigma/can/util/util.js": "sigma/can/util/jquery/jquery.js",
                        "jquery/": "jquerypp/"
                }
        },
        paths: {
                "jquery": "can/lib/jquery.1.9.1.js",
                "funcunit": "fununit/funcunit.js",
                "qunit": "qunit/qunit.js",
                "controls/": "sigma/controls/",
                "can/": "sigma/can/",
                "lib/": "sigma/lib/",
                "plugin/": "sigma/plugin/",
                "views/": "sigma/views/"
        },
        shim : {
                jquery: {
                        exports: "jQuery"
                }
        },
        ext: {
                js: "js",
                css: "css",
                less: "steal/less/less.js",
                coffee: "steal/coffee/coffee.js",
                ejs: "can/view/ejs/ejs.js",
                mustache: "can/view/mustache/mustache.js"
        }
})