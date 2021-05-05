import { IonIcon } from "@ionic/react";
import { cardOutline } from "ionicons/icons";

import { StockPosition } from "src/shared/types/Stocks";

import "./StockPosition.scss";

interface StockPositionProps {
    position: StockPosition;
}

function StockPositionComponent({ position }: StockPositionProps) {
    return (
        <div className="stock-position-container">
            <div className="stock-position-icon-container">
                <IonIcon md={cardOutline}></IonIcon>
            </div>
            <div className="stock-position-info-container">
                <p>{position.ticker}</p>
                <p>{position.startDate}</p>
                <p>{position.amount}</p>
            </div>
        </div>
    );
}

export default StockPositionComponent;
