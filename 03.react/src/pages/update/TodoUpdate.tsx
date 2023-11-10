import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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
  const [todo, setTodo] = useState({ title: '', content: '', updatedAt: '' });
  const { _id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`http://localhost:33088/api/todolist/${_id}`);
        setTodo({
          title: response.data.item.title,
          content: response.data.item.content,
          updatedAt: response.data.item.updatedAt,
        });
      } catch (err) {
        console.error(err);
        alert('항목을 불러오는 데 실패했습니다.');
      }
    };
    fetchTodo();
  }, [_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:33088/api/todolist/${_id}`, {
        title: todo.title,
        content: todo.content,
      });
      alert('수정되었습니다.');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('서버 오류!');
    }
  };
  return (
    <Content>
      <DetailForm id="detail" onSubmit={handleSubmit}>
        <UpdateHeader>
          <input
            name="title"
            autoFocus
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
          <p id="detailHeaderCreatedAt">Last updated: {todo.updatedAt}</p>
        </UpdateHeader>
        <DetailTextArea
          name="content"
          id="detailMain"
          value={todo.content}
          onChange={(e) => setTodo({ ...todo, content: e.target.value })}
        />
        <DetailFooter>
          <EditButton id="editBtn">수정하기</EditButton>
        </DetailFooter>
      </DetailForm>
    </Content>
  );
};
export default TodoUpdate;
