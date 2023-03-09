import * as Yup from "yup";

export const EntranceFormSchema = Yup.object()
  .shape({
    description: Yup.string()
      .required("Debe llenar el campo Descripción")
      .min(4, "4 caracteres como mínimo"),
    units: Yup.number()
      .typeError("Solo carácteres numéricos")
      .required("Debe llenar el campo unidades"),
    unit_cost: Yup.number()
      .typeError("Solo carácteres numéricos")
      .required("Debe llenar el campo Costo"),
  })
  .optional();
