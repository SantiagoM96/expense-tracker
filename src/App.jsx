import { GlobalProvider } from './context/GlobalState';
import Balance from './components/Balance';
import TransactionForm from './components/transactions/TransactionForm';
import TransactionList from './components/transactions/TransactionList'
import IncomeExpenses from './components/IncomeExpenses/IncomeExpense';
import Chart from './components/IncomeExpenses/Chart'

function App() {
  return (
    <GlobalProvider>
      <div className='h-full flex justify-center items-center text-white'>
        <div className='bg-neutral-800 p-8 w-full h-full'>
          <h1 className='text-2xl text-white font-bold my-4'>
            EXPENSE TRACKER
          </h1>
          <div className='flex flex-col lg:flex-row justify-between items-center'>
            <div className='flex flex-col justify-center align-items w-full lg:w-1/2'>
              <IncomeExpenses />
              <Balance />
              <TransactionForm />
            </div>
            <div className='flex-1 flex justify-center items-center'>
              <Chart className="w-1/2" />
            </div>
          </div>
          <TransactionList />
        </div>
      </div>
    </GlobalProvider>
  );
}

export default App;
