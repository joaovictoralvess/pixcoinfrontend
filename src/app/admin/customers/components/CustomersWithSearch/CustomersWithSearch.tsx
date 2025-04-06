'use client';

import { useState, ChangeEvent } from 'react';

import CustomerCard from '@/app/admin/customers/components/CustomerCard/CustomerCard';
import { ICustomer } from '@/interfaces/ICustomer';

export interface CustomersWithSearchProps {
	customers: ICustomer[];
	isAdmin?: boolean;
}

import TextInput from '@/components/Forms/TextInput/TextInput';

import './styles.scss';

export default function CustomersWithSearch({
	customers,
	isAdmin,
}: Readonly<CustomersWithSearchProps>) {
	const [searchTerm, setSearchTerm] = useState('');

	const filteredCustomers = customers.filter((customer) =>
		customer.nome.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
		setSearchTerm(e.target.value);

	return (
		<div className="filter-customers">
			<TextInput
				onChange={handleSearchChange}
				className="filter-customers__filter-input"
				name="filter"
				placeholder="Pesquisar Cliente"
				label="Pesquisar Cliente"
				type="search"
			/>
			<div className="filter-customers__wrapper-customers">
				{filteredCustomers.map((customer) => (
					<CustomerCard
						isAdmin={isAdmin}
						key={customer.id}
						customer={customer}
					/>
				))}
			</div>
		</div>
	);
}
