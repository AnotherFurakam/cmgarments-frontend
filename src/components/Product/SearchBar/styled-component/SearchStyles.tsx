import styled from "styled-components";

export const SearchInput = styled.input`
  border-radius: 10px;
  font-size: 17px;
  padding: 5px 10px;
  outline: none;
  border: 2px solid rgba(0, 25, 0,.5);
  transition: 500ms border-color;
  width: 300px;
  &:focus{
    border-color: rgba(0, 25, 0,1);
    transition: 500ms border-color;
  }
`

export const SearchCheckBox = styled.input`
  width: 15px;
  height: 15px;
`