import styled from 'styled-components';

const FormImage = styled.div`
  border-radius: 10px;
  width: 300px;
  height: 300px;
  background-color: rgba(234, 240, 252, 0.541);
  border: 3px solid rgba(36, 113, 255, 0.3);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  & >img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    object-fit: contain;
  }
`

export default FormImage