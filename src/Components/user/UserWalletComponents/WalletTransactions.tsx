import React from "react";
import { ITransaction } from "../../../interface/TransactionInterface";

interface transactionProps {
  transactions: ITransaction[] | null;
}
const WalletTransactions: React.FC<transactionProps> = ({ transactions }) => {

    const getDate = (date:string)=>{
        return new Date(date).toDateString()
    }
  return (
    <>
      <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Transaction History
          </h5>
          {/* <a
            href=""
            className="cursor-pointer text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            View all
          </a> */}
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {transactions?.map((transaction, index) => {
              return (
                <li className="py-3 sm:py-4" key={index}>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 text-white-800"></div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {getDate(transaction.createdAt)}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {transaction.transactionType==='CREDIT' ? 'Credited to wallet':'Debited From wallet'}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      ₹ {transaction.amount}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default WalletTransactions;
