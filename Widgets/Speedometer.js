game.widgets.Speedometer = function (image) {
    var panel = function (image) {
        this.initialize(image);
        this.properties = {max_speed: 0, speed: 0, unit: 0, max_unit: 90};
    };

    panel.prototype = new createjs.Bitmap();

    panel.prototype.speed = function (speed) {
        if (!speed)
            return this.properties.speed;
        else this.properties.speed =  speed;
    };

    panel.prototype.max = function (speed) {
        if (!speed)
            return this.properties.max;
        else {
            this.properties.max = speed;
            this.properties.unit = speed/90;
        }
    };

    panel.prototype.reset = function () {
        this.properties.speed = 0;
        this.rotate();
    };

    panel.prototype.rotate = function () {
        this.rotation = this.properties.speed * this.properties.max_unit / this.properties.max_speed;
    };

    panel.prototype.position = function (x, y, regX, regY) {
        this.x = x;
        this.y = y;
        if (regX)
            this.regX = regX;
        if (regY)
            this.regY = regY;
    };

    return new panel(image);
};