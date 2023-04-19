import { ICategory } from "@/models/category.interface";
import { category } from "@/services/category.service";
import { CategoryFormSchema } from "@/validations/category.validation";
import { Formik, FormikHelpers, FormikProps } from "formik";
import Image from "next/image";
import React from "react";
import Swal from "sweetalert2";
import FormErrorMessage from "../styled-component/forms/FormErrorMessage";
import InputText from "../styled-component/forms/InputText";
import SubmitButton from "../styled-component/forms/SubmitButton";
import FormStyled from "./styled-components/FomStyled";

export interface FormInterface {
  type: string;
  title: string;
  data: ICategory;
  handleCloseModal: () => void;
  getCategories: () => Promise<void>;
}

export const Form: React.FC<FormInterface> = ({
  type = "CREATE",
  title,
  data,
  handleCloseModal,
  getCategories,
}) => {
  // const { postLocal, putLocal, selectedLocal } = useContext(LocalContext);

  const handleSubmit = async (
    values: ICategory,
    helpers: FormikHelpers<ICategory>
  ) => {
    // console.log("Hola como estas");
    // console.log(values);

    if (type === "CREATE") {
      await category
        .create(values)
        .then((res) => {
          helpers.setSubmitting(false);
          handleCloseModal();
          getCategories();
          Swal.fire({
            text: `${title} registrado con éxito`,
            icon: "success",
          });
        })
        .catch((err) => {
          helpers.setSubmitting(false);
          Swal.fire({
            text: "Ocurrio un error al enviar la información",
            icon: "error",
          });
        });
    } else if (type === "UPDATE") {
      const idCategory = values.id_category ? values.id_category : "";
      if (!idCategory) return;

      await category
        .update(values, idCategory)
        .then((res) => {
          helpers.setSubmitting(false);
          handleCloseModal();
          getCategories();
          Swal.fire({
            text: `${title} actualizado con éxito`,
            icon: "success",
          });
        })
        .catch((err) => {
          helpers.setSubmitting(false);
          Swal.fire({
            text: "Ocurrio un error al enviar la información",
            icon: "error",
          });
        });
    }
  };

  return (
    <Formik
      initialValues={data}
      validationSchema={CategoryFormSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
        values,
        errors,
        setFieldValue,
        handleChange,
      }: FormikProps<ICategory>) => (
        <FormStyled className="d-flex flex-column gap-4 py-5 px-5">
          <div className="row">
            <div className="col-md-5">
              <div className="mb-3">
                <label htmlFor="name" className="fw-semibold pb-2">
                  Nombre
                </label>
                <InputText
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Escriba el nombre"
                />
                <FormErrorMessage name="name" component={"p"} />
              </div>
              <div className="mb-3">
                <label htmlFor="sizes" className="fw-semibold pb-2">
                  Tallas
                </label>
                <InputText
                  type="text"
                  name="sizes"
                  placeholder="Escriba las tallas disponibles"
                />
                <FormErrorMessage name="sizes" component={"p"} />
              </div>
            </div>
            <div className="col-md-7 d-flex justify-content-center">
              <Image
                src="/images/png/img-form.png"
                alt="logo"
                width={432}
                height={429}
              />
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <SubmitButton type="submit" disabled={isSubmitting}>
              Guardar
            </SubmitButton>
          </div>
        </FormStyled>
      )}
    </Formik>
  );
};
