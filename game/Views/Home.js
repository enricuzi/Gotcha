game.views.home = {
    init: function () {
        var play = new game.widgets.Button(game.images.set.play);
        var settings = new game.widgets.Button(game.images.set.settings);
        var panel = new createjs.Bitmap();

        var stage = game.stage;
        stage.canvas.width = panel.image? panel.image.width: 300;
        stage.canvas.height = panel.image? panel.image.height: 300;

        stage.addChild(panel);

        play.x = stage.canvas.width/2 - play.image.width/2;
        play.y = stage.canvas.height/3;
        play.cursor = "pointer";
        game.events.addEvent("click", function (e) {
            game.stage.removeAllChildren();
            game.views.game.init();
        }, play);

        settings.x = stage.canvas.width/2 - settings.image.width/2;
        settings.y = stage.canvas.height/3*2;
        settings.cursor = "pointer";
        game.events.addEvent("click", function (e) {
            game.stage.canvas.getContext("2d").clearRect(0, 0, game.stage.canvas.width, game.stage.canvas.height);
            //game.views.settings.init();
        }, settings);

        stage.addChild(play);
        stage.addChild(settings);

        game.stage.update();
    }
};