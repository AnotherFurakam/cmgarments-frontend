import styled from 'styled-components';

export const PagContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 30px 0 0 0;
  
  .page_number{
    display: flex;
    gap: 10px;
  }
  
  .arrow{
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 5px;
    border: none;
    background: none;
    &[disabled=enabled]:hover{
      background-color: rgba(150, 217, 208, 0.575);
      border-radius: 100%;
    }
  }
`