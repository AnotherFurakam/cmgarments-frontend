import styled from "styled-components";

export const FilterButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 5px;
  border-radius: 5px;
  width: 50px;
  height: 40px;
  background-color: rgba(0,25,0,.7);
  transition: 500ms background-color;
  &:hover{
    background-color: rgba(0,25,0,1);
    transition: 500ms background-color;
  }
`