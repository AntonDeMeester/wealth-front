export interface Account {
    source: string;
    accountNumber: string;
    currency: string;
    type: string;
    bank: string;
    externalId: string;
}

export interface WealthItem {
    date: string;
    amount: number;
    amountInEuro: number;
}
