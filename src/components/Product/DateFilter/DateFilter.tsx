import React, { useState } from 'react';
import { BsSearch } from "react-icons/bs";
import { FilterButton } from './styled-components';
import { ProductsState, useProductStore } from '@/store/ProductStore';
import { shallow } from 'zustand/shallow';
import { productService } from '@/services/product.service';
export interface DateFilterProps { }

const DateFilter: React.FC<DateFilterProps> = () => {

	const [date, setDate] = useState<string>('')

	const productState: ProductsState = useProductStore((state: ProductsState): ProductsState => state, shallow)

	const getAllProducts = async () => {
		productState.setProducts(await productService.getAll())
		console.log("Paso")
	}
	const getByDate = async () => {
		console.log(typeof date)
		if (date === '') {
			getAllProducts()
		} else {
			productState.setProducts(await productService.filterByDateProduct(date))
		}
	}

	return (
		<div className='d-flex gap-1 me-5'>
			<input type="date" className='form-control' onChange={(e) => setDate(e.target.value)} />
			<FilterButton onClick={getByDate} ><BsSearch color='#fff' size={20} /></FilterButton>
		</div>
	);
};

export default DateFilter;
