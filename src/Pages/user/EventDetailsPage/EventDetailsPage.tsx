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

  const [eventDetails , setEventDetails] = useState<IEvents | null>(null)
  const navigate = useNavigate()
  const location = useLocation()


  useEffect(()=>{
    const eventId = queryString.parse(location.search).eventId as string

      const fetchEventDetails = async()=>{
          try {
              const response = await getEventDetails(eventId)

              if(response.status===200){
                console.log(response.data)
                setEventDetails(response.data)
              }
          } catch (error) {
              console.log(error);
              navigate('/events')
              
          }
      }

      fetchEventDetails()
  },[])

  const getDate = (date?:string)=>{
    return date && new Date(date).toLocaleDateString()
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
              alt='event banner'
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
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight font-semibold text-gray-900">
              {eventDetails && eventDetails?.ticketPrice > 0 ? `₹ ${eventDetails?.ticketPrice}` : 'FREE'}
            </p>

            {/* Reviews */}
            <div className="mt-6">
              <div className="flex items-center">
                <div className="flex  flex-col">
                  <p className="cursor-pointer"><span className="text-base font-medium">Date </span> : {getDate(eventDetails?.date)}</p>
                  <p className="cursor-pointer"><span className="text-base font-medium">Time </span> : {`${eventDetails?.startTime} TO ${eventDetails?.endTime}`}</p>
                  <p className="cursor-pointer"><span className="text-base font-medium">Hosts By </span> : <span className="hover:underline">{`${eventDetails?.user.firstName} ${eventDetails?.user.lastName}`}</span></p>
                  <p className="cursor-pointer"><span className="text-base font-medium">Category </span> : {eventDetails?.category}</p>

                </div>
              </div>
            </div>

            <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-darkBlue px-8 py-3 text-base font-medium text-white hover:bg-secondaryColor focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                BOOK TICKET
              </button>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{eventDetails?.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    <li  className="text-gray-400">
                      <span className="text-gray-600">Limited spots</span>
                    </li>
                    <li  className="text-gray-400">
                      <span className="text-gray-600">Insightful Discussions</span>
                    </li>
                    <li  className="text-gray-400">
                      <span className="text-gray-600">Networking Opportunities</span>
                    </li>
                    <li  className="text-gray-400">
                      <span className="text-gray-600">Interactive Q&A</span>
                    </li>
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600"> Limited spots left! Book now to secure your place among {eventDetails?.participantCount} attendees.
                {eventDetails?.ticketPrice === 0 ? 
                  " This event is fully free—don’t miss out!" : 
                  ` Only ${eventDetails?.ticketPrice} for this valuable session!`} ,
                    Join us on {getDate(eventDetails?.date)} from {eventDetails?.startTime} to {eventDetails?.endTime}. 
                    This insightful session will be hosted by {eventDetails?.user?.firstName} {eventDetails?.user?.lastName}.                  
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





            {/* <form className="mt-10">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                <fieldset aria-label="Choose a color" className="mt-4">
                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="flex items-center space-x-3"
                  >
                    {product.colors.map((color) => (
                      <Radio
                        key={color.name}
                        value={color}
                        aria-label={color.name}
                        className={classNames(
                          color.selectedClass,
                          "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1"
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color.class,
                            "h-8 w-8 rounded-full border border-black border-opacity-10"
                          )}
                        />
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>

              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a
                    href="#"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Size guide
                  </a>
                </div>

                <fieldset aria-label="Choose a size" className="mt-4">
                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                  >
                    {product.sizes.map((size) => (
                      <Radio
                        key={size.name}
                        value={size}
                        disabled={!size.inStock}
                        className={classNames(
                          size.inStock
                            ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                            : "cursor-not-allowed bg-gray-50 text-gray-200",
                          "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6"
                        )}
                      >
                        <span>{size.name}</span>
                        {size.inStock ? (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                          />
                        ) : (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                          >
                            <svg
                              stroke="currentColor"
                              viewBox="0 0 100 100"
                              preserveAspectRatio="none"
                              className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                            >
                              <line
                                x1={0}
                                x2={100}
                                y1={100}
                                y2={0}
                                vectorEffect="non-scaling-stroke"
                              />
                            </svg>
                          </span>
                        )}
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>
            </form> */}