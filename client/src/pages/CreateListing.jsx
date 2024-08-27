import Navbar from "../components/Navbar";
import { categories } from "../data";
import "../styles/CreateListing.scss";

import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { BiTrash } from "react-icons/bi";
import { IoIosImages } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import variables from "../styles/variables.scss";

const CreateListing = () => {
  const [category, setCategory] = useState("");


  /* LOCATION */
  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    province: "",
    country: "",
  });

  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation({
      ...formLocation,
      [name]: value,
    });
  };

  /* BASIC COUNTS */
  const [workersCount, setworkersCount] = useState(1);
  const [tCount, settCount] = useState(1);




  /* UPLOAD, DRAG & DROP, REMOVE PHOTOS */
  const [photos, setPhotos] = useState([]);

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;

    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };

  /* DESCRIPTION */
  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    highlight: "",
    highlightDesc: "",
    price: 0,


  });

  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({
      ...formDescription,
      [name]: value,
    });
  };




  const creatorId = useSelector((state) => state.user ? state.user._id : null);
  const navigate = useNavigate();

  const handlePost = async (e) => {
    e.preventDefault();

    try {
      /* Create a new FormData onject to handle file uploads */
      const listingForm = new FormData();
      listingForm.append("creator", creatorId);
      listingForm.append("category", category);

      listingForm.append("streetAddress", formLocation.streetAddress);
      listingForm.append("aptSuite", formLocation.aptSuite);
      listingForm.append("city", formLocation.city);
      listingForm.append("province", formLocation.province);
      listingForm.append("country", formLocation.country);
      listingForm.append("workersCount", workersCount);
      listingForm.append("Time_zone", tCount);

      listingForm.append("type", type);
      listingForm.append("title", formDescription.title);
      listingForm.append("description", formDescription.description);
      listingForm.append("highlight", formDescription.highlight);
      listingForm.append("highlightDesc", formDescription.highlightDesc);
      listingForm.append("price", formDescription.price);

      /* Append each selected photos to the FormData object */
      photos.forEach((photo) => {
        listingForm.append("listingPhotos", photo);
      });

      /* Send a POST request to server */
      const response = await fetch("http://localhost:3001/properties/create", {
        method: "POST",
        body: listingForm,
      });

      if (response.ok) {
        navigate("/");
      }
    } catch (err) {
      console.log("Publish Listing failed", err.message);
    }
  };

  const [step, setStep] = useState(1);

  const [type, setType] = useState('');

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setStep(2);
  };






  return (
    <>
      <Navbar />

      <div className="create-listing">

       
      {step === 1 && (
          <div class="b">
            <div id="div1">
              <div id="rock1"></div>
              <div id="rock9"></div>
              <div id="rock2"></div>
              <div id="rock10"></div>
              <div id="rock3"></div>
              <div id="rock4"></div>
              <div id="rock5"></div>
              <div id="rock6"></div>
              <div id="rock7"></div>
              <div id="rock11"></div>
              <div id="rock12"></div>
              <div id="rock13"></div>
              <div id="rock14"></div>
              <div id="rock15"></div>
              <div id="rock16"></div>
              <div id="rock17"></div>
              <div id="rock18"></div>
              <div id="rock19"></div>
              <div id="rock20"></div>
              <div id="rock21"></div>
              <div id="rock21"></div>
              <div id="rock22"></div>
              <div id="rock23"></div>
              <div id="rock24"></div>
              <div id="diva1">

                <div id="divaa1">

                  <input id="btna2" type="button" value="task profider"
                    onClick={handleTypeChange}
                    required />
                  <input id="btna3" type="button" value="worker"
                    onClick={handleTypeChange}
                    required />

                  <div id="divaaa1"><h1 class="centered-text">JOIN OUR COMMUNITY AS</h1></div>
                </div>
              </div>
            </div>
          </div>
       )}
        {step === 2 && (
          <form onSubmit={handlePost}>



            <div className="create-listing_step1">
              <h2>Step 1: Tell us about your needs</h2>
              <hr />
              <h3>Which of these  best describes your categories?</h3>
              <div className="category-list">
                {categories?.map((item, index) => (
                  <div
                    className={`category ${category === item.label ? "selected" : ""
                      }`}
                    key={index}
                    onClick={() => setCategory(item.label)}
                  >
                    <div className="category_icon">
                      <img src={category.icon} alt={category.label} />

                    </div>
                    <p>{item.label}</p>
                  </div>
                ))}
              </div>



              <h3>Where's your place located?</h3>
              <div className="full">
                <div className="location">
                  <p>Street Address</p>
                  <input
                    type="text"
                    placeholder="Street Address"
                    name="streetAddress"
                    value={formLocation.streetAddress}
                    onChange={handleChangeLocation}
                    required
                  />
                </div>
              </div>

              <div className="half">
                <div className="location">
                  <p>Apartment, Suite, etc. (if applicable)</p>
                  <input
                    type="text"
                    placeholder="Apt, Suite, etc. (if applicable)"
                    name="aptSuite"
                    value={formLocation.aptSuite}
                    onChange={handleChangeLocation}
                    required
                  />
                </div>
                <div className="location">
                  <p>City</p>
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    value={formLocation.city}
                    onChange={handleChangeLocation}
                    required
                  />
                </div>
              </div>

              <div className="half">
                <div className="location">
                  <p>Province</p>
                  <input
                    type="text"
                    placeholder="Province"
                    name="province"
                    value={formLocation.province}
                    onChange={handleChangeLocation}
                    required
                  />
                </div>
                <div className="location">
                  <p>Country</p>
                  <input
                    type="text"
                    placeholder="Country"
                    name="country"
                    value={formLocation.country}
                    onChange={handleChangeLocation}
                    required
                  />
                </div>
              </div>

              <h3>Share some basics about your demands</h3>
              <div className="basics">
                <div className="basic">
                  <p>number of workers</p>
                  <div className="basic_count">
                    <RemoveCircleOutline
                      onClick={() => {
                        workersCount > 1 && setworkersCount(workersCount - 1);
                      }}
                      sx={{
                        fontSize: "25px",
                        cursor: "pointer",
                        "&:hover": { color: variables.pinkred },
                      }}
                    />
                    <p>{workersCount}</p>
                    <AddCircleOutline
                      onClick={() => {
                        setworkersCount(workersCount + 1);
                      }}
                      sx={{
                        fontSize: "25px",
                        cursor: "pointer",
                        "&:hover": { color: variables.pinkred },
                      }}
                    />
                  </div>
                </div>

                <div className="basic">
                  <p>Time zone to accomplish by hours</p>

                  <div className="basic_count">
                    <RemoveCircleOutline
                      onClick={() => {
                        tCount > 1 && settCount(tCount - 1);
                      }}
                      sx={{
                        fontSize: "25px",
                        cursor: "pointer",
                        "&:hover": { color: variables.pinkred },
                      }}
                    />
                    <p>{tCount}</p>
                    <AddCircleOutline
                      onClick={() => {
                        settCount(tCount + 1);
                      }}
                      sx={{
                        fontSize: "25px",
                        cursor: "pointer",
                        "&:hover": { color: variables.pinkred },
                      }}
                    />


                  </div>
                </div>




              </div>
            </div>

            <div className="create-listing_step2">
              <h2>Step 2: Make your demands stand out</h2>
              <hr />



              <h3>Add some photos of your place</h3>
              <DragDropContext onDragEnd={handleDragPhoto}>
                <Droppable droppableId="photos" direction="horizontal">
                  {(provided) => (
                    <div
                      className="photos"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {photos.length < 1 && (
                        <>
                          <input
                            id="image"
                            type="file"
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={handleUploadPhotos}
                            multiple
                            name="listingPhotos"
                          />
                          <label htmlFor="image" className="alone">
                            <div className="icon">
                              <IoIosImages />
                            </div>
                            <p>Upload from your device</p>
                          </label>
                        </>
                      )}

                      {photos.length >= 1 && (
                        <>
                          {photos.map((photo, index) => {
                            return (
                              <Draggable
                                key={index}
                                draggableId={index.toString()}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    className="photo"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <img
                                      src={URL.createObjectURL(photo)}
                                      alt="place"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => handleRemovePhoto(index)}
                                    >
                                      <BiTrash />
                                    </button>
                                  </div>
                                )}
                              </Draggable>
                            );
                          })}
                          <input
                            id="image"
                            type="file"
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={handleUploadPhotos}
                            multiple
                          />
                          <label htmlFor="image" className="together">
                            <div className="icon">
                              <IoIosImages />
                            </div>
                            <p>Upload from your device</p>
                          </label>
                        </>
                      )}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              <h3>What make your request more clear ?</h3>
              <div className="description">
                <p>Title</p>
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={formDescription.title}
                  onChange={handleChangeDescription}
                  required
                />
                <p>Description</p>
                <textarea
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={formDescription.description}
                  onChange={handleChangeDescription}
                  required
                />
                <p>Highlight</p>
                <input
                  type="text"
                  placeholder="Highlight"
                  name="highlight"
                  value={formDescription.highlight}
                  onChange={handleChangeDescription}
                  required
                />
                <p>Highlight details</p>
                <textarea
                  type="text"
                  placeholder="Highlight details"
                  name="highlightDesc"
                  value={formDescription.highlightDesc}
                  onChange={handleChangeDescription}
                  required
                />
                <p>Now, set your PRICE</p>
                <span>$</span>
                <input
                  type="number"
                  placeholder="100"
                  name="price"
                  value={formDescription.price}
                  onChange={handleChangeDescription}
                  className="price"
                  required
                />
              </div>
            </div>

            <button className="submit_btn" type="submit">
              CREATE YOUR LISTING
            </button>
          </form>
            )}
      </div>

      <Footer />
    </>
  );

};


export default CreateListing; 