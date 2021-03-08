import { yupResolver } from "@hookform/resolvers/yup";
import {
    IonButton,
    IonFab,
    IonFabButton,
    IonIcon,
    IonModal,
    IonTitle,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import ApiService from "src/core/ApiService";
import SelectItem from "src/shared/components/SelectItem";

import "./TinkLinkAccountAddForm.scss";

const apiService = new ApiService();

interface TinkLinkParameters {
    market: string;
    test: string;
}

function TinkLinkAccountAddForm() {
    const [showModal, setShowModal] = useState(false);

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
        const response = await apiService.get<{ url: string }>(
            "tink/link",
            undefined,
            params
        );
        if (response?.data?.url) {
            window.location.href = response?.data?.url;
        }
    };
    return (
        <div>
            <IonModal
                isOpen={showModal}
                cssClass="my-custom-class"
                onDidDismiss={() => setShowModal(false)}
            >
                <div className="tink-link-modal">
                    <IonTitle>Add new bank accounts</IonTitle>
                    <form
                        onSubmit={handleSubmit(getTinkLink)}
                        className="tink-link-form"
                    >
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
                        <IonButton
                            type="submit"
                            onClick={() => setShowModal(false)}
                        >
                            Link account
                        </IonButton>
                        <IonButton onClick={() => setShowModal(false)}>
                            Cancel
                        </IonButton>
                    </form>
                </div>
            </IonModal>
            <IonFab vertical="bottom" horizontal="end">
                <IonFabButton>
                    <IonIcon
                        icon={add}
                        onClick={() => setShowModal(true)}
                    ></IonIcon>
                </IonFabButton>
            </IonFab>
        </div>
    );
}

export default TinkLinkAccountAddForm;
