import styled from "styled-components";

const SubmitButton = styled.button`
  border: none;
  font-size: 20px;
  font-weight: 700;
  padding: 10px 90px;
  color: #fff;
  background-color: #2f4858;
  border-radius: 10px;
  transition: background-size 300ms ease-in-out;
  &:hover {
    background-size: 300%;
  }
  &:active {
    transition: background-size 100ms ease-in-out;
    background-size: 100%;
  }
  &:disabled {
    cursor: default;
    filter: saturate(50%);
  }
`;

export default SubmitButton;
