export interface StockPosition {
    positionId: string;
    amount: number;
    startDate: string;
    ticker: string;
    currentValue: number;
    currentValueInEuro: number;
}

export type NewStockPosition = Omit<StockPosition, "positionId">;

export interface WealthItem {
    date: string;
    amount: number;
    amountInEuro: number;
}

export interface TickerSearchItem {
    ticker: string;
    name: string;
    type: string;
    region: string;
    matchScore: number;
}
