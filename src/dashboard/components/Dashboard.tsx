import { IonSelect, IonSelectOption } from "@ionic/react";
import { cash, logoBitcoin, trendingUp, home } from "ionicons/icons";

import DataService from "src/core/DataService";
import WealthSelectItem from "src/shared/components/SelectItem";
import { WealthItem } from "src/shared/types/Banking";

import DashboardItem from "../components/DashboardItem";
import "./Dashboard.scss";

interface DashboardProps {
    bankBalances: WealthItem[];
    stockBalances: WealthItem[];
}

const dataService = new DataService();

function Dashboard({ bankBalances, stockBalances }: DashboardProps) {
    const rangeOptions = [
        {
            name: "1 month",
            value: 1,
        },
    ];
    const stockBalancesLastMonth = dataService.sumByDay(dataService.getItemsOfLastXMonths(stockBalances, 1));
    const bankBalancesLastMonth = dataService.sumByDay(dataService.getItemsOfLastXMonths(bankBalances, 1));

    return (
        <div className="dashboard-component-container">
            <div>
                <IonSelect name="range">
                    <IonSelectOption></IonSelectOption>
                </IonSelect>
            </div>
            <div className="overview-dashboard-container">
                <div className="dashboard-item-large">
                    <DashboardItem
                        stockBalances={stockBalancesLastMonth}
                        bankBalances={bankBalancesLastMonth}
                        title="Total Wealth"
                    ></DashboardItem>
                </div>
            </div>
            <div className="dashboard-item-container">
                <div className="dashboard-item-small">
                    <DashboardItem
                        icon={cash}
                        bankBalances={bankBalancesLastMonth}
                        stockBalances={[]}
                        title="Cash"
                    ></DashboardItem>
                </div>
                <div className="dashboard-item-small">
                    <DashboardItem
                        icon={trendingUp}
                        bankBalances={bankBalancesLastMonth}
                        stockBalances={[]}
                        title="Stocks"
                    ></DashboardItem>
                </div>
                <div className="dashboard-item-small">
                    <DashboardItem icon={logoBitcoin} bankBalances={[]} stockBalances={[]} title="Crypto"></DashboardItem>
                </div>
                <div className="dashboard-item-small">
                    <DashboardItem icon={home} bankBalances={[]} stockBalances={[]} title="Property"></DashboardItem>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
