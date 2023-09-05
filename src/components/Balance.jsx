import { useEffect, useState } from "react";
import { useGlobalState } from "../context/GlobalState"

const Balance = () => {
    const { balance, totalIncome, totalExpenses } = useGlobalState()
    const [color, setColor] = useState()

    useEffect(() => {
        if (totalIncome > totalExpenses) {
            setColor('text-customGreen')
        } else if (totalExpenses > totalIncome) {
            setColor('text-customRed');
        } else {
            setColor('text-white');
        }
    }, [totalIncome, totalExpenses])

    return (
        <div className="flex justify-between items-center py-2 mb-6 md:text-2xl">
            <h3>Your Balance</h3>
            <h2 className={`font-bold ${color}`}>${balance}</h2>
        </div>
    )
};


export default Balance