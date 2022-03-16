import React, { useEffect, useState } from 'react';
import styled from "styled-components";
// import { getImages } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Pagination } from 'antd';
import axios from "axios";

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
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:space-between;
  border:1px solid gray;
`;
const RightBody = styled.div`
display:flex;
`;
const Title = styled.h3`
margin-bottom:20px;
`;
const Label = styled.label`
margin-left:5px;
`;
const RadioInput = styled.div`
margin:15px 0px;
`;
const Image = styled.img`
height:100px;
width:200px;
border:1px solid gray;
`;
const Item = styled.div`
height:200px;
width:200px;
display:flex;
flex-direction:column;
margin:10px 10px;
`;
const ModalContainer = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
`;
const Button = styled.button`
width: 30%;
border: none;
padding: 10px 10px;
background-color: #B98F09;
color: #6E260E;
cursor: pointer;
`;

const NormalUser = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch();
    // const images = useSelector((state) => state.image.imagesData);
    const [images, setImages] = useState([]);
    const [downloadCount, setDownloadCount] = useState(0);
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState("");

    useEffect(() => {
        // getImages(dispatch);
        const getImages = async () => {
            try {
                const res = await axios.get(
                    category
                        ? `http://localhost:4000/api/contributor?category=${category}`
                        : "http://localhost:4000/api/contributor"
                );
                setImages(res.data);
            } catch (error) { }
        };
        getImages();
    }, [dispatch, category])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onDownload = () => {
        setDownloadCount(downloadCount + 1)
    };
    const handleChange = (e) => {
        setCategory(e.target.value);

    };
    return (
        <Container>
            <Left>
                <Title>Category</Title>
                <RadioInput>
                    <input type="radio" name="category" value="Technology" onChange={handleChange} />
                    <Label>Technology</Label>
                </RadioInput>
                <RadioInput>
                    <input type="radio" name="category"  value="Marketing" onChange={handleChange} />
                    <Label>Marketing</Label>
                </RadioInput>
                <RadioInput>
                    <input type="radio" name="category"  value="B2B" onChange={handleChange} />
                    <Label>B2B</Label>
                </RadioInput>
            </Left>
            <Right>
                <RightBody>
                    {images.map((item, i) => {
                        return <>
                            <Item key={i}>
                                <Image src={item.img} alt="" onClick={showModal} />
                                <Modal title="Download Image" footer={null} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                                    <ModalContainer>
                                        <Item>
                                            <Image src={item.img} alt="" />
                                            <h4>Contributor: xyz</h4>
                                            <h4>Image Name: {item.name}</h4>
                                            <h4>Total Download: {downloadCount}</h4>
                                        </Item>
                                        <Button onClick={onDownload}>Download</Button>
                                    </ModalContainer>
                                </Modal>
                                <h4>Contributor: xyz</h4>
                                <h4>Image Name: {item.name}</h4>
                                <h4>Total Download: {downloadCount}</h4>
                            </Item>
                        </>
                    })}
                </RightBody>
                <Pagination defaultCurrent={1} total={50} onChange={(current) => { setPage(current) }} />
            </Right>

        </Container>
    )
}

export default NormalUser;