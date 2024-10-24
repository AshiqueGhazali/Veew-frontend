import React from "react";
import "./AddEventForm.css";

const AddEventForm: React.FC = () => {
  return (
    <div className="add-event-form-content">
      <form>
        <div className="event-form-group">
          <label htmlFor="">Event Title</label>
          <input type="text" />
        </div>
        <div className="event-form-group">
          <label htmlFor="">Event Description</label>
          <textarea />
        </div>
        <div className="form-row">
          <div className="event-form-group">
            <label htmlFor="">Event Category</label>
            <input type="text" />
          </div>
          <div className="event-form-group">
            <label htmlFor="">Ticket Price</label>
            <input type="text" />
          </div>
        </div>
        <div className="form-row-date">
          <div className="event-form-group">
            <label htmlFor="">Date</label>
            <input type="date" />
          </div>
          <div className="event-form-group">
            <label htmlFor="">Start Time</label>
            <input type="time" />
          </div>
          <div className="event-form-group">
            <label htmlFor="">End Time</label>
            <input type="time" />
          </div>
        </div>
        <hr/>
        <div className="event-form-btn">
        <input type="reset" />
          <button type="submit" className="continue-button">CONTINUE</button>
        </div>
      </form>
    </div>
  );
};

export default AddEventForm;
