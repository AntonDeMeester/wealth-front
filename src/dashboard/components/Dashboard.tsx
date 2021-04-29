import { cash, logoBitcoin, trendingUp, home } from "ionicons/icons";

import DataService from "src/core/DataService";
import { WealthItem } from "src/shared/types/Banking";

import "./Dashboard.scss";
import DashboardItem from "./DashboardItem";

interface DashboardProps {
    balances: WealthItem[];
}

const dataService = new DataService();

function Dashboard({ balances }: DashboardProps) {
    const balancesLastMonth = dataService.sumByDay(dataService.getItemsOfLastXMonths(balances, 4));

    return (
        <div className="dashboard-component-container">
            <div className="overview-dashboard-container">
                <div className="dashboard-item-large">
                    <DashboardItem balances={balancesLastMonth} title="Total Wealth"></DashboardItem>
                </div>
            </div>
            <div className="dashboard-item-container">
                <div className="dashboard-item-small">
                    <DashboardItem icon={cash} balances={[]} title="Cash"></DashboardItem>
                </div>
                <div className="dashboard-item-small">
                    <DashboardItem icon={trendingUp} balances={[]} title="Stocks"></DashboardItem>
                </div>
                <div className="dashboard-item-small">
                    <DashboardItem icon={logoBitcoin} balances={[]} title="Crypto"></DashboardItem>
                </div>
                <div className="dashboard-item-small">
                    <DashboardItem icon={home} balances={[]} title="Property"></DashboardItem>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
