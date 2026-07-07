// Menú de La Patrona. SIN precios: el total lo cotiza la fondita por WhatsApp.
// Sin opciones/botones — cada platillo se toca para agregar; los detalles
// (verde/rojo, sin cebolla, mucha crema…) van como nota en el pedido.

export interface MenuItem {
  id: string;
  name: string;
  desc?: string;
  tag?: string;
}

export interface MenuSection {
  id: string;
  title: string;
  blurb?: string;
  items: MenuItem[];
}

// La comida corrida = 95% de las ventas. Combo guiado:
// agua del día (incluida) + sopa/consomé (uno) + arroz/espagueti (uno) + un guisado.
export const corrida = {
  sopas: ['Consomé', 'Sopa de pasta'],
  guarniciones: ['Arroz', 'Espagueti'],
  // El guisado se elige de la lista de guisados de abajo, más "el del día".
  guisadoDelDia: 'El guisado del día (te decimos cuál hay)',
};

export const menu: MenuSection[] = [
  {
    id: 'sopas',
    title: 'Sopas y arroces',
    blurb: 'Para empezar la comida.',
    items: [
      { id: 'sopa-pasta', name: 'Sopa de pasta', desc: 'Del día, caldosa y caliente.' },
      { id: 'consome', name: 'Consomé', desc: 'De pollo, con su verdura.' },
      { id: 'arroz', name: 'Arroz rojo', desc: 'Recién hecho.' },
      { id: 'espagueti', name: 'Espagueti', desc: 'Rojo o blanco — dinos cómo lo quieres.' },
    ],
  },
  {
    id: 'guisados',
    title: 'Guisados y platillos',
    blurb:
      'Lo fuerte de la comida, hecho al momento. Los platillos a la plancha van con ensalada o verdura al vapor y frijoles.',
    items: [
      { id: 'enfrijoladas', name: 'Enfrijoladas de pollo', desc: 'Bañadas en frijol, con crema y queso.' },
      { id: 'enchiladas-verdes', name: 'Enchiladas verdes de pollo', desc: 'En salsa verde de la casa.' },
      { id: 'chilaquiles', name: 'Chilaquiles', desc: 'Verdes o rojos, con pollo. Dinos cómo.', tag: 'Los de siempre' },
      { id: 'enmoladas', name: 'Enmoladas de pollo', desc: 'En mole, con ajonjolí.' },
      { id: 'tacos-dorados-pollo', name: 'Tacos dorados de pollo', desc: 'Doraditos, con lo que quieras encima.' },
      { id: 'tacos-dorados-res', name: 'Tacos dorados de res', desc: 'Doraditos, con lo que quieras encima.' },
      { id: 'pechuga', name: 'Pechuga a la plancha', desc: 'Con ensalada o verdura al vapor y frijoles.' },
      { id: 'milanesa', name: 'Milanesa', desc: 'De pollo o de res — dinos cuál. Con guarnición y frijoles.' },
      { id: 'carne-asada', name: 'Carne asada a la plancha', desc: 'Con guarnición y frijoles.' },
      { id: 'arrachera', name: 'Arrachera a la plancha', desc: 'Con guarnición y frijoles refritos.', tag: 'Especial' },
      { id: 'chistorra', name: 'Chistorra', desc: 'A la plancha, con guarnición.' },
      { id: 'al-gusto', name: 'Platillo al gusto', desc: 'Dinos qué se te antoja y te lo armamos.' },
    ],
  },
  {
    id: 'ensaladas',
    title: 'Ensaladas',
    blurb: 'Algo más ligero.',
    items: [
      { id: 'ensalada-pollo', name: 'Ensalada de pollo' },
      { id: 'ensalada-atun', name: 'Ensalada de atún' },
      { id: 'ensalada-cesar', name: 'Ensalada césar' },
    ],
  },
  {
    id: 'postres',
    title: 'Postres y antojos',
    items: [
      { id: 'flan', name: 'Flan napolitano', desc: 'De la casa.', tag: 'Rico' },
      { id: 'barquillo', name: 'Barquillo de helado' },
      { id: 'cajeta', name: 'Cajeta natural de San Juan', desc: 'Para llevar a casa. Dinos el tamaño.' },
    ],
  },
  {
    id: 'bebidas',
    title: 'Bebidas',
    items: [
      { id: 'agua', name: 'Agua del día', desc: 'Jarra o vaso.' },
      { id: 'coca', name: 'Refresco Coca-Cola' },
    ],
  },
];
