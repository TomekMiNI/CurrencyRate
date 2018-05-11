$(function () {
    function getall() {
        var ul = $("ul");
        ul.children().remove();
        $.get("/lab/getall").done(function (data) {
            for (var el in data) {
                var li = $("<li>");
                li.append(data[el].exchangeRate + " - ");
                li.append(data[el].currencyCode + " - ");
                li.append(data[el].quantity);
                ul.append(li);
            }
        })
    }

    $("#buttonzapisz").click(function () {
        var kod = $("#textkod").val();
        var kurs = $("#textkurs").val();
        var ilosc = $("#textilosc").val();
        $.ajax({
            type: 'POST',
            url: "/lab/savetransaction",
            data: JSON.stringify({
                "exchangeRate": kurs,
                "currencyCode": kod,
                "quantity": ilosc
            }),
            contentType: 'application/json',
            dataType: 'json'
        }).done(function () {
            getall();
        })
    });
    $("#buttonodswiez").click(getall);

    $("#buttonusun").click(function () {
        $.ajax({
            type: 'DELETE',
            url: "/lab/deleteall"
        }).done(function () {
            getall();
        })
    });


   

    $("#buttonlosuj").click(function () {
        var d1 = $.get("http://api.nbp.pl/api/exchangerates/rates/A/USD?format=json", 'json');
        var d2 = $.get("http://api.nbp.pl/api/exchangerates/rates/A/EUR?format=json", 'json');
        var d3 = $.get("http://api.nbp.pl/api/exchangerates/rates/A/NOK?format=json", 'json');
        var d4 = $.get("http://api.nbp.pl/api/exchangerates/rates/A/SEK?format=json", 'json');
        var d5 = $.get("http://api.nbp.pl/api/exchangerates/rates/A/CHF?format=json", 'json');
        $.when(d1, d2, d3, d4, d5).then(function (t1, t2, t3, t4, t5) {
            var los = Math.floor((Math.random() * 5));
            var option;
            switch (los) {
                case 0:
                    option = t1[0];
                    break;
                case 1:
                    option = t2[0];
                    break;
                case 2:
                    option = t3[0];
                    break;
                case 3:
                    option = t4[0];
                    break;
                case 4:
                    option = t5[0];
                    break;
            }
            var rates = option["rates"];
            $("#textkurs").val(rates[0]["mid"]);
            $("#textkod").val(option["code"]);
        }).fail(function () { alert("service failure!"); });
       
    });
})