import { useEffect, useState } from "react";

import ApiService from "src/core/ApiService";
import AccountListTwo from "src/dashboard/components/AccountListTwo";
import StackedGraph from "src/dashboard/components/StackedGraph";
import BasePage from "src/shared/components/BasePage";
import { Account } from "src/shared/types/Banking";
import { WealthItem } from "src/shared/types/Stocks";

import "./BanksPage.scss";

const apiService = new ApiService();

function BanksPage() {
    const [accounts, setAccounts] = useState<Account[]>([]);

    useEffect(() => {
        getAccounts();
    }, []);

    const getAccounts = async () => {
        const response = await apiService.get<Account[]>("banking/accounts");
        let accounts = response.data;
        if (!accounts) {
            return;
        }
        accounts = await Promise.all(
            accounts.map(async (acc) => {
                const balanceResponse = await apiService.get<WealthItem[]>(`banking/accounts/${acc.accountId}/balances`);
                acc.balances = balanceResponse.data || [];
                return acc;
            })
        );

        setAccounts(accounts.sort((a, b) => (a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1)));
    };

    return (
        <BasePage title="Banks">
            <div className="bank-graph-container">
                <StackedGraph
                    dataList={accounts.map((acc) => ({
                        id: acc.accountId,
                        name: createFullAlias(acc),
                        balances: acc.balances || [],
                    }))}
                ></StackedGraph>
            </div>
            <div>
                <AccountListTwo accounts={accounts}></AccountListTwo>
            </div>
        </BasePage>
    );
}

const createFullAlias = (account: Account): string => {
    const accName = account.name || account.accountId;
    if (account.bankAlias) {
        return `${account.bankAlias} - ${accName}`;
    }
    return accName;
};

export default BanksPage;
