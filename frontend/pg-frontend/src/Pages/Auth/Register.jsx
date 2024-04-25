import React, { useState } from 'react'
import { FaUpload } from "react-icons/fa";
// import { FaUser } from "react-icons/fa";
import '../../Styles/Auth.css'

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        profileImg: null,
    });
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: value,
            [name]: name === 'profileImg' ? files[0] : value
        })
    }
    console.log(formData);
    return (
        <>
            <section className="register-section">
                <div className="heading">
                    <h1>Register Here</h1>
                    <h3>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique  <br /> facilis rem culpa fugiat eveniet quidem modi vero dicta in quo? <br />
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, eos?</h3>
                </div>
                <div className="register-container">
                    <form className="register-info">
                        <input id='image'
                            type="file"
                            name='profileImg'
                            accept='image/'
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="image">
                            <FaUpload className='uploader' />
                            <p>Upload your img.</p>
                        </label>
                        {
                            formData.profileImg && (
                                <img
                                    className='uploader'
                                    src={URL.createObjectURL(formData.profileImg)}
                                    alt="profile photo"
                                />
                            )
                        }
                        <input
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder='First Name'
                            name='firstName'
                            required
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
                            required
                        />
                        <input
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='Password'
                            name='password'
                            required
                        />
                        <input
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder='Confirm Password'
                            name='confirmPassword'
                            required
                        />
                        <button type='submit' className='btn'>REGISTER</button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Register
