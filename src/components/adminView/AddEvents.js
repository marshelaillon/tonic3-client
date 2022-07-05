import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addEvent } from '../state/admin/eventController/event';
import { addGuests } from '../state/admin/guestController/guests';
import AddGuests from './AddGuests';

const AddEvents = () => {
    const event = useSelector(state => state.event);
    const dispatch = useDispatch();
    const [eventComplete, setEventsComplete] = useState(false);

    const handleSubmit = values => {
        dispatch(
            addEvent({
                title: values.title,
                url: values.url,
                description: values.description,
            })
        );
        setEventsComplete(true);
        // if (!eventComplete) {
        //     console.log(eventComplete);
        //     dispatch(
        //         addEvent({
        //             title: values.title,
        //             url: values.url,
        //             description: values.description,
        //         })
        //     );
        //     setEventsComplete(true);
        // }
        // dispatch(
        //     addGuests({
        //         email: values.email,
        //     })
        // );
    };
    const validate = Yup.object({
        url: Yup.string().url().required('Se nesecita Link del evento '),
        descrition: Yup.string(),
        title: Yup.string().required('Titulo/Nombre del evento requerido'),
        email: Yup.string(),
    });

    return (
        <div>
            <Formik
                initialValues={{
                    title: '',
                    url: '',
                    description: '',
                }}
                validationSchema={validate}
                onSubmit={values => handleSubmit(values)}
            >
                {formik => (
                    <div className="container w-75 mt-4 form">
                        <Form>
                            <div className="form-group">
                                <label htmlFor="title">Titulo </label>
                                <Field
                                    name="title"
                                    className={
                                        formik.touched.title && formik.errors.title
                                            ? 'form-control is-invalid'
                                            : 'form-control'
                                    }
                                    type="text"
                                />
                                {formik.touched.title && formik.errors.title ? (
                                    <div className="invalid-feedback">{formik.errors.title}</div>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="url">Link del evento </label>
                                <Field
                                    name="url"
                                    className={
                                        formik.touched.url && formik.errors.url
                                            ? 'form-control is-invalid'
                                            : 'form-control'
                                    }
                                    type="text"
                                />
                                {formik.touched.url && formik.errors.url ? (
                                    <div className="invalid-feedback">{formik.errors.url}</div>
                                ) : null}
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Descripción </label>
                                <Field
                                    name="description"
                                    as="textarea"
                                    className={
                                        formik.touched.description && formik.errors.description
                                            ? 'form-control is-invalid'
                                            : 'form-control'
                                    }
                                    type="text"
                                />
                                {formik.touched.description && formik.errors.description ? (
                                    <div className="invalid-feedback">
                                        {formik.errors.description}
                                    </div>
                                ) : null}
                            </div>
                            {/* // requeri esto maxi */}
                            {
                                eventComplete && <AddGuests />
                                /* (
                                                                    <Field
                                                                        name="email"
                                                                        className={
                                                                            formik.touched.email && formik.errors.email
                                                                                ? 'form-control is-invalid'
                                                                                : 'form-control'
                                                                        }
                                                                        type="email"
                                                                    /> */
                            }

                            <div className="mt-4 d-flex flex-row">
                                <div className="form-group me-4">
                                    <Button type="submit" variant="light">
                                        Crear evento
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    );
};

export default AddEvents;