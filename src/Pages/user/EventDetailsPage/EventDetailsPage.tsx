import React, { useEffect } from "react";
import { useState } from "react";
import {
  addLike,
  bookTicketWithWallet,
  getEventDetails,
  getLikedEventsId,
  payForTicket,
  removeLike,
  verifyEventJoining,
} from "../../../api/user";
import { useLocation, useNavigate } from "react-router-dom";
import IEvents from "../../../interface/EventsInterface";
import queryString from "query-string";
import { loadStripe } from "@stripe/stripe-js";
import Logo from "../../../assets/veewWhiteLogo.png";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store/store";
import { formatDistanceToNow } from "date-fns";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { FaRegComment, FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import ListComments from "../../../Components/user/Comments/ListComments";

const EventDetailsPage: React.FC = () => {
  const userId = useSelector((state: RootState) => state.user.userData.id);
  const [eventDetails, setEventDetails] = useState<IEvents | null>(null);
  const [isbooking, setIsBooking] = useState<boolean>(false);
  const [isEventTime, setEventTime] = useState<boolean>(false);
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [liked, setLike] = useState<boolean>(false);
  const [totalComments , setTotalComments] = useState<number>(0)
 
  useEffect(()=>{
    const getAllLikes = async()=>{
      try {
        const response = await getLikedEventsId()

        if(response.status===200 && eventDetails){          
          if(response.data?.includes(eventDetails?.id)){
            setLike(true)
          }        
        }
      } catch (error) {
        console.log(error);
        
      }
    }

    getAllLikes()
  },[eventDetails])

  const navigate = useNavigate();
  const location = useLocation();
  const eventId = queryString.parse(location.search).eventId as string;

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await getEventDetails(eventId);

        if (response.status === 200) {
          setEventDetails(response.data);
        }
      } catch (error) {
        console.log(error);
        navigate("/events");
      }
    };

    fetchEventDetails();
  }, []);

  useEffect(() => {
    if (eventDetails) {
      setTotalComments(eventDetails.comments)
      const currentDate = new Date();
      const startDateTime = new Date(
        `${eventDetails?.date.toString().split("T")[0]}T${
          eventDetails?.startTime
        }`
      );
      const endDateTime = new Date(
        `${eventDetails?.date.toString().split("T")[0]}T${
          eventDetails?.endTime
        }`
      );

      const currentTime =
        currentDate.getHours() * 60 + currentDate.getMinutes();
      const startMinutes =
        startDateTime.getHours() * 60 + startDateTime.getMinutes();
      const endMinutes = endDateTime.getHours() * 60 + endDateTime.getMinutes();
      if (currentDate.getDate() === new Date(eventDetails.date).getDate()) {
        if (currentTime >= startMinutes && currentTime <= endMinutes) {
          setEventTime(true);
        }
      }
    }
  }, [eventDetails]);

  const handleLike = async (eventId: string) => {
    try {
      if (liked) {
        setLike(false);
        setEventDetails((prevEvent) => {
          if (!prevEvent) return null;
          return {
            ...prevEvent,
            likes: prevEvent.likes - 1,
          };
        });

        await removeLike(eventId);
      } else {
        setLike(true);
        setEventDetails((prevEvent) => {
          if (!prevEvent) return null;
          return {
            ...prevEvent,
            likes: prevEvent.likes + 1,
          };
        });
        await addLike(eventId);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  const getDate = (date?: string) => {
    return date && new Date(date).toDateString();
  };

  const handleTicketBooking = async (eventId: string) => {
    try {
      if (!eventDetails?.ticketPrice) {
        return;
      }
      if (eventDetails?.ticketPrice < 50) {
        toast.error(
          "stipe payment only availble in morethat 50, please use wallet!"
        );
        return;
      }
      const stripe = await loadStripe(
        "pk_test_51QCEy6AppvYNPg5GIJ8IZvuM2iTJyMPNijm8fjT6f7YOdBZnJBGZ8QgNnrX9X1aXhHGCcW0zF7yJHdtugFP9Y8IN00BbNw4tmB"
      );

      const response = await payForTicket(eventId);
      if (response.data && response.data.sessionId) {
        localStorage.setItem("isPayment", "true");
        const result = await stripe?.redirectToCheckout({
          sessionId: response.data.sessionId,
        });
        if (result?.error) {
          console.error("Stripe checkout error:", result?.error.message);
        }
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        toast.error(error.response.data.message);
      }
      console.log("somthing went wrong on booking time!");
    }
  };

  const handleBookingWithWallet = async (eventId: string) => {
    try {
      const response = await bookTicketWithWallet(eventId);

      if (response.status === 200) {
        toast.success(response.data.message);
        setOpenBookingModal(false);
        setIsBooking(false);
      }
    } catch (error: any) {
      if (
        error.response.status === 400 ||
        error.response.status === 401 ||
        error.response.status == 404
      ) {
        toast.error(error.response.data.message);
      }
      console.log(error);
    }
  };

  const handleJoinEvent = async () => {
    try {
      if (!eventDetails?.eventMeetUrl) {
        toast.error("event has't in live!");
        return;
      }
      const response = await verifyEventJoining(eventDetails?.eventMeetUrl);
      if (response.status === 200) {
        navigate(`/meet?roomID=${eventDetails?.eventMeetUrl}`);
      }
    } catch (error: any) {
      if (error.response.status === 400 || error.response.status == 401) {
        toast.error(error.response.data.message);
        if ((error.response.data.message = "please conform your ticket!")) {
          setOpenBookingModal(true);
        }
      }

      console.log(error);
    }
  };

  return (
    <div className="bg-white">
      {eventDetails ? (
        <div className="bg-white">
          <div className="pt-6">
            <nav aria-label="Breadcrumb">
              <ol className="mx-auto flex max-w-2xl list-none items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <li className="inline-flex items-center">
                  <a
                    href="/"
                    className="inline-flex items-center text-sm font-medium no-underline hover:text-blue-900 text-gray-700  dark:text-gray-400 "
                  >
                    <svg
                      className="w-3 h-3 me-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    Home
                  </a>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <a
                      href="/events"
                      className="ms-1 text-sm font-medium text-gray-700 no-underline hover:text-blue-900 md:ms-2 dark:text-gray-400 "
                    >
                      Events
                    </a>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg
                      className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                      {eventDetails?.eventTitle}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:max-w-7xl ">
              <div className="overflow-hidden rounded-lg h-[500px]">
                <img
                  alt="event banner"
                  src={eventDetails?.imageUrl}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="mx-auto sm:px-6  lg:max-w-7xl mt-6">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <div className="flex gap-1">
                    {liked ? (
                      <FaThumbsUp
                        onClick={() => handleLike(eventDetails?.id)}
                        className="cursor-pointer text-blue-500"
                      />
                    ) : (
                      <FaRegThumbsUp
                        onClick={() => handleLike(eventDetails?.id)}
                        className="cursor-pointer"
                      />
                    )}
                    <p className="text-xs">{eventDetails.likes}</p>
                  </div>
                  <div className="flex gap-1">
                    <FaRegComment className="cursor-pointer" />
                    <p className="text-xs">{totalComments}</p>
                  </div>
                </div>
                <p className="text-xs">
                {formatDistanceToNow(new Date(eventDetails.createdAt), {
                  addSuffix: true,
                })}
                </p>
              </div>
              <p className="text-sm mt-1">{eventDetails.eventTitle}</p>
            </div>

            {/* Product info */}
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {eventDetails?.eventTitle}
                </h1>
                {eventDetails?.isCancelled && (
                  <h4 className="text-red-600">EVENT CANCELLED</h4>
                )}
              </div>

              {/* Options */}
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight font-semibold text-gray-900">
                  {eventDetails && eventDetails?.ticketPrice > 0
                    ? `₹ ${eventDetails?.ticketPrice}`
                    : "FREE"}
                </p>

                {/* Reviews */}
                <div className="mt-6">
                  <div className="flex items-center">
                    <div className="flex  flex-col">
                      <p className="cursor-pointer">
                        <span className="text-base font-medium">Date </span> :{" "}
                        {getDate(eventDetails?.date)}
                      </p>
                      <p className="cursor-pointer">
                        <span className="text-base font-medium">Time </span> :{" "}
                        {`${eventDetails?.startTime} TO ${eventDetails?.endTime}`}
                      </p>
                      <p className="cursor-pointer">
                        <span className="text-base font-medium">Hosts By </span>{" "}
                        :{" "}
                        <span className="hover:underline">{`${eventDetails?.user.firstName} ${eventDetails?.user.lastName}`}</span>
                      </p>
                      <p className="cursor-pointer">
                        <span className="text-base font-medium">Category </span>{" "}
                        : {eventDetails?.category}
                      </p>
                    </div>
                  </div>
                </div>

                {!eventDetails?.isCancelled &&
                userId === eventDetails?.hostsId ? (
                  <></>
                ) : (
                  <>
                    {isEventTime ? (
                      <>
                        <button
                          type="submit"
                          onClick={handleJoinEvent}
                          className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-darkBlue px-8 py-3 text-base font-medium text-white hover:bg-secondaryColor"
                        >
                          JOIN NOW
                        </button>
                      </>
                    ) : (
                      <>
                        {!isbooking ? (
                          <button
                            type="submit"
                            onClick={() => setIsBooking(true)}
                            className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-darkBlue px-8 py-3 text-base font-medium text-white hover:bg-secondaryColor"
                          >
                            BOOK TICKET
                          </button>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() =>
                                handleTicketBooking(eventDetails?.id || "")
                              }
                              className="mt-10 uppercase flex w-full items-center justify-center rounded-md border border-transparent bg-secondaryColor px-8 py-3 text-base font-medium text-white hover:bg-[#bea980]"
                            >
                              <svg
                                aria-hidden="true"
                                className="w-10 h-3 me-2 -ms-1"
                                viewBox="0 0 660 203"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M233.003 199.762L266.362 4.002H319.72L286.336 199.762H233.003V199.762ZM479.113 8.222C468.544 4.256 451.978 0 431.292 0C378.566 0 341.429 26.551 341.111 64.604C340.814 92.733 367.626 108.426 387.865 117.789C408.636 127.387 415.617 133.505 415.517 142.072C415.384 155.195 398.931 161.187 383.593 161.187C362.238 161.187 350.892 158.22 333.368 150.914L326.49 147.803L319.003 191.625C331.466 197.092 354.511 201.824 378.441 202.07C434.531 202.07 470.943 175.822 471.357 135.185C471.556 112.915 457.341 95.97 426.556 81.997C407.906 72.941 396.484 66.898 396.605 57.728C396.605 49.591 406.273 40.89 427.165 40.89C444.611 40.619 457.253 44.424 467.101 48.39L471.882 50.649L479.113 8.222V8.222ZM616.423 3.99899H575.193C562.421 3.99899 552.861 7.485 547.253 20.233L468.008 199.633H524.039C524.039 199.633 533.198 175.512 535.27 170.215C541.393 170.215 595.825 170.299 603.606 170.299C605.202 177.153 610.098 199.633 610.098 199.633H659.61L616.423 3.993V3.99899ZM551.006 130.409C555.42 119.13 572.266 75.685 572.266 75.685C571.952 76.206 576.647 64.351 579.34 57.001L582.946 73.879C582.946 73.879 593.163 120.608 595.299 130.406H551.006V130.409V130.409ZM187.706 3.99899L135.467 137.499L129.902 110.37C120.176 79.096 89.8774 45.213 56.0044 28.25L103.771 199.45L160.226 199.387L244.23 3.99699L187.706 3.996"
                                  fill="#0E4595"
                                />
                                <path
                                  d="M86.723 3.99219H0.682003L0 8.06519C66.939 24.2692 111.23 63.4282 129.62 110.485L110.911 20.5252C107.682 8.12918 98.314 4.42918 86.725 3.99718"
                                  fill="#F2AE14"
                                />
                              </svg>
                              continue with Stripe
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleBookingWithWallet(eventDetails?.id || "")
                              }
                              className="mt-4 uppercase flex w-full items-center justify-center rounded-md border border-transparent bg-secondaryColor px-8 py-3 text-base font-medium text-white hover:bg-[#bea980]"
                            >
                              <img src={Logo} className="w-12" alt="" />
                              &nbsp;&nbsp;continue using wallet
                            </button>
                            {/* <button
                    type="submit"
                    onClick={()=>setIsBooking(false)}
                    className="mt-4 flex w-full items-center justify-center rounded-md border border-transparent bg-darkBlue px-8 py-3 text-base font-medium text-white hover:bg-secondaryColor"
                  >
                    CANCEL BOOKING
                  </button> */}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                {/* Description and details */}
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p className="text-base text-gray-900">
                      {eventDetails?.description}
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-sm font-medium text-gray-900">
                    Highlights
                  </h3>

                  <div className="mt-4">
                    <ul
                      role="list"
                      className="list-disc space-y-2 pl-4 text-sm"
                    >
                      <li className="text-gray-400">
                        <span className="text-gray-600">Limited spots</span>
                      </li>
                      <li className="text-gray-400">
                        <span className="text-gray-600">
                          Insightful Discussions
                        </span>
                      </li>
                      <li className="text-gray-400">
                        <span className="text-gray-600">
                          Networking Opportunities
                        </span>
                      </li>
                      <li className="text-gray-400">
                        <span className="text-gray-600">Interactive Q&A</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">Details</h2>

                  <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">
                      {" "}
                      Limited spots left! Book now to secure your place among{" "}
                      {eventDetails?.participantCount} attendees.
                      {eventDetails?.ticketPrice === 0
                        ? " This event is fully free—don’t miss out!"
                        : ` Only ${eventDetails?.ticketPrice} for this valuable session!`}{" "}
                      , Join us on {getDate(eventDetails?.date)} from{" "}
                      {eventDetails?.startTime} to {eventDetails?.endTime}. This
                      insightful session will be hosted by{" "}
                      {eventDetails?.user?.firstName}{" "}
                      {eventDetails?.user?.lastName}.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="mx-auto sm:px-6  lg:max-w-7xl bg-white">
        {eventDetails &&
        <ListComments eventId={eventDetails?.id} userId={userId || ''} totalComments={totalComments} setTotalComments={setTotalComments}/>}
      </div>

      <Dialog
        open={openBookingModal}
        onClose={setOpenBookingModal}
        className="relative z-10"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative flex flex-col items-center justify-center transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base text-center font-semibold text-gray-900"
                    >
                      Conform Your Ticket!
                    </DialogTitle>
                    <div className="flex flex-col items-center justify-center">
                      <div>
                        <button
                          type="button"
                          onClick={() =>
                            handleTicketBooking(eventDetails?.id || "")
                          }
                          className="mt-10 uppercase flex w-full items-center justify-center rounded-md border border-transparent bg-secondaryColor px-8 py-3 text-base font-medium text-white hover:bg-[#bea980]"
                        >
                          <svg
                            aria-hidden="true"
                            className="w-10 h-3 me-2 -ms-1"
                            viewBox="0 0 660 203"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M233.003 199.762L266.362 4.002H319.72L286.336 199.762H233.003V199.762ZM479.113 8.222C468.544 4.256 451.978 0 431.292 0C378.566 0 341.429 26.551 341.111 64.604C340.814 92.733 367.626 108.426 387.865 117.789C408.636 127.387 415.617 133.505 415.517 142.072C415.384 155.195 398.931 161.187 383.593 161.187C362.238 161.187 350.892 158.22 333.368 150.914L326.49 147.803L319.003 191.625C331.466 197.092 354.511 201.824 378.441 202.07C434.531 202.07 470.943 175.822 471.357 135.185C471.556 112.915 457.341 95.97 426.556 81.997C407.906 72.941 396.484 66.898 396.605 57.728C396.605 49.591 406.273 40.89 427.165 40.89C444.611 40.619 457.253 44.424 467.101 48.39L471.882 50.649L479.113 8.222V8.222ZM616.423 3.99899H575.193C562.421 3.99899 552.861 7.485 547.253 20.233L468.008 199.633H524.039C524.039 199.633 533.198 175.512 535.27 170.215C541.393 170.215 595.825 170.299 603.606 170.299C605.202 177.153 610.098 199.633 610.098 199.633H659.61L616.423 3.993V3.99899ZM551.006 130.409C555.42 119.13 572.266 75.685 572.266 75.685C571.952 76.206 576.647 64.351 579.34 57.001L582.946 73.879C582.946 73.879 593.163 120.608 595.299 130.406H551.006V130.409V130.409ZM187.706 3.99899L135.467 137.499L129.902 110.37C120.176 79.096 89.8774 45.213 56.0044 28.25L103.771 199.45L160.226 199.387L244.23 3.99699L187.706 3.996"
                              fill="#0E4595"
                            />
                            <path
                              d="M86.723 3.99219H0.682003L0 8.06519C66.939 24.2692 111.23 63.4282 129.62 110.485L110.911 20.5252C107.682 8.12918 98.314 4.42918 86.725 3.99718"
                              fill="#F2AE14"
                            />
                          </svg>
                          continue with Stripe
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleBookingWithWallet(eventDetails?.id || "")
                          }
                          className="mt-4 uppercase flex w-full items-center justify-center rounded-md border border-transparent bg-secondaryColor px-8 py-3 text-base font-medium text-white hover:bg-[#bea980]"
                        >
                          <img src={Logo} className="w-12" alt="" />
                          &nbsp;&nbsp;continue using wallet
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default EventDetailsPage;
