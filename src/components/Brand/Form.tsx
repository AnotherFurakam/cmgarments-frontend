import { brand } from "@/services/brand.service";
import { BrandFormSchema } from "@/validations/brand.validation";
import { Formik, FormikHelpers, FormikProps } from "formik";
import Image from "next/image";
import React from "react";
import Swal from "sweetalert2";
import FormErrorMessage from "../styled-component/forms/FormErrorMessage";
import InputText from "../styled-component/forms/InputText";
import SubmitButton from "../styled-component/forms/SubmitButton";
import FormStyled from "../Category/styled-components/FomStyled";
import { IBrand } from "@/models/brand.interface";

export interface FormInterface {
  type: string;
  title: string;
  data: IBrand;
  handleCloseModal: () => void;
  getBrands: () => Promise<void>;
}

export const Form: React.FC<FormInterface> = ({
  type = "CREATE",
  title,
  data,
  handleCloseModal,
  getBrands,
}) => {
  // const { postLocal, putLocal, selectedLocal } = useContext(LocalContext);

  const handleSubmit = async (
    values: IBrand,
    helpers: FormikHelpers<IBrand>
  ) => {
    // console.log("Hola como estas");
    // console.log(values);

    if (type === "CREATE") {
      await brand
        .create(values)
        .then((res) => {
          helpers.setSubmitting(false);
          handleCloseModal();
          getBrands();
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
      const idBrand = values.id_brand ? values.id_brand : "";
      if (!idBrand) return;

      await brand
        .update(values, idBrand)
        .then((res) => {
          helpers.setSubmitting(false);
          handleCloseModal();
          getBrands();
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
      validationSchema={BrandFormSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
        values,
        errors,
        setFieldValue,
        handleChange,
      }: FormikProps<IBrand>) => (
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
