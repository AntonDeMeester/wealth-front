import { yupResolver } from "@hookform/resolvers/yup";
import { IonButton, IonModal } from "@ionic/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import ApiService from "src/core/ApiService";
import WealthInputItem from "src/shared/components/InputItem";
import WealthSelectItem, { SelectOption } from "src/shared/components/SelectItem";
import { Account, EditAccount } from "src/shared/types/Banking";

import "./EditAccountModal.scss";

const apiService = new ApiService();

interface EditAccountModalProps {
    showModal: boolean;
    onShowModalChange: (newState: boolean) => void;
    onUpdatedAccount?: (account: Account) => void;
    account: Account;
}

const parseBoolean = (value: string): boolean | undefined => {
    if (value === "true") {
        return true;
    }
    if (value === "false") {
        return false;
    }
    return undefined;
};

function EditAccountModal({ showModal, onShowModalChange, onUpdatedAccount, account }: EditAccountModalProps) {
    const validationSchema = yup.object().shape({
        isActive: yup.boolean(),
        name: yup.string(),
    });

    const { control, handleSubmit, errors } = useForm<EditAccount>({
        resolver: yupResolver(validationSchema),
        reValidateMode: "onSubmit",
        mode: "onSubmit",
    });

    const updateAccount = async (updatedAccount: EditAccount) => {
        updatedAccount = {
            ...updatedAccount,
            isActive: parseBoolean(`${updatedAccount.isActive}`),
        };
        const response = await apiService.patch<Account>(`banking/accounts/${account.accountId}/`, updatedAccount);
        if (onUpdatedAccount) {
            onUpdatedAccount(response.data);
        }
        changeModalState(false);
    };

    const changeModalState = (newState: boolean) => {
        onShowModalChange(newState);
    };

    const booleanOptions: { [value: string]: SelectOption } = {
        true: { name: "True", value: "true" },
        false: { name: "False", value: "false" },
    };
    return (
        <div>
            <IonModal isOpen={showModal} cssClass="my-custom-class" onDidDismiss={() => changeModalState(false)}>
                <div className="tink-link-modal">
                    <form onSubmit={handleSubmit(updateAccount)} className="tink-link-form">
                        <WealthInputItem
                            className="tink-link-form-item"
                            label="Name"
                            name="name"
                            required={false}
                            defaultValue={account?.name}
                            control={control}
                        />
                        <WealthInputItem
                            className="tink-link-form-item"
                            label="Bank name"
                            name="bankAlias"
                            required={false}
                            defaultValue={account?.bankAlias}
                            control={control}
                        />
                        <WealthSelectItem
                            className="tink-link-form-item"
                            label="Enable in graphs"
                            name="isActive"
                            defaultOption={booleanOptions[String(account.isActive)]}
                            options={Object.values(booleanOptions)}
                            control={control}
                            errors={errors}
                        />
                        <IonButton type="submit">Update Account</IonButton>
                        <IonButton onClick={() => changeModalState(false)}>Cancel</IonButton>
                    </form>
                </div>
            </IonModal>
        </div>
    );
}

export default EditAccountModal;
