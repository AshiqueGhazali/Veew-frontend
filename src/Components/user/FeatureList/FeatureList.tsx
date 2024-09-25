import {featuresData} from '../../../data/featuresData'

import './FeatureList.css';


const FeatureList= () => {
  return (
    <div className="feature-list">
      {featuresData.map((feature, index) => (
        <div key={index} className="feature-item">
          <div className="feature-icon">
            <feature.icon /> 
          </div>
          <div className="feature-text">
            <h5>{feature.title}</h5>
            <p>{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureList;
