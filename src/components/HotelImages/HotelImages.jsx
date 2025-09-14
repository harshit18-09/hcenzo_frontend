import "./HotelImages.css";
import { fallbackImage } from "../../utils/fallback-image";

export const HotelImages = ({ singleHotel }) => {
  console.log("SingleHotel data:", singleHotel);
  const { image, imageArr } = singleHotel;

  const handleImageError = (e) => {
    console.log("Image failed to load:", e.target.src);
    e.target.onerror = null;
    e.target.src = fallbackImage;
  };

  return (
    <div className="hotel-image-container d-flex gap-small">
      <div className="primary-image-container">
        <img 
          className="primary-img" 
          src={image} 
          alt="hotel main view"
          onError={handleImageError}
        />
      </div>
      <div className="d-flex wrap gap-small">
        {imageArr &&
          imageArr.map((img, index) => (
            <img
              key={index}
              className="hotel-img"
              src={img}
              alt={`hotel view ${index + 1}`}
              onError={handleImageError}
            />
          ))}
      </div>
    </div>
  );
};