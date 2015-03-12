/**
 * Create a new Tile
 * @memberOf track
 * @class
 * @name Tile
 * @param {string}
 * @param {*|{boolean}}
 * @returns {createjs.Bitmap}
 */
game.track.Tile = function (type, isBack) {
    /**
     * image - image to attach to the tile
     * @type HTML
     */
    var image = isBack ? game.images.set.tile_curve_background : game.images.set.tile_curve;
    if ((type.indexOf("l") >= 0 && type.indexOf("r") >= 0) || (type.indexOf("t") >= 0 && type.indexOf("b") >= 0))
        image = isBack ? game.images.set.tile_rect_background : game.images.set.tile_rect;

    /**
     * tile - object to extend createjs.Bitmap
     * @type {createjs.Bitmap}
     */
    var tile = new createjs.Bitmap(image);

    /**
     * type - code of the track matrix
     * @type {string}
     */
    tile.type = type;

    /* Rotation center */
    tile.regX = tile.image.width / 2;
    tile.regY = tile.image.height / 2;

    /**
     * @method rotate
     * @param {{string}|{number}}
     */
    tile.rotate = function (type) {
        if (typeof type == "number") {
            tile.rotate(type);
            return
        }
        if (type)
            tile.type = type;
        switch (tile.type.charAt(0)) {
            case "l":
                switch (tile.type.charAt(1)) {
                    case "t":
                        //get lt
                        tile.rotation = 0;
                        break;
                    case "r":
                        //get lr
                        tile.rotation = 0;
                        break;
                    case "b":
                        //get lb
                        tile.rotation = 270;
                        break;
                }
                break;
            case "t":
                switch (tile.type.charAt(1)) {
                    case "l":
                        //get tl
                        tile.rotation = 0;
                        break;
                    case "r":
                        //get tr
                        tile.rotation = 90;
                        break;
                    case "b":
                        //get tb
                        tile.rotation = 90;
                        break;
                }
                break;
            case "r":
                switch (tile.type.charAt(1)) {
                    case "l":
                        //get rl
                        tile.rotation = 0;
                        break;
                    case "t":
                        //get rt
                        tile.rotation = 90;
                        break;
                    case "b":
                        //get rb
                        tile.rotation = 180;
                        break;
                }
                break;
            case "b":
                switch (tile.type.charAt(1)) {
                    case "l":
                        //get bl
                        tile.rotation = 270;
                        break;
                    case "r":
                        //get br
                        tile.rotation = 180;
                        break;
                    case "t":
                        //get bt
                        tile.rotation = 90;
                        break;
                }
                break;
            default:
                //get ee
                break;
        }
    };

    tile.rotate();
    return tile;
};