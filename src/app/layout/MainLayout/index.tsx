import { FC } from "react";
import { Col, Container, Row } from "reactstrap";

export const MainLayout: FC = ({ children }) => {
  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col>
          <Container className="h-100">
            <Row className="h-100 align-items-center">
              <Col>{children}</Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};
