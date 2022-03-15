import React, { useState } from 'react'
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Register } from '../redux/apiCalls';
import { useDispatch } from "react-redux";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    );
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  margin-top:100px;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction:column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;
const RadioInput = styled.div`
margin:10px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 10px 15px;
  margin:20px 0px;
  background-color: #B98F09;
  color: #6E260E;
  cursor: pointer;
`;
const Signup = () => {
  const [inputs, setInputs] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    Register(inputs, dispatch);
    // navigate("/");
  };
  return (
    <Container>
      <Wrapper>
        <Title>Sign Up</Title>
        <Form>

          <Input type="text" name="name" placeholder="Name" onChange={handleChange} />
          <Input type="email" name="email" placeholder="Email" onChange={handleChange} />
          <Input type="password" name="password" placeholder="Password" onChange={handleChange} />
          <RadioInput>
            <input type="radio" name="user_type" value="Normal User" onChange={handleChange} />
            <label>Normal User</label>
          </RadioInput>
          <RadioInput>
            <input type="radio" name="user_type" value="Contributor" onChange={handleChange} />
            <label>Contributor</label>
          </RadioInput>
          <Button onClick={handleClick}>Sign Up</Button>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Signup;