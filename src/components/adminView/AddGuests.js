import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { addGuests } from '../../state/admin/guestController/guests';
import { Dropdown } from 'react-bootstrap';
import { invitationsSuccessfully } from '../../utils/sweetAlerts';

const AddGuests = ({ filterEvents }) => {
  const [selectEvent, setSelectEvent] = useState({});
  const dispatch = useDispatch();

  const handleSubmit = values => {
    console.log('HICISTE CLICK');
    dispatch(
      addGuests({
        emails: values.email.split(','),
        eventId: selectEvent.id,
      })
    );
    invitationsSuccessfully(values.email.split(',').length, selectEvent.title);
    values.email = '';
    setSelectEvent({});
  };

  const validate = Yup.object({
    email: Yup.string(),
  });

  return (
    <div>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={validate}
        onSubmit={handleSubmit}
      >
        {formik => (
          <Form>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <Field
                multiple
                name="email"
                className={
                  formik.touched.email && formik.errors.email
                    ? 'form-control is-invalid'
                    : 'form-control'
                }
                type="email"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="invalid-feedback">{formik.errors.email}</div>
              ) : null}
            </div>
            <Dropdown>
              {selectEvent.title || 'Eventos'}
              <Dropdown.Toggle
                style={{
                  backgroundColor: 'orange',
                  border: 'none',
                  color: 'inherit',
                }}
                id="dropdown-basic"
              ></Dropdown.Toggle>
              <Dropdown.Menu
                key={`dropd.menu`}
                style={{
                  backgroundColor: '#020122',
                  border: 'none',
                }}
              >
                {filterEvents.map((event, i) => (
                  <span>
                    <Dropdown.Item
                      key={`dropd.item ${i}`}
                      style={{ color: '#f5f6f7' }}
                      onClick={e => {
                        setSelectEvent({ id: event.id, title: event.title });
                      }}
                    >
                      {event.title}
                    </Dropdown.Item>
                  </span>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <div className="mt-4 d-flex flex-row">
              <div className="form-group me-4">
                <Button
                  type="submit"
                  variant="light"
                  disabled={!selectEvent.title}
                >
                  Añadir invitaciones
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddGuests;
