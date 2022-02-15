import { IonIcon } from "@ionic/react";
import { cardOutline } from "ionicons/icons";

import { Account as AccountType } from "src/shared/types/Banking";

import "./AccountTwo.scss";

const currencyFormatter = new Intl.NumberFormat("nl-BE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

interface AccountProps {
    account: AccountType;
    clicked?: () => void;
}

function AccountTwo({ account, clicked }: AccountProps) {
    const currentAmount = account.balances?.[account.balances?.length - 1]?.amountInEuro || 0;
    return (
        <div className="account-container" onClick={() => clicked?.()}>
            <div className={`account-icon-container ${account.isActive ? "active" : "inactive"}`}>
                <IonIcon md={cardOutline}></IonIcon>
            </div>
            <div className="account-info-container">
                <p>{account.bankAlias || account.bank}</p>
                <p>{account.name || account.accountNumber}</p>
            </div>
            <div className="account-value-container">
                <p>{currencyFormatter.format(currentAmount)}</p>
            </div>
        </div>
    );
}

export default AccountTwo;
