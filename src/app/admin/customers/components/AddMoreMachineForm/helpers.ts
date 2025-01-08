import { AddMoreMachineState } from '@/app/admin/customers/components/AddMoreMachineForm/actions';

export const initialState: AddMoreMachineState = {
	errors: {
		name: undefined,
		description: undefined,
		store_id: undefined,
		pulse_value: undefined,
	},
	isValid: undefined
};