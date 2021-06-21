import { IonIcon } from "@ionic/react";
import { cardOutline } from "ionicons/icons";
import { useState } from "react";

import { Account as AccountType } from "src/shared/types/Banking";

import "./Account.scss";
import EditAccountModal from "./EditAccountModal";

interface AccountProps {
    account: AccountType;
}

function Account({ account }: AccountProps) {
    const [showEditAccountModal, setShowEditAccountModal] = useState(false);
    return (
        <div className="account-container" onClick={() => setShowEditAccountModal(true)}>
            <div className={`account-icon-container ${account.isActive ? "active" : "inactive"}`}>
                <IonIcon md={cardOutline}></IonIcon>
            </div>
            <div className="account-info-container">
                <p>{account.bank}</p>
                <p>{account.name || account.accountNumber}</p>
            </div>
            <EditAccountModal
                showModal={showEditAccountModal}
                onShowModalChange={(newState) => setShowEditAccountModal(newState)}
                account={account}
            ></EditAccountModal>
        </div>
    );
}

export default Account;
