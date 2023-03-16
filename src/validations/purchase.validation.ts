import * as Yup from "yup";

export const PurchaseFormSchema = Yup.object()
  .shape({
    description: Yup.string()
      .required("Debe llenar el campo descripción")
      .min(3, "3 caracteres como mínimo")
      .max(150, "150 caracteres como máximo"),
    total_price: Yup.number().required("Debe llenar el campo Precio"),
    date_purchase: Yup.date().required("Debe llenar el campo fecha de compra"),
    id_supplier: Yup.string()
    .required("Debe elegit un proveedor")
  })
  .optional();
