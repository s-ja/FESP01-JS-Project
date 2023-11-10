import { styled } from 'styled-components';

const RedArrowIcon = () => {
  return (
    <IconContainer
      width="23"
      height="26"
      viewBox="0 0 23 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 11.3678L11.4379 23L21 1" stroke="#9C0000" strokeWidth="3" />
    </IconContainer>
  );
};

export default RedArrowIcon;

const IconContainer = styled.svg`
  position: absolute;
  left: 12px;
  top: 12px;
  cursor: pointer;
  z-index: 999;
`;
