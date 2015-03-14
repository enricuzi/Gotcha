/** @namespace */
var game = {
    /**
     * @name debug
     * @memberOf game
     * @inner
     * @description container for objects used to debug components
     */
    debug: {},

    /**
     * @name widgets
     * @memberOf game
     * @inner
     * @description container of widgets
     */
    widgets: {},

    /**
     * @name objects
     * @memberOf game
     * @inner
     * @description container of interactive objects
     */
    objects: {},

    /**
     * @name powerups
     * @memberOf game
     * @inner
     * @description container of powerup objects
     */
    powerups: {},

    /**
     * @name images
     * @memberOf game
     * @inner
     * @description container of images
     */
    images: {

        /**
         * @name set
         * @memberOf images
         * @inner
         * @description container of all images loaded
         */
        set: {},

        /**
         * @function get
         * @param {{string}|{HTML}}
         * @returns {HTML}
         * @memberOf images
         * @inner
         * @description return the selected image
         */
        get: function (image) {
            if (!image)
                return;
            switch (typeof image) {
                case "string":
                    return game.images.set[image];
                default:
                    return image;
            }
        },

        /**
         * @function load
         * @param {array}
         * @memberOf images
         * @inner
         * @description start loading images
         */
        load: function (manifest) {
            var loader = new createjs.LoadQueue(false);
            loader.loadManifest(manifest);
            loader.on("fileload", this.loading);
            loader.on("complete", this.loaded);
        },

        /**
         * @function loading
         * @param {event}
         * @memberOf images
         * @inner
         * @description handler while loading images
         */
        loading: function (e) {
            if (e.item.type == createjs.LoadQueue.IMAGE) {
                game.images.set[e.item.id] = e.result;
                game.images.set[e.item.id].crossOrigin = "anonymous";
            }
        },

        /**
         * @function loaded
         * @param {event}
         * @memberOf images
         * @inner
         * @description handler for images loaded
         */
        loaded: function (e) {
            game.events.callback.loadImagesComplete();
        }
    },

    /**
     * @name cars
     * @memberOf game
     * @inner
     * @description container for all cars loaded and handlers
     */
    cars: {

        /**
         * @name set
         * @memberOf cars
         * @inner
         * @description container for generated car
         */
        set: {},

        /**
         * @function get
         * @param {{string}|{createjs.Bitmap}}
         * @returns {createjs.Bitmap}
         * @inner
         * @description get the selected car
         */
        get: function(car) {
            if (!car)
                return;
            switch (typeof car) {
                case "string":
                    return game.cars.set[car];
                default :
                    return car;
            }
        }
    },

    /**
     * @name views
     * @memberOf game
     * @inner
     * @description container for views of the application
     */
    views: {},

    /**
     * @name settings
     * @memberOf game
     * @inner
     * @description container for all the settings
     */
    settings: {

        /**
         * @name fps
         * @memberOf settings
         * @inner
         * @description value of the fps used in the Ticker function
         */
        fps: 30,

        /**
         * @name players
         * @memberOf settings
         * @inner
         * @description list of all players in game
         */
        players: [
            {
                /*arrows left: 37, up: 38, right: 39, down: 40*/
                controls: {},
                car: "",
                enabled: false
            },
            {
                /*wasd left: 65, up: 87, right: 68, down: 83*/
                controls: {},
                car: "",
                enabled: false
            }
        ],

        /**
         * @name tile_width
         * @memberOf settings
         * @inner
         * @description horizontal tile size
         */
        tile_width: 128,

        /**
         * @name tile_height
         * @memberOf settings
         * @inner
         * @description vertical tile size
         */
        tile_height: 128
    },

    /**
     * @function execute
     * @param {function}
     * @memberOf game
     * @inner
     * @description execute a function
     */
    execute: function (fn) {
        (fn)();
    },

    /**
     * @function random
     * @param {number}
     * @returns {number}
     * @memberOf game
     * @inner
     * @description get a random integer number
     */
    random: function (max) {
        return Math.floor(Math.random() * max);
    },

    /**
     * @function init
     * @memberOf game
     * @inner
     * @description simply start the hole game
     */
    init: function () {
        var canvas = document.getElementById('canvas');
        if (this.settings.width)
            canvas.width = this.settings.width;
        if (this.settings.height)
            canvas.height = this.settings.width;
        this.stage = new createjs.Stage(canvas);
        this.stage.enableMouseOver(10);
        this.images.load(this.events.callback.loadManifest());
    }
};