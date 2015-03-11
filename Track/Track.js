/**
 * @memeberof game
 * @type {{matrix: {}, starts: Array, clock: boolean, width: number, height: number, init: Function, setCar: Function, getTile: Function, getStart: Function, powerup: {timeout: null, power: null, getPowerup: Function, generatePowerup: Function}}}
 */
game.track = {
    /**
     * @name matrix
     * @memberOf track
     * @inner
     * @description store the tile matrix
     */
    matrix: {},

    /**
     * @name starts
     * @memberOf track
     * @inner
     * @description list of start points
     */
    starts: [],

    /**
     * @name clock
     * @memberOf track
     * @inner
     * @description boolean for round clock or not
     */
    clock: false,

    /**
     * @name row
     * @memberOf track
     * @inner
     * @description store how many rows there are in the track matrix
     */
    row: 0,

    /**
     * @name col
     * @memberOf track
     * @inner
     * @description store how many columns there are in the track matrix
     */
    col: 0,

    /**
     * @function init
     * @memberOf track
     * @inner
     * @description generate a random track
     */
    init: function () {
        /* Get a random track */
        var track = game.events.loadTrack();

        /* Get the matrix */
        this.matrix = track.matrix;
        this.row = this.matrix.length;
        this.col = this.matrix[0].length;

        /* Get the starts */
        this.starts = track.starts;

        /* Get the round of the track */
        this.clock = track.clock;

        /* Set empty each start point */
        for (var i in this.starts) {
            this.starts[i].empty = true;
        }

        /* For each cell in matrix */
        for (var row in track.matrix) {
            for (var col in track.matrix[row]) {
                /* Get the cell code */
                var type = track.matrix[row][col];

                /* Override the cell structure */
                this.matrix[row][col] = {
                    type: type
                };

                /* If not empty code */
                if (type != "ee") {

                    /* Get a related the tile */
                    var tile = game.track.Tile(type);
                    var back = game.track.Tile(type, "back");
                    tile.x = back.x = col * game.settings.tile_width + game.settings.tile_width / 2;
                    tile.y = back.y = row * game.settings.tile_height + game.settings.tile_height / 2;
                    this.matrix[row][col].tile = tile;
                    game.stage.addChild(back);
                    game.stage.addChild(tile);
                }
            }
        }
    },
    /**
     * @function setCar
     * @memberof track
     * @inner
     * @param {createjs.Bitmap}
     * @description place the car on a random start point
     */
    setCar: function (car) {
        var start = this.getStart();
        car.x = start.col * game.settings.tile_width + game.settings.tile_width / 2;
        car.y = start.row * game.settings.tile_height + game.settings.tile_height / 2;
    },
    /**
     * @function getTile
     * @memberOf track
     * @inner
     * @param {number}
     * @param {number}
     * @returns {createjs.Bitmap}
     * @description get a tile from the track matrix
     */
    getTile: function (row, col) {
        if (!row)
            row = game.random(this.matrix.length);
        if (!col)
            col = game.random(this.matrix[row].length);
        return this.matrix[row][col].tile;
    },
    /**
     * @function getStart
     * @memberOf track
     * @inner
     * @param {number}
     * @returns {object}
     * @description get a random start point
     */
    getStart: function (index) {
        if (!index) {
            index = game.random(this.starts.length);
            if (!this.starts[index].empty) {
                index = ++index % this.starts.length;
            }
            this.starts[index].empty = false;
        }
        return this.starts[index];
    },
    /**
     * @name powerup
     * @memberOf track
     * @inner
     * @description store generate powerup along the track
     */
    powerup: {
        /**
         * @name timeout
         * @memberOf powerup
         * @inner
         * @description store the timer of rigeneration
         */
        timeout: null,

        /**
         * @name power
         * @memberOf powerup
         * @inner
         * @description store the generated powerup
         */
        power: null,

        /**
         * @function getPowerup
         * @memberOf powerup
         * @inner
         * @param {number}
         * @returns {createjs.Bitmap}
         * @description generate a random powerup
         */
        getPowerup: function (index) {
            var powerup = game.events.loadPowerups(index);
            var params = {attribute: powerup.attribute, power: powerup.value, last: powerup.last};
            var power = game.powerups[powerup.name](game.images.set[powerup.image], params);
            var tile = game.track.getTile();
            while (!tile) {
                tile = game.track.getTile();
            }
            power.x = tile.x - power.image.width / 2;
            power.y = tile.y - power.image.height / 2;
            game.stage.addChild(power);
            return power;
        },
        /**
         * @function generatePowerup
         * @memberOf powerup
         * @inner
         * @description create the timer for rigeneration
         */
        generatePowerup: function () {
            game.track.powerup.timeout = setTimeout(function () {
                game.track.powerup.power = game.track.powerup.getPowerup();
            }, 2000);
        }
    }
};