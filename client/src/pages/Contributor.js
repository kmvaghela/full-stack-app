import React, { useState } from 'react'
import { Table } from 'antd';
import styled from "styled-components";
import { addImage } from "../redux/apiCalls";
import { useDispatch } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";

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

const Button = styled.button`
width:100%;
font-weight:${(props) => props.boldText ? 'bold' : ''};
`;
const Label = styled.label`
margin-top:20px;
margin-bottom:10px;
`;

const SaveButton = styled.button`
padding:5px;
width:80px;
background-color: #B98F09;
color: #6E260E;
border:none;
cursor: pointer;
margin-top:20px;
`;

const Form = styled.form`
width:30%;
display:flex;
flex-direction:column;
`;

const Contributor = () => {

  const [selectedBtn, setSelectedBtn] = useState("upload");
  const [inputs, setInputs] = useState({});
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  const onUpload = () => {
    setSelectedBtn("upload");
  };
  const onDownload = () => {
    setSelectedBtn("download");
  };

  const handleClick = (e) => {
    e.preventDefault();


    const fileName = new Date().getTime() + image.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, image);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const imageData = {
            ...inputs,
            img: downloadURL,
          };
          addImage(imageData, dispatch);
        });
      }
    );

  }
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <Container>
      <Left>
        <Button onClick={onUpload} boldText={selectedBtn === "upload" ? true : false}>Upload Image</Button>
        <Button onClick={onDownload} boldText={selectedBtn === "download" ? true : false}>Download Report</Button>
      </Left>
      <Right>
        {selectedBtn === "download"
          ?
          <>
            <Title>Download Report</Title>
            <Table columns={columns} dataSource={data} pagination={{ current: 1, pageSize: 10 }} />
          </>
          : <>
            <Title>Upload Image</Title>
            <Form>
              <Label>Image Name:</Label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
              />
              <Label>Image:</Label>
              <input
                type="file"
                id="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <Label>Category:</Label>
              <select name="category" onChange={handleChange}>
                <option value="Technology">Technology</option>
                <option value="Marketing">Marketing</option>
                <option value="B2B">B2B</option>
              </select>
            </Form>
            <SaveButton onClick={handleClick}>Save</SaveButton>
          </>}
      </Right>
    </Container>
  )
}

export default Contributor;