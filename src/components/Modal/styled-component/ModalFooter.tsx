import styled from 'styled-components';

const ModalFooter = styled.div`
  position: relative;
  background-color: #EAEAEA;
  z-index: 1;
  padding: 5px 0;
  &::after{
    position: absolute;
    content: '';
    background-color: #EAEAEA;
    top: 0;
    left: -20px;
    bottom: 0;
    width: 30px;
    border-radius: 0 0 0 10px;
    z-index: -1;
  }
  &::before{
    position: absolute;
    content: '';
    background-color: #EAEAEA;
    top: 0;
    right: -20px;
    bottom: 0;
    width: 30px;
    border-radius: 0 0 10px 0;
    z-index: -1;
  }

  & h1{
    text-align: center;
    font-size: 15px;
    margin: 0;
    color: #6C6C6C;
  }
`

export default ModalFooter