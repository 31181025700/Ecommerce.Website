    function Level(r) {
        document.querySelector("#Rating").value = r;//3
        for (var i = 1; i <= r; i++) {
        document.querySelector("#Level" + i).setAttribute('class', 'rating-box-star--gold fas fa-star');
        }

        for (var i = r + 1; i <= 5; i++) {
        document.querySelector("#Level" + i).setAttribute('class', 'rating-box-star--empty fas fa-star');
        }
    }

    function LevelOver(r) {
        for (var i = 1; i <= r; i++) {
        document.querySelector("#Level" + i).setAttribute('class', 'rating-box-star--gold fas fa-star');
        }
    }

    function LevelOut(r) {
        for (var i = 1; i <= r; i++) {
        document.querySelector("#Level" + i).setAttribute('class', 'rating-box-star--empty fas fa-star');
        }
    }

    function LevelSelected() {
        var setRating = document.querySelector("#Rating").value;
        for (var i = 1; i <= setRating; i++) {
        document.querySelector("#Level" + i).setAttribute('class', 'rating-box-star--gold fas fa-star');
        }
    }