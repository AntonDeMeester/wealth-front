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

import TinkLinkAccountAddForm from "src/dashboard/components/TinkLinkAccountAddForm";

import ApiService from "../../core/ApiService";
import "./Page.css";

const apiService = new ApiService();

function AccountsPage() {
    const getTinkLink = async () => {
        const response = await apiService.get<{ url: string }>("tink/link");
        if (response?.data?.url) {
            window.location.href = response?.data?.url;
        }
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
            </IonContent>
        </IonPage>
    );
}

export default AccountsPage;
export {};
