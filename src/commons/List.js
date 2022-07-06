import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Table} from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import '../styles/adminView.css';
import { GrSend } from 'react-icons/gr';
import { IoMdRefreshCircle } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeInvitations,
  sendInvitations,
} from '../state/admin/guestController/guests';
import { sendInvi } from '../utils/sweetAlerts';
import { MdDeleteForever } from 'react-icons/md';
const List = ({ refresh, list }) => {
  const dispatch = useDispatch();
  const listener = useSelector(state => state.listener);

  const handlerClick = () => {
    dispatch(sendInvitations());
    sendInvi();
  };

  const handlerDelete = item => {
    dispatch(
      removeInvitations({
        id: item.id
      })
    );
  };

  return (
    <>
      <div className="container border">
        <div className="head-list row-sm info my-2">
          <div className="col-sm-10 mx-2">
            POR ACA DEBERIA ESTAR UN CONTADOR, ALGO DE INFO SOBRE LA SECCION QUE
            ESTA VISITANDO EL ADMIN Y DEMAS INFO RELEVANTE.
          </div>

          {/* <Button
              variant="link"
              /* className="refresh-btn rounded-circle" 
              onClick={() => refresh()}
            >*/}

          <IoMdRefreshCircle
            className='button-refresh'
            size={60}
            onClick={() => refresh()}
          />

          {/* </Button> */}

        </div>
        <Container>
          <div
            style={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <Table variant="light">
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
                  <th>eliminar</th>
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

                            <MdDeleteForever
                              className='trashcan'
                              style={{

                              }}
                              onClick={() => handlerDelete(item)}
                            />

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
                
                <button onClick={handlerClick} className="send-button">
                  Send {<GrSend value= {{color: "red"}}/>}
                </button>
              )}
            </Table>
          </div>
        </Container>
      </div>
    </>
  );
};

export default List;
