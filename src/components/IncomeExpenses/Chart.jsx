import { VictoryPie, VictoryLabel } from 'victory';
import { useGlobalState } from '../../context/GlobalState';

const Chart = () => {
    const { totalIncome, totalExpenses } = useGlobalState()

    const data = [
        { x: 'Expenses', y: totalExpenses },
        { x: 'Income', y: totalIncome }
    ];

    if (totalExpenses === 0 && totalIncome === 0) {
        return (
            <p className='text-xs md:text-base uppercase w-[50%] text-center my-5'>Enter your income and expenses to see the pie chart</p>
        )
    }

    return (
        <div className='my-5'>
            <VictoryPie
                data={data}
                width={900}
                colorScale={['#FF6961', '#77DD77']}
                animate={{
                    duration: 2000
                }}
                labels={({ datum }) => `${((datum.y / (totalExpenses + totalIncome)) * 100).toFixed(2)}%`}
                labelRadius={177}
                labelComponent={
                    <VictoryLabel style={{ fill: "#fff", fontSize: 25, fontWeight: "bold" }} />

                }
            />
        </div>
    )
}

export default Chart;