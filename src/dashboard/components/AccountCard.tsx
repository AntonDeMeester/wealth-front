import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
} from "@ionic/react";

import { Account } from "src/shared/types/Banking";

function AccountCard({ account }: { account: Account }) {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardSubtitle>{account.type}</IonCardSubtitle>
                <IonCardTitle>{account.accountNumber}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                Bank: {account.bank} <br />
                Currency: {account.currency}
            </IonCardContent>
        </IonCard>
    );
}

export default AccountCard;
