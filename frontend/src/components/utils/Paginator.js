import React from 'react';
import { 
    Pagination, 
    PaginationItem, 
    PaginationLink 
} from 'reactstrap';

function Paginator(props) {

    function bindNextPage(page) {
        props.toggleNextPage(page);
    }

    return (
        <Pagination >
            <PaginationItem>
                <PaginationLink
                    first
                    href="#1"
                    onClick={() => bindNextPage('1')}
                />
            </PaginationItem>


            <PaginationItem>
                {props.previousPage !== 0 ?
                    <PaginationLink
                        previous href={"#" + (props.previousPage)}
                        onClick={() => bindNextPage(props.previousPage)}
                    >
                    </PaginationLink>
                    : null}
            </PaginationItem>

            <PaginationItem>
                {props.previousPage !== 0 ?
                    <PaginationLink href={"#" + props.previousPage} onClick={() => bindNextPage(props.previousPage)}>
                        {props.previousPage}
                    </PaginationLink>

                    : null}
            </PaginationItem>

            <PaginationItem>
                <PaginationLink href={"#" + props.currentPage} onClick={() => bindNextPage(props.currentPage)}>
                    {props.currentPage}
                </PaginationLink>
            </PaginationItem>

            <PaginationItem>
                {!(props.nextPage > props.pages) ?
                    <PaginationLink href={"#" + props.nextPage} next onClick={() => bindNextPage(props.nextPage)}>
                        {props.nextPage}
                    </PaginationLink>
                    : null}

            </PaginationItem>

            {!(props.nextPage > props.pages) ?
                <PaginationItem>
                    <PaginationLink
                        next
                        href={"#" + (props.currentPage + 1)}
                        onClick={() => bindNextPage(props.nextPage)}
                    />
                </PaginationItem>

                : null}

            <PaginationItem>
                <PaginationLink
                    last
                    href={"#" + props.pages}
                    onClick={() => {
                        bindNextPage(props.pages)
                    }
                    }
                />
            </PaginationItem>
        </Pagination>
    )
}

export default Paginator;
