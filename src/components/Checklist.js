import React from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getNotSendGuests } from '../state/admin/guestController/guests'

const Checklist = () => {

const dispatch = useDispatch()

  return (
    <>

      <div className='container'>


        {/*  <div>checklist</div>


        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckDisabled" ></input>
          <label class="form-check-label" for="flexCheckDisabled">
            Invitado 1
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckCheckedDisabled"  ></input>
          <label class="form-check-label" for="flexCheckCheckedDisabled">
            Invitado 2
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckDisabled" ></input>
          <label class="form-check-label" for="flexCheckDisabled">
            Invitado 3
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckCheckedDisabled" ></input>
          <label class="form-check-label" for="flexCheckCheckedDisabled">
            Invitado 4
          </label>
        </div>
 */}
<Button onClick={()=> dispatch(getNotSendGuests())}>Llamar a los invitados</Button>
        <div >
          <Container>
            <div style={{ justifyContent: 'center', alignItems: "center" }}>

              <h1 className="" >My Profile</h1>
              <Table>
                <thead>
                  <tr style={{ color: "white" }}>
                    <th></th>
                    <th className="">E-mail</th>
                    <th className="">Event</th>
                    <th className="">Send</th>
                    <th className="">Register</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    <>
                      <label class="form-check-label" for="flexCheckCheckedDisabled">

                      </label>

                      <tr style={{ color: "white" }} >
                        <td>
                          <input class="form-check-input" type="checkbox" value="" id="flexCheckCheckedDisabled"  ></input>
                        </td>
                        <td className="">mail checkeado</td>
                        <td className="">evento checkeado</td>
                        <td className="">envio checkeado</td>
                        <td className="">registro checkeado</td>


                      </tr>
                    </>

                  }

                </tbody>
                <Button className="">Send</Button>

              </Table>
            </div>

          </Container>

        </div>
      </div>

    </>
  )
}

export default Checklist