import { Formik, FormikHelpers, FormikProps } from "formik";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import FormErrorMessage from "../styled-component/forms/FormErrorMessage";
import InputText from "../styled-component/forms/InputText";
import SubmitButton from "../styled-component/forms/SubmitButton";
import FormStyled from "../Category/styled-components/FomStyled";
import { ISale, ISaleDetail } from "@/models/sale.interface";
import { SaleService } from "@/services/sale.service";
import { Badge, Card, ListGroup, ListGroupItem } from "react-bootstrap";

export interface FormInterface {
    type: string;
    title: string;
    data: ISale;
    handleCloseModal: () => void;
    getSale: () => Promise<void>;
}

export const Form: React.FC<FormInterface> = ({ type = "CREATE", data }) => {
    const [saleDetails, setSaleDetails] = useState<ISaleDetail[]>([]);

    const fetchSaleDetails = async () => {
        if (type === "DETAIL" && data.id_sale) {
            try {
                const res = await SaleService.getSaleDetail(data.id_sale + "");
                setSaleDetails(res.data);
            } catch (err) {
                Swal.fire({
                    icon: "error",
                });
            }
        }
    };

    useEffect(() => {
        fetchSaleDetails();
    }, [data]);

    return (
        <div className="container py-5" style={{ backgroundColor: "#f8f9fa", fontSize: "1.2em", padding: "2em" }}>
    <div className="row mb-4">
        <div className="col-12">
            <h5 className="mb-3">Cliente: {data.customer?.names}</h5>
            <h5 className="mb-0">Fecha: {data.create_at?.toString()}</h5>
        </div>
    </div>
    <div className="row">
        <div className="col-12">
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Talla</th>
                        <th>Unidades</th>
                        <th>Precio Unitario</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {saleDetails.map((sale, index) => (
                        <tr key={index}>
                            <td>{sale.product.name}</td>
                            <td>{sale.product.size}</td>
                            <td>{sale.units}</td>
                            <td>{sale.product.price}</td>
                            <td>{sale.product.price * sale.units}</td>
                        </tr>
                    ))}
                    <tr className="table-active font-weight-bold">
                        <td colSpan={4} className="text-right pr-3">
                            Total Venta:
                        </td>
                        <td>{data.total_cost}</td>
                    </tr>
                </tbody>
            </table>
            {data.is_delete ? (
                <div className="alert alert-danger">
                    Esta venta ha sido eliminada
                </div>
            ) : (
                <div className="alert alert-dark">
                    Venta en registro sin problemas
                </div>
            )}
        </div>
    </div>
</div>

    );
};
