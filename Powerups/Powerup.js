/**
 * Generic powerup object
 * @memberOf powerups
 * @class
 * @name Powerup
 * @param {{string}|{HTML img}}
 * @param {*|{object}}
 * @returns {createjs.Bitmap}
 */
game.powerups.Powerup = function (image, params) {
    /**
     * image - image to attach to the powerup
     * @type HTML
     */
    var image = game.images.get(image);

    /**
     * power - object to extend createjs.Bimap
     * @type {createjs.Bitmap}
     */
    var power = new createjs.Bitmap(image);

    /**
     * params - optional settings
     * @type {*|{object}}
     */
    power.params = params || {};

    /**
     * power - actual value
     * @type {{string}|{number}}
     */
    power.power = power.params.power;

    /**
     * @method get
     * @param {*|{string}}
     * @returns {{string}}
     */
    power.get = function (property) {
        if (property)
            return power.params[property];
        return power.power;
    };
    /**
     * @method set
     * @param {string}
     * @param {*|{string}}
     */
    power.set = function (value, property) {
        if (!property)
            power.power = value;
        else {
            power.params[property] = value;
            if (property == "power")
                power.power = value;
        }
    };
    return power;
};