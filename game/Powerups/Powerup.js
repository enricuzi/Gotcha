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
     * attribute - what the power will boost
     * @type {string}
     */
    power.attribute = power.params.attribute;

    /**
     * last - how much time last the powerup applyed to the car
     * @type {number}
     */
    power.last = power.params.last;

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

    /**
     * @method boost
     * @param {{string}|{createjs.Bitmap}}
     */
    power.boost = function (car) {

        /* Get the car to boost */
        var car = game.cars.get(car);

        /* Get the attribute to boost */
        var attributes = power.attribute.split(".");
        var value = "car[attributes[0]]";
        for (var i=1; i<attributes.length; i++)
            value += "[attributes[" + i + "]]";
        value += "*= power.power";

        /* Evaluate the an expression like: 'car[attributes[0]][attributes[1]]...*= power.power' */
        eval(value);

        /* Set how the power will last */
        power.timout = setTimeout(function () {
            value = value.replace("*", "/");
            eval(value);
        }, power.last);
    };
    return power;
};