import { yupResolver } from "@hookform/resolvers/yup";
import { IonButton, IonModal, IonTitle } from "@ionic/react";
import moment from "moment";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import ApiService from "src/core/ApiService";
import WealthDateTime from "src/shared/components/DatePicker";
import WealthInputItem from "src/shared/components/InputItem";
import { NewStockPosition, StockPosition } from "src/shared/types/Stocks";

import "./AddStockPositionModal.scss";

const apiService = new ApiService();

interface TinkLinkAddAccountModalProps {
    showModal: boolean;
    onShowModalChange: (newState: boolean) => void;
    onNewPosition?: (position: StockPosition) => void;
}

function TinkLinkAddAccountModal({ showModal, onShowModalChange, onNewPosition }: TinkLinkAddAccountModalProps) {
    const validationSchema = yup.object().shape({
        startDate: yup.date().required().max(new Date()),
        amount: yup.number().min(0),
        ticker: yup.string().max(12),
    });

    const { control, handleSubmit, errors } = useForm<NewStockPosition>({
        resolver: yupResolver(validationSchema),
        reValidateMode: "onSubmit",
        mode: "onSubmit",
    });

    const createNewPosition = async (position: NewStockPosition) => {
        const formattedPosition = {
            ...position,
            startDate: moment(position.startDate).format("YYYY-MM-DD"),
        };
        const response = await apiService.post<StockPosition>("stocks/positions", formattedPosition);
        if (response?.data && onNewPosition) {
            onNewPosition(response.data);
        }
        changeModalState(false);
    };

    const changeModalState = (newState: boolean) => {
        onShowModalChange(newState);
    };
    return (
        <div>
            <IonModal isOpen={showModal} cssClass="my-custom-class" onDidDismiss={() => changeModalState(false)}>
                <div className="tink-link-modal">
                    <IonTitle>Add new stock position</IonTitle>
                    <form onSubmit={handleSubmit(createNewPosition)} className="tink-link-form">
                        <WealthInputItem
                            className="tink-link-form-item"
                            label="Ticker"
                            name="ticker"
                            required={true}
                            control={control}
                            errors={errors}
                        />
                        <WealthDateTime
                            className="tink-link-form-item"
                            label="Start date"
                            name="startDate"
                            control={control}
                            displayFormat="YYYY/MM/DD"
                            errors={errors}
                        />
                        <WealthInputItem
                            className="tink-link-form-item"
                            label="Amount (in native currency)"
                            name="amount"
                            type="number"
                            inputmode="numeric"
                            required={true}
                            control={control}
                            errors={errors}
                        />

                        <IonButton type="submit">Add position</IonButton>
                        <IonButton onClick={() => changeModalState(false)}>Cancel</IonButton>
                    </form>
                </div>
            </IonModal>
        </div>
    );
}

export default TinkLinkAddAccountModal;
