import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";

import ApiService from "src/core/ApiService";
import BasePage from "src/shared/components/BasePage";
import { WealthItem } from "src/shared/types/Banking";

import Dashboard from "./../components/Dashboard";
import "./DashboardPage.scss";

// import Cashflow from "src/kristof/components/Cashflow";
// import Notifications from "src/kristof/components/Notifications";

const apiService = new ApiService();

function DashboardPage() {
    // We use this to make sure we refresh the balances when we navigate back to the page
    // Without refreshing balances, the graph won't render
    const match = useRouteMatch();
    const [balances, setBalances] = useState<WealthItem[]>([]);

    useEffect(() => {
        getBalances();
    }, [match]);

    const getBalances = async () => {
        const [responseBanking, responseStocks] = await Promise.all([
            apiService.get<WealthItem[]>("banking/balances"),
            apiService.get<WealthItem[]>("stocks/balances"),
        ]);
        setBalances((responseBanking.data || []).concat(responseStocks.data || []));
    };

    return (
        <BasePage title="Accounts">
            <div className="dashboard-component">
                <Dashboard balances={balances}></Dashboard>
            </div>
            {/* <div className="dashboard-other-container">
                <div className="cashflow-component">
                    <Cashflow></Cashflow>
                </div>
                <div className="notifications-component">
                    <Notifications></Notifications>
                </div>
            </div> */}
        </BasePage>
    );
}

export default DashboardPage;
