import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";

import ApiService from "src/core/ApiService";
import Dashboard from "src/kristof/components/Dashboard";
import BasePage from "src/shared/components/BasePage";
import { WealthItem } from "src/shared/types/Banking";

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
        const response = await apiService.get<WealthItem[]>("banking/balances");
        setBalances(response.data);
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
