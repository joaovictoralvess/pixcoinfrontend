"use client";

import { ChangeEvent, useEffect, useRef } from "react";
import "./styles.scss";

export interface DatePickerProps {
	onSelectStartDate: (e: ChangeEvent<HTMLInputElement>) => void;
	onSelectEndDate: (e: ChangeEvent<HTMLInputElement>) => void;
	shouldClear: boolean;
}

export default function DatePickerRange({
	onSelectStartDate,
	onSelectEndDate,
	shouldClear,
	}: DatePickerProps) {
	const startDateRef = useRef<HTMLInputElement>(null);
	const endDateRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (shouldClear) {
			if (startDateRef.current) {
				startDateRef.current.value = "";
				// onSelectStartDate({ target: { value: "" } } as ChangeEvent<HTMLInputElement>);
			}
			if (endDateRef.current) {
				endDateRef.current.value = "";
				// onSelectEndDate({ target: { value: "" } } as ChangeEvent<HTMLInputElement>);
			}
		}
	}, [shouldClear, onSelectStartDate, onSelectEndDate]);

	return (
		<div className="date-picker-range">
			<div className="date-picker-range__inputs">
				<div className='date-picker-range__inputs__wrapper-input'>
					<span>A partir de</span>
					<input
						ref={startDateRef}
						onChange={onSelectStartDate}
						title="A partir"
						type="date"
					/>
				</div>

				<div className="date-picker-range__inputs__wrapper-input">
					<span>Até</span>
					<input
						ref={endDateRef}
						onChange={onSelectEndDate}
						title="Até"
						type="date"
					/>
				</div>
			</div>
		</div>
	);
}
