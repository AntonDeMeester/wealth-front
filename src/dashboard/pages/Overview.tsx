import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";

import ApiService from "../../core/ApiService";
import WealthGraph from "../components/WealthGraph";

const apiService = new ApiService();

function OverviewPage() {
    const [balances, setBalances] = useState<
        { date: string; amount: number; amountInEuro: number }[]
    >([]);

    useEffect(() => {
        getBalances();
    }, []);

    const getBalances = async () => {
        const response = await apiService.get<
            { date: string; amount: number; amountInEuro: number }[]
        >("banking/balances");
        setBalances(response.data);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Overview</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="ion-padding">
                <WealthGraph balances={balances}></WealthGraph>
                <IonButton onClick={() => getBalances()}>
                    Refresh Balance
                </IonButton>
            </IonContent>
        </IonPage>
    );
}

export default OverviewPage;
