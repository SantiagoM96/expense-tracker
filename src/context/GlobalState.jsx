import { createContext, useContext, useReducer, useEffect } from "react";
import appReducer from "./AppReducer";

const initialState = {
    transactions: []
}

export const Context = createContext()
export const useGlobalState = () => {
    const context = useContext(Context)
    return context
}

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState,
        () => {
            const localData = localStorage.getItem('MY_TRANSACTIONS')
            return localData ? JSON.parse(localData) : initialState
        })

    const totalIncome = state.transactions.reduce(
        (acc, transaction) => transaction.type === 'income' ? (acc += transaction.amount) : acc, 0
    );

    const totalExpenses = state.transactions.reduce(
        (acc, transaction) => transaction.type === 'expense' ? (acc += transaction.amount) : acc, 0
    );

    const balance = Math.abs(totalExpenses - totalIncome)

    useEffect(() => {
        localStorage.setItem('MY_TRANSACTIONS', JSON.stringify(state))
    }, [state])

    const addTransaction = (transaction) => {
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction
        })
    }

    const deleteTransaction = (id) => {
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        })
    }

    return (
        <Context.Provider value={{
            transactions: state.transactions,
            totalExpenses,
            totalIncome,
            balance,
            addTransaction,
            deleteTransaction
        }}>
            {children}
        </Context.Provider >
    )
}
