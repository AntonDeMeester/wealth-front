import { IonDatetime, IonItem, IonLabel, IonText } from "@ionic/react";
import { Control, Controller, DeepMap, FieldError } from "react-hook-form";

import { IonDateTimeProps } from "../types/IonProxyTypes";
import "./DatePicker.scss";

interface SpecificWealthDateTimeProps {
    name: string;
    label: string;
    displayFormat: string;
    control: Control<Record<string, any>>;
    errors?: DeepMap<Record<string, any>, FieldError>;
}

type DateTimeProps = SpecificWealthDateTimeProps & IonDateTimeProps;

function WealthDateTime({ label, control, name, errors, ...otherProps }: DateTimeProps) {
    return (
        <div className="wealth-date-picker">
            <IonItem>
                <IonLabel position="floating">{label}</IonLabel>
                <Controller
                    render={({ onChange, onBlur, value }) => <IonDatetime name={name} onIonChange={onChange} {...otherProps} />}
                    name={name}
                    control={control}
                    onChangeName="onIonChange"
                    rules={{ required: true }}
                />
            </IonItem>
            <IonText class="date-picker-error">{errors?.[name]?.message}</IonText>
        </div>
    );
}

export default WealthDateTime;
