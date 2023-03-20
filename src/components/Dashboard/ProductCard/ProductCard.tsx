import { IProduct } from '@/models/product.interface';
import Image from 'next/image';
import React from 'react';
export interface ProductCardProps {
	product: IProduct
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	return (
		<div className='p-3 rounded-4 d-flex flex-column align-items-center gap-3 shadow' style={{width: 230, minHeight: 230, backgroundColor: '#C4C4C4'}}>
			<Image src={'/images/dashboard/product_img_example.png'} width={140} height={140} alt='product_image' />
			<h3 className='text-center fs-4'>{product.name}</h3>
		</div>
	);
};

export default ProductCard;
