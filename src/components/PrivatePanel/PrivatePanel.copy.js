const shared = {
  loading: 'Comprobando tu acceso…',
  retry: 'Intentar nuevamente',
  logout: 'Cerrar sesión',
  home: 'Ir a Salvi',
  admin: 'Administración',
  business: 'Mi negocio',
  blocked: 'Tu cuenta no tiene acceso a este panel.',
  greeting: 'Hola',
  title: 'Tu negocio ya tiene un lugar en Salvi',
  message:
    'Este es tu panel de negocio. Pronto podrás gestionar tus packs y pedidos desde aquí.',
  pending: 'Solicitud en revisión',
  approved: 'Negocio aprobado',
  rejected: 'Solicitud no aprobada',
  suspended: 'Negocio suspendido',
  draft: 'Registro en borrador',
  owner: 'Propietario',
  adminLink: 'Administrar usuarios',
};
export const privatePanelCopy = {
  CO: shared,
  AR: {
    ...shared,
    message:
      'Este es tu panel de negocio. Pronto vas a poder gestionar tus packs y pedidos desde acá.',
  },
};
