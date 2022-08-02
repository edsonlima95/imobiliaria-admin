
export function formatCurrency(params: string) {
    const price = params.replaceAll(".","")
    let value = price?.replace(",", ".")
    return value
}

export function formatPtBr(value: string) {
    const format = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(Number(value));

    return format.replace("R$", "").trim()
}