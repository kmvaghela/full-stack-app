import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { getImages } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  display:flex;
`;

const Left = styled.div`
  width:20vw;
  height:100vh;
  border:1px solid gray;
  margin-right:20px;
`;
const Right = styled.div`
  width:80vw;
  height:100vh;
  padding:50px;
  border:1px solid gray;
`;
const Title = styled.h3`
margin-bottom:20px;
`;
const Label = styled.label`
margin-left:5px;
`;
const CheckBox = styled.div`
margin-left:15px;
`;

const Item = styled.div`
display:flex;
flex-direction:column;
`;

const NormalUser = () => {

    const dispatch = useDispatch();
    const images = useSelector((state) => state.image.imagesData);


    useEffect(() => {
        getImages(dispatch);
    }, [dispatch])
    return (
        <Container>
            <Left>
                <Title>Category</Title>
                <CheckBox>
                    <input type="checkbox" name="Technology" value="Technology" />
                    <Label>Technology</Label>
                </CheckBox>
                <CheckBox>
                    <input type="checkbox" name="Marketing" value="Marketing" />
                    <Label>Marketing</Label>
                </CheckBox>
                <CheckBox>
                    <input type="checkbox" name="B2B" value="B2B" />
                    <Label>B2B</Label>
                </CheckBox>
            </Left>
            <Right>
                {images.map((item) => {
                    return <>
                        <Item>
                            <img src={item.img} alt="" width="100px" height="100px" />
                            <h4>Contributor: xyz</h4>
                            <h4>Image Name: {item.name}</h4>
                            <h4>Total Download: 600</h4>
                        </Item>
                    </>
                })}
            </Right>
        </Container>
    )
}

export default NormalUser;