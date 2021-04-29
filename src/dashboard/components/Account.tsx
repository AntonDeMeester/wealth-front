import { IonIcon } from "@ionic/react";
import { cardOutline } from "ionicons/icons";

import { Account as AccountType } from "src/shared/types/Banking";

import "./Account.scss";

interface AccountProps {
    account: AccountType;
}

function Account({ account }: AccountProps) {
    return (
        <div className="account-container">
            <div className="account-icon-container">
                <IonIcon md={cardOutline}></IonIcon>
            </div>
            <div className="account-info-container">
                <p>{account.bank}</p>
                <p>{account.accountNumber}</p>
            </div>
        </div>
    );
}

export default Account;
