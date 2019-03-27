var config = {

    deps: [
        "js/matchheight/matchheight"
    ],

    paths: {
        "matchheight": "js/matchheight/matchheight"
    },

    shim: {
        "matchheight": {
            deps: ["jquery"]
        }
    },

    "map": {
        "*": {
            "menu": "js/menu-custom"
        }

    }

};