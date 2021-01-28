import { IonInput, IonItem, IonLabel } from "@ionic/react";

import { IonInputProps } from "../types/IonProxyTypes";
import "./InputItem.scss";

interface SpecificWealthItemProps {
    label: string;
    value: string;
}

type WealthItemProps = SpecificWealthItemProps & IonInputProps;

function WealthInputItem({ value, label, ...otherProps }: WealthItemProps) {
    return (
        <div className="wealth-item">
            <IonItem>
                <IonLabel position="floating">{value ? label : ""}</IonLabel>
                <IonInput value={value} placeholder={label} {...otherProps} />
            </IonItem>
        </div>
    );
}

export default WealthInputItem;
