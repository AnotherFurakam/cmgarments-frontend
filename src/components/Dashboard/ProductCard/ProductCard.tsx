/* eslint-disable @next/next/no-img-element */
import { IProduct, IProductWithImages } from '@/models/product.interface';
import React from 'react';
export interface ProductCardProps {
	product: IProductWithImages
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	return (
		<div className='p-3 rounded-4 d-flex flex-column align-items-center gap-3 shadow' style={{width: 230, minHeight: 230, backgroundColor: '#C4C4C4'}}>
			<img style={{width: '100%', height: 200, objectFit: 'cover', borderRadius: 10}} src={product.images.length > 0 ? product.images[0].url :'/images/dashboard/product_img_example.png'} alt='product_image' />
			<h3 className='text-center fs-4'>{product.name}</h3>
		</div>
	);
};

export default ProductCard;
