type PaginationProps = {
    total: number,
    current_page: number,
    per_page: number,
    first_page: number,
    last_page: number,
    onPageLink: (link: number) => void
}

const siblingCount: number = 3

function generatePages(from: number, to: number) {
    return [...new Array(to - from)].map((_, index) => {
        return from + index + 1
    }).filter(page => page > 0)
}



function Pagination({ total, current_page, per_page, first_page, last_page, onPageLink }: PaginationProps) {

    const pages = Math.ceil(total / per_page);

    const previous = current_page > 1 ? generatePages(current_page - 1 - siblingCount, current_page - 1)
        : []
    const next = current_page < pages ? generatePages(current_page, Math.min(current_page + siblingCount, pages))
        : []

    const numOfPages = []
    for (let i = 1; i < pages + 1; i++) {
        numOfPages.push(i);
    }

    if (numOfPages.length > 1) {

        return (

            <>

                {current_page > (1 + siblingCount) && (<button className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700" onClick={() => onPageLink(first_page)}>Primeira</button>)}

                {previous.length > 0 && previous.map(page => {
                    return <button className="py-2 px-3 rounded leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100" key={page} disabled={current_page === page ? true : false} onClick={() => onPageLink(page)}>{page}</button>
                })}

                <button className="py-2 px-3 leading-tight rounded text-gray-500 bg-white border border-gray-300 hover:bg-gray-100" disabled={current_page === current_page ? true : false} onClick={() => onPageLink(current_page)}>{current_page}</button>

                {next.length > 0 && next.map(page => {
                    return <button className="py-2 px-3 rounded leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100" key={page} disabled={current_page === page ? true : false} onClick={() => onPageLink(page)}>{page}</button>
                })}

                {(current_page + siblingCount) < pages && (<button className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700" onClick={() => onPageLink(last_page)}>Última</button>)}

            </>
        )
    }

    return (<></>)

}

export { Pagination }