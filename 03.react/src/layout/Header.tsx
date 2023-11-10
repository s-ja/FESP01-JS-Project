import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  const location = useLocation();
  const [pathName, setPathName] = useState('');

  useEffect(() => {
    switch (location.pathname.split('/')[1]) {
      case '':
        setPathName('목록조회');
        return;
      case 'info':
        setPathName('상세정보');
        return;
      case 'update':
        setPathName('수정하기');
        return;
      case 'regist':
        setPathName('등록하기');
        return;
    }
  }, [location]);

  return (
    <HeaderTitle>
      <Link to={'/'}>TODO 4 ME</Link>
      <h2>{pathName}</h2>
    </HeaderTitle>
  );
};

export default Header;

const HeaderTitle = styled.header`
  & a {
    margin-top: 80px;
    color: black
    font-weight: 900;
    font-size: 68px;
    cursor: pointer;

    &:visited{
      color: black
    }
  }

  & h2 {
    text-align: center;
    font-size: 36px;
    font-weight: 400;
  }
`;
