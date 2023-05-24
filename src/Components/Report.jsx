import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as XLSX from 'xlsx';
import Navbar from './Navbars';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.div`
  position: absolute;
  left: 23%;
  display: flex;
  flex: 3;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const Table = styled.table`
  width: 90%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #f5f5f5;
`;

const TableHeadCell = styled.th`
  padding: 8px;
  font-weight: bold;
  text-align: left;
  border-bottom: 1px solid #dddddd;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 8px;
  border-bottom: 1px solid #dddddd;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }
`;

const Report = ({ reportData, setReportData }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [accountNumberFilter, setAccountNumberFilter] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');

  useEffect(() => {
    const storedData = localStorage.getItem('reportData');
    if (storedData) {
      setReportData(JSON.parse(storedData));
    }
  }, [setReportData]);

  useEffect(() => {
    filterReportData();
  });

  const handleDownload = () => {
    if (filteredData.length > 0) {
      generateExcel(filteredData);
    }
  };

  const generateExcel = (data) => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    const excelBuffer = XLSX.write(workbook, {
      type: 'array',
      bookType: 'xlsx',
    });

    const now = new Date();
    const fileName = `report_${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}.xlsx`;

    saveToLocalStorage(fileName, excelBuffer);
  };

  const saveToLocalStorage = (fileName, excelBuffer) => {
    const data = new Uint8Array(excelBuffer);
    const blob = new Blob([data], {
      type:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
  };

  const filterReportData = () => {
    let filteredData = [...reportData];

    if (accountNumberFilter) {
      filteredData = filteredData.filter(
        (data) => data.accoutNumber === accountNumberFilter
      );
    }

    if (startDateFilter && endDateFilter) {
      filteredData = filteredData.filter((data) => {
        const startDate = new Date(startDateFilter);
        const endDate = new Date(endDateFilter);
        const dataDate = new Date(data.date);
        return dataDate >= startDate && dataDate <= endDate;
      });
    }

    setFilteredData(filteredData);
  };

  return (
    <Container>
      <Navbar />
      <Content>
        <Title>Credit Score Report</Title>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px",}}>
     
          <div >
          <label>Account Number:</label>
          <input
            type="text"
            value={accountNumberFilter}
            onChange={(e) => setAccountNumberFilter(e.target.value)}
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDateFilter}
            onChange={(e) => setStartDateFilter(e.target.value)}
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={endDateFilter}
            onChange={(e) => setEndDateFilter(e.target.value)}
          />
        </div>
        </div>

        {filteredData.length > 0 ? (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeadCell>First Name</TableHeadCell>
                  <TableHeadCell>Last Name</TableHeadCell>
                  <TableHeadCell>Credit Score</TableHeadCell>
                  <TableHeadCell>Bank</TableHeadCell>
                  <TableHeadCell>Defaulter</TableHeadCell>
                  <TableHeadCell>Account Type</TableHeadCell>
                  <TableHeadCell>Suggested Amount</TableHeadCell>
                  <TableHeadCell>Account Number</TableHeadCell>
                  <TableHeadCell>Amount</TableHeadCell>
                  <TableHeadCell>Date</TableHeadCell>
                  
                </TableRow>
              </TableHead>
              <tbody>
                {filteredData.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell>{result.firstName}</TableCell>
                    <TableCell>{result.lastName}</TableCell>
                    <TableCell>{result.creditScore}</TableCell>
                    <TableCell>{result.bank}</TableCell>
                    <TableCell>{result.defaulter ? 'Yes' : 'No'}</TableCell>
                    <TableCell>{result.accountType}</TableCell>
                    <TableCell>{result.suggestedAmount}</TableCell>
                    <TableCell>{result.accoutNumber}</TableCell>
                    <TableCell>{result.amount}</TableCell>
                    <TableCell>{result.date}</TableCell>
                    
                  </TableRow>
                ))}
              </tbody>
            </Table>
            <ButtonContainer>
              <Button onClick={handleDownload}>Download Excel</Button>
            </ButtonContainer>
          </>
        ) : (
          <p>No search results to display.</p>
        )}
      </Content>
    </Container>
  );
};

export default Report;
