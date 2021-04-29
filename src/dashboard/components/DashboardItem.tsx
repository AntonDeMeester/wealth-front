import { IonIcon } from "@ionic/react";
import { wallet } from "ionicons/icons";

import DataService from "src/core/DataService";
import BigCard from "src/shared/components/BigCard";
import { WealthItem } from "src/shared/types/Banking";

import "./DashboardItem.scss";
import MiniGraph from "./MiniGraph";

interface DashboardItemProps {
    icon?: string;
    balances: WealthItem[];
    title: string;
}
const dataService = new DataService();

function DashboardItem({ icon, balances, title }: DashboardItemProps) {
    if (!icon) {
        icon = wallet;
    }
    const data = dataService.sumByDay(balances);
    const amountFirstDay = data[0]?.amountInEuro ?? 0;
    const amountLastDay = data[data.length - 1]?.amountInEuro ?? 0;
    const amountTrend = amountFirstDay !== 0 ? (amountLastDay - amountFirstDay) / amountFirstDay : 1;

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
                    <div className="dashboard-item-graph">
                        <MiniGraph balances={data}></MiniGraph>
                    </div>
                </div>
            </div>
        </BigCard>
    );
}

export default DashboardItem;
