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
import {
    IPurchaseDetail,
    IPurchaseDetailPost,
} from "@/models/purchase-detail.interface";
import { purchaseDetailService } from "@/services/purchase-detail.service";
import { PurchaseDetailFormSchema } from "@/validations/purchase_detail.validation";
import { IProductSupplier } from "@/models/productsupplier.interface";
import { productSupplierService } from "@/services/productsupplier.service";
import { purchaseService } from "@/services/purchase.service";
import { IPurchase } from "@/models/purchase.interface";

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
    const [productSupplierData, setProductSupplierData] = useState<
        IProductSupplier[] | null
    >(null);

    const [selectedProductPrice, setSelectedProductPrice] = useState<number>(0);

    const [specificSupplier, setspecificSupplier] = useState<string>("");

    const handleGetProductSupplierData = async () => {
        const response = await productSupplierService.getAll();
        setProductSupplierData(response.data);
    };

    const specificSupplierProducts = productSupplierData?.filter(
        (ps) =>
            ps.supplier?.name.toLowerCase() === specificSupplier.toLowerCase()
    );

    const handleGetPurchase = async () => {
        const response = await purchaseService.getAll();
        const specificPurchase = response.data.find(
            (purchase) => purchase.id_purchase === id_compra
        );
        setspecificSupplier(specificPurchase?.id_supplier?.name + "");
    };

    const handleProductChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedProductId = event.target.value;
        const selectedProduct = specificSupplierProducts?.find(
            (p) => p.product?.id_product === selectedProductId
        );

        if (selectedProduct) {
            setSelectedProductPrice(selectedProduct.unit_cost);
        } else {
            setSelectedProductPrice(0);
        }
    };

    // Difiniendo valores iniciales

    const initialValues: IPurchaseDetailPost = {
        id_product: data.id_product?.id_product ?? "",
        id_purchase: id_compra,
        units: data.units ?? 0,
        price: data.price,
    };

    const [product, setProduct] = useState<IProduct[] | null>(null);

    const handleGetSuppliers = async () => {
        setProduct((await productService.getAll()).data);
    };

    const handleSubmit = async (
        values: IPurchaseDetailPost,
        helpers: FormikHelpers<IPurchaseDetailPost>
    ) => {
        // console.log("Hola como estas");
        console.log(values);

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
                        text: err.response.data.message,
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
        handleGetProductSupplierData();
        handleGetPurchase();
    }, [specificSupplier, setspecificSupplier]);

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
            }: FormikProps<IPurchaseDetailPost>) => (
                <FormStyled className="d-flex flex-column gap-4 py-5 px-5">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label
                                    htmlFor="units"
                                    className="fw-semibold pb-2"
                                >
                                    Unidades
                                </label>
                                <InputText
                                    id="units"
                                    type="number"
                                    name="units"
                                    placeholder="Escriba las unidades"
                                    autoComplete="off"
                                />
                                <FormErrorMessage
                                    name="units"
                                    component={"d"}
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="id_product"
                                    className="fw-semibold pb-2"
                                >
                                    Productos
                                </label>
                                <Field
                                    as="select"
                                    id="id_product"
                                    className="form-select p-3"
                                    name="id_product"
                                    onChange={(event: any) => {
                                        handleChange(event);
                                        handleProductChange(event);
                                    }}
                                >
                                    <option value="">
                                        -- Selecciona un producto --
                                    </option>
                                    {specificSupplierProducts?.map(
                                        (productSupplier) => (
                                            <option
                                                key={
                                                    productSupplier.product
                                                        ?.id_product
                                                }
                                                value={
                                                    productSupplier.product
                                                        ?.id_product
                                                }
                                            >
                                                {productSupplier.product?.name}
                                            </option>
                                        )
                                    )}
                                </Field>
                                <FormErrorMessage
                                    name="id_product"
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
