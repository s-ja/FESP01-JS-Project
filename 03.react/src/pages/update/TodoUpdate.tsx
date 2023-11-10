import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Content = styled.div`
  position: relative;
  width: 100%;
  padding: 10px;
  height: 715px;
  background-color: #555555;
  border-radius: 10px;
`;

const DetailForm = styled.form`
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  gap: 10px;
`;

const UpdateHeader = styled.div`
  background-color: white;
  text-align: center;
  border-radius: 10px;
  & > input {
    border: 0;
    text-align: center;
    font-size: 26px;
    font-weight: inherit;
  }
  & > input:focus {
    outline-style: none;
    box-shadow: none;
    border-color: transparent;
    border-bottom: 1px solid #555555;
  }
  & > p {
    font-size: 10px;
  }
`;

const DetailTextArea = styled.textarea`
  width: 100%;
  resize: none;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  &:focus {
    outline-style: none;
    box-shadow: none;
    border-color: transparent;
  }
`;

const DetailFooter = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  & > button {
    height: 50px;
    flex: 1;
    border-radius: 7px;
    border: 0;
    font-size: 30px;
    font-weight: bold;
    background-color: white;
    cursor: pointer;
  }
  & > button:focus {
    outline-style: none;
    box-shadow: none;
    border-color: transparent;
  }
`;

const EditButton = styled.button`
  &:hover {
    background-color: #555;
    color: white;
    border: 1px solid white;
  }
`;

const TodoUpdate = () => {
  return <div></div>;
};

export default TodoUpdate;
