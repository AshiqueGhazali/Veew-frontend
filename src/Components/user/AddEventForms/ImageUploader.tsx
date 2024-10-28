import React, { useState } from 'react';
import './AddEventForm.css';
import { createEvent } from '../../../api/user';
import { useNavigate } from 'react-router-dom';

interface ImgUploadProps {
  setForm:()=>void;
  formData: {
    title: string;
    description: string;
    category: string;
    price: string;
    participantCount:string;
    date: string;
    startTime: string;
    endTime: string;
  };
}

const ImageUploader: React.FC<ImgUploadProps> = ({setForm,formData}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [err , setError] = useState<string>('')

  const navigate = useNavigate()

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleBoxClick = () => {
    const fileInput = document.getElementById('imageInput') as HTMLInputElement;
    fileInput.click(); 
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      setError("Please select an image!");
      return;
    }

    const payload = new FormData();
    payload.append("image", imageFile);
    payload.append("eventTitle", formData.title);
    payload.append("category", formData.category);
    payload.append("description", formData.description);
    payload.append("date", new Date(formData.date).toISOString());
    payload.append("startTime", formData.startTime);
    payload.append("endTime", formData.endTime);
    payload.append("participantCount", formData.participantCount); 
    payload.append("ticketPrice", formData.price);

    try {
      const response = await createEvent(payload);
      if (response.status === 200) {
        console.log("Event successfully created:", response.data);
        setForm();
        navigate('/')
        
      }
    } catch (err) {
      console.error("Error creating event:", err);
      setError("Failed to create event. Please try again.");
    }
  };

  return (
    <div className="image-uploader">
      <div className="image-preview-box" onClick={handleBoxClick}>
        {imageFile ? (
          <img src={URL.createObjectURL(imageFile)} alt="Selected" />
        ) : (
          <p>Click to select an image</p>
        )}
      </div>
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }} 
      />
      <div className="upload-btn">
          {err && <p>{err}</p>}
          <button type="submit" className="continue-button" onClick={handleSubmit}>CONTINUE</button>
          <button type="submit" className="continue-button" onClick={setForm}>BACK</button>
        </div>
    </div>
  );
};

export default ImageUploader;
