import { IonIcon } from "@ionic/react";
import { wallet } from "ionicons/icons";

import DataService from "src/core/DataService";
import BigCard from "src/shared/components/BigCard";
import { WealthItem } from "src/shared/types/Banking";

import DashboardGraph from "./DashboardGraph";
import "./DashboardItem.scss";

interface DashboardItemProps {
    icon?: string;
    bankBalances: WealthItem[];
    stockBalances: WealthItem[];
    title: string;
}
const dataService = new DataService();

function DashboardItem({ icon, bankBalances, stockBalances, title }: DashboardItemProps) {
    if (!icon) {
        icon = wallet;
    }
    const bankData = dataService.sumByDay(bankBalances);
    const stockData = dataService.sumByDay(stockBalances);
    const allData = dataService.sumByDay(bankData.concat(stockData));
    const amountFirstDay = allData[0]?.amountInEuro ?? 0;
    const amountLastDay = allData[allData.length - 1]?.amountInEuro ?? 0;
    const amountTrend = amountFirstDay !== 0 ? (amountLastDay - amountFirstDay) / amountFirstDay : 1;
    const dataList: { id: string; name: string; balances: WealthItem[] }[] = [];
    if (bankBalances.length) {
        dataList.push({ id: "banks", name: "Banks", balances: bankBalances });
    }
    if (stockBalances.length) {
        dataList.push({ id: "stocks", name: "Stocks", balances: stockBalances });
    }

    const formatter = new Intl.NumberFormat("nl-BE", { style: "currency", currency: "EUR" });
    const formatNumber = (amount: number) => formatter.format(amount);
    const formatPercentage = (amount: number) => {
        return formatNumber(Math.abs(amount * 100));
    };

    return (
        <BigCard>
            <div className="dashboard-item">
                <div className="dashboard-item-left">
                    <div className="dashboard-item-icon-container">
                        <IonIcon ios={icon} md={icon} />
                    </div>
                    <div className="dashboard-item-divider"></div>
                    <div>
                        <p className="dashboard-item-amount">{formatNumber(amountLastDay)}</p>
                        <p className="dashboard-item-trend" style={{ color: amountTrend >= 0 ? "green" : "red" }}>
                            {formatPercentage(amountTrend)}% this month
                        </p>
                    </div>
                </div>
                <div className="dashboard-item-right">
                    <p>{title}</p>
                    <div className="dashboard-item-spacer"></div>
                    <div className="dashboard-item-graph">
                        <DashboardGraph dataList={dataList}></DashboardGraph>
                    </div>
                </div>
            </div>
        </BigCard>
    );
}

export default DashboardItem;
