game.powerups.Speed = function (image, params) {
    var speed = new game.powerups.Powerup(image, params);
    speed.boost = function (car) {
        if (!speed.timeout) {
            var car = game.cars.get(car);
            car.speed.max *= speed.power;
            game.powerups.Speed.power = speed.power;
            speed.timeout = setTimeout(function () {
                car.speed.max /= game.powerups.Speed.power;
            }, 2000);
        }
    };
    return speed;
};