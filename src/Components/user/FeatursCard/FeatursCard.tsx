import "./FeaturesCard.css";
import { featuresData } from "../../../data/featuresData";

const FeatursCard = () => {
  return (
    <div className="feature-section">
      {featuresData.map((values, index) => (
        <div className="feature-card" key={index}>
          <div className="icon">
            <values.icon />
          </div>
          <h5>{values.title}</h5>
          <p className="feature-description">{values.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FeatursCard;
