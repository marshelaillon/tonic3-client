import React from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import '../styles/adminView.css';

const List = ({ refresh, list }) => {
  return (
    <>
      <div className="container border">
        <div className="row-sm info my-2 ">
          <div className="col-sm-10 bg-warning mx-2">
            POR ACA DEBERIA ESTAR UN CONTADOR, ALGO DE INFO SOBRE LA SECCION QUE
            ESTA VISITANDO EL ADMIN Y DEMAS INFO RELEVANTE.
          </div>
          <div className="col-sm-2 refresh-btn my-2">
            <Button
              className="refresh-btn rounded-circle"
              onClick={() => refresh()}
            ></Button>
          </div>
        </div>
        <Container>
          <div
            style={{ justifyContent: 'center', alignItems: 'center' }}
            className=""
          >
            <Table>
              <thead>
                <tr style={{ color: 'white' }}>
                  {list &&
                    Object.keys(list[0] || []).map((item, i) => (
                      <>
                        <th key={`th-${i}`} className="">
                          {item}
                        </th>
                      </>
                    ))}
                </tr>
              </thead>
              <tbody>
                <>
                  {list.length ? (
                    list.map((item, i) => (
                      <tr style={{ color: 'white' }} key={`tr=${i}`}>
                        {Object.keys(item).map((key, j) => (
                          <td key={`td=${i}-${j}`} className="">
                            {item[key]?.toString()}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr></tr>
                  )}
                </>
              </tbody>
              <Button className="">Send</Button>
            </Table>
          </div>
        </Container>
      </div>
    </>
  );
};

export default List;
