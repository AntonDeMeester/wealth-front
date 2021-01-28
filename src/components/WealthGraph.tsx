import moment from "moment";
import { useEffect, useState } from "react";
import {
    FlexibleXYPlot,
    LineSeries,
    HorizontalGridLines,
    VerticalGridLines,
    XAxis,
    YAxis,
} from "react-vis";

import "./WealthGraph.scss";

interface WealthProps {
    balances: { date: string; amount: number }[];
}

function WealthGraph({ balances }: WealthProps) {
    const data = consolidateBalances(balances);
    const graphData = data
        .map((d) => ({ x: new Date(d.date), y: d.amount }))
        .sort((a, b) => +b.x - +a.x);
    const amountRange = getAmountRange(data);
    const ticks = getTickValuesXAxis(data.map((x) => moment(x.date)));

    const formatDateAxis = (dateNumber: number) =>
        moment(dateNumber).format("MMM YY");
    const formatAmountAxis = (amount: number) =>
        amount >= 10000
            ? `${Math.floor(amount / 1000)}k`
            : `${Math.floor(amount)}`;

    return (
        <div className="plotContainer">
            <FlexibleXYPlot className="plot" xType="time" yDomain={amountRange}>
                <XAxis tickValues={ticks} tickFormat={formatDateAxis} />
                <VerticalGridLines tickValues={ticks} />
                <YAxis tickFormat={formatAmountAxis} />
                <HorizontalGridLines />
                <LineSeries
                    // @ts-ignore
                    data={graphData}
                ></LineSeries>
            </FlexibleXYPlot>
        </div>
    );
}

const getTickValuesXAxis = (dates: moment.Moment[]): number[] => {
    let startDate = moment.min(dates).add(1, "month").startOf("month");
    const endDate = moment.max(dates).startOf("month");
    let out = [+startDate.toDate()];
    while (startDate.isBefore(endDate)) {
        startDate = startDate.add(1, "month");
        out.push(+startDate.toDate());
    }
    return out;
};

const consolidateBalances = (
    balances: { date: string; amount: number }[]
): { date: Date; amount: number }[] => {
    const initial: { [date: string]: number } = {};
    const dateMap: { [date: string]: number } = balances.reduce(
        (reduced, current) => {
            reduced[current.date] =
                current.amount + (reduced[current.date] ?? 0);
            return reduced;
        },
        initial
    );
    return Object.entries(dateMap).map(([date, amount]) => ({
        date: new Date(date),
        amount,
    }));
};

const getAmountRange = (
    data: { date: Date; amount: number }[]
): [number, number] => {
    const max = Math.max(...data.map((d) => d.amount));
    return [0, max * 1.1];
};

export default WealthGraph;
