import React, { useState } from "react";

interface modalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddFundModal: React.FC<modalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  const [amount , setAmount] = useState<number>(0)

  return (
    <>
      <div
        id="select-modal"
        aria-hidden="true"
        className="fixed top-0 border-b border-b-[1px] border-b-black right-0 left-0 z-50 flex justify-center items-center w-full h-full md:inset-0 bg-gray-900 bg-opacity-50"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow ">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900">
                Add fund to wallet
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="select-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5">
              <div className="mb-6">
                <label
                  htmlFor="default-input"
                  className="block mb-2 text-sm font-medium"
                >
                  AMOUNT :
                </label>
                <input
                  type="number"
                  min={0}
                  value={amount}
                  id="default-input"
                  onChange={(e)=>setAmount(Number(e.target.value))}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:border-gray-600"
                />
              </div>
              <button className="text-white inline-flex w-full justify-center bg-[#937e54] hover:bg-[#393a3b] font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Next step
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFundModal;
