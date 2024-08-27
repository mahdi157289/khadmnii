import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categories } from "../data";
import { setListings } from "../redux/state";
import "../styles/Listings.scss";
import "../styles/money.css";
import ListingCard from "./ListingCard";
import Loader from "./Loader";
const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const listings = useSelector((state) => state.listings);//to select the listings state from the Redux store.

  const getFeedListings = async () => {
    try {
      const response = await fetch(
        selectedCategory !== "All"
          ? `http://localhost:3001/properties?category=${selectedCategory}`
          : "http://localhost:3001/properties",
        {
          method: "GET",
        }
      );

      const data = await response.json();
      console.log("the dta ",data);
      const taskProviderListings = data.filter((listing) => listing.type === "task profider");
     
    if (taskProviderListings.length === 0) {
      console.log("No listings with a type of 'task provider' found.");
    } else {
      dispatch(setListings({ listings: taskProviderListings }));
      console.log("the dta1 ", taskProviderListings);
      setLoading(false);
    }
  } catch (err) {
    console.log("Fetch Listings Failed", err.message);
  }
  };

  useEffect(() => {
    getFeedListings();
  }, [selectedCategory]);//the effect depends only on the selectedCategory state variable Therefore, the effect will re-run whenever it change 

  return (
    <>
      <div className="text-container">
        <h1 class="bounce-text"> TIME TO MAKE MONEY </h1>
      </div>
      <div className="category-list">
        {categories?.map((category, index) => (
          <div
            className={`category ${category.label === selectedCategory ? "selected" : ""}`}
            key={index}
            onClick={() => setSelectedCategory(category.label)}
          >
            <img className="category_icon" src={category.icon} alt={category.label} />
            <p>{category.label}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="listings">
          {listings.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,

              price,
              booking = false
            }) => (
              <ListingCard
                listingId={_id}
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                province={province}
                country={country}
                category={category}

                price={price}
                booking={booking}
              />
            )
          )}
        </div>
      )}
    </>
  );
};

export default Listings;