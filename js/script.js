var licenses;
$(document).ready(function () {
    /*
    *   Для первого задания 
    * */
    $.ajax({
        url: "lic.json",
        type: "POST",
        crossDomain: true,
        dataType: "json",
        success: function (response) {
            licenses = response;
            $('#licplan1').html(response[0].licsum);
            $('#licplan2').html(response[1].licsum);
            $('#licplan3').html(response[2].licsum);
            //заполняем список количеством лицензий первого типа
            selAdd(parseInt(response[0].liccount));
            let checked = $("input:radio:checked")[0].value;
            let selectcol = $('#numlic').val();
            let sumtot = sumLic(selectcol, licenses[parseInt(checked)].licsum);
            //присваиваем начальный тотал
            $('#total').html('$' + sumtot);
        }
    });
    //меняем тотал при смене количества
    $("#numlic").change(function () {
        let checked = $("input:radio:checked")[0].value;
        let selectcol = $(this).val();
        let sumtot = sumLic(selectcol, licenses[parseInt(checked)].licsum);
        $('#total').html('$' + sumtot);
    });

    $('input:radio[name=radiogroup]').on('change', function () {
        //получаем количество лицензий для текущего плана
        let countlic = parseInt(licenses[$(this).val()].liccount);
        $('#numlic').empty();
        selAdd(countlic);
        let total = sumLic(1, parseInt(licenses[$(this).val()].licsum));
        $('#total').html('$' + total);
        $('#licplan').html('#' + (parseInt($(this).val()) + 1));
    });


    //**для второго задания***************************************

    let outWH = parseInt($('#circleout').height()); //ширина, ни у она же высота внешнего круга
    let radius = outWH / 2; //радиус внешнего
    outCoordTop = $('#circleout').offset().top; //верхняя координата внешнего блока
    outCoordLeft = $('#circleout').offset().left; //левая коорд внешнего
    //постоянная точка центра внешней окружности
    var center = {
        x: parseInt(radius),
        y: parseInt(radius)
    }
    //По формуле определяем рассояние между точками по координатам d = корень квадратный из (X2-X1) в квадрате + (Y2-Y1) квадрате 
    function dInOut(p1, p2) {
        let x = p1.x - p2.x;
        let y = p1.y - p2.y;
        return Math.sqrt(x * x + y * y);
    }
    //постоянная ширина и высота внутреннего
    var inWidth = parseInt($('#circlein').width());
    var inHeight = parseInt($('#circlein').height());

    //работаем с событием мыши, для большого круга
    $('#circleout').mousemove(function (e) {
        //проверяем курсор над кружком или нет
        if ($('#circlein').is(e.target)) {
            //получаем центр внутренней
            let meTopY = e.target.offsetTop;
            let meLeftX = e.target.offsetLeft;    
            let innerCenter = {
                x: meLeftX + inWidth / 2,
                y: meTopY + inHeight / 2
            }
            let d = dInOut(center, innerCenter)
            //берем отрезок между точками и вымеряем не вышел ли за круг те больше чем радиус минус маленький радиус
            if (d > radius - inWidth / 2) {
                //то возвращаем в серединку большого круга
                $('#circlein').css('top', outWH / 2).css('left', outWH / 2);
            } else {
                $('#circlein').css('top', getRandomInt(0, outWH-inHeight)).css('left', getRandomInt(0, outWH-inWidth));
            }
        }

    });
});

//для рандомных координат
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//добавляем в селект количество лицензий
function selAdd(counts) {
    for (let i = 0; i < counts; i++) {
        $('#numlic').append($('<option value=' + (i + 1) + '>' + (i + 1) + '</option>'));
    }
}
//считаем итоговую сумму
function sumLic(col, sum) {
    let itog = col * sum;
    return itog;
}