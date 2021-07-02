import { IonButton } from "@ionic/react";
import { useState } from "react";

import EditAccountModal from "src/dashboard/components/EditAccountModal";
import BigCard from "src/shared/components/BigCard";
import { Account as AccountType } from "src/shared/types/Banking";

import "./AccountList.scss";
import AccountTwo from "./AccountTwo";
import TinkLinkAddAccountModal from "./TinkLinkAddAccountModal";

interface AccountListProps {
    accounts: AccountType[];
}

function AccountListTwo({ accounts }: AccountListProps) {
    const [showTinkLinkModal, setShowTinkLinkModal] = useState(false);
    const [showEditAccountModal, setShowEditAccountModal] = useState(false);
    const [editAccount, setEditAccount] = useState<AccountType | undefined>();

    const onAccountClick = (account: AccountType) => {
        setEditAccount(account);
        setShowEditAccountModal(true);
    };
    return (
        <BigCard>
            <div className="account-list">
                <div className="account-list-title">
                    <h2>Bank</h2>
                </div>
                {accounts.map((account) => (
                    <AccountTwo account={account} key={account.externalId} clicked={() => onAccountClick(account)}></AccountTwo>
                ))}
                <div className="account-list-add">
                    <IonButton onClick={() => setShowTinkLinkModal(true)}>Add account</IonButton>
                </div>
            </div>
            <TinkLinkAddAccountModal
                showModal={showTinkLinkModal}
                onShowModalChange={(newState) => setShowTinkLinkModal(newState)}
            ></TinkLinkAddAccountModal>
            {editAccount && (
                <EditAccountModal
                    showModal={showEditAccountModal}
                    onShowModalChange={(newState) => setShowEditAccountModal(newState)}
                    account={editAccount}
                ></EditAccountModal>
            )}
        </BigCard>
    );
}

export default AccountListTwo;
