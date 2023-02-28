import { Formik, Form, FormikHelpers, Field, ErrorMessage, FormikState } from "formik";
import { FormContainer, FormContent, FormField, FormFieldContainer, FormSubmitButto } from "./styled-components/LoginAdminFormStyles";
import Image from "next/image";
import { useState } from "react";

interface ILogin {
  username: string
  passworad: string
}

const LoginAdminForm = () => {

  const [showPass, setshowPass] = useState<string>("password")

  const handleShowPass = () => {
    if (showPass === "password") setshowPass("input")
    if (showPass === "input") setshowPass("password")
  }

  const initilValues: ILogin = {
    username: '',
    passworad: '',
  }

  return (
    <Formik
      initialValues={initilValues}
      onSubmit={
        (values: ILogin, helpers: FormikHelpers<ILogin>) => {
          console.log(values);
          helpers.setSubmitting(false);
        }
      }
    >
      {
        ({ isSubmitting }: FormikState<ILogin>) => (
          <FormContainer>
            <FormContent>
              <h1>Bienvenido</h1>
              <div className="d-flex flex-column gap-5">
                <FormFieldContainer>
                  <Image src={'/images/login/user.svg'} width={20} height={20} alt="user_logo" />
                  <FormField name={'username'} type={'input'} autocomplete="off" placeholder="Username" />
                </FormFieldContainer>
                <FormFieldContainer>
                  <Image src={'/images/login/password.svg'} width={20} height={20} alt="password" />
                  <FormField name={'password'} type={showPass} autocomplete="off" placeholder="Password" />
                  <Image src={'/images/login/show.svg'} width={20} height={20} alt="password" onClick={() => handleShowPass()} />
                </FormFieldContainer>
                <FormSubmitButto type="submit" disabled={isSubmitting}>Iniciar Sesión</FormSubmitButto>
              </div>
            </FormContent>
          </FormContainer>
        )
      }

    </Formik>
  )
}

export default LoginAdminForm