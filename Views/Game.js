/**
 * @memberOf views
 * @name game
 * @type {{init: Function, play: Function}}
 */
game.views.game = {
    /**
     * @function init
     */
    init: function () {
        /* Eventually call here loadManifest to get only track resources */
        /* Generates a new random track */
        game.events.dispatch.initTrack();

        /* Adjust the canvas with the size of the track */
        game.stage.canvas.width = game.settings.tile_width * game.track.col;
        game.stage.canvas.height = game.settings.tile_height * game.track.row;

        /* DEBUG */
        game.debug.fps = game.widgets.Score(0);
        game.debug.fps.property("color", "grey");
        game.debug.fps.x = game.stage.canvas.width/2;
        game.debug.fps.y = game.stage.canvas.height/2;
        game.stage.addChild(game.debug.fps);

        /* For each player in the game */
        for (var i in game.settings.players) {
            var player = game.settings.players[i];
            player.id = i;

            /* Generate a car */
            game.events.loadCar(player);

            /* Place the car on a start point of track */
            game.track.setCar(game.cars.set[player.car]);

            /* Attach a score label */
            player.score = game.widgets.Score(0);
            switch (Number(i)) {
                case 0:
                    player.score.property("color", "red");
                    player.score.x = player.score.y = 0;
                    break;
                case 1:
                    player.score.property("color", "yellow");
                    player.score.x = game.stage.canvas.width - 50;
                    player.score.y = 0;
                    break;
            }
            player.score.refresh();
            game.stage.addChild(player.score);
        }

        /* Generate a random Powerup */
        game.track.powerup.generatePowerup();

        /* Listen for 'keydown' overall the document */
        game.events.addEvent("keydown", function (e) {

            /* For each car in game */
            for (var i in game.cars.set) {

                /* Remember which key is pressed */
                game.cars.set[i].keyCodes[e.keyCode] = true;
            }
        });

        /* Listen for 'keyup' overall the document */
        game.events.addEvent("keyup", function (e) {

            /* For each car in game */
            for (var i in game.cars.set) {

                /* Rememeber which key is released */
                game.cars.set[i].keyCodes[e.keyCode] = false;
            }
        });

        /* Listen for 'carLoose' overall the document */
        game.events.addEvent("carLoose", function (e) {
            console.log(e.detail + " Loose!!!");
        });

        /* Listen for 'carMove' overall the document */
        game.events.addEvent("carMove", function (e) {

            /* Get the car which fired the event */
            var car = game.cars.set[e.detail];

            /* Get the tile where the it is */
            var row = Math.floor(car.y / game.settings.tile_height);
            var col = Math.floor(car.x / game.settings.tile_width);
            var tile = game.track.matrix[row][col].tile;

            /* If car collides with the any obstacle of the tile */
            if (game.events.pixelCollision(car, tile)) {

                /* Freeze the car and wait for a random restart */
                car.timeout = setTimeout(function () {
                    game.events.callback.resetCarOnTile(car, tile);
                }, 1000);
            }
            /* If no collision between car and tile */
            else {

                /* Move the car */
                car.move();

                /*
                game.events.dispatch.carCollision(car);
                 */

                /* For each car in game */
                for (var i in game.cars.set) {
                    var other = game.cars.set[i];

                    /* If there is a collision with the current car */
                    if (other.name != car.name && game.events.rectCollision(car, other)) {

                        /* Get the round direction of the track */
                        var index = game.track.clock ? 1 : 0;
                        var direction = tile.type.charAt(index);

                        /* If the current car goes in the wrong way */
                        if (car.direction.indexOf(direction) < 0) {

                            /* Fire 'carLoose' */
                            game.events.dispatch.carLoose(car);

                            /* Reset the position of the car */
                            game.track.setCar(car);
                        }
                        /* If current car goes in the right way */
                        else {

                            /* Get a point */
                            game.events.dispatch.updateScore(game.settings.players[car.player].score, 1);
                        }

                        /* Freeze the game for a while and then continue */
                        game.events.removeTicker(game.views.game.play);
                        setTimeout(function () {
                            game.events.addTicker(game.views.game.play);
                        }, 1000);
                    }
                }

                /* Check for a collision with the powerup */
                if (game.track.powerup.power && !game.track.powerup.power.timeout && game.events.rectCollision(car, game.track.powerup.power)) {
                    game.track.powerup.power.boost(car);
                    game.stage.removeChild(game.track.powerup.power);
                    game.track.powerup.power = null;
                    setTimeout(function () {
                        game.track.powerup.generatePowerup();
                    }, 2000);
                }
            }
        });

        /* Play this super funny game!!! */
        game.events.addTicker(this.play);
    },
    /**
     * @function play
     */
    play: function () {
        /* DEBUG */
        game.debug.fps.text = Math.floor(createjs.Ticker.getMeasuredFPS());

        /* For each car in game */
        for (var i in game.cars.set) {
            var car = game.cars.set[i];

            /* If car is not frozen */
            if (!car.timeout) {

                /* Move it */
                game.events.dispatch.carMove(car);
            }
        }

        /* Update the playground */
        game.stage.update();
    }
};