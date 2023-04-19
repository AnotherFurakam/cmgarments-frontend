
import { productService } from "@/services/product.service";
import { Field, Formik, FormikHelpers, FormikProps, useFormik } from "formik";
import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import FormErrorMessage from "../styled-component/forms/FormErrorMessage";
import InputText from "../styled-component/forms/InputText";
import SubmitButton from "../styled-component/forms/SubmitButton";
import FormStyled from "./styled-components/FomStyled";
import { Console } from "console";
import { string } from "yup";
import { IProductSupplier } from "@/models/productsupplier.interface";
import { IProduct } from "@/models/product.interface";
import { ISupplier } from "@/models/supplier.interface";
import { supplierService } from "@/services/supplier.service";
import { productSupplierService } from "@/services/productsupplier.service";
import { ProductSupplierFormSchema } from "@/validations/productsupplier.validation";


export interface FormInterface {
  type: string;
  title: string;
  data: IProductSupplier;
  handleCloseModal: () => void;
  getProductSupplier: () => Promise<void>;
}


export const Form: React.FC<FormInterface> = ({
  type = "CREATE",
  title,
  data,
  handleCloseModal,
  getProductSupplier,
}) => {

  // Difiniendo valores iniciales
  console.log("Data: ",data)

  const initialValues: IProductSupplier = {
    id_product: data.product?.id_product ?? '',
    id_supplier: data.supplier?.id_supplier ?? '',
    unit_cost: data.unit_cost?? 0,
  };

  const [products, setProducts] = useState<IProduct[] | null>(null)
  const [suppliers, setSupplier] = useState<ISupplier[] | null>(null)
  const handleGetProduct = async () => {
    setProducts((await productService.getAll()).data)
  }

  const handleGetSupplier = async () => {
    setSupplier((await supplierService.getAll()).data)
  }
  const handleSubmit = async (
    values: IProductSupplier,
    helpers: FormikHelpers<IProductSupplier>
  ) => {
    // console.log("Hola como estas");
    // console.log(values);
    
    if (type === "CREATE") {
        await productSupplierService
        .create(values)
        .then((res) => {
          helpers.setSubmitting(false);
          handleCloseModal();
          getProductSupplier();
          Swal.fire({
            text: `${title} registrado con éxito`,
            icon: "success",
          });
        })
        .catch((err) => {
          console.log(err)
          helpers.setSubmitting(false);
          Swal.fire({
            text: err.message,
            icon: "error",
          });
        });
    } else if (type === "UPDATE") {
      console.log('Actualizando',values)
      const idProductSupplier = data.id_productsupplier;
      console.log(idProductSupplier)
      if (!idProductSupplier) return;

      await productSupplierService
        .update(values, idProductSupplier)
        .then((res) => {
          helpers.setSubmitting(false);
          handleCloseModal();
          getProductSupplier();
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
    handleGetProduct();
    handleGetSupplier();
  }, [])

  useEffect(() => {
    
  }, [products, suppliers])

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ProductSupplierFormSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
        values,
        initialValues,
        errors,
        setFieldValue,
        handleChange,
      }: FormikProps<IProductSupplier>) => (
        <FormStyled className="d-flex flex-column gap-4 py-5 px-5">
          <div className="row">
            <div className="col-md-6">
                <div className="mb-3">
                    <label htmlFor="id_product" className="fw-semibold pb-2">
                    Producto
                    </label>
                    <Field as="select" id="id_product" className="form-select p-3" name="id_product" onChange={(e: any) => { setFieldValue("id_product", e.target.value);}}>
                        <option value="">-- Selecciona un Producto --</option>
                        {products?.map((product) => (
                            <option key={product.id_product} value={product.id_product}>
                            {product.name}
                            </option>
                        ))}
                    </Field>
                    <FormErrorMessage name="id_product" component={"p"} />
                </div>
              <div className="mb-3">
                <label htmlFor="id_supplier" className="fw-semibold pb-2">
                  Categoria
                </label>
                <Field as="select" id="id_supplier" className="form-select p-3" name="id_supplier" onChange={(e: any) => { setFieldValue("id_supplier", e.target.value);}}>
                  <option value="">-- Selecciona un Proveedor --</option>
                  {suppliers?.map((suppliers) => (
                    <option key={suppliers.id_supplier} value={suppliers.id_supplier}>
                      {suppliers.name}
                    </option>
                  ))}
                </Field>
                <FormErrorMessage name="id_supplier" component={"s"} />
              </div>

            </div>
            <div className="col-md-6">
                <div className="mb-3">
                    <label htmlFor="unit_cost" className="fw-semibold pb-2">
                        Costo por Unidad
                        </label>
                        <InputText
                        type="text" pattern="\d+(\.\d{1,2})?"
                        name="unit_cost"
                        placeholder="Escriba las tallas disponibles"
                        />
                    <FormErrorMessage name="unit_cost" component={"p"} />
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