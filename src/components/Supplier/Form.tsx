import { ISupplier } from "@/models/supplier.interface";
import { supplierService } from "@/services/supplier.service";
import { SupplierFormSchema } from "@/validations/supplier.validation";
import { Field, Formik, FormikHelpers, FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import FormErrorMessage from "../styled-component/forms/FormErrorMessage";
import InputText from "../styled-component/forms/InputText";
import SubmitButton from "../styled-component/forms/SubmitButton";
import FormStyled from "./styled-components/FomStyled";

export interface FormInterface {
  type: string;
  title: string;
  data: ISupplier;
  handleCloseModal: () => void;
  getSuppliers: () => Promise<void>;
}

export const Form: React.FC<FormInterface> = ({
  type = "CREATE",
  title,
  data,
  handleCloseModal,
  getSuppliers,
}) => {
  const handleSubmit = async (
    values: ISupplier,
    helpers: FormikHelpers<ISupplier>
  ) => {
    // console.log("Hola como estas");
    console.log(values);

    if (type === "CREATE") {
      await supplierService
        .create(values)
        .then((res) => {
          helpers.setSubmitting(false);
          handleCloseModal();
          getSuppliers();
          Swal.fire({
            text: `${title} registrado con éxito`,
            icon: "success",
          });
        })
        .catch((err) => {
          helpers.setSubmitting(false);
          Swal.fire({
            text: err.message,
            icon: "error",
          });
        });
    } else if (type === "UPDATE") {
      const idSupplier = values.id_supplier ? values.id_supplier : "";
      if (!idSupplier) return;

      await supplierService
        .update(values, idSupplier)
        .then((res) => {
          helpers.setSubmitting(false);
          handleCloseModal();
          getSuppliers();
          Swal.fire({
            text: `${title} actualizado con éxito`,
            icon: "success",
          });
        })
        .catch((err) => {
          helpers.setSubmitting(false);
          Swal.fire({
            text: err.message,
            icon: "error",
          });
        });
    }
  };

  return (
    <Formik
      initialValues={data}
      validationSchema={SupplierFormSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
        values,
        errors,
        setFieldValue,
        handleChange,
      }: FormikProps<ISupplier>) => (
        <FormStyled className="d-flex flex-column gap-4 py-5 px-5">
          <div className="row">
            <div className="col-md-6">
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
                <label htmlFor="description" className="fw-semibold pb-2">
                  Descripción
                </label>
                <InputText
                  type="text"
                  name="description"
                  placeholder="Escriba su descripción"
                />
                <FormErrorMessage name="description" component={"p"} />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="fw-semibold pb-2">
                  Dirección
                </label>
                <InputText
                  type="text"
                  name="address"
                  placeholder="Escriba su dirección"
                />
                <FormErrorMessage name="address" component={"p"} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="phone" className="fw-semibold pb-2">
                  Telefono
                </label>
                <InputText
                  type="text"
                  name="phone"
                  placeholder="Escriba su número de telefono"
                />
                <FormErrorMessage name="phone" component={"p"} />
              </div>
              <div className="mb-3">
                <label htmlFor="ruc" className="fw-semibold pb-2">
                  Ruc
                </label>
                <InputText
                  type="text"
                  name="ruc"
                  placeholder="Escriba su ruc"
                />
                <FormErrorMessage name="ruc" component={"p"} />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <SubmitButton type="submit" disabled={isSubmitting}>
              Registrar
            </SubmitButton>
          </div>
        </FormStyled>
      )}
    </Formik>
  );
};
