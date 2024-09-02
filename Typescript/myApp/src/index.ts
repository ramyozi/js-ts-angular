import * as $ from 'jquery';
import './style/styles.scss';
import {convertToFranc, convertToEuro, CurrencyConverter} from "./types/CurrencyConverter";


let isEuroToFranc = true;

let converter: CurrencyConverter = { euro: 0, franc: 0 };

$('#conversionForm').on('submit', function (event: JQuery.Event) {
    event.preventDefault();

    if (isEuroToFranc) {
        const euroValue = parseFloat($('#euroInput').val() as string);
        if (!isNaN(euroValue)) {
            converter.euro = euroValue;
            converter.franc = convertToFranc(converter.euro);
            $('#chfInput').val(converter.franc.toFixed(2));
        }
    } else {
        const chfValue = parseFloat($('#chfInput').val() as string);
        if (!isNaN(chfValue)) {
            converter.franc = chfValue;
            converter.euro = convertToEuro(converter.franc);
            $('#euroInput').val(converter.euro.toFixed(2));
        }
    }
});

$('#switchButton').on('click', function () {
    isEuroToFranc = !isEuroToFranc;

    $('#euroInput').val('');
    $('#chfInput').val('');

    const euroField = $('#euroField');
    const chfField = $('#chfField');
    const switchButton = $('#switchButton').parent();

    if (isEuroToFranc) {
        euroField.insertBefore(switchButton);
        chfField.insertAfter(switchButton);
        $('#euroInput').prop('disabled', false).attr('placeholder', 'Entrez le montant en euros');
        $('#chfInput').prop('disabled', true).attr('placeholder', 'Conversion en francs suisses');
    } else {
        chfField.insertBefore(switchButton);
        euroField.insertAfter(switchButton);
        $('#chfInput').prop('disabled', false).attr('placeholder', 'Entrez le montant en francs suisses');
        $('#euroInput').prop('disabled', true).attr('placeholder', 'Conversion en euros');
    }
});
