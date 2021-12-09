import { useContext } from "react";
import { Col, Input, Row } from "reactstrap";
import { ACTIONS, IDatatableContext } from "../../types";

export const DatatableSearchInput = () => {
  const { datatableDispatch, tableState } = useContext(IDatatableContext);
  const { limit } = tableState;
  return (
    <Row className="justify-content-between my-3">
      <Col md={3} className="d-flex">
        <Input
          value={limit}
          onChange={(event) =>
            datatableDispatch({
              type: ACTIONS.LIMIT_CHANGE,
              payload: event.target.value,
            })
          }
          name="limit"
          type="select"
        >
          <option defaultChecked disabled>
            Select Limit
          </option>
          <option>5</option>
          <option>8</option>
          <option>10</option>
          <option>15</option>
          <option>25</option>
        </Input>
      </Col>
      <Col md={3} className="d-flex">
        <Input
          placeholder="Search"
          onChange={(event) => {
            datatableDispatch({
              type: ACTIONS.SEARCH,
              payload: event.target.value,
            });
          }}
        />
      </Col>
    </Row>
  );
};
