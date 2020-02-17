(function ($) {

    $.fn.puissance4 = function (options) {

        var settings = $.extend({
            rows: '',
            cols: '',
            player1: '',
            player2: '',
            player: '',
            i1: 0,
            i2: 0
        }, options);

        $("#sub").click(function () {
            $('#puissance4').empty();
            var width = document.getElementById("width").value;
            var height = document.getElementById("height").value;
            var color1 = document.getElementById("couleurPlayer1").value;
            var color2 = document.getElementById("couleurPlayer2").value;
            var colorPlayer = getcolor(color1, color2);
            settings.player1 = colorPlayer[0];
            settings.player2 = colorPlayer[1];
            settings.rows = height;
            settings.cols = width;
            for (let row = 0; row < settings.rows; row++) {
                let raw = $('<div>').addClass('row');
                for (let col = 0; col < settings.cols; col++) {
                    let cal = $('<div>').addClass('col empty').attr('data-col', col).attr('data-row', row);
                    raw.append(cal);
                }
                $('#puissance4').append(raw);
            }
            settings.player = settings.player1;
            $('.player').html('au tour du joueur ' + settings.player + ' de jouer :');
        });

        function getcolor(color1, color2) {
            let color = [color1, color2];
            if (color1 === color2) {
                alert('choisie pas les même couleurs pour les deux joueur, bolos !')
                return;
            } else {
                return color;
            }
        }

        $("#clear").click(function () {
            $('#puissance4').empty();
            var width = document.getElementById("width").value;
            var height = document.getElementById("height").value;
            var rows = height;
            var cols = width;
            for (let row = 0; row < rows; row++) {
                let raw = $('<div>').addClass('row');
                for (let col = 0; col < cols; col++) {
                    let cal = $('<div>').addClass('col empty').attr('data-col', col).attr('data-row', row);
                    raw.append(cal);
                }
                $('#puissance4').append(raw);
            }
        });





        $(this).on('mouseenter', '.col.empty', function () {
            let colone = $(this).data('col');
            derniereCellVide = chercher(colone);
            derniereCellVide.addClass('derniere-' + settings.player + '');
        });

        function chercher(colone) {
            let cells = $('.col[data-col=' + colone + ']');
            for (let i = cells.length - 1; i >= 0; i--) {
                let cell = $(cells[i]);
                if (cell.hasClass('empty')) {
                    return cell;
                }
            }
            return null;
        }

        $(this).on('mouseleave', '.col', function () {
            $('.col').removeClass('derniere-' + settings.player + '');
        });

        $(this).on('click', '.col.empty', function () {
            let col2 = $(this).data('col');
            let cellVide = chercher(col2);
            cellVide.removeClass('empty');
            cellVide.addClass(settings.player);
            cellVide.data('player', settings.player);

            let gagnant = chercherGagnant(
                cellVide.data('row'),
                cellVide.data('col'));
            if (gagnant) {

                alert('le joueur ' + settings.player + ' a gagner !');
                if (settings.player === settings.player1) {
                    settings.i1++;
                    $('.score1').html('<h1>' + settings.player1 + '</h1>')
                    $('.ScoreOfplayer1').html('<h2>' + settings.i1 + '</h2>');
                    return;
                }
                if (settings.player === settings.player2) {
                    settings.i2++;
                    $('.score2').html('<h1>' + settings.player2 + '</h1>')
                    $('.ScoreOfplayer2').html('<h2>' + settings.i2 + '</h2>');
                    return;
                }
            }
            settings.player = (settings.player === settings.player1) ? settings.player2 : settings.player1;
            $('.player').html('au tour du joueur ' + settings.player + ' de jouer :');
        });

        function chercherGagnant(row, col) {

            function getCell(i, j) {
                return $('.col[data-row=' + i + '][data-col=' + j + ']');
            }

            function regarderTouteLesCell(direction) {
                let total = 0;
                let i = row + direction.i;
                let j = col + direction.j;
                let next = getCell(i, j);
                while (i >= 0 &&
                    i < settings.rows &&
                    j >= 0 &&
                    j < settings.cols &&
                    next.data('player') === settings.player
                ) {
                    total++;
                    i += direction.i;
                    j += direction.j;
                    next = getCell(i, j);
                }
                return total;
            }

            function gagnant(directionA, directionB) {
                let total = 1 +
                    regarderTouteLesCell(directionA) +
                    regarderTouteLesCell(directionB);
                if (total == 4) {
                    return settings.player;
                } else {
                    return null;
                }
            }

            function vertical() {
                return gagnant({
                    i: -1,
                    j: 0
                }, {
                    i: 1,
                    j: 0
                });
            }

            function horizontal() {
                return gagnant({
                    i: 0,
                    j: -1
                }, {
                    i: 0,
                    j: 1
                });
            }

            return vertical() ||
                horizontal();
        }

    };

}(jQuery));