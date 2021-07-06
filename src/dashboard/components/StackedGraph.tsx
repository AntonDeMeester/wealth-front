import { ResponsiveLine } from "@nivo/line";
import moment from "moment";
import AutoSizer from "react-virtualized-auto-sizer";

import DataService from "src/core/DataService";
import { WealthItem } from "src/shared/types/Banking";

type DataItem = { id: string; name: string; balances: WealthItem[] };
const currencyFormatter = new Intl.NumberFormat("nl-BE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

const dataService = new DataService();
interface WealthProps {
    dataList: DataItem[];
    legend?: boolean;
}

function StackedGraph({ dataList, legend }: WealthProps) {
    const numberOfPoints = 50;
    const sequence = Array.from(Array(numberOfPoints).keys());
    const graphData = addEmptyDates(dataList)
        .map((item) => ({
            id: item.id,
            label: item.name,
            data: dataService
                .sumByDay(item.balances)
                .sort((a, b) => moment(a.date).diff(moment(b.date)))
                .map((d) => ({ x: new Date(d.date), y: d.amountInEuro })),
        }))
        .map((item) => ({
            id: item.id,
            data:
                item.data.length < 100
                    ? item.data
                    : sequence.map((i) => item.data[Math.floor(((i + 1) * item.data.length) / numberOfPoints - 1)]),
        }));
    const nameObject: Record<string, string> = dataList.reduce((obj, value) => ({ ...obj, [value.id]: value.name }), {});
    return (
        <AutoSizer>
            {({ height, width }) => (
                <div style={{ height, width: width }}>
                    <ResponsiveLine
                        margin={{ right: 48, top: 4, bottom: 50 }}
                        data={graphData}
                        xScale={{ type: "time" }}
                        yScale={{
                            type: "linear",
                            stacked: true,
                            reverse: false,
                        }}
                        colors={{ scheme: "nivo" }}
                        curve="monotoneX"
                        axisRight={{ format: "~s" }}
                        axisBottom={{
                            format: "%b %d",
                            tickValues: "every month",
                        }}
                        enableGridX={false}
                        enablePoints={false}
                        enableArea={true}
                        areaOpacity={0.1}
                        isInteractive={true}
                        areaBlendMode="multiply"
                        enableSlices={"x"}
                        crosshairType="bottom-left"
                        yFormat={(value) => currencyFormatter.format(Number(value))}
                        legends={
                            !legend
                                ? undefined
                                : [
                                      {
                                          anchor: "bottom",
                                          direction: "row",
                                          justify: false,
                                          translateX: 0,
                                          translateY: 75,
                                          itemsSpacing: 0,
                                          itemWidth: 100,
                                          itemHeight: 20,
                                          itemOpacity: 0.75,
                                          symbolSize: 12,
                                          symbolShape: "circle",
                                          symbolBorderColor: "rgba(0, 0, 0, .5)",
                                          effects: [
                                              {
                                                  on: "hover",
                                                  style: {
                                                      itemBackground: "rgba(0, 0, 0, .03)",
                                                      itemOpacity: 1,
                                                  },
                                              },
                                          ],
                                      },
                                  ]
                        }
                        sliceTooltip={({ slice }) => {
                            const date = moment(slice.points[0].data.xFormatted);
                            return (
                                <div
                                    style={{
                                        background: "white",
                                        padding: "9px 12px",
                                        border: "1px solid #ccc",
                                    }}
                                >
                                    <div>{date.format("YYYY-MM-DD")}</div>
                                    {slice.points.map((point) => (
                                        <div
                                            key={point.id}
                                            style={{
                                                color: point.serieColor,
                                                padding: "3px 0",
                                            }}
                                        >
                                            {nameObject[point.serieId]} - {point.data.yFormatted}
                                        </div>
                                    ))}
                                </div>
                            );
                        }}
                    />
                </div>
            )}
        </AutoSizer>
    );
}

const addEmptyDates = (dataItems: DataItem[]): DataItem[] => {
    const allDates = new Set<string>();
    dataItems.forEach((item) => {
        item.balances.forEach((balance) => allDates.add(balance.date));
    });
    const extraDates = dataItems.map((item) => {
        const presentDates = item.balances.map((b) => b.date);
        const newBalances: WealthItem[] = [];
        allDates.forEach((toCheckDate) => {
            if (!presentDates.includes(toCheckDate)) {
                newBalances.push({
                    date: toCheckDate,
                    amount: 0,
                    amountInEuro: 0,
                });
            }
        });
        return {
            ...item,
            balances: item.balances.concat(newBalances),
        };
    });
    return extraDates;
};
export default StackedGraph;