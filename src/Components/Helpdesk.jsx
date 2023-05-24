import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "./Navbars";

const Container = styled.div`
  width: 76%;
  padding: 20px;
  background-color: #f7f7f7;
  min-height: 100vh;
  margin-left: 20%;
  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
`;

const Button = styled.button`
  background-color: #3f51b5;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
`;

const ComplaintContainer = styled.div`
  margin-top: 20px;
  background-color: ${({ containerColor }) => containerColor};
`;

const Complaint = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ isDone }) => (isDone ? "red" : "yellow")};
  padding: 10px;
  margin-bottom: 10px;
  color: black;
  border-radius: 5px;
`;

const StatusDropdown = styled.select`
  background-color: ${({ isDone }) => (isDone ? "red" : "blue")};
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ComplaintForm = () => {
  const [complaints, setComplaints] = useState([]);
  const [complaintText, setComplaintText] = useState("");
  const [filter, setFilter] = useState("all");
  const [containerColor, setContainerColor] = useState("yellow");

  useEffect(() => {
    // Retrieve complaints from local storage on component mount
    const storedComplaints = localStorage.getItem("complaints");
    if (storedComplaints) {
      setComplaints(JSON.parse(storedComplaints));
    }
  }, []);

  useEffect(() => {
    // Save complaints to local storage whenever it changes
    localStorage.setItem("complaints", JSON.stringify(complaints));
  }, [complaints]);

  const handleComplaintTextChange = (event) => {
    setComplaintText(event.target.value);
  };

  const handleAddComplaint = () => {
    const newComplaint = {
      text: complaintText,
      isDone: false,
    };
    setComplaints([...complaints, newComplaint]);
    setComplaintText("");
  };

  const handleToggleComplaintStatus = (index) => {
    setComplaints((prevComplaints) => {
      const updatedComplaints = [...prevComplaints];
      updatedComplaints[index].isDone = !updatedComplaints[index].isDone;
      return updatedComplaints;
    });
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setContainerColor(event.target.value === "done" ? "red" : "yellow");
  };

  const filteredComplaints = complaints.filter((complaint) => {
    if (filter === "done") {
      return complaint.isDone;
    } else if (filter === "pending") {
      return !complaint.isDone;
    } else {
      return true;
    }
  });

  return (
    <>
      <Navbar />
      <Container>
        <Title>Complaints</Title>
        <TextArea
          placeholder="Type your complaint here"
          value={complaintText}
          onChange={handleComplaintTextChange}
        />
        <Button onClick={handleAddComplaint}>Add Complaint</Button>
        <StatusDropdown value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="done">Done</option>
          <option value="pending">Pending</option>
        </StatusDropdown>
        <ComplaintContainer containerColor={containerColor}>
          {filteredComplaints.map((complaint, index) => (
            <Complaint
              key={index}
              isDone={complaint.isDone}
              style={{ color: "black" }}
            >
              <span>{complaint.text}</span>
              <StatusDropdown
                value={complaint.isDone ? "done" : "pending"}
                onChange={() => handleToggleComplaintStatus(index)}
                isDone={complaint.isDone}
              >
                <option value="pending">Pending</option>
                <option value="done">Done</option>
              </StatusDropdown>
            </Complaint>
          ))}
        </ComplaintContainer>
      </Container>
    </>
  );
};

export default ComplaintForm;
