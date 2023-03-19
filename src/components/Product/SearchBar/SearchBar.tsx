import InputText from '@/components/styled-component/forms/InputText';
import React, { useEffect, useState } from 'react';
import { SearchCheckBox, SearchInput } from './styled-component/SearchStyles';
import { IGetAllProducts, SearchByEnum } from '@/models/product.interface';
import { ProductsState, useProductStore } from "@/store/ProductStore";
import { productService } from '@/services/product.service';

import {shallow} from "zustand/shallow";
export interface SearchBarProps { }

const SearchBar: React.FC<SearchBarProps> = () => {

	const productState: ProductsState = useProductStore((state: ProductsState): ProductsState => state, shallow)

	const [criterio, setCriterio] = useState<SearchByEnum>(SearchByEnum.NAME)

	const handleCriterio = () => setCriterio(criterio === SearchByEnum.NAME ? SearchByEnum.SKU : SearchByEnum.NAME)

	const getAllProducts = async () => {
		productState.setProducts(await productService.getAll())
		console.log("Paso")
	}

	const searchProduct = async (text: string) => {
		if (text === '') {
			getAllProducts()
		} else {
			productState.setProducts(await productService.searchProducts(text, criterio))
		}
	}

	useEffect(() => {
		getAllProducts()
	}, [])


	return (
		<div className='d-flex gap-3'>
			<div className='d-flex align-items-center gap-1'>
				<SearchCheckBox type='checkbox' onClick={handleCriterio} />
				<label htmlFor='searchby'>SKU</label>
			</div>
			<SearchInput id='searchby' placeholder={`Seach by ${criterio}`} onChange={(e) => searchProduct(e.target.value)} />
		</div>
	);
};

export default SearchBar;
