import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../stylesheets/ContactUsStyle.css";
import Lottie from "lottie-react";
import LoginAnimation from "../../animations/loginAnimation.json";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const URL = "http://localhost:8000/auth/login";

const Login = () => {
  const navigate = useNavigate();

  const [loginformData, setLoginFormData] = useState({
    email: '',
    password: '',
  })

  const [isLoading, setIsLoading] = useState(false);

  // handling input fields as user types
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setLoginFormData({
      ...loginformData,
      [name]: value,
    });
  };

  console.log(loginformData);

  // form submit handle

  const handleLogin = () => {
    console.log(loginformData);

    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginformData),
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)

        if (data.ok) {
          toast.success(data.message);
          navigate('/dashboard');
        }
        else {
          toast.error(data.message)
        }
      }).catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      <section className="contact-us-section" style={{ marginTop: "10rem" }}>
        <div className="container">
          <h1 className="main-heading fw-bold" style={{ marginLeft: "8rem" }}>
            Login
          </h1>

          {/* Contact Form */}
          <div className="row">
            <div className="col-12 col-lg-10 mx-auto">
              <div className="row">
                {/* Left Side Part */}
                <div className="contact-left-side col-12 col-lg-5">
                  <figure>
                    <Lottie
                      loop={true}
                      animationData={LoginAnimation}
                      className="lottie-animation"
                    />
                  </figure>
                </div>

                {/* Right Side Part */}
                <div className="contact contact-right-side col-12 col-lg-7">
                  <form action="">
                    {/* first row */}
                    <div className="row">
                      <div className="col-12 col-lg-12 contact-input-field">
                        <input
                          type="email"
                          placeholder="Email"
                          className="form-control"
                          name="email"
                          autoComplete="off"
                          value={loginformData.email}
                          onChange={handleInput}
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    {/* second row */}
                    <div className="row">
                      <div className="col-12 col-lg-12 contact-input-field">
                        <input
                          type="password"
                          placeholder="Password"
                          className="form-control"
                          name="password"
                          autoComplete="off"
                          value={loginformData.password}
                          onChange={handleInput}
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                    

                    <div className="row">
                      <button
                        type="submit"
                        className="btn-style w-100"
                        disabled={isLoading}
                        onClick={(e) => {
                          e.preventDefault()
                          handleLogin()
                        }}
                      >
                        Login
                      </button>
                    </div>

                    <div className="row" style={{ marginTop: '2rem' }}>
                      <div>
                        <p className="login-text">
                          Don't have an Account ?{" "}
                          <a href="/register">Sign Up</a>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
