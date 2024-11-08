import React, { useEffect } from "react";
import { useState } from "react";
import { bookTicketWithWallet, getEventDetails, payForTicket } from "../../../api/user";
import { useLocation, useNavigate } from "react-router-dom";
import IEvents from "../../../interface/EventsInterface";
import queryString from "query-string";
import { loadStripe } from "@stripe/stripe-js";
import Logo from "../../../assets/veewWhiteLogo.png";
import { toast } from "react-toastify";

const product = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindui.com/plus/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/plus/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/plus/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/plus/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};

const EventDetailsPage: React.FC = () => {
  const [eventDetails, setEventDetails] = useState<IEvents | null>(null);
  const [isbooking, setIsBooking] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const eventId = queryString.parse(location.search).eventId as string;

    const fetchEventDetails = async () => {
      try {
        const response = await getEventDetails(eventId);

        if (response.status === 200) {
          console.log(response.data);
          setEventDetails(response.data);
        }
      } catch (error) {
        console.log(error);
        navigate("/events");
      }
    };

    fetchEventDetails();
  }, []);

  const getDate = (date?: string) => {
    return date && new Date(date).toDateString();
  };

  const handleTicketBooking = async(eventId:string)=>{
    try {
      if(eventDetails?.ticketPrice || 0 < 50 ){
        toast.error("stipe payment only availble in morethat 50, please use wallet!")
        return
      }
      const stripe = await loadStripe("pk_test_51QCEy6AppvYNPg5GIJ8IZvuM2iTJyMPNijm8fjT6f7YOdBZnJBGZ8QgNnrX9X1aXhHGCcW0zF7yJHdtugFP9Y8IN00BbNw4tmB");

      const response = await payForTicket(eventId)
      if (response.data && response.data.sessionId) {
        localStorage.setItem('isPayment','true')
        const result = await stripe?.redirectToCheckout({
          sessionId: response.data.sessionId,
        });
        if (result?.error) {
          console.error("Stripe checkout error:", result?.error.message);
        }
      }

    } catch (error:any) {
      if(error.response.status===400){
        toast.error(error.response.data.message)
      }
      console.log("somthing went wrong on booking time!");

    }
  }

  const handleBookingWithWallet = async(eventId:string)=>{
    try {
      const response = await bookTicketWithWallet(eventId)

      if(response.status===200){
        toast.success(response.data.message)
      }
    } catch (error:any) {
      if(error.response.status === 400 || error.response.status === 401){
        toast.error(error.response.data.message)
      }
      console.log(error);
      
    }
  }

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li>
              <div className="flex items-center">
                <a
                  href="/events"
                  className="mr-2 text-sm font-medium text-gray-900"
                >
                  events
                </a>
                <svg
                  fill="currentColor"
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
            <li className="text-sm">
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.name}
              </a>
            </li>
          </ol>
        </nav>
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="overflow-hidden rounded-lg h-[500px]">
            <img
              alt="event banner"
              src={eventDetails?.imageUrl}
              className="h-full w-full object-cover object-center"
            />
          </div>
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
                    <span className="text-base font-medium">Hosts By </span> :{" "}
                    <span className="hover:underline">{`${eventDetails?.user.firstName} ${eventDetails?.user.lastName}`}</span>
                  </p>
                  <p className="cursor-pointer">
                    <span className="text-base font-medium">Category </span> :{" "}
                    {eventDetails?.category}
                  </p>
                </div>
              </div>
            </div>

            {!eventDetails?.isCancelled && (
              <>
                {!isbooking ? (
                  <button
                    type="submit"
                    onClick={()=>setIsBooking(true)}
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-darkBlue px-8 py-3 text-base font-medium text-white hover:bg-secondaryColor"
                  >
                    BOOK TICKET
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={()=>handleTicketBooking(eventDetails?.id || '')}
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
                      onClick={()=>handleBookingWithWallet(eventDetails?.id || '')}
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
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
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
                  {eventDetails?.user?.firstName} {eventDetails?.user?.lastName}
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;

{
  /* <nav className="flex" aria-label="Breadcrumb">
  <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
    <li className="inline-flex items-center">
      <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
        <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
        </svg>
        Home
      </a>
    </li>
    <li>
      <div className="flex items-center">
        <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
        </svg>
        <a href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Projects</a>
      </div>
    </li>
    <li aria-current="page">
      <div className="flex items-center">
        <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
        </svg>
        <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Flowbite</span>
      </div>
    </li>
  </ol>
</nav> */
}
