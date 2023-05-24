import styled from 'styled-components';
import Search from './Search';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import React, { useEffect, useState } from 'react';

const Container = styled.div`
  display: flex;
  position: absolute;
  top: 80px;
  bottom: 0;
  left: 21%;
  right: 0;
  padding: 16px;

  @media (max-width: 768px) {
    left: 0;
    padding: 16px 0;
    flex-direction: column;
  }
`;

const Card = styled.div`
  width: 25%;
  height: 30%;
  margin-right: 18px;
  margin-top: 20px;
  margin-bottom: 50px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  transform-style: preserve-3d;

  &:hover {
    transform: translateZ(20px);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 1024px) {
    width: 30%;
    margin-right: 8px;
    margin-bottom: 16px;
    flex-direction: column;
    height: 250px;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 16px;
    flex-direction: row;
    height: auto;
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.1);
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  &:hover:before {
    opacity: 1;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;

  & > div:first-child {
    width: 40px;
    height: 40px;
    background-color: #0C0B0B;
    border-radius: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;

    & > span {
      color: #ffffff;
      font-size: 12px;
      font-weight: bold;
    }
  }

  & > div:last-child {
    color: #595959;
    font-size: 24px;
    font-weight: bold;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #595959;
  margin: 16px 0;
`;

const Text = styled.p`
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => props.color};
  margin: 0;
`;

const Texts = styled.p`
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => props.color};
  margin: 0 15px 0 0;
  text-align: right;
  
`;

const Subtext = styled.p`
  font-size: 10px;
  color: #7B7B7B;
  margin: 0 0 0 5px;
`;
const Left = styled.div`
    display: flex;
`

const Dashboard = ({keyword, setReportData , saveReportToLocalStorage, reportData}) => {

  const [results, setResults] = useState(0);
  const [request, setRequest] = useState(() => {
    const savedRequest = localStorage.getItem('request');
    return savedRequest ? Number(savedRequest) : 0;
  });
  const [success, setSuccess] = useState(() => {
    const savedSuccess = localStorage.getItem('success');
    return savedSuccess ? Number(savedSuccess) : 0;
  });
  const [failure, setFailure] = useState(() => {
    const savedFailure = localStorage.getItem('failure');
    return savedFailure ? Number(savedFailure) : 0;
  });

  useEffect(() => {
    if(results > 0){
    setRequest((prevRequest) => prevRequest + 1);
  }
    if (results >= 80) {
      setSuccess((prevSuccess) => prevSuccess + 1);
    } else if( results > 0 && results < 80 ){
      setFailure((prevFailure) => prevFailure + 1);
    }
    
  }, [results]);

  useEffect(() => {
    localStorage.setItem('request', request.toString());
  }, [request]);

  useEffect(() => {
    localStorage.setItem('success', success.toString());
  }, [success]);

  useEffect(() => {
    localStorage.setItem('failure', failure.toString());
  }, [failure]);
  return (
    <>
        <Container>
      <Card>
        <Header>
          <div><span>&lt;/&gt;</span></div>
          <div>{ request}</div>
        </Header>
        <Texts color="#595959">Requests</Texts>
        <Line />
        <Left>
        <Text color="#01A408">+23%</Text>
        <Subtext>this week</Subtext>
        </Left>
      </Card>

      <Card>
        <Header>
          <div style={{backgroundColor: '#01A408'}}><span>✔</span></div>
          <div>{success}</div>
        </Header>
        <Texts color="#595959">Success</Texts>
        <Line />
        <Left>
        <Text color="#C13A3A">{`${Math.round(((success*100)/request))}%`}</Text>
        <Subtext>Success Rate</Subtext>
        </Left>
      </Card>

      <Card>
        <Header>
          <div style={{backgroundColor: '#E70000'}}><span>X</span></div>
          <div>{failure}</div>
        </Header>
        <Texts color="#595959">Failed</Texts>
        <Line />
        <Left>
        <Text color="#595959">{`${Math.round(((failure*100)/request))}%`}</Text>
        <Subtext>Failure Rate</Subtext>
        </Left>
      </Card>

      <Card>
        <Header>
        <div style={{backgroundColor: '#001965'}}><span><Person2OutlinedIcon/></span></div>
          <div>1</div>
        </Header>
       
        <Texts color="#595959">Level</Texts>
        <Line />
        <Left>
        <Text color="#01A408">+40%</Text>
        <Subtext>this week</Subtext>
        </Left>
      </Card>
      
    </Container>

    <Search keyword={keyword} setResults = {setResults} reportData= {reportData} setReportData= {setReportData} saveReportToLocalStorage={saveReportToLocalStorage}/>
    </>

  );
};

export default Dashboard;
