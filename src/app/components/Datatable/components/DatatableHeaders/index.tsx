import { useContext } from "react";
import { BsSortDown, BsSortUp } from "react-icons/bs";
import { ACTIONS, IDatatableContext } from "../../types";

export const DatatableHeaders = () => {
  const {
    tableHeaders = [],
    datatableDispatch: dispatch,
    tableState,
  } = useContext(IDatatableContext);

  const { sortColumn, isAscending } = tableState;
  return (
    <thead>
      <tr>
        {tableHeaders?.map((header) => (
          <th key={header.name}>
            <div className="d-flex justify-content-between align-items-center">
              {header.title}

              {isAscending && sortColumn === header.name ? (
                <BsSortDown
                  className="clickable"
                  onClick={() =>
                    dispatch({
                      type: ACTIONS.SORT,
                      payload: {
                        isAscending: !isAscending,
                        sortColumn: header.name,
                      },
                    })
                  }
                />
              ) : (
                <BsSortUp
                  className="clickable"
                  onClick={() =>
                    dispatch({
                      type: ACTIONS.SORT,
                      payload: {
                        isAscending: !isAscending,
                        sortColumn: header.name,
                      },
                    })
                  }
                />
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};
