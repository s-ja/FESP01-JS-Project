import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const TodoInfo = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const _id = searchParams.get('_id');
  const [todoItem, setTodoItem] = useState<TodoItem | null>(null);
  const getTodoItem = async (_id: string) => {
    try {
      const response = await axios.get<TodoResponse>(`http://localhost:33088/api/todolist/${_id}`);
      setTodoItem(response.data.item);
    } catch (err) {
      console.error(err);
      return navigate('/err', { replace: true });
    }
  };

  const deleteTodoItem = async (_id: number) => {
    if (confirm('삭제하시겠습니까?')) {
      const response = await axios.delete<TodoResponse>(
        `http://localhost:33088/api/todolist/${_id}`
      );
      if (response.data.ok) {
        return navigate('/', { replace: true });
      }
      alert('삭제 실패했습니다.');
    }
  };

  const handleDelete = (_id: number | undefined) => {
    if (_id) {
      deleteTodoItem(_id);
    } else {
      return navigate('/err', { replace: true });
    }
  };

  useEffect(() => {
    if (_id === null || _id === '') {
      setTodoItem(null);
      return navigate('/err', { replace: true });
    }
    getTodoItem(_id);
  }, []);

  return (
    <DetailContainer>
      <DetailHeader id="header">
        <h2>{todoItem?.title}</h2>
        <p>created at: {todoItem?.createdAt}</p>
      </DetailHeader>
      <DetailMain id="main">
        <p>{todoItem?.content}</p>
        <p>updated at: {todoItem?.updatedAt}</p>
      </DetailMain>
      <DetailFooter>
        <Link to={`/update/${todoItem?._id}`}>수정</Link>
        <button onClick={() => handleDelete(todoItem?._id)}>삭제</button>
      </DetailFooter>
    </DetailContainer>
  );
};

export default TodoInfo;

const DetailContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 10px;
  height: 715px;
  background-color: #555555;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* height: 100%; */
  gap: 10px;
`;

const DetailHeader = styled.section`
  background-color: white;
  text-align: center;
  border-radius: 10px;

  & h2 {
    font-size: 26px;
    font-weight: 300;
  }

  & p {
    font-size: 10px;
  }
`;

const DetailMain = styled.section`
  background-color: white;
  position: relative;
  flex: 1;
  height: 80%;
  padding: 10px;
  border-radius: 10px;

  p {
    &:first-child {
      display: block;
      height: 95%;
      max-height: 560px;
      margin-bottom: 10px;
      padding: 10px;
      overflow: auto;
    }
    &:last-child {
      font-size: 12px;
      text-align: end;
    }
  }
`;

const DetailFooter = styled.section`
  display: flex;
  gap: 10px;
  justify-content: space-between;

  & a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    flex: 1;
    border-radius: 7px;
    border: 0;
    font-size: 30px;
    font-weight: bold;
    background-color: white;
    color: black;

    cursor: pointer;

    &:visited {
      color: black;
    }
    &:hover {
      background-color: #555555;
      color: white;
      border: 1px solid white;
    }
  }

  & button {
    height: 50px;
    flex: 1;
    border-radius: 7px;
    border: 0;
    font-size: 30px;
    font-weight: bold;
    background-color: white;
    color: #9c0000;
    cursor: pointer;

    &:focus {
      outline-style: none;
      box-shadow: none;
      border-color: transparent;
    }
    &:hover {
      background-color: #9c0000;
      color: white;
      border: 1px solid white;
    }
  }
`;
