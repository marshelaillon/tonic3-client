import React, { useEffect, useState } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Views from './Views';
import Header from './Header';
import List from '../../commons/List';
import { fillingList } from '../../utils/enviroment';

const Adminview = () => {
  const _listener = useSelector(state => state.listener);
  const guests = useSelector(state => state.guests);
  const [currentList, setCurrentList] = useState({});
  const dispatch = useDispatch();
  const { type } = useParams();

  const dispatchAndSetCurrent = async () => {
    try {
      const { payload } = await dispatch(fillingList[_listener || type]());
      setCurrentList(payload || []);
    } catch (error) {
      console.error('REFRESH ', error);
    }
  };
  useEffect(() => {
    dispatchAndSetCurrent();
  }, [_listener]);

  return (
    <>
      <Header />
      <List
        refresh={dispatchAndSetCurrent}
        currentList={{ list: currentList.rows || [], count: currentList.count }}
      />
      <Routes>
        <Route
          path={`/:action`}
          element={
            <Views current={currentList} refresh={dispatchAndSetCurrent} />
          }
        />
      </Routes>
    </>
  );
};

export default Adminview;
