import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Table } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useTranslation } from 'react-i18next';
import '../styles/adminView.css';
import { GrRefresh, GrSend } from 'react-icons/gr';
import { sendInvitations } from '../state/admin/guestController/guests';
import { IoMdRefreshCircle } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../state/admin/adminUI/removeItem';
import { sendInvi } from '../utils/sweetAlerts';
import { MdDeleteForever } from 'react-icons/md';

const List = ({ refresh, currentList }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { count, list } = currentList;
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
        <div className="head-list row-sm info my-2 d-flex justify-content-between">
          <div className="col-sm-1 mx-2 border text-center my-2">
            <div className="row-sm">{count}</div>
            <div className="row-sm">total</div>
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
                  {list[0] && <th>{t('btn_remove')}</th>}
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
