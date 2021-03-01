import {
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonText,
} from "@ionic/react";
import { Control, Controller, DeepMap, FieldError } from "react-hook-form";

import { IonInputSelectProps } from "../types/IonProxyTypes";
import "./SelectItem.scss";

interface SelectOption {
    name: string;
    value: string;
}

interface SpecificWealthItemProps {
    name: string;
    label: string;
    options: SelectOption[];
    control: Control<Record<string, any>>;
    errors?: DeepMap<Record<string, any>, FieldError>;
    defaultOption?: SelectOption;
}

type WealthItemProps = SpecificWealthItemProps & IonInputSelectProps;

function WealthSelectItem({
    label,
    control,
    name,
    errors,
    options,
    defaultOption,
    ...otherProps
}: WealthItemProps) {
    return (
        <div className="wealth-select-item">
            <IonItem>
                {/* <IonLabel position="floating">{label}</IonLabel> */}
                <Controller
                    render={({ onChange, onBlur, value }) => (
                        <IonSelect
                            name={name}
                            onIonChange={(event) => onChange(event)}
                            value={defaultOption?.value}
                            {...otherProps}
                        >
                            {options.map((optionItem) => (
                                <IonSelectOption
                                    value={optionItem.value}
                                    key={optionItem.value}
                                >
                                    {optionItem.name}
                                </IonSelectOption>
                            ))}
                        </IonSelect>
                    )}
                    name={name}
                    control={control}
                    onChangeName="onIonChange"
                    rules={{ required: true }}
                />
            </IonItem>
            <IonText class="select-item-error">
                {errors?.[name]?.message}
            </IonText>
        </div>
    );
}

export default WealthSelectItem;
