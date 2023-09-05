import { useGlobalState } from "../../context/GlobalState"

const TransactionItem = ({ transaction }) => {
    const { deleteTransaction } = useGlobalState()
    const positiveAmount = Math.abs(transaction.amount);

    return (
        <li className="bg-zinc-600 text-xs text-white p-3 rounded-lg mb-2 flex justify-between items-center w-full lg:w-1/2">
            <p>{transaction.description}</p>
            <div className="flex justify-center items-center">
                <p className="mr-8">{transaction.createdAt}</p>
                <span className={`text-${(transaction.type === 'income') ? 'customGreen' : 'customRed'} font-bold`}>
                    ${positiveAmount}
                </span>
                <button
                    onClick={() => { deleteTransaction(transaction.id) }}
                    className="font-bold ml-8 px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                    X
                </button>
            </div>
        </li>
    )
}

export default TransactionItem