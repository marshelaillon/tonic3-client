import React, { useState } from 'react';
import { Button, Container, Modal } from 'react-bootstrap';
import { Table } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useTranslation } from 'react-i18next';
import '../styles/adminView.css';
import { GrSend } from 'react-icons/gr';
import { sendInvitations } from '../state/admin/guestController/guests';
import { IoMdRefreshCircle } from 'react-icons/io';
import { RiAdminFill } from 'react-icons/ri';
import { BiCalendarEdit } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../state/admin/adminUI/removeItem';
import { sendInvi } from '../utils/sweetAlerts';
import { MdDeleteForever } from 'react-icons/md';
import UpgradeEvents from '../components/adminView/UpgradeEvents';
import { useNavigate } from 'react-router-dom';

const List = ({ refresh, currentList }) => {
  const [show, setShow] = useState(false);
  const [itemEvent, setItemEvent] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const listener = useSelector(state => state.listener);
  const user = useSelector(state => state.user);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { count, list } = currentList;

  const handlerItemEvent = item => {
    console.log('PRUEBA DE CAPTURA DE EVNTO', item);
    setItemEvent(item);
  };

  const handlerClick = () => {
    dispatch(sendInvitations());
    sendInvi();
  };

  const handlerAdmin = values => {};

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
        <div className="head-list row-sm info my-2 d-flex justify-content-between">
          <div className="col-sm-1 mx-2 border text-center my-2">
            <div className="row-sm">{count}</div>
            <div className="row-sm">{t('total')}</div>
          </div>

          <IoMdRefreshCircle
            className="button-refresh"
            size={60}
            onClick={() => refresh()}
          />
        </div>
        <Container>
          <div className="table-responsive">
            <Table variant="light" className="table table-hover">
              <thead>
                <tr style={{ color: 'white' }} scope="col">
                  {list &&
                    Object.keys(list[0] || []).map((item, i) => (
                      <>
                        <th key={`th-${i}`} className="">
                          {item !== 'description' && item !== 'url' && item}
                        </th>
                      </>
                    ))}
                  {list[0] && <th>{t('btn_remove')}</th>}
                  {listener !== 'guests' && <th>Actualizar </th>}
                </tr>
              </thead>
              <tbody>
                <>
                  {list.length ? (
                    list.map((item, i) => (
                      <>
                        <tr
                          style={{ color: 'white' }}
                          key={`tr=${i}`}
                          scope="row"
                        >
                          {Object.keys(item).map((key, j) => (
                            <>
                              <td key={`td=${i}-${j}`} className="">
                                {key !== 'description' &&
                                  key !== 'url' &&
                                  item[key]?.toString()}
                              </td>
                            </>
                          ))}
                          <td>
                            <MdDeleteForever
                              className="trashcan"
                              onClick={() => {
                                handlerDelete(item);
                              }}
                            />
                          </td>
                          {listener === 'events' && (
                            <td>
                              <BiCalendarEdit
                                className="update"
                                onClick={() => {
                                  navigate('/admin/app/upgradeEvent');
                                  setItemEvent(item);
                                  handleShow();
                                }}
                              />
                            </td>
                          )}
                          {listener === 'users' && (
                            <td>
                              <RiAdminFill className="userAdmin" />
                            </td>
                          )}
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
                  {t('send')} {<GrSend value={{ color: 'red' }} />}
                </button>
              )}
              {listener === 'events' && (
                <Modal
                  className="modalFondo"
                  show={show}
                  centered
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={true}
                >
                  <Modal.Body className="modalBody">
                    <UpgradeEvents refresh={refresh} item={itemEvent} />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              )}
            </Table>
          </div>
        </Container>
      </div>
    </>
  );
};

export default List;
