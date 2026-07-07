// Datos del negocio — fuente única de verdad para contacto y horario.

export const site = {
  name: 'La Patrona',
  fullName: 'La Patrona Fondita',
  tagline: 'Fondita casera en Azcapotzalco',
  years: 5,

  // WhatsApp: +52 1 55 3082 7043 → formato wa.me (52 + 1 + 10 dígitos)
  whatsappNumber: '5215530827043',
  whatsappDisplay: '55 3082 7043',

  phone: '5589982931',
  phoneDisplay: '55 8998 2931',

  address: {
    street: 'Calle Pinos 69',
    colonia: 'Col. Pasteros',
    municipio: 'Azcapotzalco',
    city: 'Ciudad de México',
    full: 'Calle Pinos 69, Col. Pasteros, Azcapotzalco, CDMX',
  },

  // mapa (búsqueda genérica; el dueño puede reemplazar por el pin exacto)
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Calle+Pinos+69,+Col.+Pasteros,+Azcapotzalco,+CDMX',

  hours: [
    { label: 'Desayunos', value: '8:30 – 12:45 h' },
    { label: 'Comida corrida', value: '13:00 – 17:00 h' },
  ],

  delivery: {
    free: 'Reparto sin costo dentro de la Col. Pasteros',
    extra: 'A los alrededores, con costo extra',
  },

  payments: ['Efectivo', 'Tarjeta', 'Transferencia'] as const,
} as const;
