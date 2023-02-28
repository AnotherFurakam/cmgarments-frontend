import { IBrand } from "@/models/brand.interface";
import { ICategory } from "@/models/category.interface";
import { IProduct } from "@/models/product.interface";
import { category as categoryService } from "@/services/category.service";
import { category } from "@/services/category.service";
import { brand } from "@/services/brand.service";
import { productService } from "@/services/product.service";
import { ProductFormSchema } from "@/validations/product.validation";
import { Field, Formik, FormikHelpers, FormikProps } from "formik";
import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import FormErrorMessage from "../styled-component/forms/FormErrorMessage";
import InputText from "../styled-component/forms/InputText";
import SubmitButton from "../styled-component/forms/SubmitButton";
import FormStyled from "./styled-components/FomStyled";
import { Console } from "console";


export interface FormInterface {
  type: string;
  title: string;
  data: IProduct;
  handleCloseModal: () => void;
  getProduct: () => Promise<void>;
}


export const Form: React.FC<FormInterface> = ({
  type = "CREATE",
  title,
  data,
  handleCloseModal,
  getProduct,
}) => {

  // Difiniendo valores iniciales
  console.log("Data: ",data)

  const initialValues: IProduct = {
    id_category: data.category?.id_category ?? '',
    name: data.name ?? '',
    size: data.size ?? '',
    id_brand: data.brand?.id_brand ?? '',
    gender: data.gender ?? '',
    description: data.description ?? '',
    price: data.price ?? 0,
    stock: data.stock ?? 0,
    color: data.color ?? '',
    state: data.state??true,
  };

  const [categorias, setCategorias] = useState<ICategory[] | null>(null)
  const [marcas, setMarcas] = useState<IBrand[] | null>(null)
  const [size, setSize] = useState<string[] | null | undefined>(null)
  const handleGetCategorias = async () => {
    setCategorias((await categoryService.getAll()).data)
  }
  const handleSize = (id: string) => {
    console.log("obteniendo tallas de: " + id)

    const sizes = categorias?.find((c) => c.id_category === id)
      ?.sizes.split(",");

    setSize(sizes);
    console.log(size)
  }
  const handleGetBrand = async () => {
    setMarcas((await brand.getAll()).data)
  }
  const handleSubmit = async (
    values: IProduct,
    helpers: FormikHelpers<IProduct>
  ) => {
    // console.log("Hola como estas");
    // console.log(values);

    if (type === "CREATE") {
      await productService
        .create(values)
        .then((res) => {
          helpers.setSubmitting(false);
          handleCloseModal();
          getProduct();
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
      console.log('ACtualizando',values)
      const idProduct = data.id_product;
      console.log(idProduct)
      if (!idProduct) return;

      await productService
        .update(values, idProduct)
        .then((res) => {
          helpers.setSubmitting(false);
          handleCloseModal();
          getProduct();
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
    handleGetCategorias();
    handleGetBrand();
  }, [])

  useEffect(() => {
    if (categorias !== null)
      handleSize(initialValues.id_category as string)
  }, [categorias])

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ProductFormSchema}
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
      }: FormikProps<IProduct>) => (
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
                  autoComplete="off"
                />
                <FormErrorMessage name="name" component={"p"} />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="fw-semibold pb-2">
                  Descripcion
                </label>
                <InputText
                  id="description"
                  type="text"
                  name="description"
                  placeholder="Escriba la descripcion"
                  autoComplete="off"
                />
                <FormErrorMessage name="description" component={"d"} />
              </div>
              <div className="mb-3">
                <label htmlFor="stock" className="fw-semibold pb-2">
                  Stock
                </label>
                <InputText
                  id="stock"
                  type="number"
                  name="stock"
                  placeholder="Dijite el stock"
                  autoComplete="off"
                />
                <FormErrorMessage name="stock" component={"p"} />
              </div>
              <div className="mb-3">
                <label htmlFor="color" className="fw-semibold pb-2">
                  Color
                </label>
                <InputText
                  id="color"
                  type="text"
                  name="color"
                  placeholder="Escriba el Color"
                  autoComplete="off"
                />
                <FormErrorMessage name="color" component={"p"} />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="fw-semibold pb-2">
                  Precio
                </label>
                <InputText
                  id="price"
                  type="text"
                  name="price"
                  placeholder="Escriba el Precio"
                  autoComplete="off"
                />
                <FormErrorMessage name="price" component={"p"} />
              </div>

            </div>
            <div className="col-md-6">

              <div className="mb-3">
                <label htmlFor="state" className="fw-semibold pb-2">
                  Estado
                </label>
                <Field name="state" className="form-select p-3" as="select" value={values.state? 1 : 0} onChange={(e: any) => setFieldValue('state', e.target.value === 1 ? true : false)}>
                  <option value={1}>
                    Habilitado
                  </option>
                  <option value={0}>
                    Deshabilitado
                  </option>
                </Field>
                <FormErrorMessage name="state" component={"p"} />
              </div>
              <div className="mb-3">
                <label htmlFor="id_category" className="fw-semibold pb-2">
                  Categoria
                </label>
                <Field as="select" id="id_category" className="form-select p-3" name="id_category" onChange={(e: any) => { setFieldValue("id_category", e.target.value); handleSize(e.target.value) }}>
                  <option value="">-- Selecciona una Categoria --</option>
                  {categorias?.map((categoria) => (
                    <option key={categoria.id_category} value={categoria.id_category}>
                      {categoria.name}
                    </option>
                  ))}
                </Field>
                <FormErrorMessage name="id_category" component={"p"} />
              </div>
              <div className="mb-3">
                <label htmlFor="size" className="fw-semibold pb-2">
                  Talla
                </label>
                <Field as="select" id="size" className="form-select p-3" name="size">
                  <option value="">-- Selecciona una Talla --</option>
                  {
                    size?.map((talla, index) => (
                      <option key={index} value={talla}>
                        {talla}
                      </option>
                    ))
                  }
                </Field>
                <FormErrorMessage name="size" component={"p"} />
              </div>
              <div className="mb-3">
                <label htmlFor="id_brand" className="fw-semibold pb-2">
                  Marca
                </label>
                <Field as="select" id="id_brand" className="form-select p-3" name="id_brand">
                  <option value="">-- Selecciona una Marca --</option>
                  {marcas?.map((marca) => (
                    <option key={marca.id_brand} value={marca.id_brand}>
                      {marca.name}
                    </option>
                  ))}
                </Field>
                <FormErrorMessage name="id_brand" component={"p"} />
              </div>

              <div className="mb-3">
                <label htmlFor="name" className="fw-semibold pb-2">
                  Genero
                </label>
                <Field name="gender" as="select" className="form-select p-3">
                  <option value="">-- Selecciona una Genero --</option>
                  <option value="Masculino">
                    Masculino
                  </option>
                  <option value="Femenino">
                    Femenino
                  </option>
                </Field>
                <FormErrorMessage name="gender" component={"g"} />
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
