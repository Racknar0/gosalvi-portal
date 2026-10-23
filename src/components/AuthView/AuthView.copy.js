const shared = {
  email: 'Correo electrónico',
  password: 'Nueva contraseña',
  confirmation: 'Confirmar contraseña',
  passwordHint: 'Al menos 8 caracteres. Máximo 72 bytes.',
  mismatch: 'Las contraseñas no coinciden.',
  tooLong: 'La contraseña supera el máximo de 72 bytes. Usa menos caracteres.',
  pending: 'Un momento…',
  back: 'Volver a Salvi',
  portal: 'Tengo un negocio: ir al portal',
  resend: 'Solicitar otro enlace',
  invalid: 'El enlace está incompleto. Solicita uno nuevo.',
  verified:
    'Correo confirmado. Los clientes continúan en la app; los negocios pueden entrar al portal.',
  emailSent:
    'Revisa tu bandeja de entrada y la carpeta de spam. Si no llega, puedes intentarlo más tarde.',
  success:
    'Tu contraseña se actualizó. Si tienes un negocio, ya puedes entrar al portal.',
  forgotLink: '¿Olvidaste tu contraseña?',
  modes: {
    forgot: {
      tag: 'Tu cuenta Salvi',
      title: 'Recupera tu contraseña',
      description:
        'Escribe tu correo y te enviaremos un enlace para crear una nueva.',
      submit: 'Enviar enlace',
    },
    reset: {
      tag: 'Tu cuenta Salvi',
      title: 'Crea una nueva contraseña',
      description: 'Elige una contraseña para volver a acceder a tu cuenta.',
      submit: 'Guardar contraseña',
    },
    verify: {
      tag: 'Un paso más',
      title: 'Confirma tu correo',
      description:
        'Confirma que este correo te pertenece para activar tu cuenta.',
      submit: 'Confirmar mi correo',
    },
    resend: {
      tag: 'Tu cuenta Salvi',
      title: 'Verifica tu cuenta',
      description:
        'Escribe tu correo para solicitar otro enlace de verificación.',
      submit: 'Reenviar enlace',
    },
    admin: {
      tag: 'Administración Salvi',
      title: 'Entra a administración',
      description: 'Acceso exclusivo para el equipo administrador.',
      submit: 'Entrar al panel',
    },
  },
};
export const authViewCopy = {
  CO: shared,
  AR: {
    ...shared,
    tooLong:
      'La contraseña supera el máximo de 72 bytes. Usá menos caracteres.',
    portal: 'Tengo un negocio: entrar al portal',
    resend: 'Solicitar otro enlace',
    modes: {
      ...shared.modes,
      forgot: {
        ...shared.modes.forgot,
        title: 'Recuperá tu contraseña',
        description:
          'Escribí tu correo y te enviaremos un enlace para crear una nueva.',
      },
      reset: {
        ...shared.modes.reset,
        title: 'Creá una nueva contraseña',
        description: 'Elegí una contraseña para volver a acceder a tu cuenta.',
      },
      verify: {
        ...shared.modes.verify,
        title: 'Confirmá tu correo',
        description:
          'Confirmá que este correo te pertenece para activar tu cuenta.',
      },
      resend: {
        ...shared.modes.resend,
        title: 'Verificá tu cuenta',
        description:
          'Escribí tu correo para solicitar otro enlace de verificación.',
      },
      admin: { ...shared.modes.admin, title: 'Entrá a administración' },
    },
  },
};
