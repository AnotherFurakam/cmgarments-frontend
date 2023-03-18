import BaseLayout from "@/components/BaseLayout";
import { Form } from "@/components/Product/Form";
import { Modal } from "@/components/Modal";
import ButtonAddStyle from "@/components/styled-component/ButtonAddStyle";
import { Table } from "@/components/Table";
import { IProduct } from "@/models/product.interface";
import { productService } from "@/services/product.service";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { ICategory } from "@/models/category.interface";
import { category } from "@/services/category.service";
import Swal from "sweetalert2";
import { ImageModal } from "@/components/Product/ImageModal";

//? nombres de las columnas
//* la key es la key de las categories
//*segun estas propiedades es la información q mostrara
const colums = {
  name: "Nombre",
  id_category: "Categoria",
  size: "Talla",
  id_brand: "Marca",
  gender: "Genero",
  description: "Descripcion",
  stock: "Stock",
  price: "Precio",
  color: "Color",
  state: "Estado",
};

const initialValues: IProduct = {
  name: "",
  id_category: "",
  size: "",
  id_brand: "",
  gender: "",
  description: "",
  price: 0,
  stock: 0,
  color: "",
  state: true,
};

interface ICleanProduct {
  id_product?: string;
  name: string;
  size: string;
  color: string;
  price: number;
  stock: number;
  gender: string;
  description: string;
  state?: string;
  id_brand?: string;
  id_category?: string;
}

function Product() {
  const [productsForTable, setProductForTable] = useState<
    ICleanProduct[] | null
  >(null);
  const [products, setProduct] = useState<IProduct[] | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectProduct, setSelectProduct] = useState<IProduct>(initialValues);
  // estado modal imagen
  const [isOpenImage, setIsOpenImage] = useState(false);

  const cleanProduct = (product: IProduct[]) => {
    const newProduct = product.map((e) => {
      const id_product = e.id_product;
      const name = e.name;
      const id_category = e.category?.name;
      const size = e.size;
      const id_brand = e.brand?.name;
      const gender = e.gender;
      const price = e.price;
      const description = e.description;
      const stock = e.stock;
      const color = e.color;
      const state = e.state ? "Habilitado" : "Desabilitado";

      return {
        id_product,
        name,
        id_category,
        size,
        id_brand,
        gender,
        description,
        stock,
        price,
        color,
        state,
      };
    });

    setProductForTable(newProduct);
  };

  // Obtener todos los Productos:
  const getProduct = async (): Promise<void> => {
    const product = await productService.getAll();
    cleanProduct(product.data);
    setProduct(product.data);
  };

  // obtener Producto seleccionado
  const searchSelectedProduct = (id: string) =>
    products?.find((p) => p.id_product === id);

  //Funcion para cerrar modal
  const handleCloseModal = () => {
    setIsOpenModal(false);
    if (selectProduct.id_product) setSelectProduct(initialValues);
  };

  const handleOpenModal = (): void => setIsOpenModal(true);

  const handleEditLocal = (id: string): void => {
    const product = searchSelectedProduct(id);
    setSelectProduct(product || initialValues);
    handleOpenModal();
  };

  const handleDeleteProduct = async (id: string): Promise<void> => {
    await productService
      .delete(id)
      .then((res) => {
        Swal.fire(
          "Eliminado!",
          "El registro fue eliminado con éxito",
          "success"
        );
        getProduct();
      })
      .catch((err) => {
        Swal.fire({
          text: err.message,
          icon: "error",
        });
      });
  };

  // abrir modal de Imagen
  const handleImage = (id: string): void => {
    handleEditLocal(id);
    setIsOpenImage(true);
    console.log("abrir form imagen");
  };

  // cerrar modal de Imagen
  const handleCloseImage = (): void => {
    setIsOpenImage(false);
    handleCloseModal();
  };

  useEffect(() => {
    getProduct();
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
                  alt="Producto"
                  width={60}
                  height={60}
                  className="me-3 img-fluid"
                />
                <h1 className="fw-bold fs-3">Productos</h1>
              </div>
              <div className="d-flex align-items-center">
                <ButtonAddStyle type="button" onClick={handleOpenModal}>
                  <span className="d-d-inline-block me-3">Agregar</span>
                  <FaPlus />
                </ButtonAddStyle>
              </div>
            </div>
            <Table
              data={productsForTable}
              colums={colums}
              crudButtons
              customButton={true}
              customButtonTitle={""}
              customFunction={handleImage}
              editFunction={handleEditLocal}
              deleteFunction={handleDeleteProduct}
            />
            <Modal
              title="Producto"
              type={selectProduct.id_product ? "UPDATE" : "CREATE"}
              isOpen={isOpenModal}
              handleCloseModal={
                isOpenImage ? handleCloseImage : handleCloseModal
              }
            >
              {isOpenImage ? (
                <ImageModal
                  data={selectProduct}
                  handleCloseModal={handleCloseImage}
                />
              ) : (
                <Form
                  type={selectProduct.id_product ? "UPDATE" : "CREATE"}
                  title="Producto"
                  data={selectProduct}
                  handleCloseModal={handleCloseModal}
                  getProduct={getProduct}
                />
              )}
            </Modal>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

export default Product;
