import "./FeaturesCard.css";
import { featuresData } from "../../../data/featuresData";

const FeatursCard = () => {
  return (
    <div className="feature-section">
      {featuresData.map((values, index) => (
        <div className="feature-card cursor-pointer bg-gradient-to-r from-blue-800 to-blue-900 hover:from-slate-900 hover:to-slate-700" key={index}>
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
