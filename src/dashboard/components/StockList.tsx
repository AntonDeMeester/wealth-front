import { IonButton } from "@ionic/react";
import { useEffect, useState } from "react";

import BigCard from "src/shared/components/BigCard";
import { StockPosition } from "src/shared/types/Stocks";

import AddStockPositionModal from "./AddStockPositionModal";
import StockPositionComponent from "./StockPosition";

interface StockListProps {
    positions: StockPosition[];
}

function StockList({ positions }: StockListProps) {
    const [showAddPositionModal, setShowAddPositionModal] = useState(false);
    const [localPositions, setLocalPositions] = useState<StockPosition[]>([]);

    useEffect(() => {
        setLocalPositions(positions);
    }, [positions]);

    return (
        <BigCard>
            <div className="account-list">
                <div className="account-list-title">
                    <h2>Stocks</h2>
                </div>
                {localPositions.map((position) => (
                    <StockPositionComponent position={position} key={position.positionId}></StockPositionComponent>
                ))}
                <div className="account-list-add">
                    <IonButton onClick={() => setShowAddPositionModal(true)}>Add position</IonButton>
                </div>
            </div>
            <AddStockPositionModal
                showModal={showAddPositionModal}
                onShowModalChange={(newState) => setShowAddPositionModal(newState)}
                onNewPosition={(position: StockPosition) => setLocalPositions([...localPositions, position])}
            ></AddStockPositionModal>
        </BigCard>
    );
}

export default StockList;
