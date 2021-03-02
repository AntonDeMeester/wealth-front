import {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";

import ApiService from "src/core/ApiService";
import AccountCard from "src/dashboard/components/AccountCard";
import TinkLinkAccountAddForm from "src/dashboard/components/TinkLinkAccountAddForm";
import { Account } from "src/shared/types/Banking";

import "./Page.css";

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
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Accounts</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="ion-padding">
                <TinkLinkAccountAddForm></TinkLinkAccountAddForm>
                {accounts.map((account) => (
                    <AccountCard account={account} key={account.externalId} />
                ))}
            </IonContent>
        </IonPage>
    );
}

export default AccountsPage;
export {};
