import { yupResolver } from "@hookform/resolvers/yup";
import { IonButton, IonModal, IonTitle } from "@ionic/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import ApiService from "src/core/ApiService";
import SelectItem from "src/shared/components/SelectItem";

import "./TinkLinkAddAccountModal.scss";

const apiService = new ApiService();

interface TinkLinkParameters {
    market: string;
    test: string;
}

interface TinkLinkAddAccountModalProps {
    showModal: boolean;
    onShowModalChange: (newState: boolean) => void;
}

function TinkLinkAddAccountModal({ showModal, onShowModalChange }: TinkLinkAddAccountModalProps) {
    const markets = [
        { name: "Sweden", value: "SE" },
        { name: "Belgium", value: "BE" },
    ];
    const testOptions = [
        { name: "On", value: "true" },
        { name: "Off", value: "false" },
    ];

    const validationSchema = yup.object().shape({
        market: yup.string().default("SE"),
        test: yup.string().default("false"),
    });

    const { control, handleSubmit } = useForm<TinkLinkParameters>({
        resolver: yupResolver(validationSchema),
    });

    const getTinkLink = async ({ market, test }: TinkLinkParameters) => {
        const params = {
            market,
            test: test === "true" ? test : undefined,
        };
        const response = await apiService.get<{ url: string }>("tink/bank/", undefined, params);
        if (response?.data?.url) {
            window.location.href = response?.data?.url;
        }
    };

    const changeModalState = (newState: boolean) => {
        onShowModalChange(newState);
    };
    return (
        <div>
            <IonModal isOpen={showModal} cssClass="my-custom-class" onDidDismiss={() => changeModalState(false)}>
                <div className="tink-link-modal">
                    <IonTitle>Add new bank accounts</IonTitle>
                    <form onSubmit={handleSubmit(getTinkLink)} className="tink-link-form">
                        <SelectItem
                            className="tink-link-form-item"
                            label={"Market"}
                            name={"market"}
                            control={control}
                            options={markets}
                            defaultOption={markets[0]}
                        />
                        <SelectItem
                            className="tink-link-form-item"
                            label={"Test enabled"}
                            name={"test"}
                            control={control}
                            options={testOptions}
                            defaultOption={testOptions[1]}
                        />
                        <IonButton type="submit" onClick={() => changeModalState(false)}>
                            Link account
                        </IonButton>
                        <IonButton onClick={() => changeModalState(false)}>Cancel</IonButton>
                    </form>
                </div>
            </IonModal>
        </div>
    );
}

export default TinkLinkAddAccountModal;
