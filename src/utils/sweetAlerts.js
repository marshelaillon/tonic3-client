import Swal from 'sweetalert2';

export const InvalidToken = () =>
  Swal.fire({
    position: 'top',
    icon: 'error',
    title: 'TOKEN NO EXISTE',
    text: 'hemos enviado un mail',
    showConfirmButton: true,
  });

export const InvalidPassword = () =>
  Swal.fire({
    position: 'top',
    icon: 'warning',
    title: 'Password invalido !',
    text: 'Vuelva a intentarlo ',
    showConfirmButton: false,
    timer: 1200,
  });

export const RegisterRequest = () =>
  Swal.fire({
    position: 'top',
    icon: 'info',
    title: 'Ya casi !',
    text: 'Solo debes registrarte y no volveras a necesitar un token!',
    showConfirmButton: false,
    timer: 3500,
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
