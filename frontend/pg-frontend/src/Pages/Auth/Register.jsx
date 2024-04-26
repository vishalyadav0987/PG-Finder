import React, { useEffect, useState } from 'react'
// import { FaUpload } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import avatar from '../../assets/profile.png'
// import { FaUser } from "react-icons/fa";
import '../../Styles/Auth.css'


const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        profileImage: null,
    });
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: value,
            [name]: name === 'profileImage' ? files[0] : value
        })
    }
    console.log(formData);

    const [passwordMatch, setPasswordMatch] = useState(true);

    useEffect(() => {
        setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "")
    })
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     // if(formData.password === formData.confirmPassword){
    //     //     setPasswordMatch(true);
    //     // }
    //     // else{
    //     //     setPasswordMatch(false);
    //     //     toast.success('This is a success message!', {
    //     //         position: toast.POSITION.TOP_CENTER // Set the position to top-center
    //     //       });
    //     // }
    //     try {
    //         const register_info = new FormData();
    //         for (var key in formData) {
    //             // register_info.append();
    //             register_info.append(key, formData[key])
    //         }
    //         const response = await fetch('http://localhost:3000/api/v1/auth/register', {
    //             method: "POST",
    //             body: register_info,
    //         })
    //         if (response.ok) {
    //             toast.success('Registration successful!');
    //             navigate('/login');

    //         } else {
    //             toast.error('Registration failed. Please try again.');
    //         }
    //     } catch (error) {
    //         console.log("Registration Failed:", error);
    //         toast.error('Registration failed. Please try again.');
    //     }
    // }




    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if any field is empty
        if (
            !formData.profileImage
        ) {
            // Show toast message indicating all fields are required
            toast.error('Please upload the image');
            return;
        }
        if (
            !formData.firstName
        ) {
            // Show toast message indicating all fields are required
            toast.error('Please Fill the firstname');
            return;
        }
        if (
            !formData.lastName
        ) {
            // Show toast message indicating all fields are required
            toast.error('Please Fill the lastname');
            return;
        }
        if (
            !formData.email
        ) {
            // Show toast message indicating all fields are required
            toast.error('Please Fill the email');
            return;
        }
        if (
            !formData.password
        ) {
            // Show toast message indicating all fields are required
            toast.error('Please Fill the password');
            return;
        }
        try {
            const register_info = new FormData();
            for (var key in formData) {
                register_info.append(key, formData[key])
            }
            const response = await fetch('http://localhost:3000/api/v1/auth/register', {
                method: "POST",
                body: register_info,
            });
            const { msg } = await response.json();
            if (response.ok) {
                toast.success(msg);
                navigate('/login');
            } else {
                toast.error(msg);
                console.log(msg)
            }
        } catch (error) {
            console.log("Registration Failed:", error);
            toast.error('Registration failed. Please try again. ok ok');
        }
    };


    return (
        <>
            <section className="register-section">
                <Toaster position='top-center' reverseOrder={false} />
                <div className="heading">
                    <h1>Register Here</h1>
                    <h3>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique  <br /> facilis rem culpa fugiat eveniet quidem modi vero dicta in quo? <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, eos?</h3>
                </div>
                <div className="register-container">
                    <form className="register-info" onSubmit={handleSubmit}>
                        <input id='image'
                            type="file"
                            name='profileImage'
                            accept='image/*'
                            style={{ display: 'none' }}
                            onChange={handleChange}
                        />
                        <label htmlFor="image">
                            <img
                                className='uploader'
                                src={formData.profileImage ?
                                    URL.createObjectURL(formData.profileImage) : avatar}
                                alt="profile photo"
                            />
                        </label>
                        {/* {
                            formData.profileImage && (
                                <img
                                    className='uploader'
                                    src={URL.createObjectURL(formData.profileImage)}
                                    alt="profile photo"
                                />
                            )
                        } */}
                        <input
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder='First Name'
                            name='firstName'
                        // required
                        />
                        <input
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder='Last Name'
                            name='lastName'
                        />
                        <input
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Email'
                            name='email'
                        // required
                        />
                        <input
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='Password'
                            name='password'
                        // required
                        />
                        <input
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder='Confirm Password'
                            name='confirmPassword'
                        // required
                        />
                        {
                            !passwordMatch && (
                                <p style={{ color: "red" }}>Password not matched!</p>
                            )
                        }
                        <button type='submit' disabled={!passwordMatch} className='btn'>REGISTER</button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Register
