function initMenu() {

    var menu = document.getElementById("menu");
    initHome(menu);
    initSettings(menu);
};

function initHome(menu) {
    var home = menu.children[0].children[0];
    home.onclick = function (e) {
        game.stage.removeAllChildren();
        game.views.home.init();
    };
};

function initSettings(menu) {
    var settings = menu.children[0].children[1];
    settings.appendChild(createPlayerList());

    function createPlayerList() {
        var ul = document.createElement("ul");
        for (var i in game.settings.players) {
            var player = game.settings.players[i];
            var li = document.createElement("li");
            var label = document.createElement("label");
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.player = i;
            checkbox.onclick = function (e) {
                game.settings.players[this.player].enabled = this.checked;
            };
            var span = document.createElement("span");
            span.innerText = "Player " + (Number(i) + 1);
            label.appendChild(checkbox);
            label.appendChild(span);
            li.appendChild(label);
            var subul = createSubMenu(player);
            li.appendChild(subul);
            ul.appendChild(li);
        }
        return ul;
    }

    function createSubMenu(player) {
        var ul = document.createElement("ul");
        var li = document.createElement("li");

        for (var j = 0; j < 2; j++) {
            var radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "car";
            radio.onclick = function (e) {
                player.car = radio.value;
            };
            var span = document.createElement("span");
            switch (j) {
                case 0:
                    radio.value = "car_yellow";
                    span.innerText = "Car Yellow";
                    break;
                case 1:
                    radio.value = "car_red";
                    span.innerText = "Car Red";
                    break;
            }
            var label = document.createElement("label");
            label.appendChild(radio);
            label.appendChild(span);
            li.appendChild(label);
            li.appendChild(document.createElement("br"));
        }

        ul.appendChild(li);

        var controls = controlSettings(player);
        for (var i in controls) {
            ul.appendChild(controls[i]);
        }

        return ul;
    }

    function controlSettings(player) {
        var controls = [];
        for (var j = 0; j < 4; j++) {
            var li = document.createElement("li");
            var label = document.createElement("label");
            var span = document.createElement("span");
            var input = document.createElement("input");
            switch (j) {
                case 0:
                    span.innerText = "Left";
                    input.control = "left";
                    break;
                case 1:
                    span.innerText = "Up";
                    input.control = "up";
                    break;
                case 2:
                    span.innerText = "Right";
                    input.control = "right";
                    break;
                case 3:
                    span.innerText = "Down";
                    input.control = "down";
                    break;
            }
            input.type = "text";
            input.style.width = "20px";
            input.style.float = "right";
            input.style.marginRight = '20px';
            input.onkeydown = function (e) {
                /* If user press Enter or Tab do nothing */
                if (e.keyCode != 13 && e.keyCode != 9)
                    this.value = "";
            };
            input.onkeyup = function (e) {
                player.controls[this.control] = e.keyCode;
            };

            label.appendChild(span);
            label.appendChild(input);
            li.appendChild(label);
            controls.push(li);
        }
        return controls;
    };

};