game.widgets.Button = function (image) {
    var image = game.images.get(image);
    var btn = new createjs.Bitmap(image);
    btn.Bitmap_visible = btn.visible;
    btn.addEvent = function (fn) {
        btn.fn = fn;
        btn.addEventListener("click", fn);
    };
    btn.removeEvent = function () {
        btn.removeEventListener("click", this.fn);
    };
    btn.visible = function (visible) {
        if (visible == null) {
            if (!btn.Bitmap_visible)
                game.stage.addChild(this);
            else game.stage.removeChild(this);

            btn.Bitmap_visible = !btn.Bitmap_visible;
        }
        else btn.Bitmap_visible = visible;
        return btn.Bitmap_visible;
    };
    return btn;
};