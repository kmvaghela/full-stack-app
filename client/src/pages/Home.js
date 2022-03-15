import React from 'react'
import Signup from '../components/Signup';
import Login from '../components/Login';
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`;
const Left = styled.div`
  height: 100vh;
  width: 50vw;
  display: flex;
`;
const VerticalLine = styled.div`
  border-left: 1px solid gray;
  height: 80vh;
  margin-top:100px;
`;
const Right = styled.div`
  height: 100vh;
  width: 50vw;
  display: flex;
`;
const Home = () => {
  return (
    <Container>
      <Left><Signup /></Left>
      <VerticalLine />
      <Right><Login /></Right>
    </Container>
  )
}

export default Home;