import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addEvent } from '../state/admin/eventController/event';
import Checklist from './Checklist';
const Adminview = () => {

   

    return (
       <>
       <Checklist/>

       </>
    );
};

export default Adminview;
