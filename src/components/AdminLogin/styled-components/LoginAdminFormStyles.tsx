import styled from "styled-components";
import { Form, Field } from 'formik'

export const FormContainer = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8eeee;
  min-width: 650px;
  min-height: 550px;
  margin: auto 100px auto auto;
  border-radius: 20px;
  box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.07), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198), 0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
`

export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  width: 70%;
`

export const FormFieldContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  background: none;
  padding: 8px;
  border-bottom: 2px solid #000000;
`

export const FormField = styled(Field)`
  background: none;
  width: 200px;
  border: none;
  outline: none;
  font-size: 18px;
  &::placeholder{
    color: #000000;
  }
`

export const FormSubmitButto = styled.button`
  border: none;
  border-radius: 10px;
  width: 240px;
  background-color: rgba(47, 72, 88, 0.8);
  padding: 10px 0;
  margin: 0 auto;
  font-size: 22px;
  font-weight: 500;
  color: #ffffff;
  transition: .2s;
  &:hover{
    background-color: rgba(47, 72, 88, 1);
    transition: .2s;
  }
`