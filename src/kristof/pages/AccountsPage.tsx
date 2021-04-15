import { useEffect, useState } from "react";

import ApiService from "src/core/ApiService";
import BasePage from "src/shared/components/BasePage";
import { Account } from "src/shared/types/Banking";

import AccountList from "../components/AccountList";
import "./AccountsPage.scss";

const apiService = new ApiService();

function AccountsPage() {
    const [accounts, setAccounts] = useState<Account[]>([]);

    useEffect(() => {
        getAccounts();
    }, []);

    const getAccounts = async () => {
        const response = await apiService.get<Account[]>("banking/accounts");
        setAccounts(response.data);
    };
    return (
        <BasePage title="Accounts">
            <div className="account-list-list-container">
                <div className="account-list-container">
                    <AccountList accounts={accounts}></AccountList>
                </div>
                <div className="account-list-container">
                    <AccountList accounts={accounts}></AccountList>
                </div>
                <div className="account-list-container">
                    <AccountList accounts={accounts}></AccountList>
                </div>
            </div>
        </BasePage>
    );
}

export default AccountsPage;
