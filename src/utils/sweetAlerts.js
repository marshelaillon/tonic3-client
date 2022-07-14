import Swal from 'sweetalert2';

export const InvalidToken = () =>
  Swal.fire({
    position: 'top',
    icon: 'error',
    title: 'EL CÓDIGO DE ACCESO NO EXISTE',
    text: 'Hemos enviado un mail',
    showConfirmButton: true,
  });

export const WithoutInvitation = () =>
  Swal.fire({
    position: 'top',
    icon: 'warning',
    title: 'Email incorrecto',
    text: 'El email ingresado no cuenta con una invitación, verifique, por favor',
    showConfirmButton: true,
  });

export const InvalidPassword = () =>
  Swal.fire({
    position: 'top',
    icon: 'warning',
    title: 'Contraseña inválida!',
    text: 'Vuelva a intentarlo ',
    showConfirmButton: false,
    timer: 1200,
  });

export const RegisterRequest = () =>
  Swal.fire({
    position: 'top',
    icon: 'info',
    title: 'Ya casi!',
    text: 'Sólo debes registrarte y no volverás a necesitar un código de acceso!',
    showConfirmButton: false,
    timer: 3500,
  });
export const InvalidRegister = () =>
  Swal.fire({
    position: 'top',
    icon: 'warning',
    title: 'No fue posible registrarte!',
    text: 'Solo debes registrarte y no volverás a necesitar un código de acceso!',
    showConfirmButton: false,
    timer: 3500,
  });

export const EmailPassword = () =>
  Swal.fire({
    position: 'top',
    icon: 'success',
    title: 'Revisa tu correo!',
    text: 'Hemos enviado un link a tu correo',
    showConfirmButton: false,
    timer: 2500,
  });

export const NotMatchPassword = () =>
  Swal.fire({
    position: 'top',
    icon: 'error',
    title: 'Error !',
    text: 'La contraseñas no coinciden',
    showConfirmButton: false,
    timer: 2500,
  });

export const PasswordSuccessfully = () =>
  Swal.fire({
    position: 'top',
    icon: 'success',
    text: 'La contraseña se cambio correctamente',
    showConfirmButton: false,
    timer: 2500,
  });

export const Welcome = () => {
  Swal.fire({
    position: 'top',
    icon: 'success',
    text: 'Que bueno es volver a verte!',
    showConfirmButton: false,
  });
};
export const RegisterSuccessfully = () => {
  Swal.fire({
    position: 'top',
    icon: 'success',
    text: 'Usuario creado!',
    timer: 2500,
    showConfirmButton: false,
  });
};

export const PleaseRegister = () => {
  Swal.fire({
    position: 'top',
    icon: 'info',
    text: 'Por favor, registrese para acceder a su perfil!',
    showConfirmButton: false,
  });
};

export const invitationsSuccessfully = (num, event) => {
  Swal.fire({
    position: 'top',
    icon: 'success',
    text: `Has añadido ${num} invitados al evento ${event}`,
    showConfirmButton: false,
    timer: 2500,
  });
};

export const sendInvi = () => {
  Swal.fire({
    position: 'top',
    icon: 'success',
    text: `Has enviado las invitaciones a los eventos `,
    showConfirmButton: false,
    timer: 2500,
  });
};

export const ascendedUser = () => {
  Swal.fire({
    position: 'top',
    icon: 'success',
    text: `Cambios realizados  `,
    showConfirmButton: false,
    timer: 2500,
  });
};
