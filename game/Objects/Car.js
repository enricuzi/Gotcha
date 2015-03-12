/**
 * Create a new Car
 * @memberof objects
 * @class
 * @name Car
 * @param image
 * @returns {createjs.Bitmap}
 */
game.objects.Car = function (image) {
    /**
     * image - image to attach to the car
     * @type HTML
     */
    var image = game.images.get(image);

    /**
     * car - object to extend createjs.Bitmap
     * @type {createjs.Bitmap}
     */
    var car = new createjs.Bitmap(image);

    /**
     * keyCodes - save key press status (down|up)
     * @type {object}
     */
    car.keyCodes = {};

    /**
     * Speed Configuration: {max: max speed reachable, acceleration: incrementation speed step, current: actual speed value}
     * @type {{max: number, acceleration: number, current: number}}
     */
    car.speed = {max: 10, acceleration: 1, current: 0};

    /**
     * Rotation configuration: {rotation: value to reach, speed: incrementation step, current: actual rotation value}
     * @type {{rotation: number, speed: number, current: number}}
     */
    car.angle = {rotation: 0, speed: 45, current: 0};

    /**
     * timeout - save the callback to reset the car
     * @type {function}
     */
    car.timeout = null;

    /* Rotation point */
    if (image) {
        car.regX = car.image.width / 2;
        car.regY = car.image.height / 2;
    }

    /**
     * @method Rotate
     * @param {*|{number}}
     */
    car.rotate = function (angle) {
        if (!angle) {
            if (car.isLeft() && !car.isUp() && !car.isDown())
                angle = 0;
            else if (car.isLeft() && car.isUp())
                angle = 45;
            else if (!car.isLeft() && !car.isRight() && car.isUp())
                angle = 90;
            else if (car.isRight() && car.isUp())
                angle = 135;
            else if (car.isRight() && !car.isUp() && !car.isDown())
                angle = 180;
            else if (car.isRight() && car.isDown())
                angle = 225;
            else if (!car.isLeft() && !car.isRight() && car.isDown())
                angle = 270;
            else if (car.isLeft() && car.isDown())
                angle = 315;
        }
        car.angle.rotation = angle;
        rotate();
    };
    /**
     * @method isLeft
     * @returns {boolean}
     */
    car.isLeft = function () {
        return car.keyCodes[car.controls.left];
    };
    /**
     * @method isUp
     * @returns {boolean}
     */
    car.isUp = function () {
        return car.keyCodes[car.controls.up];
    };
    /**
     * @method isRight
     * @returns {boolean}
     */
    car.isRight = function () {
        return car.keyCodes[car.controls.right];
    };
    /**
     * @method isDown
     * @returns {boolean}
     */
    car.isDown = function () {
        return car.keyCodes[car.controls.down];
    };
    /**
     * @method stop
     */
    car.stop = function () {
        car.keyCodes[car.controls.left] = false;
        car.keyCodes[car.controls.up] = false;
        car.keyCodes[car.controls.right] = false;
        car.keyCodes[car.controls.down] = false;
        car.speed.current = 0;
    };
    /**
     * @method move
     * @returns {boolean}
     */
    car.move = function () {
        car.direction = "";
        if (!car.isMoving()) {
            car.speed.current = 0;
            return false;
        }
        if (car.isLeft()) {
            car.direction += "l";
            car.goLeft();
        }
        else if (car.isRight()) {
            car.direction += "r";
            car.goRight();
        }
        if (car.isUp()) {
            car.direction += "t";
            car.goUp();
        }
        else if (car.isDown()) {
            car.direction += "b";
            car.goDown();
        }
        car.rotate();
        return true;
    };
    /**
     * @method isMoving
     * @returns {boolean}
     */
    car.isMoving = function () {
        return car.isLeft() || car.isUp() || car.isRight() || car.isDown();
    };
    /**
     * @method goLeft
     */
    car.goLeft = function () {
        car.x -= car.getSpeed();
    };
    /**
     * @method goRight
     */
    car.goRight = function () {
        car.x += car.getSpeed();
    };
    /**
     * @method goUp
     */
    car.goUp = function () {
        car.y -= car.getSpeed();
    };
    /**
     * @method goDown
     */
    car.goDown = function () {
        car.y += car.getSpeed();
    };
    /**
     * @method reset
     */
    car.reset = function () {
        //car.position(game.stage.canvas.width / 2 - car.center.x, game.stage.canvas.height / 2 - car.center.y - 90)
    };
    /**
     * @method getSpeed
     * @returns {number}
     */
    car.getSpeed = function () {
        if (car.speed.current < car.speed.max)
            car.speed.current += car.speed.acceleration;
        else car.speed.current = car.speed.max;
        return car.speed.current;
    };
    /**
     * @method coordinates
     * @returns {{row: number, col: number}}
     */
    car.coordinates = function () {
        var row = Math.floor(car.y / game.settings.tile_height);
        var col = Math.floor(car.x / game.settings.tile_width);
        return {row: row, col: col};
    };
    /**
     * @method setControls
     * @param controls
     */
    car.setControls = function (controls) {
        car.controls = {left: controls.left, up: controls.up, right: controls.right, down: controls.down};
    };
    /**
     * @method rotate
     */
    function rotate () {
        if (car.angle.rotation < car.angle.current) {
            car.angle.current -= car.angle.speed;
        } else if (car.angle.rotation > car.angle.current) {
            car.angle.current += car.angle.speed;
        }
        car.rotation = car.angle.current;
    };
    return car;
};