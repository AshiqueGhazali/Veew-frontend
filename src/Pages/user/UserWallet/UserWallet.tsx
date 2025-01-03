import React, { useEffect, useState } from "react";
import WalletCards from "../../../Components/user/UserWalletComponents/WalletCards";
import AddFundModal from "../../../Components/user/UserWalletComponents/AddFundModal";
import { ITransaction } from "../../../interface/TransactionInterface";
import { getUserWallet, getWalletTransactions } from "../../../api/user";
import WalletTransactions from "../../../Components/user/UserWalletComponents/WalletTransactions";

export const UserWallet: React.FC = () => {
  const [addFundModal, setAddFundModal] = useState<boolean>(false);
  const [walletBalance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<ITransaction[] | null>(null);

  useEffect(() => {
    const getWalletDetails = async () => {
      try {
        const response = await getUserWallet();

        if (response.status === 200) {
          setBalance(response.data.balanceAmount);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getTransactionHistiory = async () => {
      try {
        const response = await getWalletTransactions();

        if (response.status === 200) {
          setTransactions(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getTransactionHistiory();
    getWalletDetails();
  }, []);
  return (
    <>
      <div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="wellet-head ">
            {/* animate-slide-down delay-9000 z-[-10] */}
            <h1 className="text-gray-900 leading-tight text-[#195058] text-2xl text-center sm:text-start md:text-4xl font-extrabold mb-2">
              Unlock Seamless Payments with Veew Wallet!
            </h1>
            <p className="text-xs text-center md:text-base md:text-start">
              Easily pay for event tickets and enjoy hassle-free withdrawals
              with your personal wallet on Veew. Empowering hosts and attendees
              with secure, instant transactions!
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0">
              <button
                onClick={() => setAddFundModal(true)}
                className="inline-flex justify-center items-center mt-3 py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-[#937e54] hover:bg-[#393a3b]"
              >
                Add To Wallet
                <svg
                  className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div>
            <WalletCards balanceAmount={walletBalance} />
          </div>
        </div>
        <WalletTransactions transactions={transactions}/>

        <AddFundModal
          isOpen={addFundModal}
          onClose={() => setAddFundModal(false)}
        />
      </div>
    </>
  );
};
