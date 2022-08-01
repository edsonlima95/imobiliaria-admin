import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    type: string,
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ ...rest }, ref) => {

    return (
        <>
            <input {...rest} ref={ref} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 border border-solid border-gray-300 rounded m-0 focus:ring-0 focus:outline-none"
            />
        </>
    )

})

