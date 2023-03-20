import BaseLayout from "@/components/BaseLayout";
import { ProductCard } from "@/components/Dashboard/ProductCard";
import { QuantityCard } from "@/components/Dashboard/QuantityCard";
import { DashboardContainer } from "@/components/Dashboard/dashboard-styled-components";
import { IProduct, IProductWithImages } from "@/models/product.interface";
import { employeeService } from "@/services/employee.service";
import { productService } from "@/services/product.service";
import { supplierService } from "@/services/supplier.service";
import Image from "next/image";
import { useEffect, useState } from "react";

interface QuantityResponse {
  type: string,
  total: number
}

enum RecentProductQuantity {
  TWO = 2,
  FOUR = 4,
  FIVE = 5,
  SIX = 6
}

export default function Home() {

  const [productQuantity, setProductQuantity] = useState<QuantityResponse>({
    total: 0,
    type: 'Products'
  })

  const [employeeQuantity, setEmployeeQuantity] = useState<QuantityResponse>({
    total: 0,
    type: 'Employees'
  })

  const [supplierQuantity, setSupplierQuantity] = useState<QuantityResponse>({
    total: 0,
    type: 'Suppliers'
  })

  const [recentProducts, setRecentProducts] = useState<IProductWithImages[] | null>(null)


  const productQuantityHandler = async () => {
    const res = await productService.getProductQuantity();
    setProductQuantity(res)
  }

  const employeeQuantityHandler = async () => {
    const res = await employeeService.getEmployeeQuantity();
    setEmployeeQuantity(res)
  }

  const supplierQuantityHandler = async () => {
    const res = await supplierService.getSupplierQuantity();
    setSupplierQuantity(res)
  }

  const getProductHandler = async () => {
    const res = await productService.getRecentProducts(RecentProductQuantity.FIVE);
    setRecentProducts(res);
  }

  useEffect(() => {
    productQuantityHandler()
    employeeQuantityHandler()
    supplierQuantityHandler()
    getProductHandler()
  }, [])



  return (
    <BaseLayout>
      <DashboardContainer>
        <div className="d-flex justify-content-between">
          <QuantityCard type={productQuantity.type} quantity={productQuantity.total} image="/images/dashboard/products.png" />
          <QuantityCard type={employeeQuantity.type} quantity={employeeQuantity.total} image="/images/dashboard/employees.png" />
          <QuantityCard type={supplierQuantity.type} quantity={supplierQuantity.total} image="/images/dashboard/suppliers.png" />
        </div>
        <div className="rounded-4 bg-white p-5 shadow d-flex flex-column gap-5">
          <div className="d-flex justify-content-between align-items-center">
            <h2>Productos recientes</h2>
            <Image src={'/images/dashboard/products_dark.png'} alt="products_dark.png" width={50} height={40} />
          </div>
          <div className="d-flex p-3 gap-4 justify-content-around">
            {
              recentProducts ?
                recentProducts.map(p => <ProductCard product={p} key={p.id_product} />)
                : null
            }
          </div>
        </div>
      </DashboardContainer>
    </BaseLayout>
  );
}
