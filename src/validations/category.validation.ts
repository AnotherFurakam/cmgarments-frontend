import { ICategory } from "@/models/category.interface";
import * as Yup from "yup";

export const CategoryFormSchema = Yup.object()
  .shape({
    name: Yup.string()
      .required("Debe llenar el campo Nombre")
      .min(4, "4 caracteres como mínimo")
      .max(20, "20 caracteres como máximo"),
    sizes: Yup.string()
      .required("Debe llenar el campo Tallas")
      .min(1, "1 caracter como mínimo"),
  })
  .optional();
