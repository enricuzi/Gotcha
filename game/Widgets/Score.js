/**
 * Create a text label and listen for the 'updateScore' event.
 * @memberOf widget
 * @class
 * @name Score
 * @param {string}
 * @param {*|{color: string, font: string, font_family: string, font_style: string}}
 * @returns {createjs.Text}
 */
game.widgets.Score = function (text, params) {
    /**
     * score - object to extend createjs.Bitmap
     * @type {createjs.Text}
     */
    var score = new createjs.Text();

    /**
     * params - font settings
     * @type {*|{color: string, font: string, font_family: string, font_style: string}}
     */
    score.params = params || {color: "black", font: "20px", font_family: "Arial", font_style: "bold"};

    /**
     * text - actual value
     * @type {string}
     */
    score.text = text;

    /**
     * @method parameters
     * @param {*|{color: string, font: string, font_family: string, font_style: string}}
     * @returns {{color: string, font: string, font_family: string, font_style: string}|*}
     */
    score.parameters = function (params) {
        if (params)
            score.params = params;
        else return score.params;
    };
    /**
     * @method property
     * @param {*|{string}}
     * @param {*|{string}}
     * @returns {{string}|*}
     */
    score.property = function (property, value) {
        if (property)
            score.params[property] = value;
        else return score.params[property];
    };
    /**
     * @method update
     * @param {string}
     */
    score.update = function (value) {
        score.text = Number(score.text) + value;
    };
    /**
     * @method refresh
     */
    score.refresh = function () {
        score.color = score.params.color;
        score.font = score.params.font + " " + score.params.font_style + " " + score.params.font_family;
    };
    /**
     * @event Score#updateScore
     */
    game.events.addEvent("updateScore", function (e) {
        e.detail.score.update(e.detail.value);
    }, score);

    score.refresh();
    return score;
};