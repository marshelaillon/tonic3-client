import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

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
        {/* <Container> */}
        <div
          style={{ justifyContent: 'center', alignItems: 'center' }}
          className=""
        >
          <Table className="container-sm">
            {/* <div className="row-sm justify-content-around"> */}
            <Thead>
              <Tr style={{ color: 'white' }}>
                {list &&
                  Object.keys(list[0] || []).map((item, i) => (
                    <>
                      <Th key={`th-${i}`} className="">
                        {item}
                      </Th>
                    </>
                  ))}
              </Tr>
            </Thead>
            {/* </div> */}
            <Tbody className="row-sm">
              <>
                {list.length ? (
                  list.map((item, i) => (
                    <Tr style={{ color: 'white' }} key={`tr=${i}`}>
                      {Object.keys(item).map((key, j) => (
                        <Td key={`td=${i}-${j}`} className="">
                          {item[key]?.toString()}
                        </Td>
                      ))}
                    </Tr>
                  ))
                ) : (
                  <Tr></Tr>
                )}
              </>
            </Tbody>
            <Button className="">Send</Button>
          </Table>
        </div>
        {/* </Container> */}
      </div>
    </>
  );
};

export default List;
