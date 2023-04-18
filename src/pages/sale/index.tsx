import BaseLayout from "@/components/BaseLayout";
import React, { useEffect, useState } from "react";
import { ICategory } from "@/models/category.interface";
import { category } from "@/services/category.service";
import { Table } from "@/components/Table";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import ButtonAddStyle from "@/components/styled-component/ButtonAddStyle";
import { Modal } from "@/components/Modal";
import { Form } from "@/components/Sale/Form";
import Swal from "sweetalert2";
import { ISale } from "@/models/sale.interface";
import { SaleService } from "@/services/sale.service";
import TableActionButton from "@/components/Table/styled-component/TableActionButton";
import { BsImages } from "react-icons/bs";
import Pagination from "@/components/Pagination/Pagination";
import { IGetAll } from "@/models/global.interface";

//? nombres de las columnas
//* la key es la key de las categories
//*segun estas propiedades es la información q mostrara
const colums = {
    total_cost: "Precio Total",
    customer: "Cliente",
    sale_detail: "Cantidad detalle",
    is_delete: "Eliminado",
};

const initialValues: ISale = {
    total_cost: "",
    is_delete: true,
    sale_detail: [],
};

function Sale() {
    // estado de categorias y modal
    const [sale, setSale] = useState<IGetAll<ISale> | null>(null);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [deleteBoolean, setdeleteBoolean] = useState(false);
    const [selectedSale, setSelectedSale] =
        useState<ISale>(initialValues);

    // obtener ventas
    const getSales = async (page?: number): Promise<void> => {
        const sales = await SaleService.getAll(page);
        setSale(sales);
    };

    // obtener venta seleccionada
    const searchSelectedSale = (id: string) =>
    sale?.data.find((p) => p.id_sale === id);
    
    const mapSaleData = (sales: ISale[]) => {
        return sales.map(sale => {
            return {
            ...sale,
            sale_detail: sale.sale_detail.length + (sale.sale_detail.length === 1 ? " Producto" : " Productos"),
            customer: typeof sale.customer === 'object' && sale.customer !== null ? sale.customer.names : sale.customer,
            };
        });
    };

    const handleOpenModal = (): void => setIsOpenModal(true);

    const handleDetailSale = (id: string): void => {
        const sale = searchSelectedSale(id);
        setSelectedSale(sale || initialValues);
        handleOpenModal();
    };

    // funcion para cerra el modal
    const handleCloseModal = () => {
        setIsOpenModal(false);
        if (selectedSale.id_sale) setSelectedSale(initialValues);
    };

    const handleDeleteSale = async (id: string): Promise<void> => {
        console.log(id)
        await SaleService
            .delete(id)
            .then((res) => {
                Swal.fire(
                    "Eliminado!",
                    "El registro fue eliminado con éxito",
                    "success"
                );
                getSales();
            })
            .catch((err) => {
                Swal.fire({
                    text: err.message,
                    icon: "error",
                });
            });
    };

    useEffect(() => {
        getSales();
    }, []);

    return (
        <BaseLayout>
            <div className="bg-main px-4 py-5">
                <div className="bg-white rounded-4">
                    <div className="py-4 px-5">
                        <div className="d-flex justify-content-between mt-2 mb-4">
                            <div className="d-flex align-items-center">
                                <Image
                                    src="/images/png/product-select.png"
                                    alt="Ventas"
                                    width={60}
                                    height={60}
                                    className="me-3 img-fluid"
                                />
                                <h1 className="fw-bold fs-3">Ventas</h1>
                            </div>
                            
                        </div>
                        <Table
                            data={sale?.data ? mapSaleData(sale.data) : null}
                            colums={colums}
                            crudButtons={false}
                            customButton={false}
                            customButtonSale={true}
                            isDelete={deleteBoolean}                            
                            customButtonTitle={""}
                            customFunction={handleDetailSale}
                            editFunction={() => {}}
                            deleteFunction={handleDeleteSale}
                        />
                        <Pagination actualPage={sale?.actualPage} nextPage={sale?.nextPage} totalPage={sale?.totalPages} prevPage={sale?.prevPage} getContentFn={getSales} />
                        <Modal
                            title="de Venta"   
                            type="DETAIL"
                            isOpen={isOpenModal}
                            handleCloseModal={handleCloseModal}
                        >
                            <Form
                                type="DETAIL"
                                title="de Venta"
                                data={selectedSale}
                                handleCloseModal={handleCloseModal}
                                getSale={getSales}
                            />
                        </Modal>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}

export default Sale;
