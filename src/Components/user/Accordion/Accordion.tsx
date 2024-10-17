import { useState } from "react";
import "./Accordion.css";
import { features } from "../../../data/faqData";
import { ImCross } from "react-icons/im";
import { FaPlus } from "react-icons/fa";

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="accordion">
      {features.map((feature, index) => (
        <div
          className={`accordion-card ${activeIndex === index ? "active" : ""}`}
          key={index}
        >
          <div
            className="accordion-header"
            onClick={() => toggleAccordion(index)}
          >
            <p>{feature.question}</p>
            <span className="toggle-icon">
              {activeIndex === index ? <ImCross /> : <FaPlus />}
            </span>
          </div>
          {activeIndex === index && (
            <div className="accordion-body">
              <p>{feature.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
