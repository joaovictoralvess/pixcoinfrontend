import { AddMoreCustomerState } from '@/app/admin/customers/components/AddMoreCustomer/AddMoreCustomerForm/actions';


export const initialState: AddMoreCustomerState = {
	errors: {
		name: undefined,
		description: undefined,
		value: undefined,
		stock: undefined,
	},
	isValid: undefined
};