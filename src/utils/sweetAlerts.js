import Swal from 'sweetalert2';

export const InvalidToken = () =>
  Swal.fire({
    position: 'top',
    icon: 'error',
    title: 'TOKEN NO EXISTE',
    text: 'hemos enviado un mail',
    showConfirmButton: true,
  });
