import React, { useState } from 'react';
import './AddEventForm.css';

interface ImgUploadProps {
  setForm:()=>void
}

const ImageUploader: React.FC<ImgUploadProps> = ({setForm}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBoxClick = () => {
    const fileInput = document.getElementById('imageInput') as HTMLInputElement;
    fileInput.click(); 
  };

  return (
    <div className="image-uploader">
      <div className="image-preview-box" onClick={handleBoxClick}>
        {imageSrc ? (
          <img src={imageSrc} alt="Selected" />
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
          <button type="submit" className="continue-button">CONTINUE</button>
          <button type="submit" className="continue-button" onClick={setForm}>BACK</button>
        </div>
    </div>
  );
};

export default ImageUploader;
