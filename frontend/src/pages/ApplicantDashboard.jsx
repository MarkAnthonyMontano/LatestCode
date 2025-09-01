import React, { useState, useEffect } from "react";
import "../styles/TempStyles.css";
import axios from "axios";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  Stack,
  Avatar,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

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
    profile_image: "",
  });

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
        fetchApplicantNumber(storedID);
      } else {
        window.location.href = "/login";
      }
    } else {
      window.location.href = "/login";
    }
  }, []);

  const fetchApplicantNumber = async (personID) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/applicant_number/${personID}`
      );
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
      setPerson(res.data);
    } catch (error) {
      console.error("Failed to fetch person:", error);
    }
  };

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <Box
      sx={{
        p: 4,
        marginLeft: "-2rem",
        paddingRight: 8,
        height: "calc(100vh - 150px)",
        overflowY: "auto",
      }}
    >
      {/* Header */}
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Applicant Dashboard
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ marginBottom: "1rem" }}
        gutterBottom
      >
        Date: {formattedDate}
      </Typography>

      <Grid container spacing={3}>
        {/* Applicant Information */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                {!person?.profile_image ? (
                  <PersonIcon sx={{ color: "maroon" }} fontSize="large" />
                ) : (
                  <Avatar
                    src={`http://localhost:5000/uploads/${person.profile_image}`}
                    sx={{ width: 50, height: 50 }}
                  />
                )}
                <Box>
                  <Typography variant="h5" fontWeight={600}>
                    {person.last_name?.toUpperCase()}, {person.first_name}{" "}
                    {person.middle_name} {person.extension}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Applicant ID: {applicantID || "N/A"}
                  </Typography>
                </Box>
              </Stack>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="subtitle2" color="text.secondary">
                Application Status
              </Typography>
              <Typography fontWeight={500}>Your application is registered.</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Application Steps */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2, minHeight: 180 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <DescriptionIcon sx={{ color: "maroon" }} fontSize="large" />
              <Typography variant="h6" gutterBottom sx={{ mt: 1 }}>
                Document Submitted
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Application is on process.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2, minHeight: 180 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <AssignmentTurnedInIcon sx={{ color: "maroon" }} fontSize="large" />

              <Typography variant="h6" gutterBottom sx={{ mt: 1 }}>
                Admission / Entrance Exam
              </Typography>

              {/* Info Text */}
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Check schedule and results of your exam.
              </Typography>

              {/* Exam Schedule */}
              <Typography variant="body2" sx={{ fontWeight: "bold", color: "maroon" }}>
                📅 Date: March 15, 2025
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold", color: "maroon" }}>
                🏫 Room: ITC Building - Room 203
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold", color: "maroon" }}>
                ⏰ Time: 9:00 AM – 12:00 NN
              </Typography>
                <Typography variant="body2" sx={{ fontWeight: "bold", color: "maroon" }}>
                Remarks:
              </Typography>
            </CardContent>
          </Card>
        </Grid>


        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2, minHeight: 180 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <EventIcon sx={{ color: "maroon" }} fontSize="large" />
              <Typography variant="h6" gutterBottom sx={{ mt: 1 }}>
                Interview Schedule
              </Typography>
              <Typography variant="body2" color="text.secondary">
                View your assigned interview slot.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Qualifying Exam / Aptitude Test */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2, minHeight: 180 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <SchoolIcon sx={{ color: "maroon" }} fontSize="large" />
              <Typography variant="h6" gutterBottom sx={{ mt: 1 }}>
                Qualifying Exam / Aptitude Test
              </Typography>
              <Typography variant="body2" color="text.secondary">
                View your exam schedule and results.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* College Approval */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2, minHeight: 180 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <CheckCircleIcon sx={{ color: "maroon" }} fontSize="large" />
              <Typography variant="h6" gutterBottom sx={{ mt: 1 }}>
                College Approval
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Track your application approval status.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Medical Submitted */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2, minHeight: 180 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <LocalHospitalIcon sx={{ color: "maroon" }} fontSize="large" />
              <Typography variant="h6" gutterBottom sx={{ mt: 1 }}>
                Medical Submitted
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Check the status of your medical records.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Applicant Status */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2, minHeight: 180 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <PersonIcon sx={{ color: "maroon" }} fontSize="large" />
              <Typography variant="h6" gutterBottom sx={{ mt: 1 }}>
                Applicant Status
              </Typography>
              <Typography variant="body2" color="text.secondary">
                View the current status of your application.
              </Typography>
            </CardContent>
          </Card>
        </Grid>


        {/* Announcement */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2 }}>
            <CardContent>
              <Typography sx={{ textAlign: "center" }} variant="h6" gutterBottom>
                Announcement
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary">
                Stay tuned for updates on admission results, schedules, and
                other important notices.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ApplicantDashboard;
