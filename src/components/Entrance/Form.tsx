import { Formik, FormikHelpers, FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import FormErrorMessage from "../styled-component/forms/FormErrorMessage";
import InputText from "../styled-component/forms/InputText";
import SubmitButton from "../styled-component/forms/SubmitButton";
import FormStyled from "../styled-component/FomStyled";
import { IEntrance, IGetEntrance } from "@/models/entrance.interface";
import { entranceService } from "@/services/entrance.service";
import { EntranceFormSchema } from "@/validations/entrance.validation";
import { ISupplier } from "@/models/supplier.interface";
import { supplierService } from "@/services/supplier.service";
import { productService } from "@/services/product.service";
import { IProduct } from "@/models/product.interface";

export interface FormInterface {
  type: string;
  title: string;
  data: IGetEntrance;
  handleCloseModal: () => void;
  getEntrances: () => Promise<void>;
}

interface IValues {
  id_entrance: string;
  description: string;
  units: number;
  unit_cost: number;
  id_product: string;
  id_supplier: string;
}

export const Form: React.FC<FormInterface> = ({
  type = "CREATE",
  title,
  data,
  handleCloseModal,
  getEntrances,
}) => {
  const [supplier, setSupplier] = useState<ISupplier[] | null>(null);
  const [products, setProducts] = useState<IProduct[] | null>(null);

  const initialValues: IValues = {
    id_entrance: data.id_entrance || "",
    description: data.description,
    units: data.units,
    unit_cost: data.unit_cost,
    id_supplier: data.supplier.id_supplier,
    id_product: data.product.id_product,
  };

  const getSuppliers = async () => {
    const suppliers = await supplierService.getAll();
    setSupplier(suppliers.data);
  };

  const getProducts = async () => {
    const products = await productService.getAll();
    setProducts(products.data);
  };

  const handleSubmit = async (
    values: IValues,
    helpers: FormikHelpers<IValues>
  ) => {
    const newValues: IEntrance = {
      ...values,
      units: Number(values.units),
      unit_cost: Number(values.unit_cost),
    };

    console.log(newValues);

    if (type === "CREATE") {
      await entranceService
        .create(values)
        .then((res) => {
          helpers.setSubmitting(false);
          handleCloseModal();
          getEntrances();
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
      const idEntrance = values.id_entrance ? values.id_entrance : "";
      if (!idEntrance) return;
      await entranceService
        .update(values, idEntrance)
        .then((res) => {
          helpers.setSubmitting(false);
          handleCloseModal();
          getEntrances();
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

  useEffect(() => {
    getSuppliers();
    getProducts();
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={EntranceFormSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
        values,
        errors,
        setFieldValue,
        handleChange,
      }: FormikProps<IValues>) => (
        <FormStyled className="d-flex flex-column gap-4 py-5 px-5">
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="name" className="fw-semibold pb-2">
                  Descripción
                </label>
                <InputText
                  id="description"
                  type="text"
                  name="description"
                  placeholder="Escriba la descripcion"
                />
                <FormErrorMessage name="description" component={"p"} />
              </div>
              <div className="mb-3">
                <label htmlFor="units" className="fw-semibold pb-2">
                  Unidades
                </label>
                <InputText
                  type="text"
                  name="units"
                  placeholder="Escriba las tallas disponibles"
                />
                <FormErrorMessage name="units" component={"p"} />
              </div>
              <div className="mb-3">
                <label htmlFor="unit_cost" className="fw-semibold pb-2">
                  Costo por Unidad
                </label>
                <InputText
                  type="text"
                  name="unit_cost"
                  placeholder="Escriba las tallas disponibles"
                />
                <FormErrorMessage name="unit_cost" component={"p"} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="id_supplier" className="fw-semibold pb-2">
                  Proveedor
                </label>
                <InputText
                  as="select"
                  name="id_supplier"
                  onChange={handleChange}
                >
                  <option value="">-- Selecciona un Proveedor --</option>
                  {supplier?.map((s) => (
                    <option value={s.id_supplier} key={s.id_supplier}>
                      {s.name}
                    </option>
                  ))}
                </InputText>
                <FormErrorMessage name="id_supplier" component={"p"} />
              </div>
              <div className="mb-3">
                <label htmlFor="id_product" className="fw-semibold pb-2">
                  Producto
                </label>
                <InputText
                  as="select"
                  name="id_product"
                  onChange={handleChange}
                >
                  <option value="">-- Selecciona un Producto --</option>
                  {products?.map((s) => (
                    <option value={s.id_product} key={s.id_product}>
                      {s.name}
                    </option>
                  ))}
                </InputText>
                <FormErrorMessage name="id_product" component={"p"} />
              </div>
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
