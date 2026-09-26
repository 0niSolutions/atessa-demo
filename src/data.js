export const unsplash = (id, w = 800, q = 80) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=${q}&auto=format&fit=crop`

export const CONTACTO = {
  direccion: 'Av. Jujuy 442, Piso 3',
  ciudad: 'Salta Capital, Salta',
  tel: '+54 387 500 0000',
  telHref: 'tel:+543875000000',
  wa: '+54 9 387 500 0000',
  waHref: 'https://wa.me/543875000000',
  mail: 'contacto@atessa.com.ar',
  horario: 'Lunes a viernes · 9 a 18 h · Sábados 9 a 13 h',
  instagram: 'https://www.instagram.com/atessa_desarrollos/',
  instagramUser: '@atessa_desarrollos',
  linkedin: 'https://www.linkedin.com/company/atessa-inmobiliaria',
}

export const HERO_STATS = [
  { n: '20+', l: 'años en el rubro' },
  { n: '40', l: 'proyectos entregados' },
  { n: '1.800', l: 'unidades vendidas' },
  { n: '2003', l: 'año de fundación' },
]

export const TICKER = [
  'Viviendas',
  'Edificios de departamentos',
  'Lotes y barrios',
  'Locales comerciales',
  'Desarrollos a medida',
  'Asesoría inmobiliaria',
]

export const PILLARS = [
  {
    n: '01',
    t: 'Transparencia',
    d: 'Precios, documentación y plazos a la vista. Sin sorpresas en la etapa final.',
  },
  {
    n: '02',
    t: 'Gestión propia',
    d: 'Obra, venta y administración en la misma estructura. Un solo responsable.',
  },
  {
    n: '03',
    t: 'Calidad constructiva',
    d: 'Materiales de primera línea y auditoría de calidad en cada etapa de obra.',
  },
  {
    n: '04',
    t: 'Financiación',
    d: 'Trabajamos con los principales bancos para que tu crédito no se demore.',
  },
]

export const CATEGORIAS = [
  { id: 'todos', label: 'Todos' },
  { id: 'residencial', label: 'Residencial' },
  { id: 'departamentos', label: 'Departamentos' },
  { id: 'terrenos', label: 'Terrenos' },
  { id: 'comercial', label: 'Comercial' },
]

export const PROYECTOS = [
  {
    id: 1,
    nombre: 'Edificio Atessa Centro',
    cat: 'departamentos',
    catLabel: 'Departamentos',
    estado: 'en-venta',
    estadoLabel: 'En venta',
    precio: 'Desde US$ 68.000',
    zona: 'Salta Capital · Centro',
    desc: '12 departamentos de 1, 2 y 3 ambientes en pleno corazón de la ciudad. Excelente conexión a transporte y servicios.',
    meta: ['52 – 96 m²', '1 a 3 dormitorios', 'Cochera opcional'],
    pie: '24 pisos',
    img: '1600607687939-ce8a6c25118c',
  },
  {
    id: 2,
    nombre: 'Barrio El Laurel',
    cat: 'residencial',
    catLabel: 'Residencial',
    estado: 'en-venta',
    estadoLabel: 'En venta',
    precio: 'Desde US$ 52.000',
    zona: 'Corredor Norte · Vaqueros',
    desc: 'Lotes en barrio abierto con infraestructura, servicios y amenities. Cuotas fijas y financiación propia.',
    meta: ['600 m² en adelante', 'Lote', '2 garajes incluidos'],
    pie: 'Barrio planificado',
    img: '1600047509807-ba8f99d2cdde',
  },
  {
    id: 3,
    nombre: 'Torres Atessa Norte',
    cat: 'departamentos',
    catLabel: 'Departamentos',
    estado: 'construccion',
    estadoLabel: 'En construcción',
    precio: 'Desde US$ 74.000',
    zona: 'Salta Capital · Norte',
    desc: 'Dos torres de 10 pisos con amenities en altura: gym, solárium, pileta y SUM. Entrega estimada 2027.',
    meta: ['65 – 118 m²', '2 a 3 dormitorios', '1 cochera'],
    pie: '10 pisos',
    img: '1613977257363-707ba9348227',
  },
  {
    id: 4,
    nombre: 'Casa Familia Quemada',
    cat: 'residencial',
    catLabel: 'Residencial',
    estado: 'entregado',
    estadoLabel: 'Entregado',
    precio: 'Consultar',
    zona: 'Salta Capital · Sur',
    desc: 'Vivienda unifamiliar de 140 m² en barrio consolidado. Dos dormitorios en suite, cocina comedor y patio.',
    meta: ['140 m²', '3 dormitorios', '2 garajes'],
    pie: '2 plantas',
    img: '1580587771525-78b9dba3b914',
  },
  {
    id: 5,
    nombre: 'Lotes Camino a La Candelaria',
    cat: 'terrenos',
    catLabel: 'Terrenos',
    estado: 'en-venta',
    estadoLabel: 'En venta',
    precio: 'Desde US$ 18.000',
    zona: 'La Candelaria',
    desc: 'Terrenos de 10 x 20 m con retícula regular y buena orientación. Título a nombre, listos para construir.',
    meta: ['200 m²', 'Terreno', 'A estrenar'],
    pie: 'Barrio en expansión',
    img: '1449844908441-8829872d2607',
  },
  {
    id: 6,
    nombre: 'Local Comercial Icono',
    cat: 'comercial',
    catLabel: 'Comercial',
    estado: 'en-venta',
    estadoLabel: 'En venta',
    precio: 'Desde US$ 95.000',
    zona: 'Corredor Comercial Sur',
    desc: 'Locales de 45 a 160 m² con frente sobre avenida de alta circulación, salida a cochera y balcón.',
    meta: ['45 – 160 m²', 'Local / Oficina', '1 a 3 cocheras'],
    pie: 'Planta baja + entrepiso',
    img: '1522708323590-d24dbb6b0267',
  },
  {
    id: 7,
    nombre: 'Atessa Residencial Tres',
    cat: 'residencial',
    catLabel: 'Residencial',
    estado: 'entregado',
    estadoLabel: 'Entregado',
    precio: 'Consultar',
    zona: 'Salta Capital · Este',
    desc: 'Unidades de 2 ambientes con cochera, totalmente equipadas y listas para habitar. Enorme demanda de alquiler.',
    meta: ['58 m²', '2 dormitorios', '1 cochera'],
    pie: '8 pisos',
    img: '1560448204-e02f11c3d0e2',
  },
  {
    id: 8,
    nombre: 'Oficinas corporativas Salta',
    cat: 'comercial',
    catLabel: 'Comercial',
    estado: 'construccion',
    estadoLabel: 'En construcción',
    precio: 'Desde US$ 210 / m²',
    zona: 'Área Norte · Salta',
    desc: 'Pisos completos de 180 a 400 m² con cochera, central telefónica y vista panorámica a la ciudad.',
    meta: ['180 – 400 m²', 'Oficina', '2 a 6 cocheras'],
    pie: '8 pisos',
    img: '1560185007-cde436f6a4d0',
  },
  {
    id: 9,
    nombre: 'Casa Los Nogales',
    cat: 'residencial',
    catLabel: 'Residencial',
    estado: 'en-venta',
    estadoLabel: 'En venta',
    precio: 'Desde US$ 118.000',
    zona: 'Country / Zona Norte',
    desc: 'Casa con pileta climatizada, quincho y jardín. 260 m² cubiertos sobre 1.000 m² de terreno.',
    meta: ['260 m²', '4 dormitorios', 'Garage doble'],
    pie: '2 plantas + terraza',
    img: '1600585154340-be6161a56a0c',
  },
]

export const SERVICIOS = [
  {
    n: '01',
    t: 'Desarrollo integral',
    d: 'Compramos y gestionamos el terreno, proyectamos, construimos y comercializamos. Un proyecto completo bajo nuestra responsabilidad.',
  },
  {
    n: '02',
    t: 'Ventas y reservas',
    d: 'Disponibilidad en tiempo real, reserva con seña y seguimiento de tu crédito hipotecario paso a paso.',
  },
  {
    n: '03',
    t: 'Asesoría inmobiliaria',
    d: 'Valuación, estudio de título, informes legales y estrategia de salida para propietarios e inversores.',
  },
  {
    n: '04',
    t: 'Administración de edificios',
    d: 'Consorcios, expensas, mantenimiento y rentabilidad de propiedades en renting que nosotros entregamos.',
  },
  {
    n: '05',
    t: 'Loteos y barrios',
    d: 'Amenización, apertura de calles, servicios e infraestructura. La ciudad que querés vivir, con los servicios que necesitás.',
  },
  {
    n: '06',
    t: 'Comercial y oficinas',
    d: 'Locales en corredores comerciales y edificios de oficinas con cochera y logística.',
  },
]

export const INVERSION = [
  { k: 'Renta bruta promedio', v: '6,5 – 8 % anual' },
  { k: 'Plazo de retorno medio', v: '6 a 9 años' },
  { k: 'Proyectos en curso', v: '7' },
  { k: 'Cuotas desde', v: 'US$ 450 / mes' },
]

export const TESTIMONIOS = [
  {
    t: 'Compramos nuestro primer lote con ATESSA hace nueve años. Hoy tenemos una casa terminada y dos clientes que nos llegaron referidos por ellos.',
    n: 'Marina O.',
    r: 'Compradora · El Carril',
  },
  {
    t: 'Invertí en dos departamentos. Me entregaron la documentación completa y el seguimiento del crédito fue permanente. Cero sorpresas.',
    n: 'Rodrigo V.',
    r: 'Inversor · Buenos Aires',
    accent: true,
  },
  {
    t: 'Vendí un inmueble en menos de un mes y a un precio justo. Me actualizaron los precios en cada caso.',
    n: 'Claudia M.',
    r: 'Propietaria · Salta Capital',
  },
]

export const IG_FOTOS = [
  '1600596542815-ffad4c1539a9',
  '1600566753086-00f18fb6b3ea',
  '1616486338812-3dadae4b4ace',
  '1600607687920-4e2a09cf159d',
  '1512917774080-9991f1c4c750',
  '1605276374104-dee2a0ed3cd6',
  '1560184897-ae75f418493e',
  '1560518883-ce09059eeffa',
  '1618221195710-dd6b41faaea6',
  '1502672260266-1c1ef2d93688',
  '1600121848594-d8644e57abab',
  '1554995207-c18c203602cb',
]

export const NAV = [
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#inversion', label: 'Inversión' },
  { href: '#contacto', label: 'Contacto' },
]
