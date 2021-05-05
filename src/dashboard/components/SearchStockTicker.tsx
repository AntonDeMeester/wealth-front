import { IonButton, IonItem, IonModal, IonNote, IonRippleEffect, IonSearchbar, IonText } from "@ionic/react";
import { useState } from "react";

import ApiService from "src/core/ApiService";
import { TickerSearchItem } from "src/shared/types/Stocks";

import "./SearchStockTicker.scss";

const apiService = new ApiService();

interface TinkLinkAddAccountModalProps {
    showModal: boolean;
    onShowModalChange: (newState: boolean) => void;
    onTickerSelected: (ticker: TickerSearchItem) => void;
}

function SearchStockTicker({ showModal, onShowModalChange, onTickerSelected }: TinkLinkAddAccountModalProps) {
    const [matchedPositions, setMatchedPositions] = useState<TickerSearchItem[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const searchTickers = async (event: CustomEvent<{ value?: string }>) => {
        const ticker = event?.detail?.value;
        if (!ticker) {
            return;
        }
        const response = await apiService.get<TickerSearchItem[]>(`stocks/search/${ticker}`);
        if (!response.data?.length) {
            setErrorMessage("No tickers found, please try again");
        } else {
            setErrorMessage("");
        }
        setMatchedPositions(response.data);
    };

    const changeModalState = (newState: boolean) => {
        onShowModalChange(newState);
        setMatchedPositions([]);
        setErrorMessage("");
    };
    return (
        <div>
            <IonModal isOpen={showModal} cssClass="my-custom-class" onDidDismiss={() => changeModalState(false)}>
                <div className="tink-link-modal">
                    <IonSearchbar
                        debounce={500}
                        onIonChange={(e) => searchTickers(e)}
                        placeholder="Search stock ticker"
                    ></IonSearchbar>
                    {matchedPositions.map((match) => (
                        <IonButton fill="outline" expand="block" color="light" onClick={() => onTickerSelected(match)}>
                            <div style={{ width: "100%" }}>
                                <IonItem detail={true}>
                                    <IonNote slot="start">{match.ticker}</IonNote>
                                    <p style={{ textOverflow: "ellipsis" }}>
                                        <IonText>{match.name}</IonText> <IonText color="medium"> ({match.region})</IonText>
                                    </p>
                                </IonItem>
                            </div>
                            <IonRippleEffect></IonRippleEffect>
                        </IonButton>
                    ))}
                    {errorMessage && (
                        <IonItem lines="none">
                            <IonText>{errorMessage}</IonText>
                        </IonItem>
                    )}
                    <IonButton expand="block" onClick={() => changeModalState(false)}>
                        Cancel
                    </IonButton>
                </div>
            </IonModal>
        </div>
    );
}

export default SearchStockTicker;
