export interface StockPosition {
    positionId: string;
    amount: number;
    startDate: string;
    ticker: string;
}

export type NewStockPosition = Omit<StockPosition, "positionId">;

export interface WealthItem {
    date: string;
    amount: number;
    amountInEuro: number;
}
