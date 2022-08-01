import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string,
    title: string,
}

export const CheckBox = forwardRef<HTMLInputElement, InputProps>(({ title, label, ...rest }, ref) => {

    return (
        <>
            <label className="form-check-label inline-block text-gray-800" htmlFor={label}>{title}</label>
            <input type="checkbox" {...rest} ref={ref} className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
        </>
    )

})

