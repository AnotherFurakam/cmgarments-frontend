import {
  Formik,
  Form,
  FormikHelpers,
  Field,
  ErrorMessage,
  FormikState,
} from "formik";
import {
  FormContainer,
  FormContent,
  FormField,
  FormFieldContainer,
  FormSubmitButto,
} from "./styled-components/LoginAdminFormStyles";
import Image from "next/image";
import { useState } from "react";
// import { redirect } from "next/navigation";
import { authService } from "@/services/auth.service";
// import { NextResponse, NextRequest } from "next/server";
import Router from "next/router";

interface ILogin {
  username: string;
  password: string;
}

const LoginAdminForm = () => {
  const [showPass, setshowPass] = useState<string>("password");

  const handleShowPass = () => {
    if (showPass === "password") setshowPass("input");
    if (showPass === "input") setshowPass("password");
  };

  const initilValues: ILogin = {
    username: "",
    password: "",
  };

  const hadleSubmit = async (data: ILogin) => {
    const { access_token } = await authService.login(data);
    console.log(access_token);

    Router.push("/");
  };

  return (
    <Formik
      initialValues={initilValues}
      onSubmit={(values: ILogin, helpers: FormikHelpers<ILogin>) => {
        hadleSubmit(values);
        helpers.setSubmitting(false);
      }}
    >
      {({ isSubmitting }: FormikState<ILogin>) => (
        <FormContainer>
          <FormContent>
            <h1>Bienvenido</h1>
            <div className="d-flex flex-column gap-5">
              <FormFieldContainer>
                <Image
                  src={"/images/login/user.svg"}
                  width={20}
                  height={20}
                  alt="user_logo"
                />
                <FormField
                  name={"username"}
                  type={"input"}
                  autoComplete="off"
                  placeholder="Username"
                />
              </FormFieldContainer>
              <FormFieldContainer>
                <Image
                  src={"/images/login/password.svg"}
                  width={20}
                  height={20}
                  alt="password"
                />
                <FormField
                  name={"password"}
                  type={showPass}
                  autoComplete="off"
                  placeholder="Password"
                />
                <Image
                  src={"/images/login/show.svg"}
                  width={20}
                  height={20}
                  alt="password"
                  onClick={() => handleShowPass()}
                />
              </FormFieldContainer>
              <FormSubmitButto type="submit" disabled={isSubmitting}>
                Iniciar Sesión
              </FormSubmitButto>
            </div>
          </FormContent>
        </FormContainer>
      )}
    </Formik>
  );
};

export default LoginAdminForm;
