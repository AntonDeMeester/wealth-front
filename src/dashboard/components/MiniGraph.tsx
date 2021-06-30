import { ResponsiveLine } from "@nivo/line";
import AutoSizer from "react-virtualized-auto-sizer";

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
        <AutoSizer>
            {({ height, width }) => (
                <div style={{ height, width: width }}>
                    <ResponsiveLine
                        margin={{ right: 48, top: 4, bottom: 4 }}
                        data={graphData}
                        xScale={{ type: "time" }}
                        yScale={{
                            type: "linear",
                            min: Math.min(0, amountRange[0]),
                            max: Math.max(0, amountRange[1]),
                        }}
                        colors={["green"]}
                        curve="monotoneX"
                        axisTop={null}
                        axisRight={{ format: "~s" }}
                        axisBottom={null}
                        enableGridX={false}
                        // enableGridY={false}
                        enablePoints={false}
                        enableArea={true}
                    />
                </div>
            )}
        </AutoSizer>
    );
}

const getAmountRange = (data: WealthItem[]): [number, number] => {
    const max = Math.max(...data.map((d) => d.amountInEuro));
    const min = Math.min(...data.map((d) => d.amountInEuro));
    return [min * 0.8, max];
};

export default MiniGraph;
