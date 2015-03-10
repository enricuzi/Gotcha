/**
 * @memberof game
 * @type {{addEvent: Function, removeEvent: Function, addTicker: Function, removeTicker: Function, loadTrack: Function, loadPowerups: Function, loadCar: Function, pixelCollision: Function, rectCollision: Function, dispatch: {initTrack: Function, carLoose: Function, updateScore: Function, carMove: Function, carCollision: Function}, callback: {loadImagesComplete: Function, loadManifest: Function, resetCarOnTile: Function}}}
 */
game.events = {
    /**
     * @function addEvent
     * @param {string}
     * @param {function}
     * @param {*|{object}}
     */
    addEvent: function (type, fn, caller) {
        var caller = caller || document;
        caller.addEventListener(type, fn);
    },
    /**
     * @function removeEvent
     * @param {string}
     * @param {function}
     * @param {*|{object}}
     */
    removeEvent: function (type, fn, caller) {
        var caller = caller || document;
        caller.removeEventListener(type, fn);
    },
    /**
     * @function addTicker
     * @param {function}
     */
    addTicker: function (fn) {
        createjs.Ticker.setFPS(game.settings.fps);
        createjs.Ticker.addEventListener("tick", fn);
    },
    /**
     * @function removeTicker
     * @param {function}
     */
    removeTicker: function (fn) {
        createjs.Ticker.removeEventListener("tick", fn);
    },
    /**
     * @function loadTrack
     * @param {*|{number}}
     * @returns {object}
     */
    loadTrack: function (index) {
        var track = tracks();
        if (!index)
            index = game.random(track.length);
        return track[index];
    },
    /**
     * @function loadPowerups
     * @param {*|{number}}
     * @returns {createjs.Bitmap}
     */
    loadPowerups: function (index) {
        var powers = powerups();
        if (!index)
            index = game.random(powers.length);
        return powers[index];
    },
    /**
     * @function loadCar
     * @param {object}
     */
    loadCar: function (player) {
        var car = game.objects.Car(player.car);
        car.name = player.car;
        car.player = player.id;
        if (player.controls)
            car.setControls(player.controls);
        game.cars.set[player.car] = car;
        game.stage.addChild(car);
    },
    /**
     * @function pixelCollision
     * @param {createjs.Bitmap}
     * @param {createjs.Bitmap}
     * @returns {boolean}
     */
    pixelCollision: function (image1, image2) {
        return ndgmr.checkPixelCollision(image1, image2);
    },
    /**
     * @function rectCollision
     * @param {createjs.Bitmap}
     * @param {createjs.Bitmap}
     * @returns {boolean}
     */
    rectCollision: function (image1, image2) {
        return ndgmr.checkPixelCollision(image1, image2);
    },
    /**
     * @memberOf events
     */
    dispatch: {
        /**
         * @function initTrack
         */
        initTrack: function () {
            game.track.init();
        },
        /**
         * @function carLoose
         * @param {createjs.Bitmap}
         */
        carLoose: function (car) {
            var e = new CustomEvent("carLoose", {detail: car.name});
            document.dispatchEvent(e);
        },
        /**
         * @function updateScore
         * @param {createjs.Text}
         * @param {number|string}
         */
        updateScore: function (score, value) {
            var e = new CustomEvent("updateScore", {detail: {score: score, value: value}});
            score.dispatchEvent(e);
        },
        /**
         * @function carMove
         * @param {createjs.Bitmap}
         */
        carMove: function (car) {
            var e = new CustomEvent("carMove", {detail: car.name});
            document.dispatchEvent(e);
        },
        /**
         * @function carCollision
         * @param {createjs.Bitmap}
         */
        carCollision: function (car) {
            var e = new CustomEvent("carCollision", {detail: car.name});
            document.dispatchEvent(e);
        }
    },
    /**
     * @memberOf events
     */
    callback: {
        /**
         * @function loadImageComplete
         */
        loadImagesComplete: function () {
            game.views.game.init();
            game.stage.update();
        },
        /**
         * @function loadManifest
         * @returns {object}
         */
        loadManifest: function () {
            /*Call server for manifest*/
            return manifest();
        },
        /**
         * @function resetCarOnTile
         * @param {createjs.Bitmap}
         * @param {createjs.Bitmap}
         */
        resetCarOnTile: function (car, tile) {
            car.x = tile.x;
            car.y = tile.y;
            car.stop();
            car.timeout = null;
        }
    }
};