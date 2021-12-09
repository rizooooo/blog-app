import { FC, useEffect, useReducer } from "react";
import { Button, Col, Row, Table } from "reactstrap";
import { FaTrash, FaEye } from "react-icons/fa";
import {
  DatatablePagination,
  DatatableSearchInput,
  DatatableHeaders,
} from "./components";
import {
  ACTIONS,
  IDataTableAction,
  IDatatableContext,
  IDatatableProps,
  IDataTableState,
  initialState,
} from "./types";

const datatableReducer = (
  state: IDataTableState,
  action: IDataTableAction
): IDataTableState => {
  switch (action.type) {
    case ACTIONS.SET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    case ACTIONS.DELETE_POST:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case ACTIONS.LIMIT_CHANGE:
      return {
        ...state,
        limit: action.payload,
      };
    case ACTIONS.SORT:
      const { sortColumn, isAscending } = action.payload as IDataTableState;

      return {
        ...state,
        ...action.payload,
        items: state.items?.sort((itemOne, itemTwo) => {
          if (isAscending) {
            return itemOne[sortColumn].localeCompare(itemTwo[sortColumn]);
          }

          return itemTwo[sortColumn].localeCompare(itemOne[sortColumn]);
        }),
      };
    case ACTIONS.SEARCH:
      return {
        ...state,
        searchText: action.payload,
        filteredItems: state.items.filter((data) =>
          JSON.stringify(data)
            .toLowerCase()
            .includes(action.payload.toLowerCase())
        ),
      };
    case ACTIONS.PAGE_CHANGE:
      return {
        ...state,
        pageNumber: action.payload,
      };
    default:
      return state;
  }
};

function paginate(array: any[], page_size: number, page_number: number) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

export const Datatable: FC<IDatatableProps> = (props) => {
  const { tableData = [], tableHeaders = [], onActionClick } = props;
  const [state, dispatch] = useReducer(datatableReducer, {
    ...initialState,
    items: tableData,
  });

  const { limit, pageNumber, items, filteredItems, searchText } = state;

  const mainItems = !searchText ? items : filteredItems;
  const itemsData = paginate(mainItems, limit, pageNumber);

  useEffect(() => {
    dispatch({ type: ACTIONS.SET_ITEMS, payload: tableData });
  }, [tableData]);

  return (
    <IDatatableContext.Provider
      value={{ ...props, tableState: state, datatableDispatch: dispatch }}
    >
      <DatatableSearchInput />
      <Row className='h-100'>
        <Col>
          <Table bordered>
            <DatatableHeaders />
            <tbody>
              {itemsData?.map((data, index) => (
                <tr key={data?.id}>
                  {tableHeaders?.map((header) => (
                    <td key={header.name}>
                      {header.date
                        ? new Date(data[header.name])
                        : data[header.name]}
                    </td>
                  ))}
                  <td className="d-flex align-items-center">
                    <Button
                      type="button"
                      onClick={() => {
                        if (onActionClick) {
                          onActionClick("delete", index, data, dispatch);
                        }
                      }}
                      color="danger"
                      className="me-2"
                    >
                      <FaTrash color="white" />
                    </Button>
                    <Button
                      type="button"
                      color="primary"
                      onClick={() => {
                        if (onActionClick) {
                          onActionClick("view", index, data, dispatch);
                        }
                      }}
                    >
                      <FaEye />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <DatatablePagination />
    </IDatatableContext.Provider>
  );
};
