import React, { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { reportUser } from "../../../api/user";
import { toast } from "react-toastify";

interface IUserReportProps {
  isOpen: boolean;
  onClose: () => void;
  hostsId:string
}

const UserReportModal: React.FC<IUserReportProps> = ({ isOpen, onClose , hostsId}) => {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [otherReason, setOtherReason] = useState<string>("");

  const handleReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedReason(event.target.value);
    if (event.target.value !== "Other") {
      setOtherReason(""); 
    }
  };

  const handleOtherReasonChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOtherReason(event.target.value);
  };

  const handleSubmitReport = async()=>{
    const reason = selectedReason === "Other" ? otherReason : selectedReason
    try {
      if(!reason.trim())return
      const response = await reportUser(hostsId,reason)
      
      if(response.status===200){
        toast.success("Report Submitted!")
        onClose()
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        {/* <div></div> */}
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                  <ExclamationTriangleIcon
                    aria-hidden="true"
                    className="size-6 text-red-600"
                  />
                </div>
                <div className="mt-3 text-center  sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-gray-900 sm:ml-4"
                  >
                    Report Event Hosts!
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 sm:ml-4">
                      Are you sure you want to report this user? What is the
                      reason?
                    </p>
                    <div className="space-y-4 mt-4">
                      {[
                        "Spam",
                        "Inappropriate Behavior",
                        "Harassment",
                        "Violation of Rules",
                        "Other",
                      ].map((reason) => (
                        <div className="flex items-center" key={reason}>
                          <input
                            id={reason}
                            type="radio"
                            value={reason}
                            name="report-reason"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            checked={selectedReason === reason}
                            onChange={handleReasonChange}
                          />
                          <label
                            htmlFor={reason}
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            {reason}
                          </label>
                        </div>
                      ))}
                      {selectedReason === "Other" && (
                        <input
                          type="text"
                          value={otherReason}
                          onChange={handleOtherReasonChange}
                          placeholder="Please specify your reason"
                          className="mt-2 w-full rounded-md border-gray-300 shadow-sm focus:border-gray-800 focus:ring focus:ring-gray-400"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={handleSubmitReport}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Submit
              </button>
              <button
                type="button"
                data-autofocus
                onClick={onClose}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default UserReportModal;
