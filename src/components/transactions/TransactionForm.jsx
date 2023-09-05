import { useState, useEffect } from "react";
import { useGlobalState } from "../../context/GlobalState";

const TransactionForm = () => {
    const { addTransaction } = useGlobalState()
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [transactionType, setTransactionType] = useState('income')
    const [errors, setErrors] = useState({});
    const [errorTimeout, setErrorTimeout] = useState(null);

    const validateForm = () => {
        const newErrors = {};
        if (!description) newErrors.description = "Please enter a description";
        if (!amount || amount <= 0) newErrors.amount = "Please enter a valid amount";
        if (!transactionType) newErrors.transactionType = "Please select a transaction type";
        return newErrors;
    };

    const clearErrors = () => {
        setErrors({});
    };

    const onSubmit = (e) => {
        e.preventDefault()
        const newErrors = validateForm();
        if (description && amount > 0 && transactionType !== '') {
            addTransaction({
                id: window.crypto.randomUUID(),
                description,
                amount: parseFloat(amount),
                type: transactionType,
                createdAt: new Date(Date.now()).toLocaleDateString()
            })

            setDescription('')
            setAmount('')
            setTransactionType('')

        } else {
            setErrors(newErrors)
            const timeoutId = setTimeout(clearErrors, 5000);
            setErrorTimeout(timeoutId);
        }
    }

    useEffect(() => {
        return () => {
            if (errorTimeout) {
                clearTimeout(errorTimeout);
            }
        };
    }, [errorTimeout]);

    return (
        <div>
            <form onSubmit={onSubmit} className="flex flex-col gap-6 ">
                <div className='relative'>
                    <label htmlFor='description' className='absolute uppercase font-bold left-3 -top-3 bg-neutral-500 px-1 text-xs rounded-md'>
                        Description
                    </label>
                    <input
                        type='text' name='description' id="description" placeholder='Enter a description'
                        className='placeholder:text-xs bg-zinc-600 text-white px-3 py-2 rounded-lg block w-full pl-7'
                        value={description} onChange={(e) => setDescription(e.target.value)} required />
                    {errors.description && <p className="text-customRed">{errors.description}</p>}
                </div>

                <div className='relative'>
                    <label htmlFor='amount' className='absolute uppercase font-bold left-3 -top-3 bg-neutral-500 px-1 text-xs rounded-md'>
                        Amount
                    </label>
                    <input
                        type='number' name='amount' id="amount" placeholder='Enter an amount' step='0.01'
                        className='placeholder:text-xs bg-zinc-600 text-white px-3 py-2 rounded-lg block w-full pl-7'
                        value={amount} onChange={(e) => setAmount(e.target.value)} required
                    />
                    {errors.amount && <p className="text-customRed">{errors.amount}</p>}
                </div>
                <p className="uppercase font-bold rounded-lg">Select the type of transaction</p>
                <div className='flex items-center'>
                    <input
                        type='radio' id='income' name='transactionType' value='income'
                        checked={transactionType === 'income'} onChange={() => setTransactionType('income')} className='mr-1 cursor-pointer' />
                    <label htmlFor='income' className='text-white mr-3'>Income</label>
                    <input
                        type='radio' id='expense' name='transactionType' value='expense'
                        checked={transactionType === 'expense'} onChange={() => setTransactionType('expense')} className='mr-1 cursor-pointer' />
                    <label htmlFor='expense' className='text-white'>Expense</label>
                    {errors.transactionType && <p className="text-customRed ml-6">{errors.transactionType}</p>}
                </div>
                <button className={'bg-indigo-700 text-white px-3 py-2 rounded-lg block mb-2 w-full'}>Add Transaction</button>
            </form>
        </div >
    )
};


export default TransactionForm