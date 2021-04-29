import { useEffect, useState } from "react";

import ApiService from "src/core/ApiService";
import StockList from "src/dashboard/components/StockList";
import BasePage from "src/shared/components/BasePage";
import { Account } from "src/shared/types/Banking";
import { StockPosition } from "src/shared/types/Stocks";

import AccountList from "../components/AccountList";
import "./AccountsPage.scss";

const apiService = new ApiService();

function AccountsPage() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [positions, setPositions] = useState<StockPosition[]>([]);

    useEffect(() => {
        getAccounts();
        getStockPositions();
    }, []);

    const getAccounts = async () => {
        const response = await apiService.get<Account[]>("banking/accounts");
        setAccounts(response.data);
    };
    const getStockPositions = async () => {
        const response = await apiService.get<StockPosition[]>("stocks/positions");
        setPositions(response.data);
    };
    return (
        <BasePage title="Accounts">
            <div className="account-list-list-container">
                <div className="account-list-container">
                    <AccountList accounts={accounts}></AccountList>
                </div>
                <div className="account-list-container">
                    <StockList positions={positions}></StockList>
                </div>
                {/* <div className="account-list-container">
                    <AccountList accounts={accounts}></AccountList>
                </div> */}
            </div>
        </BasePage>
    );
}

export default AccountsPage;
