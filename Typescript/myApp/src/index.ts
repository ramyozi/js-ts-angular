import * as $ from 'jquery';

const exchangeRate = 1.06;

$(document).ready(() => {
    $('#conversionForm').on('submit', function (event: JQuery.Event) {
        event.preventDefault();

        const euroValue = parseFloat($('#euroInput').val() as string);
        const chfValue = parseFloat($('#chfInput').val() as string);

        if (!isNaN(euroValue)) {
            const convertedToCHF = euroValue * exchangeRate;
            $('#chfInput').val(convertedToCHF.toFixed(2));
        } else if (!isNaN(chfValue)) {
            const convertedToEuro = chfValue / exchangeRate;
            $('#euroInput').val(convertedToEuro.toFixed(2));
        }
    });
});