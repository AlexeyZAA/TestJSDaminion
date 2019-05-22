$(document).ready(function () {
    //создаем поле игры
    drawPole();
    var colorDuble = ['', ''];
    var mixArr = [];
    var timer_id = null;
    var indexOneTmp;
    var indexTwoTmp;
//обработчик кнопки старт
    $('#btnStart').click(function () {
        //при повторном нажатии проверяем есть ли активный таймер, если да то останавливаем
        if (timer_id !== null) {
            clearInterval(timer_id);
            timer_id = null;
        }
        var seconds = 0;
        //вешаем таймер
        timer_id = setInterval(function () {
            seconds++;
            var time = moment.utc(seconds * 1000).format('HH:mm:ss');
            $('#timer').text(time);
        }, 1000);
        //очищаем клетки
        $('div .box').each(function (index, block) {
            block.style.backgroundColor = 'rgb(255,255,255)';
        });
        //генерируем цвета для боксов
        mixArr = getColorsArr();
        colorDuble[0] = '';
        colorDuble[1] = '';
    });
    $('#btnStop').click(function () {
        if (timer_id !== null) {
            clearInterval(timer_id);
            timer_id = null;
            mixArr = [];
            $('div .box').each(function (index, block) {
                block.style.backgroundColor = 'rgb(255,255,255)';
            });
            $('#timer').text('00:00:00');
            alert('Игра окончена');
        }
    });
//обработчик нажатий на боксы
    $('div .box').click(function () {
        if (mixArr.length != 16) {
            alert('Начните игру нажав старт');
            return false;
        }
        var boxIndex = $('div .box').index(this);
        //делаем проверку, чтобы не обрабатывать повторно закрашенные цвета
        if ($('div .box').eq(boxIndex)[0].style.backgroundColor == 'rgb(255, 255, 255)') {
            if (colorDuble[0] === '') {
                //если первое значение массива сравнения пары пустое, просто красим
                colorDuble[0] = mixArr[boxIndex];
                indexOneTmp = boxIndex;
                $(this)[0].style.backgroundColor = mixArr[boxIndex];
            } else if (colorDuble[0] !== '') {
                //если первая клетка из пары уже выбрана, красим вторую и сравниваем
                colorDuble[1] = mixArr[boxIndex];
                indexTwoTmp = boxIndex;
                $(this)[0].style.backgroundColor = mixArr[boxIndex];
                //проверяем одинаковые или нет, если нет очищаем массив и красим в белый цвет
                if (colorDuble[0] !== colorDuble[1]) {
                    colorDuble[0] = '';
                    colorDuble[1] = '';
                    setTimeout(function () {
                        $('div .box').eq(indexOneTmp)[0].style.backgroundColor = 'rgb(255, 255, 255)';
                        $('div .box').eq(indexTwoTmp)[0].style.backgroundColor = 'rgb(255, 255, 255)';
                    }, 100);
                } else if (colorDuble[0] === colorDuble[1]) {
                    colorDuble[0] = '';
                    colorDuble[1] = '';
                    indexOneTmp = null;
                    indexTwoTmp = null;
                    //проверяем закончилась ли игра
                    var end = getTimeEnd();
                    if (end == 1) {
                        let timeend = $('#timer').text();
                        clearInterval(timer_id);
                        timer_id = null;
                        alert('Вы выиграли!\n Затраченное время: ' + timeend);
                    }
                }

            }

        }
    });
});
//функция возвращает массив цветов для квадратов поля
function getColorsArr() {
    //массив уникальных цветов
    var colorsArr = new Array();
    var sortArr = new Array();
    //формируем массив из 8 уник цветов для пар
    for (let j = 0; j <= 7; j++) {
        var color = genСolor();
        if ($.inArray(color, colorsArr) == -1) {
            colorsArr[j] = color;
        }
    }
    //массив всех цветов для блоков
    var colorAllArr = new Array();
    var pos = 0;
    $.each(colorsArr, function (index, value) {
        colorAllArr[pos] = value;
        colorAllArr[pos + 1] = value;
        pos = pos + 2;
    });
    //мешаем цвета в массиве
    sortArr = colorAllArr.sort(function () {
        return Math.random() - 0.5;
    });
    return sortArr;
}
//функция создания поля игры
function drawPole() {
    //создаем поле квадратов игры при загрузке
    for (let i = 0; i < 4; i++) {
        $('#borderPoleBox').append('<div class="rowbox" id="rowbox' + i + '"></div>');
        for (let j = 0; j < 4; j++) {
            $('#rowbox' + i).append('<div class="box"' + ' ' + 'id="box' + i + j + '"></div>');
        }
    }
}
//функция генерации цвета RGB
function genСolor() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    var random_color = 'rgb(' + r + ',' + g + ',' + b + ')';
    return random_color;
}
//возвращаем время конца игры
function getTimeEnd() {
    var flagend = 1;
    $('div .box').each(function (index, block) {
        if (block.style.backgroundColor === 'rgb(255, 255, 255)') {
            flagend = 0;
            return flagend;
        }
    });
    return flagend;
}