import React, { useEffect, useState } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Views from './Views';
import Header from './Header';
import List from '../../commons/List';
import { fillingList } from '../../utils/enviroment';

const Adminview = () => {
  const _listener = useSelector(state => state.listener);
  const [currentList, setCurrentList] = useState({});
  const dispatch = useDispatch();
  const { type } = useParams();

  const dispatchAndSetCurrent = () => {
    dispatch(fillingList[_listener || type]())
      .then(({ payload }) => setCurrentList(payload || []))
      .catch(error => console.log('dispatchAndSetCurrent ERROR', error));
  };
  useEffect(() => {
    dispatchAndSetCurrent();
  }, [_listener, currentList]);
  return (
    <>
      <Header />
      <List refresh={dispatchAndSetCurrent} list={currentList?.rows || []} />
      <Routes>
        <Route path={`/:action`} element={<Views current={currentList} />} />
      </Routes>
    </>
  );
};

export default Adminview;
