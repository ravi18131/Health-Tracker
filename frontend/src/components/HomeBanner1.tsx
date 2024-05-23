import React from 'react'
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/joy/CircularProgress';
import { AiOutlineEye } from 'react-icons/ai'
import '../stylesheets/HomeBanner1.css';
import CalorieIntakePopup from '../reports/CalorieIntakePopup';
import SleepPopup from '../reports/SleepPopup';
import StepsPopup from '../reports/StepsPopup';
import WaterPopup from '../reports/WaterPopup';
import WeightPopup from '../reports/WeightPopup';


import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import { Navigate } from 'react-router-dom';

const SliderButtons = () => {
  // useSwiper Hook
  const swiper = useSwiper();

  return (
    <div className="slider-button">
      <button onClick={() => swiper.slidePrev()}>&lt;</button>
      <button onClick={() => swiper.slideNext()}>&gt;</button>
    </div>
  );
};

const HomeBanner1 = () => {
  const [showCalorieIntakePopup, setShowCalorieIntakePopup] = React.useState<boolean>(false);
  const [showSleepPopup, setShowSleepPopup] = React.useState<boolean>(false);
  const [showStepsPopup, setShowStepsPopup] = React.useState<boolean>(false);
  const [showWaterPopup, setShowWaterPopup] = React.useState<boolean>(false);
  const [showWeightPopup, setShowWeightPopup] = React.useState<boolean>(false);
  const [todosCalorie, setTodosCalorie] = React.useState<{ item: string, quantity: number, calories: number }[]>([]);
  console.log("todoscalorie" + todosCalorie);
  console.log(setTodosCalorie);

  const [data, setData] = React.useState<any>(null)

  function formatDateTime() {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    const formattedDateTime = date.toLocaleString('en-IN', options);
    return formattedDateTime;
  }

  const formattedDateTimeString = formatDateTime();
  console.log(formattedDateTimeString); // Output: "Thu Feb 29 2024 00:34"
  const navigate = useNavigate();




  const getData = async () => {
    let temp = [
      {
        name: "caloriesintake",
        value: 2000,
        unit: "kcal",
        goal: 2500,
        goalUnit: "kcal",
        lastUpdate: formattedDateTimeString,
      },
      {
        name: "sleep",
        value: 8,
        unit: "hrs",
        goal: 8,
        goalUnit: "hrs",
        lastUpdate: formattedDateTimeString,
      },
      {
        name: "steps",
        value: 50,
        unit: "steps",
        goal: 10000,
        goalUnit: "steps",
        lastUpdate: formattedDateTimeString,
      },
      {
        name: "water",
        value: 2000,
        unit: "ml",
        goal: 3000,
        goalUnit: "ml",
        lastUpdate: formattedDateTimeString,
      },
      {
        name: "weight",
        value: 75,
        unit: "kg",
        goal: 70,
        goalUnit: "kg",
        lastUpdate: formattedDateTimeString,
      },
      {
        name: "workout",
        value: 2,
        unit: "days",
        goal: 6,
        goalUnit: "days",
        lastUpdate: formattedDateTimeString,
      },
    ];
    setData(temp)
    console.log(temp)
  }

  React.useEffect(() => {
    getData()
  }, [])

  function simplifyFraction(numerator: number, denominator: number): [number, number] {
    function gcd(a: number, b: number): number {
      return b === 0 ? a : gcd(b, a % b);
    }
    const commonDivisor: number = gcd(numerator, denominator);

    // Simplify the fraction
    const simplifiedNumerator: number = numerator / commonDivisor;
    const simplifiedDenominator: number = denominator / commonDivisor;

    return [simplifiedNumerator, simplifiedDenominator];

  }
  return (
    <>
      <section className="container">
        <div className="paddings innerWidth theme-container meters">
          <div className="theme-head flexColStart">
            <span className="primaryText">Dashboard</span>
          </div>
          <Swiper
            slidesPerView={1}
            spaceBetween={50}
            breakpoints={{
              576: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1100: {
                slidesPerView: 3,
              },
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {/* Buttons for slider */}

            <SliderButtons />

            {
              <div className="">
                {data?.length > 0 &&
                  data.map((item: any, index: number) => {
                    return (
                      <SwiperSlide key={index}>
                        <div className="card" key={index}>
                          {/* Add Icon */}
                          <div className="icon-right">
                            {index === 0 && (
                              <i
                                className="fa-solid fa-plus"
                                onClick={() => {
                                  setShowCalorieIntakePopup(true);
                                }}
                              ></i>
                            )}

                            {index === 1 && (
                              <i
                                className="fa-solid fa-plus"
                                onClick={() => {
                                  setShowSleepPopup(true);
                                }}
                              ></i>
                            )}

                            {index === 2 && (
                              <i
                                className="fa-solid fa-plus"
                                onClick={() => {
                                  setShowStepsPopup(true);
                                }}
                              ></i>
                            )}

                            {index === 3 && (
                              <i
                                className="fa-solid fa-plus"
                                onClick={() => {
                                  setShowWaterPopup(true);
                                }}
                              ></i>
                            )}

                            {index === 4 && (
                              <i
                                className="fa-solid fa-plus"
                                onClick={() => {
                                  setShowWeightPopup(true);
                                }}
                              ></i>
                            )}
                          </div>

                          <div className="card-header">
                            <div className="card-header-box">
                              <div className="card-header-box-name">
                                {item.name}
                              </div>
                              <div className="card-header-box-value">
                                {item.value} {item.unit}
                              </div>
                            </div>
                            <div className="card-header-box">
                              <div className="card-header-box-name">Target</div>
                              <div className="card-header-box-value">
                                {item.goal} {item.goalUnit}
                              </div>
                            </div>
                          </div>

                          <CircularProgress
                            color="neutral"
                            determinate
                            variant="solid"
                            size="lg"
                            sx={{
                              "--CircularProgress-size": "100px",
                              "--CircularProgress-trackThickness": "10px",
                              "--CircularProgress-progressThickness": "10px",
                              margin: "5px",
                            }}
                            value={(item.value / item.goal) * 100}
                          >
                            <span className="textincircle">
                              {simplifyFraction(item.value, item.goal)[0] +
                                " / " +
                                simplifyFraction(item.value, item.goal)[1]}
                            </span>
                          </CircularProgress>

                          <button
                            onClick={() => {
                              navigate(`/report/${item.name}`);
                              // window.location.href = `/report/${item.name}`;
                            }}
                          >

                            Show Report <AiOutlineEye />
                          </button>

                          <div className="last-update-time">
                            <span>Last Updated - {item.lastUpdate}</span>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </div>
            }
          </Swiper>

          {showCalorieIntakePopup && (
            <CalorieIntakePopup
              setShowCalorieIntakePopup={setShowCalorieIntakePopup}
              setTodosCalorie={setTodosCalorie} // Add this line
            />
          )}

          {showSleepPopup && (
            <SleepPopup
              setShowSleepPopup={setShowSleepPopup}
            />
          )}

          {showStepsPopup && (
            <StepsPopup
              setShowStepPopup={setShowStepsPopup}
            />
          )}

          {showWaterPopup && (
            <WaterPopup
              setShowWaterPopup={setShowWaterPopup}
            />
          )}

          {showWeightPopup && (
            <WeightPopup
              setShowWeightPopup={setShowWeightPopup}
            />
          )}
        </div>
      </section>
    </>
  );
}

export default HomeBanner1
