import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth, useDate, useAlert } from "../../context";
import {
  FinalPrice,
  HotelDetails,
  HotelImages,
  Navbar,
  AuthModal,
  ProfileDropDown,
  SearchStayWithDate,
  Alert
} from "../../components";
import "./SingleHotel.css";

export const SingleHotel = () => {
  const { id } = useParams();
  const [singleHotel, setSingleHotel] = useState({});

  const { isAuthModalOpen, isDropDownModalOpen } = useAuth();
  const { isSearchModalOpen } = useDate();
  const { alert } = useAlert();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      if (!id) {
        setError("No hotel ID provided");
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        
        console.log("Fetching hotel with ID:", id);
        
        // First try to get all hotels
        const { data: allHotels } = await axios.get(
          `https://hcenzo-1.onrender.com/api/hotels`
        );
        
        console.log("Retrieved all hotels:", allHotels?.length);
        
        if (!Array.isArray(allHotels) || allHotels.length === 0) {
          throw new Error("No hotels available");
        }
        
        // Find the specific hotel
        const hotel = allHotels.find(h => h._id === id);
        
        if (!hotel) {
          console.error("Hotel not found in list. Available IDs:", allHotels.map(h => h._id));
          throw new Error("Hotel not found");
        }
        
        console.log("Found hotel:", hotel);
        setSingleHotel(hotel);
      } catch (err) {
        console.error("Error fetching hotel:", err);
        if (err.response?.status === 404) {
          setError("Hotel not found. Please try refreshing the page.");
        } else {
          setError(err.message || "Failed to fetch hotel details");
        }
        setSingleHotel({});
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const { name, state } = singleHotel;

  return (
    <div className="relative">
      <Navbar />
      <main className="single-hotel-page">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>Loading hotel details...</div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--error-color)' }}>
            Error loading hotel: {error}
          </div>
        ) : Object.keys(singleHotel).length > 0 ? (
          <>
            <p className="hotel-name-add">
              {name}, {state}
            </p>
            <HotelImages singleHotel={singleHotel} />
            <div className="d-flex">
              <HotelDetails singleHotel={singleHotel} />
              <FinalPrice singleHotel={singleHotel} />
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem' }}>No hotel details found</div>
        )}
      </main>
      {isSearchModalOpen && <SearchStayWithDate />}
      {isDropDownModalOpen && <ProfileDropDown />}
      {isAuthModalOpen && <AuthModal />}
      {alert.open && <Alert />}
    </div>
  );
};