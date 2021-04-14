module.exports = function (api) {
    api.cache(true);

    const presets = [['@babel/preset-env', {
        "targets": {
            "node": "10"
        }
    }]];
    const plugins = [
        "@babel/plugin-transform-runtime",
        ["@babel/plugin-proposal-decorators", {"legacy": true}],
        ["@babel/plugin-syntax-class-properties", {"loose": true}],
    ];

    return {
        presets,
        plugins
    };
}



