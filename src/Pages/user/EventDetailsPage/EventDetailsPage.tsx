import React, { useEffect } from "react";
import { useState } from "react";
import { getEventDetails } from "../../../api/user";
import { useLocation, useNavigate } from "react-router-dom";
import IEvents from "../../../interface/EventsInterface";
import queryString from "query-string";

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
           { eventDetails?.isCancelled && <h4 className="text-red-600">EVENT CANCELLED</h4> }
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
              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-darkBlue px-8 py-3 text-base font-medium text-white hover:bg-secondaryColor focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                BOOK TICKET
              </button>
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
