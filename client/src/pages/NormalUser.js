import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Pagination, Button } from 'antd';
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/apiCalls";

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
const Header = styled.div`
display:flex;
align-items:center;
justify-content:flex-end;
`;
const LogoutBtn = styled.button`
padding:5px;
width:80px;
background-color: #B98F09;
color: #6E260E;
border:none;
cursor: pointer;
margin-bottom:20px;
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
// const Button = styled.button`
// width: 30%;
// border: none;
// padding: 10px 10px;
// background-color: #B98F09;
// color: #6E260E;
// cursor: pointer;
// `;

const NormalUser = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [images, setImages] = useState([]);
    const [downloadCount, setDownloadCount] = useState(0);
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState("");
    const [index, setIndex] = useState();

    useEffect(() => {
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
    }, [dispatch, category, downloadCount])

    const showModal = (i) => {
        setIsModalVisible(true);
        setIndex(i);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onDownload = async (item) => {
        let id = item._id;
        let name = item.name;
        let img = item.img;
        let category = item.category;
        let contributor = item.contributor;
        let downloads = item.downloads;
        setDownloadCount(downloads + 1);
        try {
            const res = await axios.put(`http://localhost:4000/api/contributor/` + id, {
                name,
                img,
                category,
                contributor,
                downloads: downloads + 1,
            });
            setIsModalVisible(false);
        } catch (error) { }
    };
    const handleChange = (e) => {
        setCategory(e.target.value);

    };
    const onLogout = () => {
        logoutUser(dispatch);
        navigate("/");
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
                    <input type="radio" name="category" value="Marketing" onChange={handleChange} />
                    <Label>Marketing</Label>
                </RadioInput>
                <RadioInput>
                    <input type="radio" name="category" value="B2B" onChange={handleChange} />
                    <Label>B2B</Label>
                </RadioInput>
            </Left>
            <Right>
                <div>
                    <Header>
                        <Link to="/" style={{ color: "black", textDecoration: "none" }}>
                            <LogoutBtn onClick={onLogout}>LOGOUT</LogoutBtn>
                        </Link>
                    </Header>
                    <RightBody>
                        {images.map((item, i) => {
                            return <>
                                <Item key={item._id}>
                                    <Image src={item.img} alt="" onClick={() => showModal(i)} />
                                    <h4>Contributor: {item.contributor}</h4>
                                    <h4>Image Name: {item.name}</h4>
                                    <h4>Total Download: {item.downloads}</h4>
                                </Item>
                            </>
                        })}
                    </RightBody>
                </div>
                <Pagination defaultCurrent={1} total={50} onChange={(current) => { setPage(current) }} />
            </Right>
            <Modal title="Download Image" footer={null} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <ModalContainer>
                    <Item>
                        <Image src={images[index]?.img} alt="" />
                        <h4>Contributor: {images[index]?.contributor}</h4>
                        <h4>Image Name: {images[index]?.name}</h4>
                        <h4>Total Download: {images[index]?.downloads}</h4>
                    </Item>
                    <Button onClick={() => { onDownload(images[index]) }}>Download</Button>
                </ModalContainer>
            </Modal>
        </Container>
    )
}

export default NormalUser;