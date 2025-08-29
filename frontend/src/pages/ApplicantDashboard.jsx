import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/TempStyles.css";
import {
  Container,
  Box,
  Typography,
  Card, CardContent

} from "@mui/material";

import { TbArrowBadgeRightFilled as ArrowIcon } from "react-icons/tb";

// Step data
const steps = [
  { label: "Application Status", color: "#AC3B9A", style: { marginRight: "10px" } },
  { label: "Document Submission", color: "#4B83C3", style: { marginRight: "10px" } },
  { label: "Entrance Examination", color: "#F0C03F", style: { marginRight: "10px" } },
  { label: "Interview", color: "#7AC142", style: { marginRight: "20px" } },
  { label: "Verification", color: "#50BEBE", style: { marginRight: "10px" } },
  { label: "College Approval", color: "#E43E3E", style: { marginRight: "10px" } },
  { label: "Medical Submission", color: "#2B3F73", style: { marginRight: "10px" } },
  { label: "Applicant Status", color: "#B33A3A", style: { marginRight: "10px" } },
];

const StepIcon = ({ label, color }) => (
  <Box
    sx={{
      width: "100px",
      height: "100px",
      position: "relative",
      color: "white",
      marginLeft: "20px",
    }}
  >
    <ArrowIcon
      style={{
        color: color,
        width: "100%",
        height: "100%",
        transform: "scaleX(3.5) scaleY(1.75)",
      }}
    />
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start", // aligns text left inside chevron
        paddingLeft: "20px", // ✅ pushes the text right by 15px
        fontWeight: "bold",
        fontSize: "14px",
        textAlign: "left",
        pointerEvents: "none",
        whiteSpace: "normal",
      }}
    >
      {label}
    </Box>
  </Box>
);


const ApplicantDashboard = () => {
  const [userID, setUserID] = useState("");
  const [user, setUser] = useState("");
  const [userRole, setUserRole] = useState("");
  const [applicantID, setApplicantID] = useState("");

  const [person, setPerson] = useState({

    last_name: "",
    first_name: "",
    middle_name: "",
    extension: "",

  });

  // Calls the backend to fetch the applicant number using personID
  const fetchApplicantNumber = async (personID) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/applicant_number/${personID}`);
      if (res.data && res.data.applicant_number) {
        setApplicantID(res.data.applicant_number);
      }
    } catch (error) {
      console.error("Failed to fetch applicant number:", error);
    }
  };


  const fetchPersonData = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/person/${id}`);
      setPerson(res.data); // make sure backend returns the correct format
    } catch (error) {
      console.error("Failed to fetch person:", error);
    }
  };

  // do not alter
  useEffect(() => {
    const storedUser = localStorage.getItem("email");
    const storedRole = localStorage.getItem("role");
    const storedID = localStorage.getItem("person_id");

    if (storedUser && storedRole && storedID) {
      setUser(storedUser);
      setUserRole(storedRole);
      setUserID(storedID);

      if (storedRole === "applicant") {
        fetchPersonData(storedID);
        fetchApplicantNumber(storedID); // ✅ fetch applicant number too
      } else {
        window.location.href = "/login";
      }
    } else {
      window.location.href = "/login";
    }
  }, []);


  return (

    <Box sx={{ height: "calc(100vh - 150px)", overflowY: "auto", paddingRight: 1, backgroundColor: "transparent" }}>

      <Container>
        <h1 style={{ fontSize: "50px", fontWeight: "bold", textAlign: "center", color: "maroon", marginTop: "25px" }}>APPLICANT DASHBOARD</h1>
        <div style={{ textAlign: "center" }}>Complete the applicant form to secure your place for the upcoming academic year at EARIST.</div>
      </Container>

      <div style={{ height: "15px" }}></div>

      <Box
        sx={{
          backgroundColor: "#6D2323",
          border: "2px solid black",
          borderRadius: "10px",
          color: "white",
          width: "95%",
          boxShadow: 3,
          mx: "auto",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            height: "50px",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
          }}
        >
          <Typography sx={{ fontSize: "20px", fontFamily: "Arial Black" }}>
            Applicant ID: <span style={{ textDecoration: "underline" }}>{applicantID || "N/A"}</span>
          </Typography>


          <Typography sx={{ fontSize: "20px", fontFamily: "Arial Black" }}>
            Applicant Name:{" "}
            <span style={{ textDecoration: "underline" }}>
              {person.last_name?.toUpperCase()}, {person.first_name?.toUpperCase()} {person.middle_name?.toUpperCase()} {person.extension_name?.toUpperCase()}
            </span>
          </Typography>

        </Box>
      </Box>


      <Box
        sx={{
          backgroundColor: "#f1f1f1",
          border: "2px solid black",
          padding: 4,
          borderRadius: "10px",
          width: "95%",
          boxShadow: 3,
          mx: "auto",
        }}
      >
        <Typography variant="h4" textAlign="center" fontWeight={600} gutterBottom>
          Application Procedure
        </Typography>

        {/* Step Chevrons */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "nowrap",        // ❌ prevent wrapping
            justifyContent: "space-between",
            width: "100%",
            marginLeft: "10px",
          }}
        >
          {steps.map((step, index) => (
            <Box
              key={index}
              sx={{
                width: "12.3%",
                textAlign: "center",
                marginLeft: "-10px",
              }}
            >
              <StepIcon style={{ marginLeft: "-20px", }} label={step.label} color={step.color} />
              <Card
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: 2,
                  boxShadow: 3,
                  marginTop: "10px",
                  paddingLeft: "-20px",
                  width: "150px",
                  minHeight: "200px",
                  mx: "auto",
                  transition: "transform 0.2s ease",
                  "&:hover": { transform: "scale(1.03)" },
                }}
              >

              </Card>
            </Box>
          ))}
        </Box>

        {/* Additional Steps (Schedule, Admission, Interview, etc.) */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "5px",
            width: "97.9%",
            marginLeft: "30px",
          }}
        >
          <StepIcon label="Examination Schedule" color="#234A8F" />

          <Box
            sx={{
              backgroundColor: "#f1f1f1",

              padding: "10px",
              minHeight: "60px",
              height: "90px",
              fontSize: "13px",
              flex: 1,
              marginLeft: "100px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {/* First Row: Date and Room */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontWeight: "bold", minWidth: "60px" }}>Date:</Typography>
              <Box sx={{ width: "450px" }} /> {/* Gap */}
              <Typography sx={{ fontWeight: "bold" }}>Room:</Typography>
            </Box>

            {/* Second Row: Time */}
            <Box sx={{ marginTop: "5px" }}>
              <Typography sx={{ fontWeight: "bold" }}>Time:</Typography>
            </Box>
          </Box>
        </Box>

        {/* Admission & Entrance Exam */}
        <Box
          sx={{ display: "flex", alignItems: "center", marginTop: "5px", width: "97.9%", marginLeft: "30px" }}
        >
          <StepIcon label="Admission & Entrance Exam" color="#F0C03F" />
          <Card
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
              boxShadow: 3,
              marginTop: "10px",
              marginLeft: "100px",
              flex: 1,
              minHeight: "100px",
              transition: "transform 0.2s ease",
              "&:hover": { transform: "scale(1.03)" },
            }}
          >
            <CardContent>

            </CardContent>
          </Card>
        </Box>

        {/* Interview */}
        <Box
          sx={{ display: "flex", alignItems: "center", marginTop: "5px", width: "97.9%", marginLeft: "30px" }}
        >
          <StepIcon label="Interview" color="#4B83C3" />
          <Card
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
              boxShadow: 3,
              marginTop: "10px",
              marginLeft: "100px",
              flex: 1,
              minHeight: "100px",
              transition: "transform 0.2s ease",
              "&:hover": { transform: "scale(1.03)" },
            }}
          >
            <CardContent>

            </CardContent>
          </Card>
        </Box>

        {/* Qualifying Exam / Aptitude Test */}
        <Box
          sx={{ display: "flex", alignItems: "center", marginTop: "5px", width: "97.9%", marginLeft: "30px" }}
        >
          <StepIcon label="Qualifying Exam/Aptitude Test" color="#4CAF50" />
          <Card
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
              boxShadow: 3,
              marginTop: "10px",
              marginLeft: "100px",
              flex: 1,
              minHeight: "100px",
              transition: "transform 0.2s ease",
              "&:hover": { transform: "scale(1.03)" },
            }}
          >
            <CardContent>

            </CardContent>
          </Card>
        </Box>

        {/* Announcement */}
        <Box
          sx={{ display: "flex", alignItems: "center", marginTop: "5px", width: "97.9%", marginLeft: "30px" }}
        >
          <StepIcon label="Announcement" color="#00ACC1" />
          <Card
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
              boxShadow: 3,
              marginTop: "10px",
              marginLeft: "100px",
              flex: 1,
              minHeight: "100px",
              transition: "transform 0.2s ease",
              "&:hover": { transform: "scale(1.03)" },
            }}
          >
            <CardContent>

            </CardContent>
          </Card>
        </Box>

      </Box>
    </Box>
  );
};

export default ApplicantDashboard;
