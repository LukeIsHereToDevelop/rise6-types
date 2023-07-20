<h1 align="center">
    <a href="https://npm.im/rise6-types"><img src="https://cdn.discordapp.com/icons/1096411574480150682/f420e29f6b58b26f209ef88c87154096.png?size=128" width="50" height="50"></a>

rise6-types
</h1>

TypeScript typings of the [Rise 6 Scripting API](https://riseclients-organization.gitbook.io/rise-6-scripting-api/).

## Getting Started

- Create a new folder for your script
- Run `npm init -y` to create a new `package.json` file
- Run `npm i rise6-types` to install the typings
- Import the package in your script, like this:
    ```js
    // Add the namespaces you need
    var { rise } = require("rise6-types");
    ```
- And there you go! You now have complete intellisense of the Rise 6 Scripting API in your code.

    > **Warning**
    > Remember to remove or comment the package import when you're done coding the script, otherwise Rise fails to load it.

## Roadmap

- [ ] Add typings of the events.

## Contributing

If you find any errors or missing typings, feel free to open an issue or a pull request.

## Credits

- LukeIsHereToDevelop (.lukebtw on Discord) for the TypeScript typings.
- Rise 6 developers for the Rise 6 Scripting API.