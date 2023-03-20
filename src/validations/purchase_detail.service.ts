import * as Yup from "yup";

export const PurchaseDetailFormSchema = Yup.object()
  .shape({
    units: Yup.number().required("Debe llenar el campo unidades"),
    total_price: Yup.number().required("Debe llenar el campo Precio"),
    id_product: Yup.string()
    .required("Debe elegit un producto")
  })
  .optional();
