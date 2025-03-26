import { AddEmployeeState } from '@/app/admin/customers/components/AddEmployeeForm/actions';


export const initialState: AddEmployeeState = {
	errors: {
		name: undefined,
		email: undefined,
		password: undefined,
	},
	isValid: undefined
};