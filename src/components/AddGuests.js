import React from 'react';
import { Formik, Form, Field, validateYupSchema } from 'formik';
import { Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addGuests } from '../state/admin/guestController/guests';

const AddGuests = () => {
    const dispatch = useDispatch();

    const handleSubmit = values => {
        console.log('HICISTE CLICK');
        dispatch(
            addGuests({
                email: values.email,
            })
        );
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
                        <div className="mt-4 d-flex flex-row">
                            <div className="form-group me-4">
                                <Button type="submit" variant="light">
                                    Enviar invitaciones
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
