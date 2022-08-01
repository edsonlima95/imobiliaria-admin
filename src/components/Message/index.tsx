

type ErrorMessageProps = {
    error: string | undefined
}


function ErrorMessage({error}: ErrorMessageProps) {

    return (
        <small className="text-red-500">{error}</small>
    )

}

export default ErrorMessage