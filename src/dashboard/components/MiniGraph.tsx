import { ResponsiveLine } from "@nivo/line";

import { WealthItem } from "src/shared/types/Banking";

interface WealthProps {
    balances: WealthItem[];
}


function MiniGraph({ balances }: WealthProps) {
    const graphData = [
        {
            id: "main",
            data: balances.map((d) => ({ x: new Date(d.date), y: d.amountInEuro })),
        },
    ];
    const amountRange = getAmountRange(balances);

    return (
        <div
            style={{
                position: "relative",
                height: "100%",
                minHeight: "0",
            }}
        >
            <div style={{ position: "absolute", width: "100%", height: "100%" }}>
                <ResponsiveLine
                    data={graphData}
                    xScale={{ type: "point" }}
                    yScale={{
                        type: "linear",
                        min: amountRange[0],
                        max: amountRange[1],
                        stacked: true,
                        reverse: false,
                    }}
                    colors={["green"]}
                    curve="monotoneX"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={null}
                    axisLeft={null}
                    enableGridX={false}
                    enableGridY={false}
                    enablePoints={false}
                    pointColor={{ theme: "background" }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: "serieColor" }}
                    pointLabelYOffset={-12}
                    enableArea={true}
                    areaBlendMode="multiply"
                    isInteractive={false}
                    legends={[]}
                />
            </div>
        </div>
    );
}

const getAmountRange = (data: WealthItem[]): [number, number] => {
    const max = Math.max(...data.map((d) => d.amountInEuro));
    const min = Math.min(...data.map((d) => d.amountInEuro));
    return [min * 0.8, max];
};

export default MiniGraph;
