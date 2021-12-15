# @chapiter/favicons-webpack-plugin

Generate favicons using [RealFaviconGenerator](https://github.com/RealFaviconGenerator) as part of your Webpack build process.


## Install

```
yarn add --dev @chapiter/favicons-webpack-plugin
```

```
npm i --save-dev @chapiter/favicons-webpack-plugin
```


## Usage

In your Webpack config:

**webpack.config.js**

```js
const FaviconsWebpackPlugin = require('@chapiter/favicons-webpack-plugin');

module.exports = {
  plugins: [
    new FaviconsWebpackPlugin({
      faviconJson: path.resolve(__dirname, 'favicon.json'),
      outputPath: 'assets/favicons', // relative path of `webpack` output path.
      inject: true
    })
  ]
}
```

The options are:

* `faviconJson` (required): the path to a JSON configuration file from the [RFG website](https://realfavicongenerator.net)
* `outputPath` (required): the path where the plugin will output the favicon files generated from your config
* `inject` (optional): if `true`, hooks into [HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin) to inject `<link>` tags for your favicons into your HTML

**favicon.json**

```json
{
    "masterPicture": "TODO: Path to your master picture",
    "iconsPath": "/assets/favicons",
    "design": {
        "ios": {
            "masterPicture": {
                "type": "inline",
                "content": "[TODO: Copy the base64-encoded content of the image here]"
            },
            "pictureAspect": "backgroundAndMargin",
            "backgroundColor": "#ffffff",
            "margin": "0%",
            "assets": {
                "ios6AndPriorIcons": false,
                "ios7AndLaterIcons": false,
                "precomposedIcons": false,
                "declareOnlyDefaultIcon": true
            },
            "appName": "App Name"
        },
        "desktopBrowser": {
            "design": "background",
            "backgroundColor": "#ffffff",
            "backgroundRadius": 0.1,
            "imageScale": 1
        },
        "windows": {
            "masterPicture": {
                "type": "inline",
                "content": "[TODO: Copy the base64-encoded content of the image here]"
            },
            "pictureAspect": "whiteSilhouette",
            "backgroundColor": "#ff3333",
            "onConflict": "override",
            "assets": {
                "windows80Ie10Tile": false,
                "windows10Ie11EdgeTiles": {
                    "small": false,
                    "medium": true,
                    "big": false,
                    "rectangle": false
                }
            },
            "appName": "App Name"
        },
        "androidChrome": {
            "masterPicture": {
                "type": "inline",
                "content": "[TODO: Copy the base64-encoded content of the image here]"
            },
            "pictureAspect": "backgroundAndMargin",
            "margin": "0%",
            "backgroundColor": "#ffffff",
            "themeColor": "#ffffff",
            "manifest": {
                "name": "App Name",
                "startUrl": "[http://example]",
                "display": "standalone",
                "orientation": "notSet",
                "onConflict": "override",
                "declared": true
            },
            "assets": {
                "legacyIcon": false,
                "lowResolutionIcons": false
            }
        },
        "safariPinnedTab": {
            "masterPicture": {
                "type": "inline",
                "content": "[TODO: Copy the base64-encoded content of the image here]"
            },
            "pictureAspect": "silhouette",
            "themeColor": "#ff3333"
        }
    },
    "settings": {
        "scalingAlgorithm": "Mitchell",
        "errorOnImageTooSmall": false,
        "readmeFile": true,
        "htmlCodeFile": true,
        "usePathAsIs": false
    }
}
```

Note that the `inject` option requires you to be using `html-webpack-plugin`. It also requires you to have set `settings.htmlCodeFile: true` in your `faviconJson` configuration file (the "Generate `html_code.html`" option when generating the configuration on the RFG website).


### Generated files

The plugin will generate files based on your configuration file. Generally these will include one or more favicon images, and possibly some browser- or device-specific files such as `browserconfig.xml` for IE11.
