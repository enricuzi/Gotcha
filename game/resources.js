var manifest = function () {
    return [
        {src: "img/car_red.png", id: "car_red"},
        {src: "img/car_yellow.png", id: "car_yellow"},
        {src: "img/tile_curve.png", id: "tile_curve"},
        {src: "img/tile_rect.png", id: "tile_rect"},
        {src: "img/tile_curve_background.png", id: "tile_curve_background"},
        {src: "img/tile_rect_background.png", id: "tile_rect_background"},
        {src: "img/speed.png", id: "speed"},
        {src: "img/play.png", id: "play"},
        {src: "img/settings.png", id: "settings"}
    ];
};

var tracks = function () {
    return [
        {
            matrix: [
                ["br", "lr", "lr", "lr", "lb"],
                ["rt", "rl", "rl", "bl", "tb"],
                ["ee", "ee", "ee", "bt", "tb"],
                ["ee", "ee", "ee", "bt", "tb"],
                ["ee", "ee", "ee", "rt", "tl"]
            ],
            starts: [
                {row: 0, col: 2},
                {row: 1, col: 2},
                {row: 3, col: 3},
                {row: 3, col: 4}
            ],
            clock: true
        },
        {
            matrix: [
                ["br", "lr", "lr", "lr", "lb"],
                ["bt", "ee", "ee", "ee", "tb"],
                ["bt", "ee", "ee", "ee", "tb"],
                ["bt", "ee", "ee", "ee", "tb"],
                ["rt", "rl", "rl", "rl", "tl"]
            ],
            starts: [
                {row: 0, col: 2},
                {row: 2, col: 0},
                {row: 4, col: 2},
                {row: 2, col: 4}
            ],
            clock: true
        },
        {
            matrix: [
                ["ee", "br", "lb", "ee", "ee"],
                ["br", "lt", "tr", "lr", "lb"],
                ["bt", "ee", "ee", "ee", "tb"],
                ["bt", "ee", "ee", "rb", "tl"],
                ["bt", "ee", "ee", "tb", "ee"],
                ["rt", "rl", "rl", "tl", "ee"]
            ],
            starts: [
                {row: 1, col: 3},
                {row: 5, col: 2},
                {row: 2, col: 0}
            ],
            clock: true
        }
    ];
};

var powerups = function () {
    return [
        {
            name: "Speed",
            attribute: "speed.max",
            value: 4,
            last: 2000,
            image: "speed"
        },
        {
            name: "Speed",
            attribute: "speed.max",
            value: 2,
            last: 4000,
            image: "speed"
        }
    ];
};