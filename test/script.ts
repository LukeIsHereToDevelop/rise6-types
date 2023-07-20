import { rise, script } from "../types";

const module = rise.registerModule("test", "test module");

script.handle("onUnload", () => {
    module.unregister();
});

script.handle("onLoad", () => {
    rise.setName("Rice");
});