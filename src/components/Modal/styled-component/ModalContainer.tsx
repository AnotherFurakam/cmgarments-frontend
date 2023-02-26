import { motion } from 'framer-motion';
import styled from 'styled-components';

const ModalContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  min-width: 100vw;
  min-height: 100vh;
  background-color: rgba(50,50,50,.5);
  top: 0;

  & >div{
    background-color: white;
    padding: 20px 20px 0 20px;
    min-width: 800px;
    min-height: 500px;
    border-radius: 10px;
    display: grid;
    grid-template-rows: auto 1fr auto;
  }
  
`

export default ModalContainer