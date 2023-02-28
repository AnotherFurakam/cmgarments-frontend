import * as Yup from "yup";

export const ProductFormSchema = Yup.object()
  .shape({
    name: Yup.string()
      .required("Debe llenar el campo Nombre")
      .min(8, "8 caracteres como mínimo")
      .max(50, "50 caracteres como máximo"),
    size: Yup.string()
      .required("Debe llenar el campo Talla"),
    color: Yup.string()
      .required("Debe llenar el campo Color")
      .min(4, "4 caracteres como mínimo")
      .max(30, "30 caracteres como máximo"),
    price: Yup.number()
      .required("Debe llenar el campo Precio"),
    stock: Yup.number()
      .required("Debe llenar el campo Stock")
      .min(0, "0 caracteres como mínimo"),
    gender: Yup.string()
      .required("Debe llenar el campo Genero"), 
    description: Yup.string()
      .required("Debe llenar el campo Descripcion")
      .min(0, "0 caracteres como mínimo")
      .max(1000, "1000 caracteres como máximo"),
    state: Yup.boolean()
      .required("Debe llenar el campo Estado"),
    id_brand: Yup.string()
      .required("Debe llenar el campo Marca"), 
    id_category: Yup.string()
        .required("Debe llenar el campo Categoria"), 
    esPrimerCampo: Yup.boolean(),
    
  })
  .optional();

  ProductFormSchema.test('no-es-primer-campo', 'El campo de combobox no puede ser el primero', function (value) {
    const esPrimerCampo = this.parent.esPrimerCampo;
    if (!esPrimerCampo && !value) {
      return true;
    }
    return false;
  });

  