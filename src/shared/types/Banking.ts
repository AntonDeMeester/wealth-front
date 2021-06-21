export interface Account {
    accountId: string;
    source: string;
    accountNumber: string;
    currency: string;
    type: string;
    bank: string;
    externalId: string;
    name: string;
    isActive: boolean;
}

export interface EditAccount {
    isActive?: boolean;
    name?: string;
}

export interface WealthItem {
    date: string;
    amount: number;
    amountInEuro: number;
}
