import React, { useEffect, useState } from "react";
import axios from "axios";

const AttendancePortal = ({ userRole }) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]); // Default to current date
  const [selectedHours, setSelectedHours] = useState("");

  useEffect(() => {
    axios.get("/api/students")
      .then(response => setStudents(response.data))
      .catch(error => console.error("Error fetching students:", error));
  }, []);

  useEffect(() => {
    axios.get("/api/attendance")
      .then(response => setAttendanceData(response.data))
      .catch(error => console.error("Error fetching attendance data:", error));
  }, []);

  const handleSubmit = () => {
    if (!selectedDate || !selectedStudent || !selectedHours) {
      alert("Please fill all fields!");
      return;
    }

    const attendanceEntry = {
      date: selectedDate,
      studentId: selectedStudent,
      hours: selectedHours,
      status: "Present"
    };

    axios.post("/api/attendance", attendanceEntry)
      .then(response => {
        alert("Attendance recorded successfully!");
        setAttendanceData([...attendanceData, { ...attendanceEntry, studentName: students.find(s => s.id === selectedStudent).name }]);
        setSelectedDate(new Date().toISOString().split("T")[0]);
        setSelectedStudent("");
        setSelectedHours("");
      })
      .catch(error => {
        console.error("Error submitting attendance:", error);
        alert("Failed to submit attendance.");
      });
  };

  const toggleAttendance = (index) => {
    const updatedData = [...attendanceData];
    updatedData[index].status = updatedData[index].status === "Present" ? "Absent" : "Present";
    setAttendanceData(updatedData);
  };

  return (
    <div style={styles.container}>
      {/* Full-Width Form Card */}
      <div style={styles.card}>
        <h3 style={styles.subHeader}>Mark Attendance</h3>
        <div style={styles.formGroup}>
          
          {/* Date Input */}
          <input 
            type="date" 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)} 
            style={{ ...styles.input, flex: 1 }}
          />

          {/* Student Dropdown - Increased Width */}
          <select 
            value={selectedStudent} 
            onChange={(e) => setSelectedStudent(e.target.value)} 
            style={{ ...styles.input, flex: 2, minWidth: "200px" }}
          >
            <option value="">Select Classs</option>
           
          </select>

          {/* Hours Dropdown */}
          <select 
            value={selectedHours} 
            onChange={(e) => setSelectedHours(e.target.value)} 
            style={{ ...styles.input, flex: 1 }}
          >
            <option value="">Select Hours</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(hour => (
              <option key={hour} value={hour}>
                {hour} Hour{hour > 1 ? "s" : ""}
              </option>
            ))}
          </select>

          {/* Submit Button */}
          <button onClick={handleSubmit} style={styles.submitButton}>
            Take Attendance
          </button>

        </div>
      </div>

      {/* Attendance Records Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              
              <th style={styles.th}>Student Name</th>
              <th style={styles.th}>Hours</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.length === 0 ? (
              <tr>
                <td colSpan="5" style={styles.textCenter}>No attendance records found.</td>
              </tr>
            ) : (
              attendanceData.map((entry, index) => (
                <tr key={index}>
                 
                  <td style={styles.td}>{entry.studentName}</td>
                  <td style={styles.td}>{entry.hours}</td>
                  <td style={{ ...styles.td, color: entry.status === "Present" ? "green" : "red", fontWeight: "bold" }}>
                    {entry.status}
                  </td>
                  <td style={styles.textCenter}>
                    <button 
                      onClick={() => toggleAttendance(index)} 
                      style={entry.status === "Present" ? styles.absentButton : styles.presentButton}
                    >
                      {entry.status === "Present" ? "Mark Absent" : "Mark Present"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh"
  },
  subHeader: {
    color: "#555",
    marginBottom: "10px"
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px"
  },
  formGroup: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "100%",
    minWidth: "120px"
  },
  submitButton: {
    padding: "10px 15px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    flex: 1
  },
  tableContainer: {
    overflowX: "auto"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
  },
  th: {
    padding: "12px",
    backgroundColor: "#007BFF",
    color: "white",
    textAlign: "left"
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #ddd"
  },
  textCenter: {
    textAlign: "center"
  },
  presentButton: {
    padding: "6px 12px",
    backgroundColor: "green",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px"
  },
  absentButton: {
    padding: "6px 12px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px"
  }
};

export default AttendancePortal;
