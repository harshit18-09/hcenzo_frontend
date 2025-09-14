import { Filter } from "../../components";
import { HotelCard } from "../../components";
import { useHotel } from "../../context";
import "./SearchResults.css";

export const SearchResults = () => {
    const { hotelList } = useHotel();

    return (
        <main className="main">
            <section className="section-search-results d-flex align-center gap-xl">
                <Filter />
                <div>
                    <p className="paragraph-md text-center">Found {hotelList.length} properties</p>
                    <div className="hotel-listings d-flex direction-column gap-l">
                        {hotelList.map(hotel => (
                            <HotelCard key={hotel._id} hotel={hotel} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};