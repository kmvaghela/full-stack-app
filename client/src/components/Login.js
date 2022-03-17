import React, { useState } from 'react'
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 10px 15px;
  margin:20px 0px;
  background-color: #B98F09;
  color: #6E260E;
  cursor: pointer;
`;

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error, currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handleClick = () => {
    login(dispatch, { name, password });
    if (!error) {
      if (currentUser != null) {
        if (currentUser.user_type === "Contributor") {
          navigate("/contributor");
        } else {
          navigate("/normal-user");
        }
      }
    }

  };

  return (
    <Container>
      <Wrapper>
        <Title>Login</Title>
        <Form >
          <Input type="text" placeholder="Username" onChange={(e) => setName(e.target.value)} autocomplete="off"/>
          <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} autocomplete="off"/>
          <Button onClick={handleClick} disabled={isFetching}>Login</Button>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Login;