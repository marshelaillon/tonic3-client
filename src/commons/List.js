import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Table } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import '../styles/adminView.css';
import { GrRefresh, GrSend } from 'react-icons/gr';
import { sendInvitations } from '../state/admin/guestController/guests';
import { IoMdRefreshCircle } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
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
      (await dispatch(
        removeItem({
          id: item.id,
        })
      ));
    await refresh();
  };

  return (
    <>
      <div className="container border">
        <div className="head-list row-sm info my-2">
          <div className="col-sm-10 mx-2">
            POR ACA DEBERIA ESTAR UN CONTADOR, ALGO DE INFO SOBRE LA SECCION QUE
            ESTA VISITANDO EL ADMIN Y DEMAS INFO RELEVANTE.
          </div>

          <IoMdRefreshCircle
            className="button-refresh"
            size={60}
            onClick={() => refresh()}
          />
        </div>
        <Container>
          <div style={{ justifyContent: 'center', alignItems: 'center' }}>
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
                            <MdDeleteForever
                              className="trashcan"
                              style={{}}
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
                  Send {<GrSend value={{ color: 'red' }} />}
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
