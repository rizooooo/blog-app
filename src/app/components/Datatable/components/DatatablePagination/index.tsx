import { useContext } from "react";
import {
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";
import { ACTIONS, IDatatableContext } from "../../types";

const pagination = (current: number, last: number, width = 2) => {
  const left = current - width;
  const right = current + width + 1;
  const range = [];
  const rangeWithDots: any[] = [];
  let l: number;

  for (let i = 1; i <= last; i += 1) {
    if (i === 1 || i === last || (i >= left && i <= right)) {
      range.push(i);
    } else if (i < left) {
      i = left - 1;
    } else if (i > right) {
      range.push(last);
      break;
    }
  }

  range.forEach((i) => {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  });

  return rangeWithDots;
};

export const DatatablePagination = () => {
  const { tableState, datatableDispatch: dispatch } =
    useContext(IDatatableContext);

  const { limit, pageNumber, filteredItems, items, searchText } = tableState;

  const mainItems = !searchText ? items : filteredItems;

  const pager = pagination(+pageNumber, Math.floor(mainItems.length / limit));

  const onPageChange = (page: number) =>
    dispatch({ type: ACTIONS.PAGE_CHANGE, payload: page });

  return mainItems?.length > 0 ? (
    <Row>
      <Col className="d-flex justify-content-end">
        <Pagination aria-label="Page navigation example">
          {pageNumber !== 1 && (
            <>
              <PaginationItem>
                <PaginationLink first onClick={() => onPageChange(1)}>
                  <FaAngleDoubleLeft size={10} /> First
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  previous
                  onClick={() => onPageChange(pageNumber - 1)}
                >
                  <FaAngleDoubleLeft size={10} /> Previous
                </PaginationLink>
              </PaginationItem>
            </>
          )}
          <div className="d-none d-md-flex">
            {pager?.map((a) => (
              <PaginationItem
                key={a}
                disabled={a === "..."}
                onClick={() => {
                  if (a !== "...") onPageChange(a);
                }}
                active={a === pageNumber}
              >
                <PaginationLink>{a}</PaginationLink>
              </PaginationItem>
            ))}
          </div>
          <div className="d-md-none d-flex">
            <PaginationItem active={true}>
              <PaginationLink>{pageNumber}</PaginationLink>
            </PaginationItem>
          </div>

          {pageNumber !== pager[pager.length - 1] && (
            <>
              <PaginationItem>
                <PaginationLink onClick={() => onPageChange(pageNumber + 1)}>
                  <FaAngleDoubleRight size={10} /> Next
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  onClick={() => onPageChange(pager[pager.length - 1])}
                >
                  <FaAngleDoubleRight size={10} /> Last
                </PaginationLink>
              </PaginationItem>
            </>
          )}
        </Pagination>
      </Col>
    </Row>
  ) : (
    <></>
  );
};
