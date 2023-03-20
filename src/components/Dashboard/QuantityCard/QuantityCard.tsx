import Image from 'next/image';
import React from 'react';

export interface QuantityCardProps {
	type: string,
	quantity: number,
	image: string,
}

const QuantityCard: React.FC<QuantityCardProps> = ({ quantity, type, image }) => {
	return (
		<div className='d-flex align-items-center justify-content-around p-4 rounded-4 shadow' style={{backgroundColor: '#FFFFFF', width: 378}}>
			<div className='d-flex flex-column align-items-center'>
				<h1 className='fw-semibold text-cent'>{quantity}</h1>
				<h5 className='fs-4'>{type}</h5>
			</div>
			<Image src={image} alt={image} width={75} height={60} />
		</div>
	);
};

export default QuantityCard;
