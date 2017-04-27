module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "linebreak-style": [
            "error",
            "windows"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console":0,
        "no-unused-vars":0
    },
    "globals": {
        "module": true,
        "__dirname": true,
        "describe": true,
        "beforeEach": true,
        "it": true,
        "$": true
    }
};
