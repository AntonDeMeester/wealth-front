import { IonIcon } from "@ionic/react";
import { cardOutline } from "ionicons/icons";
import { useState } from "react";

import { StockPosition } from "src/shared/types/Stocks";

import EditStockPositionModal from "../modals/EditStockPositionModal";
import "./StockPosition.scss";

interface StockPositionProps {
    position: StockPosition;
}

function StockPositionComponent({ position }: StockPositionProps) {
    const [showEditPositionModal, setShowEditPositionModal] = useState(false);
    return (
        <div className="stock-position-container" onClick={() => setShowEditPositionModal(true)}>
            <div className="stock-position-icon-container">
                <IonIcon md={cardOutline}></IonIcon>
            </div>
            <div className="stock-position-info-container">
                <p>{position.ticker}</p>
                <p>{position.startDate}</p>
                <p>{`${position.amount} stocks: €${position.currentValueInEuro.toFixed(2)}`} </p>
            </div>
            <EditStockPositionModal
                showModal={showEditPositionModal}
                onShowModalChange={(newState) => setShowEditPositionModal(newState)}
                position={position}
            ></EditStockPositionModal>
        </div>
    );
}

export default StockPositionComponent;
