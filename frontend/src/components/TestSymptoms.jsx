import React, { useState } from "react";
import { DashboardLayout } from "./dashboard_components/DashboardLayout";
import "../stylesheets/TestSymptoms.css";
import { Select, Space, Button } from "antd";

import Lottie from "lottie-react";
import testYourSelf from "../animations/test_yourself.json";

const TestSymptoms = () => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [searched, setSearched] = useState(false);

  const [predictedDisease, setPredictedDisease] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [disDes, setDisDes] = useState("");
  const [myDiet, setMyDiet] = useState([]);
  const [precautions, setPrecautions] = useState([]);
  const [workout, setWorkout] = useState([]);
  const [medications, setMedications] = useState([]);

  let symptoms = [
    "itching",
    "skin_rash",
    "nodal_skin_eruptions",
    "continuous_sneezing",
    "shivering",
    "chills",
    "joint_pain",
    "stomach_pain",
    "acidity",
    "ulcers_on_tongue",
    "muscle_wasting",
    "vomiting",
    "burning_micturition",
    "spotting_ urination",
    "fatigue",
    "weight_gain",
    "anxiety",
    "cold_hands_and_feets",
    "mood_swings",
    "weight_loss",
    "restlessness",
    "lethargy",
    "patches_in_throat",
    "irregular_sugar_level",
    "cough",
    "high_fever",
    "sunken_eyes",
    "breathlessness",
    "sweating",
    "dehydration",
    "indigestion",
    "headache",
    "yellowish_skin",
    "dark_urine",
    "nausea",
    "loss_of_appetite",
    "pain_behind_the_eyes",
    "back_pain",
    "constipation",
    "abdominal_pain",
    "diarrhoea",
    "mild_fever",
    "yellow_urine",
    "yellowing_of_eyes",
    "acute_liver_failure",
    "fluid_overload",
    "swelling_of_stomach",
    "swelled_lymph_nodes",
    "malaise",
    "blurred_and_distorted_vision",
    "phlegm",
    "throat_irritation",
    "redness_of_eyes",
    "sinus_pressure",
    "runny_nose",
    "congestion",
    "chest_pain",
    "weakness_in_limbs",
    "fast_heart_rate",
    "pain_during_bowel_movements",
    "pain_in_anal_region",
    "bloody_stool",
    "irritation_in_anus",
    "neck_pain",
    "dizziness",
    "cramps",
    "bruising",
    "obesity",
    "swollen_legs",
    "swollen_blood_vessels",
    "puffy_face_and_eyes",
    "enlarged_thyroid",
    "brittle_nails",
    "swollen_extremeties",
    "excessive_hunger",
    "extra_marital_contacts",
    "drying_and_tingling_lips",
    "slurred_speech",
    "knee_pain",
    "hip_joint_pain",
    "muscle_weakness",
    "stiff_neck",
    "swelling_joints",
    "movement_stiffness",
    "spinning_movements",
    "loss_of_balance",
    "unsteadiness",
    "weakness_of_one_body_side",
    "loss_of_smell",
    "bladder_discomfort",
    "foul_smell_of urine",
    "continuous_feel_of_urine",
    "passage_of_gases",
    "internal_itching",
    "toxic_look_(typhos)",
    "depression",
    "irritability",
    "muscle_pain",
    "altered_sensorium",
    "red_spots_over_body",
    "belly_pain",
    "abnormal_menstruation",
    "dischromic _patches",
    "watering_from_eyes",
    "increased_appetite",
    "polyuria",
    "family_history",
    "mucoid_sputum",
    "rusty_sputum",
    "lack_of_concentration",
    "visual_disturbances",
    "receiving_blood_transfusion",
    "receiving_unsterile_injections",
    "coma",
    "stomach_bleeding",
    "distention_of_abdomen",
    "history_of_alcohol_consumption",
    "fluid_overload.1",
    "blood_in_sputum",
    "prominent_veins_on_calf",
    "palpitations",
    "painful_walking",
    "pus_filled_pimples",
    "blackheads",
    "scurring",
    "skin_peeling",
    "silver_like_dusting",
    "small_dents_in_nails",
    "inflammatory_nails",
    "blister",
    "red_sore_around_nose",
    "yellow_crust_ooze",
  ];

  const options = symptoms.map((symptom) => ({
    value: symptom,
    label: symptom,
  }));

  const handleChange = (selected) => {
    setSelectedValues(selected);
  };

  const handleBookSpecialist = () => {
    // alert("You booked a "+specialist+" specialist");
    // Redirect to the specialist booking page along with the specialist name
    window.location.href = `/doctors?specialist=${specialist}&rating=high`;
  };

  const onSearch = () => {
    const selectedString = selectedValues.join(", ");
    // const proxyUrl = "http://localhost:8080/";
    const apiUrl = "https://diagnose-api.onrender.com/predict";

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ symptoms: selectedString }),
    })
      .then((response) => response.json())
      .then((data) => {
        setDisDes(data.dis_des);
        setMedications(
          data.medications[0]
            .replace("[", "")
            .replace("]", "")
            .split(", ")
            .map((medication) => medication.replace(/'/g, ""))
        );
        setMyDiet(
          data.my_diet[0]
            .replace("[", "")
            .replace("]", "")
            .split(", ")
            .map((diet) => diet.replace(/'/g, ""))
        );
        setPrecautions(data.precautions[0]);
        setWorkout(data.workout);
        setPredictedDisease(data.predicted_disease);
        setSpecialist(data.specialist);

        setSearched(true);

        // Printing data on console
        console.log("disDes:", disDes);
        console.log("medications:", medications);
        console.log("myDiet:", myDiet);
        console.log("precautions:", precautions);
        console.log("workout:", workout);
        console.log("predictedDisease:", predictedDisease);
        console.log("Suggested Specialist:", specialist);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="search-bar-header">
        <Space style={{ width: "100%" }} direction="vertical">
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            defaultValue={[]}
            onChange={handleChange}
            options={options}
          />
        </Space>

        <Button
          type="primary"
          icon={<i class="fa-solid fa-magnifying-glass"></i>}
          className="search-btn"
          onClick={onSearch}
        >
          Test Symptoms
        </Button>
      </div>

      <section className="test-symptoms">
        {!searched && (
          <div className="m-0 p-0 d-flex flex-column align-items-center justify-content-center">
            <Lottie
              loop={true}
              animationData={testYourSelf}
              style={{ width: "300px" }}
            />
            <div
              style={{
                color: "var(--headingColor)",
                fontWeight: "bold",
                fontSize: "1.3rem",
              }}
            >
              Test Yourself
            </div>
          </div>
        )}

        {predictedDisease && (
          <div>
            <h3 className="prediction-heading">Disease</h3>
            <div className="disease-info">
              <h6 className="disease-name">{predictedDisease}</h6>
              <p className="prediction-para">{disDes}</p>
            </div>
          </div>
        )}

        {specialist && (
          <div>
            <h3 className="prediction-heading">Suggested Specialist</h3>
            <div className="disease-info pb-3">
              <h6 className="disease-name">{specialist}</h6>
              <Button
                type="primary"
                className="search-btn"
                onClick={handleBookSpecialist}
              >
                Book Now
              </Button>
            </div>
          </div>
        )}

        {myDiet.length > 0 && (
          <div>
            <h3 className="prediction-heading">Recommended Diets</h3>
            <div className="row">
              {myDiet.map((data, index) => {
                return (
                  <>
                    <div
                      className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12"
                      key={index}
                    >
                      <p className="predicted-item">{data}</p>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        )}

        {medications.length > 0 && (
          <div>
            <h3 className="prediction-heading">Recommended Medications</h3>

            <div className="row">
              {medications.map((data, index) => {
                return (
                  <>
                    <div
                      className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12"
                      key={index}
                    >
                      <p className="predicted-item">{data}</p>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        )}

        {precautions.length > 0 && (
          <div>
            <h3 className="prediction-heading">Recommended Precautions</h3>

            <div className="row">
              {precautions.map((data, index) => {
                return (
                  <>
                    <div
                      className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12"
                      key={index}
                    >
                      <p className="predicted-item">{data}</p>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        )}

        {workout.length > 0 && (
          <div>
            <h3 className="prediction-heading">Recommended Workouts</h3>
            <div className="row">
              {workout.map((data, index) => {
                return (
                  <>
                    <div
                      className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-xs-12"
                      key={index}
                    >
                      <p className="predicted-item">{data}</p>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </>
  );
};
export default TestSymptoms;
