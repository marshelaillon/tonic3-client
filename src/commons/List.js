import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import '../styles/adminView.css';
import { GrRefresh, GrSend } from 'react-icons/gr'
import { useDispatch } from 'react-redux'
import { sendInvitations } from '../state/admin/guestController/guests';
import { sendInvi } from '../utils/sweetAlerts';
const List = ({ refresh, list }) => {
  const dispatch = useDispatch()
  console.log(list.map(item => item.eventId))

  const handlerClick = () => {
    dispatch(sendInvitations())
    sendInvi()
  }
  return (
    <>
      <div className="container border">
        <div className="row-sm info my-2 ">
          <div className="col-sm-10 bg-warning mx-2">
            POR ACA DEBERIA ESTAR UN CONTADOR, ALGO DE INFO SOBRE LA SECCION QUE
            ESTA VISITANDO EL ADMIN Y DEMAS INFO RELEVANTE.
          </div>
          <div /* className="col-sm-2 refresh-btn my-2" */>
            <Button
              /* className="refresh-btn rounded-circle" */
              onClick={() => refresh()}
            >{<GrRefresh />}</Button>
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
              <Button onClick={handlerClick} className="" >Send {<GrSend />}</Button>
            </Table>
          </div>
        </Container>

      </div>
    </>
  );
};

export default List;
