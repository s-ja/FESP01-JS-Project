import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Content = styled.div``;

const DetailForm = styled.form``;

const UpdateHeader = styled.div``;

const DetailTextArea = styled.textarea``;

const DetailFooter = styled.div``;

const EditButton = styled.button`
  &:hover {
  }
`;

const TodoUpdate = () => {
  const [todo, setTodo] = useState({ title: "", content: "", updatedAt: "" });
  const { _id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:33088/api/todolist/${_id}`
        );
        setTodo({
          title: response.data.item.title,
          content: response.data.item.content,
          updatedAt: response.data.item.updatedAt,
        });
      } catch (err) {
        console.error(err);
        alert("항목을 불러오는 데 실패했습니다.");
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
      alert("수정되었습니다.");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("서버 오류!");
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
