import {
	AddRemoteCreditState,
} from '@/app/customer/machine-panel/components/AddRemoteCreditForm/actions';

export const initialState: AddRemoteCreditState = {
	errors: {
		value: undefined,
	},
	isValid: undefined,
};