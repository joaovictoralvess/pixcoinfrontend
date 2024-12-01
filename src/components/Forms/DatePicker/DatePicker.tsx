import { ChangeEvent } from 'react';

export interface DatePickerProps {
	onSelectStartDate: (e: ChangeEvent<HTMLInputElement>) => void;
	onSelectEndDate: (e: ChangeEvent<HTMLInputElement>) => void;
}

import './styles.scss';

export default function DatePickerRange({ onSelectStartDate, onSelectEndDate }: DatePickerProps) {
	return (
		<div className='date-picker-range'>
			<div className='date-picker-range__inputs'>
				<input
					onChange={onSelectStartDate}
					title='A partir'
					type='date'
				/>
				&nbsp;
				<input
					onChange={onSelectEndDate}
					title='Até'
					type='date'
				/>
			</div>
		</div>
	)
}