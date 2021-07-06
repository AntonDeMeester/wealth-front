import { IonButton } from "@ionic/react";
import { useEffect, useState } from "react";

import BigCard from "src/shared/components/BigCard";
import { StockPosition, TickerSearchItem } from "src/shared/types/Stocks";

import AddStockPositionModal from "../modals/AddStockPositionModal";
import SearchStockTicker from "../modals/SearchStockTicker";
import StockPositionComponent from "./StockPosition";

interface StockListProps {
    positions: StockPosition[];
}

function StockList({ positions }: StockListProps) {
    const [showAddPositionModal, setShowAddPositionModal] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [selectedTicker, setSelectedTicker] = useState<TickerSearchItem | undefined>();
    const [localPositions, setLocalPositions] = useState<StockPosition[]>([]);

    useEffect(() => {
        setLocalPositions(positions);
    }, [positions]);

    const tickerSelected = (ticker: TickerSearchItem) => {
        setSelectedTicker(ticker);
        setShowSearchModal(false);
        setShowAddPositionModal(true);
    };

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
                    <IonButton onClick={() => setShowSearchModal(true)}>Add position</IonButton>
                </div>
            </div>
            <AddStockPositionModal
                showModal={showAddPositionModal}
                onShowModalChange={(newState) => setShowAddPositionModal(newState)}
                onNewPosition={(position: StockPosition) => setLocalPositions([...localPositions, position])}
                ticker={selectedTicker}
            ></AddStockPositionModal>
            <SearchStockTicker
                showModal={showSearchModal}
                onShowModalChange={(newState) => setShowSearchModal(newState)}
                onTickerSelected={(ticker) => tickerSelected(ticker)}
            ></SearchStockTicker>
        </BigCard>
    );
}

export default StockList;
