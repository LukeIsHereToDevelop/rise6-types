var { rise, script } = require("../dist/types");

var module = rise.registerModule("test", "test script");

script.handle("onUnload", function (event) {
    module.unregister();
});

script.handle("onLoad", function (event) {
    rise.setName("Rice");
});