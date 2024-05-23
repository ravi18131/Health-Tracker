import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import "../../stylesheets/RegistrationFormStyle.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegistrationForm = () => {

  const [showSignup, setShowSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState({
    // Step 1 Personal Deatails 
    name: "",
    password: "",
    confirmpassword: "",
    email: "",
    gender: "",
    dob: "",
    // Step-2 Physical Details
    weight: "",
    height: "",
    disease: "",
    familyDisease: "",
  });


  console.log(data);

  //for handling the form fields
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({
      ...data,
      [name]: value,
    });
  };

  const [step, setStep] = useState(1);

  const nextStep = () => {
    // Validate before moving to the net step
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  // Function to validate step before proceeding
  const validateStep = (step) => {
    switch (step) {
      case 1:
        return (
          data.name &&
          data.password &&
          data.confirmpassword &&
          data.email &&
          data.dob &&
          data.gender &&
          data.confirmpassword === data.password
        );
      case 2:
        return data.weight &&
          data.height &&
          data.disease &&
          data.familyDisease;

      default:
        return true;
    }
  };

  const navigate = useNavigate()
  const handleSignup = () => {
    fetch("http://localhost:8000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.ok) {
          toast.success(data.message);
          setShowSignup(false);
          navigate('/');
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <section className="form-wrap">
      <div className="form-container">
        <form id="multi-step-form">
          <div
            id="form-container-box"
            style={{ display: step === 4 ? "none" : "block" }}
          >
            <h1 className="form-title">Registration Form</h1>
            <ul className="progress-bar">
              <li
                className={
                  step === 1 || step === 2 || step === 3 ? "active" : ""
                }
              >
                <span className="step-title">
                  <span>Personal</span>
                  <span>Details</span>
                </span>
              </li>
              <li
                className={
                  step === 2 || step === 3 ? "active line-bar" : "line-bar"
                }
              >
                <span className="step-title">
                  <span>Physical</span>
                  <span>Details</span>
                </span>
              </li>
              <li className={step === 3 ? "active line-bar" : "line-bar"}>
                <span className="step-title">
                  <span>Review</span>
                  <span>Details</span>
                </span>
              </li>
            </ul>

            {/* <<<<< Step 1 >>>>> */}
            <div
              className="step-group"
              style={{ display: step === 1 ? "block" : "none" }}
            >
              {/* Step 1 content */}
              <div class="form-box">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-field"
                    placeholder="Name"
                    name="name"
                    value={data.name}
                    onChange={handleInput}
                    disabled={isLoading}
                  />
                </div>
                <div class="form-group">
                  <input
                    type="email"
                    class="form-field"
                    placeholder="Email"
                    name="email"
                    value={data.email}
                    onChange={handleInput}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div class="form-box">
                <div class="form-group">
                  <select
                    name="gender"
                    value={data.gender}
                    onChange={handleInput}
                    class="form-field"
                    disabled={isLoading}
                    required
                  >
                    <option class="form-field" value="">Select Gender</option>
                    <option class="form-field" value="Male">Male</option>
                    <option class="form-field" value="Female">Female</option>
                    <option class="form-field" value="Other">Other</option>
                  </select>
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    placeholder="DOB"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    class="form-field"
                    name="dob"
                    value={data.dob}
                    onChange={handleInput}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div class="form-box">
                <div class="form-group">
                  <input
                    type="password"
                    class="form-field"
                    placeholder="password"
                    name="password"
                    value={data.password}
                    onChange={handleInput}
                    disabled={isLoading}
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-field"
                    placeholder="Confirm password"
                    name="confirmpassword"
                    value={data.confirmpassword}
                    onChange={handleInput}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="form-box">
                <div className="btn-step">
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!validateStep(step)}
                  >
                    Next &#65515;
                  </button>
                </div>
              </div>
            </div>

            {/* <<<<< Step 2 >>>>> */}
            <div
              className="step-group"
              style={{ display: step === 2 ? "block" : "none" }}
            >
              <div class="form-box">
                <div class="form-group">
                  <input
                    type="number"
                    class="form-field"
                    placeholder="Weight"
                    name="weight"
                    value={data.weight}
                    onChange={handleInput}
                    disabled={isLoading}
                  />
                </div>
                <div class="form-group">
                  <input
                    type="number"
                    class="form-field"
                    placeholder="Height"
                    name="height"
                    value={data.height}
                    onChange={handleInput}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div class="form-box">
                <div class="form-group">
                  <select
                    name="disease"
                    value={data.disease}
                    onChange={handleInput}
                    class="form-field"
                    disabled={isLoading}
                    required
                  >
                    <option class="form-field" value="">Have you any disease?</option>
                    <option class="form-field" value="Diabetes">Diabetes</option>
                    <option class="form-field" value="Cancer">Cancer</option>
                    <option class="form-field" value="Heart Disease">Heart Disease</option>
                    <option class="form-field" value="No">No</option>
                  </select>
                </div>

                <div class="form-group">
                  <select
                    name="familyDisease"
                    value={data.familyDisease}
                    onChange={handleInput}
                    class="form-field"
                    disabled={isLoading}
                    required
                  >
                    <option class="form-field" value="">Any disease to your family member?</option>
                    <option class="form-field" value="Diabetes">Diabetes</option>
                    <option class="form-field" value="Cancer">Cancer</option>
                    <option class="form-field" value="Heart Disease">Heart Disease</option>
                    <option class="form-field" value="No">No</option>
                  </select>
                </div>
              </div>

              {/* Buttons */}
              <div className="form-box">
                <div className="btn-step">
                  <button type="button" onClick={prevStep}>
                    &#65513; Prev
                  </button>
                  <button type="button" onClick={nextStep}>
                    Next &#65515;
                  </button>
                </div>
              </div>
            </div>

            {/* <<<<< Step 3 >>>>> */}
            <div
              className="step-group"
              style={{ display: step === 3 ? "block" : "none" }}
            >
              <div className="review-title">Personal Details</div>

              <div className="review-box">
                <div className="form-group data">
                  <span className="data-heading">Name</span>
                  <span className="data-value">{data.name}</span>
                </div>

                <div className="form-group data">
                  <span className="data-heading">Email</span>
                  <span className="data-value">{data.email}</span>
                </div>
              </div>

              <div className="review-box">
                <div className="form-group data">
                  <span className="data-heading">Gender</span>
                  <span className="data-value">{data.gender}</span>
                </div>

                <div className="form-group data">
                  <span className="data-heading">DOB</span>
                  <span className="data-value">{data.dob}</span>
                </div>
              </div>

              <div className="review-title">Physical Details</div>
              <div className="review-box">
                <div className="form-group data">
                  <span className="data-heading">Weight</span>
                  <span className="data-value">{data.weight}</span>
                </div>

                <div className="form-group data">
                  <span className="data-heading">Height</span>
                  <span className="data-value">{data.height}</span>
                </div>
              </div>

              <div className="review-box">
                <div className="form-group data">
                  <span className="data-heading">Disease</span>
                  <span className="data-value">{data.disease}</span>
                </div>

                <div className="form-group data">
                  <span className="data-heading">Family Member Disease</span>
                  <span className="data-value">{data.familyDisease}</span>
                </div>
              </div>

              <div className="form-box">
                <div className="btn-step">
                  <button type="button" onClick={prevStep}>
                    &#9998; Edit
                  </button>
                  <button type="button" onClick={(e) => {
                    e.preventDefault();
                    handleSignup();
                  }}>
                    Submit &#65515;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div>
          <p className="login-text">
            Already have an Account ? <a href="/login" onClick={() => {
              setShowSignup(false);
            }}>Sign In</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
