import { createContext } from "react";

export type IDatatableProps = Omit<
  IDatatableInterface,
  "tableState" | "datatableDispatch"
>;

export const ACTIONS = {
  SORT: "SORT",
  SEARCH: "SEARCH",
  PAGE_CHANGE: "PAGE_CHANGE",
  LIMIT_CHANGE: "LIMIT_CHANGE",
  DELETE_POST: "DELETE_POST",
  UPDATE_POST: "UPDATE_POST",
  ADD_POST: "ADD_POST",
  SET_ITEMS: "SET_ITEMS"
};

export const initialState: IDataTableState = {
  isAscending: false,
  sortColumn: "",
  searchText: "",

  pageNumber: 1,
  limit: 10,

  items: [],
  filteredItems: [],
};

export const IDatatableContext = createContext<IDatatableInterface>({
  tableData: [],
  tableHeaders: [],

  tableState: initialState,
  datatableDispatch: () => null,
});

export interface IDatatableInterface {
  tableData: any[];
  tableHeaders: ITableHeader[];

  onActionClick?: (
    type: "delete" | "view",
    index: number,
    data: any,
    dispatch: React.Dispatch<IDataTableAction>
  ) => void;

  tableState: IDataTableState;

  datatableDispatch: React.Dispatch<IDataTableAction>;

  onYes?: () => void;
}

export interface ITableHeader {
  title: string;
  name: string;
  date?: boolean;
}

export interface IDataTableState {
  sortColumn: string;
  isAscending: boolean;
  searchText?: string;

  pageNumber: number;
  limit: number;

  items: any[];
  filteredItems: any[];
}

export interface IDataTableAction {
  type: string;
  payload?: any;
}
