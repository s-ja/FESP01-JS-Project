import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import RedArrowIcon from '@/assets/RedArrowIcon';

const TodoList = () => {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const getTodoList = async () => {
    try {
      const response = await axios.get<TodoListResponse>('http://localhost:33088/api/todolist');
      setTodoList(response.data.items);
    } catch (err) {
      console.error(err);
    }
  };

  const patchTodoList = async (_id: number, done: boolean) => {
    try {
      const response = await axios.patch<TodoResponse>(
        `http://localhost:33088/api/todolist/${_id}`,
        {
          done: !done,
        }
      );
      return response.data;
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  const toggleCheckbox = async (_id: number, done: boolean) => {
    const data = await patchTodoList(_id, done);
    if (data) {
      getTodoList();
    }
  };

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <TodoListContainer>
      <ul>
        {todoList?.map((todoItem) => (
          <TodoItem key={todoItem._id} className={todoItem.done ? 'done' : ''}>
            <div onClick={() => toggleCheckbox(todoItem._id, todoItem.done)}>
              <input type="checkbox" id="checkbox" className={todoItem.done ? 'done' : ''} />
              {todoItem.done ? <RedArrowIcon /> : null}
            </div>
            <Link to={`/info?_id=${todoItem._id}`}>{todoItem.title}</Link>
          </TodoItem>
        ))}
      </ul>
      <RegistButton to={'/regist'}>등록</RegistButton>
    </TodoListContainer>
  );
};

export default TodoList;

const TodoListContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 10px;
  height: 715px;
  background-color: #555555;
  border-radius: 10px;

  ul {
    margin: 0;
    padding: 0;
    overflow: auto;
    height: 90%;
    border-radius: 5px;
    margin-top: 5px;
  }
`;

const TodoItem = styled.li`
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  gap: 20px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  padding: 0 8px;
  margin-bottom: 15px;
  font-weight: 300;
  font-size: 18px;
  position: relative;

  input[type='checkbox'] {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid #555;
    appearance: none;
    cursor: pointer;
    flex-shrink: 0;
    display: flex;
  }
  a {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;

    text-overflow: ellipsis;
    text-decoration: none;
    color: black;
    display: flex;
    justify-content: center;
  }

  &.done > a {
    text-decoration: line-through;
    color: white;
    text-decoration-color: #9c0000;
  }

  &.done {
    background-color: #555555;
    border: 1px solid white;
  }
`;

const RegistButton = styled(Link)`
  position: absolute;
  left: 50%;
  right: 50%;
  bottom: 10px;
  transform: translateX(-50%);

  width: 360px;
  padding: 10px 0;
  border-radius: 10px;
  border: 0;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
  text-align: center;

  color: #555555;
  background-color: #efefef;
  cursor: pointer;

  &:hover {
    background-color: #555555;
    color: white;
    border: 1px solid white;
  }

  &:focus {
    outline-style: none;
    box-shadow: none;
    border-color: transparent;
  }
`;
