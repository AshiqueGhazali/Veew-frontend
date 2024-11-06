import React, { useState } from "react";
import { editEventDate } from "../../../api/user";
import IEvents from "../../../interface/EventsInterface";
import { toast } from "react-toastify";

interface dateModalProp {
  isOpen: boolean;
  onClose: () => void;
  eventData: IEvents;
}

const EditEventDateAndTime: React.FC<dateModalProp> = ({
  isOpen,
  onClose,
  eventData,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(eventData.date);
  const [startTime, setStartTime] = useState<string>(eventData.startTime);
  const [endTime, setEndTime] = useState<string>(eventData.endTime);
  const [err, setErr] = useState("");

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleStartTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartTime(event.target.value);
  };

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(event.target.value);
  };

  const validate = () => {
    setErr(""); // Clear previous errors

    if (!selectedDate || !startTime || !endTime) {
      const message = "Please fill in all fields.";
      setErr(message);
      return false;
    }

    const currentDate = new Date();
    const selectedDateObj = new Date(selectedDate);
    const selectedDateOnly = selectedDateObj.toDateString();
    const currentDateOnly = currentDate.toDateString();

    if (selectedDateObj < currentDate && selectedDateOnly !== currentDateOnly) {
      const message = "Please select today or a future date.";
      setErr(message);
      return false;
    }

    const startDateTime = new Date(`${selectedDate}T${startTime}`);
    const endDateTime = new Date(`${selectedDate}T${endTime}`);

    if (selectedDateOnly === currentDateOnly) {
      const currentTime =
        currentDate.getHours() * 60 + currentDate.getMinutes();
      const startMinutes =
        startDateTime.getHours() * 60 + startDateTime.getMinutes();
      const endMinutes = endDateTime.getHours() * 60 + endDateTime.getMinutes();

      if (startMinutes < currentTime || endMinutes < currentTime) {
        const message = "Start and end times cannot be in the past.";
        setErr(message);

        return false;
      }
    }

    const duration =
      (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60);
    if (duration <= 0 || duration > 60) {
      const message =
        "Duration between start and end time should be maximum 1 hour.";
      setErr(message);
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validate()) {
      return;
    }
    try {
      const response = await editEventDate({
        date: selectedDate,
        startTime,
        endTime,
        eventId: eventData.id,
      });

      if (response.status === 200) {
        const date = new Date(selectedDate).toDateString();
        toast.success(`Event Rescheduled to ${date}`);
        onClose();
      }
    } catch (error: any) {
      console.log(error);
      toast.success(`somthing went wrong ${error?.message}`);
    }
  };

  return (
    <>
      <div
        className={`${
          isOpen ? "fixed" : "hidden"
        } inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50`}
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-80">
          <h2 className="text-lg font-semibold mb-4">Edit Date & Time</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select a Date
            </label>
            <input
              type="date"
              onChange={handleDateChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div className="mb-4">
            <div className="max-w-[16rem] mx-auto grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="start-time"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Start time:
                </label>
                <input
                  type="time"
                  id="start-time"
                  onChange={handleStartTimeChange}
                  className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  min="09:00"
                  max="18:00"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="end-time"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  End time:
                </label>
                <input
                  type="time"
                  id="end-time"
                  onChange={handleEndTimeChange}
                  className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  min="09:00"
                  max="18:00"
                  required
                />
              </div>
            </div>
          </div>

          <p className="text-red-600 text-center">{err}</p>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleSave}
              className="bg-[#937e54] hover:bg-[#bea980] text-white font-semibold px-4 py-2 rounded-lg mr-2 transition-colors"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Discard
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditEventDateAndTime;
