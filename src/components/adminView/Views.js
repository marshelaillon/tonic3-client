import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
const Views = () => {
  const listener = useSelector(state => state.listener);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  console.log(params);
  // useEffect(() => {
  //   listener && navigate();
  // }, [listener]);
  return (
    <>
      <div className="container-sm content border"></div>
    </>
  );
};

export default Views;
