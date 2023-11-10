import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Styled Components
const Content = styled.div`
  position: relative;
  width: 100%;
  padding: 10px;
  height: 715px;
  background-color: #555555;
  border-radius: 10px;
`;

const Form = styled.form`
  height: 100%;
`;

const FieldSet = styled.fieldset`
display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0;
  border: 0;
  row-gap: 10px;
  height: 90%;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;

  & > ::placeholder{
  color: #555555;
  font-size: 18px;
  font-weight: 900;
  text-align: center;
  }
`

const Input = styled.input`
   width: 360px;
  height: 52px;
  border-radius: 10px;
  border: 0;
  padding-left: 15px;
  padding-right: 15px;
`;

const Textarea = styled.textarea`
  padding: 15px;
  width: 360px;
  height: 100%;
  border: 0;
  border-radius: 10px;
  padding-left: 15px;
  padding-right: 15px;
  resize: none;
`;

const SubmitButton = styled.button`
  position: absolute;
  width: 360px;
  height: 50px;
  left: 50%;
  right: 50%;
  bottom: 10px;
  transform: translateX(-50%);
  border-radius: 10px;
  border: 0;
  font-size: 30px;
  font-weight: bold;
  color: #555555;
  cursor: pointer;
`;

const Modal = styled.div`
    display: none;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  z-index: 9999;
`;

const TodoRegist = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:33088/api/todolist", { title, content });
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate("/");
      }, 500);
    } catch (error) {
      console.error(error);
      alert("등록에 실패하였습니다.");
    }
  };

  return (
    <Content>
      <Form onSubmit={handleSubmit}>
        <FieldSet>
        <Input
          type="text"
          name="title"
          placeholder="제목을 입력해주세요."
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          name="content"
          placeholder="내용을 입력해주세요."
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        </FieldSet>
        <SubmitButton type="submit">등록 완료</SubmitButton>
      </Form>
      {showModal && <Modal>할일이 등록되었습니다!</Modal>}
    </Content>
  );
};

export default TodoRegist;
