import Swal from 'sweetalert2';

export const InvalidToken = () =>
  Swal.fire({
    position: 'top',
    icon: 'error',
    title: 'TOKEN NO EXISTE',
    text: 'hemos enviado un mail',
    showConfirmButton: true,
  });

export const EmailPassword = () =>
  Swal.fire({
    position: 'top',
    icon: 'success',
    text: 'Hemos enviado un link a tu correo',
    showConfirmButton: false,
    timer: 2500,
  });

export const NotMatchPassword = () =>
  Swal.fire({
    position: 'top',
    icon: 'error',
    text: 'La contraseñas no coinciden ',
    showConfirmButton: false,
    timer: 2500,
  });

export const PasswordSuccessfully = () =>
  Swal.fire({
    position: 'top',
    icon: 'success',
    text: 'La contraseñas se cambio correctamenete  ',
    showConfirmButton: false,
    timer: 2500,
  });
