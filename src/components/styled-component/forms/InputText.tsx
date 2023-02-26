import { Field } from "formik";
import styled from "styled-components";

const InputText = styled(Field)`
  padding: 15px 15px;
  border: 0;
  background-color: rgba(33, 29, 29, 0.39);
  color: rgba(0, 0, 0, 0.6);
  font-weight: 600;
  border-radius: 8px;
  width: 100%;

  &::placeholder {
    font-weight: 500;
    color: rgba(80, 79, 79, 0.6);
  }
`;
export default InputText;
