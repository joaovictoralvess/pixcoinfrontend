import { ZodError } from 'zod';

export const dealWithZodErrors = <T, E>(err: ZodError): T => {
    const {fieldErrors} = err.flatten();
    const errors = Object
        .keys(fieldErrors)
        .reduce((acc, key) => ({...acc, [key]: fieldErrors[key]?.at(0)}), {} as E);

    return {
        isValid: false,
        errors
    } as T;
};