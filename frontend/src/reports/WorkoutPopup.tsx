// import React from "react";
// import "../stylesheets/PopupStyle.css";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// // import DatePicker from "react-horizontal-datepicker";
// import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
// import { TimeClock } from "@mui/x-date-pickers/TimeClock";
// import dayjs, { Dayjs } from "dayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// interface WorkoutPopupProps {
//   setShowWorkoutPopup: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const WorkoutPopup: React.FC<WorkoutPopupProps> = ({
//   setShowWorkoutPopup,
// }) => {
//   const color = "#ffc20e";

//   const [date, setDate] = React.useState<any>(new Date());

//   const selectedDay = (val: any) => {
//     console.log(val);
//   };

//   const [value, setValue] = React.useState<Dayjs | null>(
//     dayjs("2022-04-17T15:30")
//   );
//   return (
//     <div className="popupout">
//       <div className="popupbox">
//         <button
//           className="close"
//           onClick={() => {
//             setShowWorkoutPopup(false);
//           }}
//         >
//           <AiOutlineClose />
//         </button>

//         {/* <DatePicker
//           getSelectedDay={selectedDay}
//           endDate={100}
//           selectDate={new Date()}
//           labelFormat={"MMMM"}
//           color={color}
//         /> */}

//         <TextField
//           id="outlined-basic"
//           label="Today your workout"
//           variant="outlined"
//           color="warning"
//         />
//         {/* <TextField
//           id="outlined-basic"
//           label="Food item amount (in gms)"
//           variant="outlined"
//           color="warning"
//         /> */}
//         {/* <div className="timebox">
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <TimeClock
//               value={value}
//               onChange={(newValue) => setValue(newValue)}
//             />
//           </LocalizationProvider>
//         </div> */}
//         <Button variant="contained" style={{ background: "#ec1839", color: "white" }}>
//           Update
//         </Button>
//         <div className="hrline"></div>
//         <div className="items">
//           <div className="item">
//             <h3>Apple</h3>
//             <h3>100 gms</h3>
//             <button>
//               {" "}
//               <AiFillDelete />
//             </button>
//           </div>
//           <div className="item">
//             <h3>Banana</h3>
//             <h3>200 gms</h3>
//             <button>
//               {" "}
//               <AiFillDelete />
//             </button>
//           </div>
//           <div className="item">
//             <h3>Rice</h3>
//             <h3>300 gms</h3>
//             <button>
//               {" "}
//               <AiFillDelete />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WorkoutPopup;
