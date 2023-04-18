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
import { Console } from "console";
import { string } from "yup";
import { IPurchase } from "@/models/purchase.interface";
import { ISupplier } from "@/models/supplier.interface";
import { supplierService } from "@/services/supplier.service";
import { purchaseService } from "@/services/purchase.service";
import { PurchaseFormSchema } from "@/validations/purchase.validation";

export interface FormInterface {
    type: string;
    title: string;
    data: IPurchase;
    handleCloseModal: () => void;
    getPurchase: () => Promise<void>;
}

export const Form: React.FC<FormInterface> = ({
    type = "CREATE",
    title,
    data,
    handleCloseModal,
    getPurchase,
}) => {
    const initialValues: IPurchase = {
        supplier: data.id_supplier?.id_supplier ?? "",
        description: data.description ?? "",
        total_price: data.total_price ?? 0,
        date_purchase: data.date_purchase ?? "",
    };

    const [suppliers, setSuppliers] = useState<ISupplier[] | null>(null);

    const handleGetSuppliers = async () => {
        setSuppliers((await supplierService.getAll()).data);
    };

    const handleSubmit = async (
        values: IPurchase,
        helpers: FormikHelpers<IPurchase>
    ) => {
        // console.log("Hola como estas");
        // console.log(values);

        if (type === "CREATE") {
            await purchaseService
                .create(values)
                .then((res) => {
                    helpers.setSubmitting(false);
                    handleCloseModal();
                    getPurchase();
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
            const idPurchase = data.id_purchase;
            console.log(idPurchase);
            if (!idPurchase) return;

            await purchaseService
                .update(values, idPurchase)
                .then((res) => {
                    helpers.setSubmitting(false);
                    handleCloseModal();
                    getPurchase();
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
            validationSchema={PurchaseFormSchema}
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
            }: FormikProps<IPurchase>) => (
                <FormStyled className="d-flex flex-column gap-4 py-5 px-5">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label
                                    htmlFor="description"
                                    className="fw-semibold pb-2"
                                >
                                    Descripcion
                                </label>
                                <InputText
                                    id="description"
                                    type="text"
                                    name="description"
                                    placeholder="Escriba la descripcion"
                                    autoComplete="off"
                                />
                                <FormErrorMessage
                                    name="description"
                                    component={"d"}
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="date_purchase"
                                    className="fw-semibold pb-2"
                                >
                                    Fecha
                                </label>
                                <div className="d-flex align-items-center">
                                    <InputText
                                        id="date_purchase"
                                        type="date"
                                        name="date_purchase"
                                        placeholder="Escriba el Precio"
                                        autoComplete="off"
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-secondary ms-3"
                                        onClick={() => {
                                            const currentDate = new Date()
                                                .toISOString()
                                                .substr(0, 10);
                                            setFieldValue(
                                                "date_purchase",
                                                currentDate
                                            );
                                        }}
                                    >
                                        Hoy
                                    </button>
                                </div>
                                <FormErrorMessage
                                    name="date_purchase"
                                    component={"p"}
                                />
                            </div>

                            <div className="mb-3">
                                <label
                                    htmlFor="id_supplier"
                                    className="fw-semibold pb-2"
                                >
                                    Proveedores
                                </label>
                                <Field
                                    as="select"
                                    id="id_supplier"
                                    className="form-select p-3"
                                    name="id_supplier"
                                >
                                    <option value="">
                                        -- Selecciona un proveedor --
                                    </option>
                                    {suppliers?.map((supplier) => (
                                        <option
                                            key={supplier.id_supplier}
                                            value={supplier.id_supplier}
                                        >
                                            {supplier.name}
                                        </option>
                                    ))}
                                </Field>
                                <FormErrorMessage
                                    name="id_supplier"
                                    component={"p"}
                                />
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
