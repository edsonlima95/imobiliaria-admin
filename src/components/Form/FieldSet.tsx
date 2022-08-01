
type FieldSetProps = {
    title: string,
    children: React.ReactNode
}

function FieldSet({ title, children }: FieldSetProps) {

    return (
        <fieldset className="border mt-5 p-5">
            <legend className="text-xl text-gray-600 font-bold">{title}</legend>
            {children}
        </fieldset>
    )

}

export default FieldSet