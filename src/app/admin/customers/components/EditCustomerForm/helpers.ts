import { EditCustomerState } from '@/app/admin/customers/components/EditCustomerForm/actions';

export const initialState: EditCustomerState = {
	errors: {
		name: undefined,
		token: undefined,
		maturity: undefined,
	},
	isValid: undefined
};