import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

// Define the type for challenge props
interface ChallengeProps {
  challenge: {
    startDate: string;
    endDate: string;
    name: string;
    image: string;
  };
}

const Challenge: React.FC<ChallengeProps> = ({ challenge }) => {
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const navigate=useNavigate()


  const monthNames:string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  // Function to determine the status and countdown
  const calculateStatusAndCountdown = () => {
    const now = new Date();
    const start = new Date(challenge.startDate);
    const end = new Date(challenge.endDate);

    if (now < start) {
      setStatus(`Starts in`);
      setTimeRemaining(getCountdown(start));
    } else if (now >= start && now <= end) {
      setStatus("Ends on");
      setTimeRemaining(getCountdown(end));
    } else {
      setStatus("Ended on");
      setTimeRemaining(`${end.getDate()}th ${monthNames[end.getMonth()]} ${end.getFullYear().toString().slice(2,)}`);
    }
  };

  // Function to calculate the countdown timer
  const getCountdown = (targetDate: Date) => {
    const now = new Date();
    const timeDifference = targetDate.getTime() - now.getTime();

    if (timeDifference <= 0) return "00d : 00h : 00m : 00s";

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDifference / 1000) % 60);

    return `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
  };

  // Update countdown every second
  useEffect(() => {
    calculateStatusAndCountdown();
    const interval = setInterval(calculateStatusAndCountdown, 1000);

    return () => clearInterval(interval);
  }, [challenge.startDate, challenge.endDate]);

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: 380,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: 3,
      }}
    >
      <CardActionArea
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <CardMedia
          component="img"
          image={challenge.image}
          alt={challenge.name || "Challenge Image"}
          sx={{
            width: "100%",
            height: "140px", // Set a fixed height
            objectFit: "cover", // Ensures the image covers the area without distortion
          }}
        />{" "}
        <CardContent
          className="space-y-2"
          sx={{
            textAlign: "center",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
         { status==='Ends on' || status==='Ended on'? <div className={` ${status==='Ends on'?' text-green-500 bg-green-200 ':' text-red-500 bg-red-200'} w-32 rounded-md `}>
          {status==='Ends on'?'Active':'Past'}
          </div>:null
          }
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
          >
            {challenge.name}
          </Typography>
          <div>
            {status}
          </div>
          <div

            className=" text-xl font-bold text-gray-700"
            // sx={{
            //   color:
            //     status === "Active"
            //       ? "#388e3c"
            //       : status.includes("Upcoming")
            //       ? "#1976d2"
            //       : "#d32f2f",
            //   backgroundColor:
            //     status === "Active"
            //       ? "#e8f5e9"
            //       : status === "Upcoming"
            //       ? "#e3f2fd"
            //       : "#ffebee",
            //   padding: "4px 8px",
            //   borderRadius: "8px",
            //   fontWeight: "medium",
            //   marginBottom: 2,
            // }}
          >
             {timeRemaining&&timeRemaining}
          </div>
          <Box sx={{ flexGrow: 1 }} />
          <button
            
            className=" bg-button rounded-lg h-10 w-56 text-white font-medium flex flex-row items-center justify-center space-x-4 "
            
            onClick={()=>{navigate('/participate')}}
          >
            <IoMdCheckmarkCircleOutline className=" text-2xl" />
           <span>Participate Now</span> 
          </button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Challenge;
