import { EditMachineState } from '@/app/customer/machine-panel/components/EdiMachineForm/actions';

export const initialState: EditMachineState = {
	errors: {
		name: undefined,
		description: undefined,
		value: undefined,
		stock: undefined,
	},
	isValid: undefined
};