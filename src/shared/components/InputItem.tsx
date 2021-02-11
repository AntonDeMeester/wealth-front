import { IonInput, IonItem, IonLabel, IonText } from "@ionic/react";
import { Control, Controller, DeepMap, FieldError } from "react-hook-form";

import { IonInputProps } from "../types/IonProxyTypes";
import "./InputItem.scss";

interface SpecificWealthItemProps {
    name: string;
    label: string;
    control: Control<Record<string, any>>;
    errors?: DeepMap<Record<string, any>, FieldError>;
}

type WealthItemProps = SpecificWealthItemProps & IonInputProps;

function WealthInputItem({
    label,
    control,
    name,
    errors,
    ...otherProps
}: WealthItemProps) {
    return (
        <div className="wealth-item">
            <IonItem>
                <IonLabel position="floating">{label}</IonLabel>
                <Controller
                    render={({ onChange, onBlur, value }) => (
                        <IonInput
                            name={name}
                            onIonChange={onChange}
                            {...otherProps}
                        />
                    )}
                    name={name}
                    control={control}
                    onChangeName="onIonChange"
                    rules={{ required: true }}
                />
            </IonItem>
            <IonText class="error">{errors?.[name]?.message}</IonText>
        </div>
    );
}

export default WealthInputItem;
