import { IonButton } from "@ionic/react";
import { useState } from "react";

import BigCard from "src/shared/components/BigCard";
import { Account as AccountType } from "src/shared/types/Banking";

import TinkLinkAddAccountModal from "../modals/TinkLinkAddAccountModal";
import Account from "./Account";
import "./AccountList.scss";

interface AccountListProps {
    accounts: AccountType[];
}

function AccountList({ accounts }: AccountListProps) {
    const [showTinkLinkModal, setShowTinkLinkModal] = useState(false);
    return (
        <BigCard>
            <div className="account-list">
                <div className="account-list-title">
                    <h2>Bank</h2>
                </div>
                {accounts.map((account) => (
                    <Account account={account} key={account.externalId}></Account>
                ))}
                <div className="account-list-add">
                    <IonButton onClick={() => setShowTinkLinkModal(true)}>Add account</IonButton>
                </div>
            </div>
            <TinkLinkAddAccountModal
                showModal={showTinkLinkModal}
                onShowModalChange={(newState) => setShowTinkLinkModal(newState)}
            ></TinkLinkAddAccountModal>
        </BigCard>
    );
}

export default AccountList;
