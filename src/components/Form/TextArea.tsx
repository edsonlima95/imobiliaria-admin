import { forwardRef, TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    type?: string,
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({ ...rest }, ref) => {

    return (
        <>
            <textarea {...rest} ref={ref} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 border border-solid border-gray-300 rounded m-0 focus:ring-0 focus:outline-none"
            ></textarea>
        </>
    )

})
