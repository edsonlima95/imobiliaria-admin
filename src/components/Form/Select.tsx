import { forwardRef, SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    type?: string,
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ ...rest }, ref) => {

    return (
        <>
            <select {...rest} ref={ref} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 border border-solid border-gray-300 rounded m-0 focus:ring-0 focus:outline-none"/>
        </>
    )

})