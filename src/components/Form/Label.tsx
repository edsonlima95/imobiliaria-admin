
type LabelProps = {
    title: string,
    label: string,
}

function Label({ title, label }: LabelProps) {
    return (
        <label htmlFor={label} className="form-label inline-block mb-2 text-gray-700">{title}</label>
    )
}

export default Label