import React, { useRef, useEffect } from 'react'
import './EventCard.css'
import image from '../../../../../../../../Downloads/hee.jpg'
import { Link } from 'react-router-dom';

const EventCard:React.FC = () => {

    const cardsRef = useRef<HTMLDivElement | null>(null);

    const handleWheel = (event: React.WheelEvent) => {
        if (cardsRef.current) {
          cardsRef.current.scrollLeft += event.deltaY;
        }
      };


    useEffect(() => {
        const currentRef = cardsRef.current;
        if (currentRef) {
          currentRef.addEventListener('wheel', handleWheel as unknown as EventListener);
        }
        return () => {
          if (currentRef) {
            currentRef.removeEventListener('wheel', handleWheel as unknown as EventListener);
          }
        };
      }, []);

      const aaa = [1,2,3,4,5,6,7]

  return (
    <div className='titleCards'>
        <h2>card title</h2>
        <div className="card-list" ref={cardsRef}>
            {aaa.map((val,ind)=>{
                return (
                    <Link to={`/`} className='card'  key={ind}>
                        <img src={image} alt="" />
                        <p>card titileeeeeeeeee</p>
                    </Link>
                )
            })}
        </div>
    </div>
  )
}

export default EventCard