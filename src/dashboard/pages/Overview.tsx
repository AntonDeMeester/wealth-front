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
import { useRouteMatch } from "react-router";

import { WealthItem } from "src/shared/types/Banking";

import ApiService from "../../core/ApiService";
import WealthGraph from "../components/WealthGraph";

const apiService = new ApiService();

function OverviewPage() {
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
