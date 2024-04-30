import React, { useState } from 'react'
import Navbar from '../../Components/Navbar';
import '../../Styles/CreateListing.scss';
import { categories, facilities, types } from '../../catDB';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { IoIosImages } from "react-icons/io";
import { BiTrash } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

const CreateListing = () => {

    const navigate = useNavigate();

    const [category, setCategory] = useState("");
    const [type, setType] = useState("");
    // const [amenities, setAmenities] = useState([]);
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
            [name]: value
        })
    }
    console.log(formLocation);
    /** Basics Counts **/
    const [guestCount, setGuestCount] = useState(1)
    const [bedroomCount, setBedroomCount] = useState(1)
    const [bedCount, setBedCount] = useState(1)
    const [bathroomCount, setBathroomCount] = useState(1);


    /* AMENITIES */
    const [amenities, setAmenities] = useState([]);

    const handleSelectAmenities = (facility) => {
        if (amenities.includes(facility)) {
            setAmenities((prevAmenities) =>
                prevAmenities.filter((option) => option !== facility)
            );
        } else {
            setAmenities((prev) => [...prev, facility]);
        }
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

    /** UPLOAD,DRAG AND DROP AND DELETE PHOTOS **/
    const [photos, setPhotos] = useState([]);

    const handleUploadPhotos = (e) => {
        const newPhotos = e.target.files;
        setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
    }
    const handleDragPhoto = (result) => {
        if (result.destination) {
            return
        }
        const items = Array.from(photos);
        const [reOrderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reOrderedItem);
        setPhotos(items);
    }
    const handleRemovePhoto = (indexToRemove) => {
        setPhotos((prevPhotos) =>
            prevPhotos.filter((_, index) => index !== indexToRemove)
        );
    }

    const creatorId = useSelector((state) => state.user._id);
    const handlePost = async (e) => {
        e.preventDefault();
        try {
            const listingForm = new FormData();
            listingForm.append("creator", creatorId);
            listingForm.append("category", category);
            listingForm.append("type", type);
            listingForm.append("streetAddress", formLocation.streetAddress);
            listingForm.append("aptSuite", formLocation.aptSuite);
            listingForm.append("city", formLocation.city);
            listingForm.append("province", formLocation.province);
            listingForm.append("country", formLocation.country);
            listingForm.append("guestCount", guestCount);
            listingForm.append("bedroomCount", bedroomCount);
            listingForm.append("bedCount", bedCount);
            listingForm.append("bathroomCount", bathroomCount);
            listingForm.append("amenities", amenities);
            listingForm.append("title", formDescription.title);
            listingForm.append("description", formDescription.description);
            listingForm.append("highlight", formDescription.highlight);
            listingForm.append("highlightDesc", formDescription.highlightDesc);
            listingForm.append("price", formDescription.price);

            /* Append each selected photos to the FormData object */
            photos.forEach((photo) => {
                listingForm.append("listingPhotos", photo);
            });

            // Request to the server
            const response = await fetch('http://localhost:3000/api/v1/properties/create', {
                method: "POST",
                body: listingForm
            });
            if (response.ok) {
                toast.success(response.msg);
                navigate('/');
            }
        } catch (error) {
            toast.error(response.error);
            console.log(error);
        }
    }
    return (
        <>
            <Navbar />
            <div className="create-listing">
                <h1>Apne Jagah Ko Prakaashit
                    Kejiye</h1>
                <form onSubmit={handlePost}>
                    <div className="create-listing_step1">
                        <h2>Setp 1: Apne Jagah ke bare me batao</h2>
                        <hr />
                        <h3>Which of these category best describe your place</h3>
                        <div className="category-list">
                            {
                                categories?.map((items, index) => (
                                    <div
                                        className={`category ${category === items.label ? "selected" : ""}`}
                                        key={index}
                                        onClick={() => setCategory(items.label)}
                                    >
                                        <div className="category-icon">{items.icon}</div>
                                        <p>{items.label}</p>
                                    </div>
                                ))
                            }
                        </div>
                        <h3>Apko kis type ka place Chiye?</h3>
                        <div className="type-list">
                            {
                                types?.map((items, index) => (
                                    <div className={`type ${type === items.name ? "selected" : ""}`}
                                        key={index}
                                        onClick={() => setType(items.name)}
                                    >
                                        <div className="type_text">
                                            <h4>{items.name}</h4>
                                            <p>{items.description}</p>
                                        </div>
                                        <div className="type_icon">{items.icon}</div>
                                    </div>
                                ))
                            }
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
                                <p>Apartment, Suite, etc. if applicable</p>
                                <input
                                    type="text"
                                    placeholder="Apt, Suite, etc. (if applicable)"
                                    name="aptSuite"
                                    value={formLocation.aptSuite}
                                    onChange={handleChangeLocation}
                                    required
                                />
                            </div>
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
                        <h3>Apne jagah ke bare me kuch bataiye</h3>
                        <div className="basics">
                            <div className="basic">
                                <p>Guests</p>
                                <div className="basic_count">
                                    <IoRemoveCircleOutline
                                        style={{ fontSize: '25px' }}
                                        onClick={() => { guestCount > 1 && setGuestCount(guestCount - 1) }}
                                    />
                                    <p>{guestCount}</p>
                                    <IoAddCircleOutline
                                        style={{ fontSize: "25px" }}
                                        onClick={() => { setGuestCount(guestCount + 1) }}
                                    />
                                </div>
                            </div>
                            <div className="basic">
                                <p>Bedrooms</p>
                                <div className="basic_count">
                                    <IoRemoveCircleOutline
                                        style={{ fontSize: '25px' }}
                                        onClick={() => {
                                            bedroomCount > 1 &&
                                                setBedroomCount(bedroomCount - 1)
                                        }}
                                    />
                                    <p>{bedroomCount}</p>
                                    <IoAddCircleOutline
                                        style={{ fontSize: "25px" }}
                                        onClick={() => { setBedroomCount(bedroomCount + 1) }}
                                    />
                                </div>
                            </div>
                            <div className="basic">
                                <p>Beds</p>
                                <div className="basic_count">
                                    <IoRemoveCircleOutline
                                        onClick={() => { bedCount > 1 && setBedCount(bedCount - 1) }}
                                        style={{ fontSize: '25px' }}
                                    />
                                    <p>{bedCount}</p>
                                    <IoAddCircleOutline
                                        style={{ fontSize: "25px" }}
                                        onClick={() => { setBedCount(bedCount + 1) }}
                                    />
                                </div>
                            </div>
                            <div className="basic">
                                <p>Bathrooms</p>
                                <div className="basic_count">
                                    <IoRemoveCircleOutline
                                        onClick={() => { bathroomCount > 1 && setBathroomCount(bathroomCount - 1) }}
                                        style={{ fontSize: '25px' }}
                                    />
                                    <p>{bathroomCount}</p>
                                    <IoAddCircleOutline
                                        style={{ fontSize: "25px" }}
                                        onClick={() => { setBathroomCount(bathroomCount + 1) }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="create-listing_step2">
                        <h2>Step 2: Tumhare gahr kis jagah stand out karta hai</h2>
                        <hr />
                        <h3>Kuch batao apke room ke pass kya kya services hai</h3>
                        <div className="amenities">
                            {
                                facilities?.map((faci, index) => (
                                    <div className={`facility ${amenities.includes(faci.name) ? "selected" : ""
                                        }`} key={index}
                                        onClick={() => { handleSelectAmenities(faci.name) }}>
                                        <div className="facility_icon">{faci.icon}</div>
                                        <p>{faci.name}</p>
                                    </div>
                                ))
                            }
                        </div>
                        <h3>Kuch chitra dijiye apme ghar ko darshane ke liye</h3>
                        {/* {{{{ {...provided.droppableProps}: This JSX spread attribute ({...}) spreads all the props provided by the Droppable component onto this div. These props include event handlers necessary for drag-and-drop functionality.
ref={provided.innerRef}: This assigns the ref attribute of the div to provided.innerRef, which is a reference to the root DOM node of the droppable area. This is important for managing drag-and-drop behavior.}}}} */}
                        {/* <DragDropContext onDragEnd={handleDragPhoto}>
                            <Droppable droppableId="photos" direction="horizontal">
                                {
                                    (provided) => (
                                        <div className="photos"
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {
                                                photos.length < 1 && (
                                                    <>
                                                        <input
                                                            type="file"
                                                            onChange={handleUploadPhotos}
                                                            id='image'
                                                            accept='image/*'
                                                            style={{ display: 'none' }}
                                                            multiple
                                                        />
                                                        <label htmlFor="image" className='alone'>
                                                            <div className="icon"><IoIosImages /></div>
                                                            <p>Apni photo upload kijiye</p>
                                                        </label>
                                                    </>
                                                )
                                            }
                                            {
                                                photos.length >= 1 && (
                                                    <>
                                                        {
                                                            photos.map((photo, index) => {
                                                                return (
                                                                    <Draggable
                                                                        key={index}
                                                                        draggableId={index.toString()}
                                                                        index={index}
                                                                    >
                                                                        {
                                                                            <div
                                                                                className="photo"
                                                                                ref={provided.innerRef}
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                            >
                                                                                <img
                                                                                    src={URL.createObjectURL(photo)}
                                                                                    alt=""
                                                                                />
                                                                                <button
                                                                                    type='button'
                                                                                    onClick={() => handleRemovePhoto(index)}
                                                                                >
                                                                                    <BiTrash />
                                                                                </button>
                                                                            </div>
                                                                        }

                                                                    </Draggable>
                                                                )
                                                            })
                                                        }
                                                        <input type="file" onChange={handleUploadPhotos} id='image' accept='image/*' style={{ display: 'none' }} multiple />
                                                        <label htmlFor="image" className='together'>
                                                            <div className="icon"><IoIosImages /></div>
                                                            <p>Apni photo upload kijiye</p>
                                                        </label>
                                                    </>
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </Droppable>
                        </DragDropContext> */}
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
                                                    type="file"
                                                    onChange={handleUploadPhotos}
                                                    id="image"
                                                    accept="image/*"
                                                    style={{ display: "none" }}
                                                    multiple
                                                />
                                                <label htmlFor="image" className="alone">
                                                    <div className="icon">
                                                        <IoIosImages />
                                                    </div>
                                                    <p>Apni photo upload kijiye</p>
                                                </label>
                                            </>
                                        )}
                                        {photos.length >= 1 && (
                                            <>
                                                {photos.map((photo, index) => (
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
                                                                    alt=""
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
                                                ))}
                                                <input
                                                    type="file"
                                                    onChange={handleUploadPhotos}
                                                    id="image"
                                                    accept="image/*"
                                                    style={{ display: "none" }}
                                                    multiple
                                                />
                                                <label htmlFor="image" className="together">
                                                    <div className="icon">
                                                        <IoIosImages />
                                                    </div>
                                                    <p>Apni photo upload kijiye</p>
                                                </label>
                                            </>
                                        )}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                        <h3>What make your place attractive and exciting?</h3>
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
                            <span>₹</span>
                            <input
                                type="number"
                                placeholder="100"
                                name="price"
                                className="price"
                                value={formDescription.price}
                                onChange={handleChangeDescription}
                                required
                            />
                        </div>
                    </div>
                    <button className="submit_btn" type="submit">
                        CREATE YOUR LISTING
                    </button>

                </form >
            </div >
        </>
    )
}

export default CreateListing;
