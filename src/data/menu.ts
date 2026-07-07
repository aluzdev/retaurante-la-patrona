// Menú de La Patrona. Los precios se muestran solo como referencia:
// el pedido de WhatsApp NO incluye total — la fondita lo confirma.

export interface OptionGroup {
  /** id estable para leer la selección en el armador de pedidos */
  id: string;
  label: string;
  choices: string[];
  /** por defecto true; toda opción listada debe elegirse */
  required?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  /** qué incluye / cómo se sirve */
  desc?: string;
  /** solo para mostrar en la carta, p. ej. "$65 / $90" */
  price?: string;
  /** etiqueta de precio para tamaños, alineada con options[].choices */
  priceNote?: string;
  options?: OptionGroup[];
  noteHint?: string;
  tag?: string;
}

export interface MenuSection {
  id: string;
  kicker: string;
  title: string;
  blurb?: string;
  items: MenuItem[];
}

const size = (): OptionGroup => ({
  id: 'porcion',
  label: 'Porción',
  choices: ['Sencillo', 'Completo'],
  required: true,
});

export const menu: MenuSection[] = [
  {
    id: 'menu-del-dia',
    kicker: 'Lo de todos los días',
    title: 'Menú del día',
    blurb:
      'La comida corrida de la casa. Elige tu sopa y tu guarnición; el platillo del día cambia diario — pregúntanos cuál es hoy o déjanos una nota.',
    items: [
      {
        id: 'comida-corrida',
        name: 'Menú del día',
        desc: 'Sopa · arroz o espagueti · platillo del día · ½ litro de agua · tortillas o bolillo · salsa y limones.',
        price: '$85',
        tag: 'La comida de casa',
        options: [
          { id: 'sopa', label: 'Sopa', choices: ['Sopa de pasta', 'Consomé'], required: true },
          {
            id: 'guarnicion',
            label: 'Guarnición',
            choices: ['Arroz', 'Espagueti'],
            required: true,
          },
        ],
        noteHint: 'Ej. platillo del día que quieres, “espagueti que no sea dulce”, sin cebolla…',
      },
    ],
  },
  {
    id: 'a-la-carta',
    kicker: 'Cuando se antoja algo especial',
    title: 'A la carta',
    blurb:
      'Platillos hechos al momento. Elige sencillo o completo — el completo lleva más y viene bien servido.',
    items: [
      {
        id: 'enfrijoladas-pollo',
        name: 'Enfrijoladas de pollo',
        desc: '3 piezas bañadas en frijol.',
        price: '$65 / $90',
        priceNote: '$65 / $90',
        options: [size()],
        noteHint: 'Ej. con mucha crema, sin cebolla…',
      },
      {
        id: 'enchiladas-verdes-pollo',
        name: 'Enchiladas verdes de pollo',
        desc: '3 piezas en salsa verde.',
        price: '$65 / $90',
        priceNote: '$65 / $90',
        options: [size()],
        noteHint: 'Ej. con mucha crema, sin queso…',
      },
      {
        id: 'chilaquiles-pollo',
        name: 'Chilaquiles con pollo',
        price: '$70 / $90',
        priceNote: '$70 / $90',
        options: [
          { id: 'salsa', label: 'Salsa', choices: ['Verdes', 'Rojos'], required: true },
          size(),
        ],
        noteHint: 'Ej. bien empapados, aparte la salsa…',
      },
      {
        id: 'tacos-dorados-pollo',
        name: 'Tacos dorados de pollo',
        desc: '4 piezas.',
        price: '$80 / $105',
        priceNote: '$80 / $105',
        options: [size()],
        noteHint: 'Ej. con todo, mucha crema…',
      },
      {
        id: 'tacos-dorados-res',
        name: 'Tacos dorados de res',
        desc: '4 piezas.',
        price: '$80 / $105',
        priceNote: '$80 / $105',
        options: [size()],
        noteHint: 'Ej. con todo, mucha crema…',
      },
      {
        id: 'enmoladas-pollo',
        name: 'Enmoladas de pollo',
        desc: '3 piezas en mole.',
        price: '$80 / $110',
        priceNote: '$80 / $110',
        options: [size()],
        noteHint: 'Ej. con ajonjolí, sin cebolla…',
      },
      {
        id: 'pechuga-plancha',
        name: 'Pechuga a la plancha',
        desc: 'Con ensalada o verdura al vapor y frijoles.',
        price: '$80 / $110',
        priceNote: '$80 / $110',
        options: [
          { id: 'guarnicion', label: 'Acompañamiento', choices: ['Ensalada', 'Verdura al vapor'], required: true },
          size(),
        ],
        noteHint: 'Ej. término, sin sal…',
      },
      {
        id: 'carne-asada',
        name: 'Carne asada a la plancha',
        desc: 'Con ensalada o verdura al vapor y frijoles.',
        price: '$85 / $115',
        priceNote: '$85 / $115',
        options: [
          { id: 'guarnicion', label: 'Acompañamiento', choices: ['Ensalada', 'Verdura al vapor'], required: true },
          size(),
        ],
        noteHint: 'Ej. bien cocida, con nopales…',
      },
      {
        id: 'milanesa',
        name: 'Milanesa',
        desc: 'Con ensalada o verdura al vapor y frijoles.',
        price: '$85 / $115',
        priceNote: '$85 / $115',
        options: [
          { id: 'proteina', label: 'Proteína', choices: ['Pollo', 'Res'], required: true },
          { id: 'guarnicion', label: 'Acompañamiento', choices: ['Ensalada', 'Verdura al vapor'], required: true },
          size(),
        ],
        noteHint: 'Ej. bien dorada, con limón…',
      },
      {
        id: 'chilaquiles-carne',
        name: 'Chilaquiles con carne',
        desc: 'Con bistec o pechuga asada.',
        price: '$85 / $115',
        priceNote: '$85 / $115',
        options: [
          { id: 'salsa', label: 'Salsa', choices: ['Verdes', 'Rojos'], required: true },
          { id: 'proteina', label: 'Proteína', choices: ['Bistec', 'Pechuga asada'], required: true },
          size(),
        ],
        noteHint: 'Ej. con huevo, sin queso…',
      },
      {
        id: 'arrachera',
        name: 'Arrachera a la plancha',
        desc: 'Con ensalada o verdura al vapor y frijoles refritos.',
        price: '$95 / $120',
        priceNote: '$95 / $120',
        tag: 'Especial',
        options: [
          { id: 'corte', label: 'Elige', choices: ['Arrachera', 'Chistorra', 'Milanesa'], required: true },
          { id: 'guarnicion', label: 'Acompañamiento', choices: ['Ensalada', 'Verdura al vapor'], required: true },
          size(),
        ],
        noteHint: 'Ej. término medio, con guacamole…',
      },
      {
        id: 'platillo-al-gusto',
        name: 'Platillo al gusto',
        desc: 'Arma tu platillo con lo que se te antoje. El precio varía según lo que elijas.',
        price: 'Precio variable',
        noteHint: 'Cuéntanos qué se te antoja y cómo lo quieres.',
      },
    ],
  },
  {
    id: 'ensaladas',
    kicker: 'Algo más ligero',
    title: 'Ensaladas',
    items: [
      { id: 'ensalada-pollo', name: 'Ensalada de pollo', price: '$95', noteHint: 'Ej. aderezo aparte…' },
      { id: 'ensalada-atun', name: 'Ensalada de atún', price: '$85', noteHint: 'Ej. sin cebolla…' },
      { id: 'ensalada-cesar', name: 'Ensalada césar', price: '$85', noteHint: 'Ej. sin crotones…' },
    ],
  },
  {
    id: 'extras',
    kicker: 'Para acompañar y el postre',
    title: 'Bebidas, extras y dulce',
    items: [
      {
        id: 'agua-del-dia',
        name: 'Jarra de agua del día',
        price: '$30 / $20',
        priceNote: '$30 grande · $20 chica',
        options: [{ id: 'tamano', label: 'Tamaño', choices: ['Grande', 'Chica'], required: true }],
      },
      { id: 'coca', name: 'Refresco Coca-Cola', price: '$30' },
      { id: 'flan', name: 'Flan napolitano', price: '$30', tag: 'De la casa' },
      { id: 'barquillo', name: 'Barquillo de helado', price: '$18' },
      { id: 'huevo-platano', name: 'Huevo o plátano (extra)', price: '$10' },
      {
        id: 'cajeta',
        name: 'Cajeta natural de San Juan',
        desc: 'Para llevar a casa.',
        price: '$35 / $70 / $140',
        priceNote: '¼ kg $35 · ½ kg $70 · 1 kg $140',
        options: [{ id: 'tamano', label: 'Tamaño', choices: ['¼ kg', '½ kg', '1 kg'], required: true }],
      },
    ],
  },
];
