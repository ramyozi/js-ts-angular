import * as $ from 'jquery';
import './styles.scss';

interface CurrencyConverter {
    euro: number;
    chf: number;
}

const exchangeRate = 1.06;

function convertToCHF(euro: number): number {
    return euro * exchangeRate;
}

function convertToEuro(chf: number): number {
    return chf / exchangeRate;
}

$(document).ready(() => {
    $('#conversionForm').on('submit', function (event: JQuery.Event) {
        event.preventDefault();

        const euroInput = $('#euroInput').val() as string;
        const chfInput = $('#chfInput').val() as string;

        let converter: CurrencyConverter = { euro: NaN, chf: NaN };

        if (euroInput) {
            const euroValue = parseFloat(euroInput);
            if (!isNaN(euroValue)) {
                converter.chf = convertToCHF(euroValue);
                $('#chfInput').val(converter.chf.toFixed(2));
            }
        }

        if (chfInput) {
            const chfValue = parseFloat(chfInput);
            if (!isNaN(chfValue)) {
                converter.euro = convertToEuro(chfValue);
                $('#euroInput').val(converter.euro.toFixed(2));
            }
        }
    });
});
