import { useGlobalState } from "../../context/GlobalState"

const IncomeExpenses = () => {
    const { totalIncome, totalExpenses } = useGlobalState()
    return (
        <>
            <div className="flex justify-between text-lg my-2">
                <p>Income</p>
                <p>{totalIncome.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-lg my-2">
                <p>Expenses</p>
                <p>{totalExpenses.toFixed(2)}</p>
            </div>
        </>
    )
}

export default IncomeExpenses