export interface CurrencyConverter {
    euro: number;
    franc: number;
}

const exchangeRate = 1.06;

export function convertToFranc(euro: number): number {
    return euro * exchangeRate;
}

export function convertToEuro(chf: number): number {
    return chf / exchangeRate;
}
