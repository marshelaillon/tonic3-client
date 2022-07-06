import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import '../styles/adminView.css';
import { GrSend } from 'react-icons/gr';
import { IoMdRefreshCircle } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { sendInvitations } from '../state/admin/guestController/guests';
import { removeItem } from '../state/admin/adminUI/removeItem';
import { sendInvi } from '../utils/sweetAlerts';
import { MdDeleteForever } from 'react-icons/md';
const List = ({ refresh, list }) => {
  const dispatch = useDispatch();
  const listener = useSelector(state => state.listener);

  const handlerClick = () => {
    dispatch(sendInvitations());
    sendInvi();
  };

  const handlerDelete = async item => {
    listener &&
      await dispatch(
        removeItem({
          id: item.id,
        })
      );
    await refresh()
  };

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
              variant="link"
              /* className="refresh-btn rounded-circle" */
              onClick={() => refresh()}
            >
              {
                <IoMdRefreshCircle
                  style={{
                    border: '0.3px outset #ff521b',
                    color: '#ff521b',
                    fontSize: '40px',
                    justifyContent: 'center',
                  }}
                />
              }
            </Button>
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
                  {list[0] && <th>eliminar</th>}
                </tr>
              </thead>
              <tbody>
                <>
                  {list.length ? (
                    list.map((item, i) => (
                      <>
                        <tr style={{ color: 'white' }} key={`tr=${i}`}>
                          {Object.keys(item).map((key, j) => (
                            <>
                              <td key={`td=${i}-${j}`} className="">
                                {item[key]?.toString()}
                              </td>
                            </>
                          ))}
                          <td>
                            <Button
                              variant="link"
                              onClick={e => handlerDelete(item)}
                            >
                              {
                                <MdDeleteForever
                                  style={{
                                    color: '#ff521b',
                                    fontSize: '30px',
                                    justifyContent: 'center',
                                  }}
                                />
                              }
                            </Button>
                          </td>
                        </tr>
                      </>
                    ))
                  ) : (
                    <tr></tr>
                  )}
                </>
              </tbody>
              {listener === 'guests' && (
                <Button onClick={handlerClick} className="">
                  Send {<GrSend />}
                </Button>
              )}
            </Table>
          </div>
        </Container>
      </div>
    </>
  );
};

export default List;
