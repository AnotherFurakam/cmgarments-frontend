import React, { useState } from 'react';
import { BsSearch } from "react-icons/bs";
import { FiRefreshCcw } from "react-icons/fi";
import { FilterButton } from './styled-components';
import { ProductsState, useProductStore } from '@/store/ProductStore';
import { shallow } from 'zustand/shallow';
import { productService } from '@/services/product.service';
import Swal from 'sweetalert2';
export interface DateFilterProps { }

const DateFilter: React.FC<DateFilterProps> = () => {

	const [dateStart, setDateStart] = useState<string>('')

	const [dateEnd, setDateEnd] = useState<string>('')

	const productState: ProductsState = useProductStore((state: ProductsState): ProductsState => state, shallow)

	const getAllProducts = async () => {
		productState.setProducts(await productService.getAll())
		console.log("Paso")
	}

	const handleReset = async() => {
		setDateStart('')
		setDateEnd('')
		getAllProducts()
	}

	const getByDate = async () => {
		console.log(typeof dateStart)
		if (dateStart === '' || dateEnd === '') {
			Swal.fire({
				icon: 'warning',
				text: 'Debe ingresar ambas fechas para realizar la busqueda'
			})
		} else {
			productState.setProducts(await productService.filterByDateProduct(dateStart, dateEnd))
		}
	}

	return (
		<div className='d-flex gap-3 me-5 border-2 border p-2 rounded-4'>
			<div className='d-flex align-items-center gap-2'>
				<label className='form-label text-center m-0'>Inicio:</label>
				<input type="date" value={dateStart} className='form-control m-0' onChange={(e) => setDateStart(e.target.value)} />
			</div>
			<div className='d-flex align-items-center gap-2'>
				<label className='form-label text-center m-0'>Final:</label>
				<input type="date" value={dateEnd} className='form-control m-0' onChange={(e) => setDateEnd(e.target.value)} />
			</div>
			<FilterButton onClick={getByDate} ><BsSearch color='#fff' size={20} /></FilterButton>
			<FilterButton onClick={handleReset} ><FiRefreshCcw color='#fff' size={20} /></FilterButton>
		</div>
	);
};

export default DateFilter;
