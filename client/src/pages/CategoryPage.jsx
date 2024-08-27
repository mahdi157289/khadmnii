import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import ListingCard from "../components/ListingCard";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { setListings } from "../redux/state";
import "../styles/List.scss";

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const { category } = useParams()

  const dispatch = useDispatch()
  const listings = useSelector((state) => state.listings);

  const getFeedListings = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/properties?category=${category}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      console.log(data);
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [category]);
  console.log(loading);
  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <div style={{ backgroundColor: "#080808", padding: "30px" }}>
      <div className="in" style={{
        padding: "25px 65px 80px",
        borderRadius: 20,
        boxShadow: "0 3px 10px 2px rgba(0, 0, 0, 0.2)", // assuming this is the shadow you want
        backgroundColor: "aliceblue",
        maxWidth: "fit-content",
        margin: "0 auto"
      }}>
        <h1 className="title-list" >{category} Listings</h1>
        <div className="list">
          {listings?.map(
            ({
              _id,
              creator,
              listingPhotoPaths,
              city,
              province,
              country,
              category,

              price,
              booking = false,
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
      </div>
    </div >
      <Footer />
    </>
  );
};

export default CategoryPage;
