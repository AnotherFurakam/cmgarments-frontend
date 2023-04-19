import * as Yup from "yup";

export const ProductSupplierFormSchema = Yup.object()
  .shape({
    id_product: Yup.string()
      .required("Debe llenar el campo Producto"),
    id_supplier: Yup.string()
      .required("Debe llenar el campo Proveedor"),
    unit_cost: Yup.number()
      .typeError("Solo carácteres numéricos")
      .required("Debe llenar el campo Costo"),
  })
.optional();
