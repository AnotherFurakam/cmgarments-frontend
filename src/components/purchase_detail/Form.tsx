import { IBrand } from "@/models/brand.interface";
import { ICategory } from "@/models/category.interface";
import { IProduct } from "@/models/product.interface";
import { category as categoryService } from "@/services/category.service";
import { category } from "@/services/category.service";
import { brand } from "@/services/brand.service";
import { productService } from "@/services/product.service";
import { ProductFormSchema } from "@/validations/product.validation";
import { Field, Formik, FormikHelpers, FormikProps, useFormik } from "formik";
import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import FormErrorMessage from "../styled-component/forms/FormErrorMessage";
import InputText from "../styled-component/forms/InputText";
import SubmitButton from "../styled-component/forms/SubmitButton";
import FormStyled from "./styled-components/FomStyled";

import { PurchaseFormSchema } from "@/validations/purchase.validation";
import { IPurchaseDetail } from "@/models/purchase-detail.interface";
import { purchaseDetailService } from "@/services/purchase-detail.service";
import { PurchaseDetailFormSchema } from "@/validations/purchase_detail.service";

export interface FormInterface {
  id_compra: any;
  type: string;
  title: string;
  data: IPurchaseDetail;
  handleCloseModal: () => void;
  getPurchaseDetail: () => Promise<void>;
}

export const Form: React.FC<FormInterface> = ({
  id_compra,
  type = "CREATE",
  title,
  data,
  handleCloseModal,
  getPurchaseDetail,
}) => {
  // Difiniendo valores iniciales
  console.log("Data: ", data);

  const initialValues: IPurchaseDetail = {
    product: data.id_product?.id_product ?? "",
    purchase: data.id_purchase?.id_purchase ?? "",
    units: data.units ?? 0,
    total_price: data.total_price ?? 0,
  };

  const [product, setProduct] = useState<IProduct[] | null>(null);

  const handleGetSuppliers = async () => {
    setProduct((await productService.getAll()).data);
    console.log(product)
  };

  const handleSubmit = async (
    values: IPurchaseDetail,
    helpers: FormikHelpers<IPurchaseDetail>
  ) => {
    // console.log("Hola como estas");
    // console.log(values);

    if (type === "CREATE") {
      await purchaseDetailService
        .create(values)
        .then((res) => {
          helpers.setSubmitting(false);
          handleCloseModal();
          getPurchaseDetail();
          Swal.fire({
            text: `${title} registrado con éxito`,
            icon: "success",
          });
        })
        .catch((err) => {
          console.log(err);
          helpers.setSubmitting(false);
          Swal.fire({
            text: err.message,
            icon: "error",
          });
        });
    } else if (type === "UPDATE") {
      console.log("ACtualizando", values);
      const idPurchaseDetail = data.id_purchase_detail;
      console.log(idPurchaseDetail);
      if (!idPurchaseDetail) return;

      await purchaseDetailService
        .update(values, idPurchaseDetail)
        .then((res) => {
          helpers.setSubmitting(false);
          handleCloseModal();
          getPurchaseDetail();
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
    handleGetSuppliers();
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={PurchaseDetailFormSchema}
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
      }: FormikProps<IPurchaseDetail>) => (
        <FormStyled className="d-flex flex-column gap-4 py-5 px-5">
          <div className="row">
            <div className="col-md-6">
              <InputText
                className=""
                id="id_purchase"
                type="text"
                name="id_purchase"
                value={id_compra}
                autoComplete="off"
              />
              <div className="mb-3">
                <label htmlFor="units" className="fw-semibold pb-2">
                  Unidades
                </label>
                <InputText
                  id="units"
                  type="number"
                  name="units"
                  placeholder="Escriba las unidades"
                  autoComplete="off"
                />
                <FormErrorMessage name="units" component={"d"} />
              </div>
              <div className="mb-3">
                <label htmlFor="total_price" className="fw-semibold pb-2">
                  Precio total
                </label>
                <InputText
                  id="color"
                  type="number"
                  name="total_price"
                  placeholder="Escriba el precio total"
                  autoComplete="off"
                />
                <FormErrorMessage name="total_price" component={"p"} />
              </div>
              <div className="mb-3">
                <label htmlFor="id_product" className="fw-semibold pb-2">
                  Productos
                </label>
                <Field
                  as="select"
                  id="id_product"
                  className="form-select p-3"
                  name="id_product"
                >
                  <option value="">-- Selecciona un producto --</option>
                  {product?.map((product) => (
                    <option key={product.id_product} value={product.id_product}>
                      {product.name}
                    </option>
                  ))}
                </Field>
                <FormErrorMessage name="id_product" component={"p"} />
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