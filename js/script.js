var licenses;
$(document).ready(function () {
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
        $('#licplan').html('#' + (parseInt($(this).val())+1));
    });

});

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