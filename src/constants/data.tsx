import { ItemType } from "react-native-dropdown-picker";

export const agenciasValues = [
  { value: "MAZATENANGO", label: "Mazatenango" },
  { value: "QUETZALTENANGO", label: "Quetzaltenango" },
  { value: "COATEPEQUE", label: "Coatepeque" },
  { value: "COBÁN", label: "Cobán" },
  { value: "GUATEMALA", label: "Guatemala" }
];
export const portfolioData = {
  columns: [
    {
      headerName: "Details",
      children: [
        // { field: "no", pinned: "left", width: 30 },
        { field: "cliente", pinned: "left" },
        { field: "sucursal", width: "100" },
        { field: "número crédito", width: "150" },
        { field: "DPI Cliente", width: 150 },
        { field: "Género", width: 120 },
        { field: "fecha nacimiento", width: 160 },
        { field: "telefono", width: 120 },
        { field: "dirección", width: 300 },
        { field: "departamento", width: 150 },
        { field: "municipio", width: 120 },
        { field: "monto", width: 120 },
        { field: "nombre promotor", width: 160 },
        { field: "estado civil", width: 120 },
        { field: "profesión", width: 120 },
        { field: "lugar de trabajo", width: 160 },
        { field: "dirección de trabajo", width: 300 },
        { field: "departamento de trabajo", width: 250 },
        { field: "municipio de trabajo", width: 180 },
        { field: "nombre de negocio", width: 200 },
        { field: "dirección de negocio", width: 300 },
        { field: "departamento de negocio", width: 250 },
        { field: "municipio de negocio", width: 180 },
        { field: "tipo de garantía", width: 200 },
        { field: "fecha de desembolso", width: 200 },
        { field: "fechaInicial", width: 120 },
        { field: "fechaFinal", width: 120 },
        { field: "plazo", width: 120 },
        { field: "plan", width: 120 },
        { field: "cuota", width: 120 },
        { field: "interés", width: 120 },
        { field: "k+i", width: 120 },
        { field: "saldo", width: 120 },
        { field: "pagos", width: 120 },
        { field: "días mora", width: 120 },
        { field: "monto de cuotas en mora", width: 230 }
      ]
    }
  ]
};

export const estadoOptions = [
  { label: "ACEPTADO", value: "ACCEPTED" },
  { label: "PENDIENTE ASIGNACIÓN", value: "PENDING_ASSIGNMENT" },
  { label: "PENDIENTE GARANTÍA", value: "PENDING_GUARANTY" },
  {
    label: "PENDIENTE VALIDACIÓN DIRECCIÓN",
    value: "PENDING_ADDRESS_VALIDATION"
  },
  { label: "PENDIENTE VALIDACIÓN DATOS", value: "PENDING_DATA_VALIDATION" },
  { label: "PENDIENTE VALIDACIÓN", value: "PENDING_VALIDATION" },

  { label: "RECHAZADO REGION", value: "REFUSED_REGION" },
  { label: "RECHAZADO DIRECCIÓN", value: "REFUSED_LOCATION_NOT_COVERED" },
  {
    label: "RECHAZADO INFORMACIÓN INCORRECTA",
    value: "REFUSED_INCORRECT_DATA"
  },
  { label: "RECHAZADO CRITERIOS", value: "REFUSED_CRITERIA" },
  { label: "RECHAZADO VALIDACIÓN", value: "REFUSED_VALIDATION" },
  {
    label: "RECHAZADO PRODUCTO NO ENCONTRADO",
    value: "REFUSED_PRODUCT_NOT_FOUND"
  },
  { label: "ERROR CONFIGURACION PRODUCTO", value: "ERROR_PRODUCT_MATCH" },
  { label: "PENDIENTE VALIDACIÓN EDAD", value: "PENDING_AGE_VALIDATION" }
];

export const nationalities = [
  { label: "Guatemalteca", value: "Guatemalteca" },
  { label: "Salvadoreña", value: "Salvadoreña" },
  { label: "Hondureña", value: "Hondureña" },
  { label: "Mexicana", value: "Mexicana" },
  { label: "Española", value: "Española" },
  { label: "Otra", value: "Otra" }
];

export const departments: ItemType<any>[] = [
  { label: "Alta Verapaz", value: "Alta Verapaz" },
  { label: "Baja Verapaz", value: "Baja Verapaz" },
  { label: "Chimaltenango", value: "Chimaltenango" },
  { label: "Chiquimula", value: "Chiquimula" },
  { label: "Petén", value: "Petén" },
  { label: "El Progreso", value: "El Progreso" },
  { label: "Escuintla", value: "Escuintla" },
  { label: "Guatemala", value: "Guatemala" },
  { label: "Huehuetenango", value: "Huehuetenango" },
  { label: "Izabal", value: "Izabal" },
  { label: "Jalapa", value: "Jalapa" },
  { label: "Jutiapa", value: "Jutiapa" },
  { label: "Quetzaltenango", value: "Quetzaltenango" },
  { label: "Quiché", value: "Quiché" },
  { label: "Retalhuleu", value: "Retalhuleu" },
  { label: "Sacatepéquez", value: "Sacatepéquez" },
  { label: "San Marcos", value: "San Marcos" },
  { label: "Santa Rosa", value: "Santa Rosa" },
  { label: "Sololá", value: "Sololá" },
  { label: "Suchitepéquez", value: "Suchitepéquez" },
  { label: "Totonicapán", value: "Totonicapán" },
  { label: "Zacapa", value: "Zacapa" }
];

export const municipalitiesValues = [
  {
    department: "Alta Verapaz",
    municipalities: [
      { label: "Cobán", value: "Cobán" },
      { label: "Chahal", value: "Chahal" },
      { label: "Chisec", value: "Chisec" },
      {
        label: "Fray Bartolomé de las Casas",
        value: "Fray Bartolomé de las Casas"
      },
      { label: "San Cristóbal Verapaz", value: "San Cristóbal Verapaz" },
      { label: "San Pedro Carchá", value: "San Pedro Carchá" },
      { label: "Santa Cruz Verapaz", value: "Santa Cruz Verapaz" },
      { label: "Tactic", value: "Tactic" },
      { label: "Tamahú", value: "Tamahú" },
      { label: "Tucurú", value: "Tucurú" },
      { label: "Santa Catarina La Tinta", value: "Santa Catarina La Tinta" },
      { label: "Santa María Cahabón", value: "Santa María Cahabón" },
      { label: "Lanquín", value: "Lanquín" },
      { label: "Senahú", value: "Senahú" },
      { label: "San Juan Chamelco", value: "San Juan Chamelco" },
      { label: "San Miguel Tucurú", value: "San Miguel Tucurú" },
      { label: "San Agustín Lanquín", value: "San Agustín Lanquín" },
      { label: "Panzós", value: "Panzós" },
      { label: "Raxruhá", value: "Raxruhá" }
    ]
  },
  {
    department: "Baja Verapaz",
    municipalities: [
      { label: "Salamá", value: "Salamá" },
      { label: "San Miguel Chicaj", value: "San Miguel Chicaj" },
      { label: "San Jerónimo", value: "San Jerónimo" },
      { label: "Santa Cruz El Chol", value: "Santa Cruz El Chol" },
      { label: "Rabinal", value: "Rabinal" },
      { label: "Cubulco", value: "Cubulco" },
      { label: "Granados", value: "Granados" },
      { label: "Purulhá", value: "Purulhá" }
    ]
  },
  {
    department: "Chimaltenango",
    municipalities: [
      { label: "Chimaltenango", value: "Chimaltenango" },
      { label: "Patzún", value: "Patzún" },
      { label: "San Andrés Itzapa", value: "San Andrés Itzapa" },
      { label: "San José Poaquil", value: "San José Poaquil" },
      { label: "San Martín Jilotepeque", value: "San Martín Jilotepeque" },
      { label: "Tecpán", value: "Tecpán" },
      { label: "Zaragoza", value: "Zaragoza" },
      { label: "El Tejar", value: "El Tejar" },
      { label: "Santa Apolonia", value: "Santa Apolonia" },
      { label: "San Juan Comalapa", value: "San Juan Comalapa" },
      { label: "San Miguel Pochuta", value: "San Miguel Pochuta" },
      { label: "Patzicía", value: "Patzicía" },
      { label: "Santa Cruz Balanyá", value: "Santa Cruz Balanyá" },
      { label: "Acatenango", value: "Acatenango" },
      { label: "San Pedro Yepocapa", value: "San Pedro Yepocapa" },
      { label: "Parramos", value: "Parramos" }
    ]
  },
  {
    department: "Chiquimula",
    municipalities: [
      { label: "Chiquimula", value: "Chiquimula" },
      { label: "Camotán", value: "Camotán" },
      { label: "Concepción Las Minas", value: "Concepción Las Minas" },
      { label: "Esquipulas", value: "Esquipulas" },
      { label: "Ipala", value: "Ipala" },
      { label: "Jocotán", value: "Jocotán" },
      { label: "Olopa", value: "Olopa" },
      { label: "Quezaltepeque", value: "Quezaltepeque" },
      { label: "San Jacinto", value: "San Jacinto" },
      { label: "San José La Arada", value: "San José La Arada" },
      { label: "San Juan Ermita", value: "San Juan Ermita" }
    ]
  },
  {
    department: "Petén",
    municipalities: [
      { label: "Flores", value: "Flores" },
      { label: "Dolores", value: "Dolores" },
      { label: "San Benito", value: "San Benito" },
      { label: "San José", value: "San José" },
      { label: "San Luis", value: "San Luis" },
      { label: "Sayaxché", value: "Sayaxché" },
      { label: "Melchor de Mencos", value: "Melchor de Mencos" },
      { label: "Poptún", value: "Poptún" },
      { label: "Santa Ana", value: "Santa Ana" },
      { label: "La Libertad", value: "La Libertad" },
      { label: "San Andrés", value: "San Andrés" },
      { label: "San Francisco", value: "San Francisco" }
    ]
  },
  {
    department: "El Progreso",
    municipalities: [
      { label: "Guastatoya", value: "Guastatoya" },
      { label: "El Jícaro", value: "El Jícaro" },
      { label: "Sanarate", value: "Sanarate" },
      { label: "Sansare", value: "Sansare" },
      { label: "Morazán", value: "Morazán" },
      {
        label: "San Agustín Acasaguastlán",
        value: "San Agustín Acasaguastlán"
      },
      { label: "San Antonio La Paz", value: "San Antonio La Paz" },
      {
        label: "San Cristóbal Acasaguastlán",
        value: "San Cristóbal Acasaguastlán"
      }
    ]
  },
  {
    department: "Escuintla",
    municipalities: [
      { label: "Escuintla", value: "Escuintla" },
      { label: "Iztapa", value: "Iztapa" },
      { label: "La Democracia", value: "La Democracia" },
      { label: "La Gomera", value: "La Gomera" },
      { label: "Masagua", value: "Masagua" },
      { label: "Nueva Concepción", value: "Nueva Concepción" },
      { label: "Palín", value: "Palín" },
      { label: "San José", value: "San José" },
      { label: "San Vicente Pacaya", value: "San Vicente Pacaya" },
      {
        label: "Santa Lucía Cotzumalguapa",
        value: "Santa Lucía Cotzumalguapa"
      },
      { label: "Siquinalá", value: "Siquinalá" },
      { label: "Tiquisate", value: "Tiquisate" },
      { label: "Guaganazapa", value: "Guaganazapa" }
    ]
  },
  {
    department: "Guatemala",
    municipalities: [
      { label: "Ciudad de Guatemala", value: "Ciudad de Guatemala" },
      { label: "Amatitlán", value: "Amatitlán" },
      { label: "Chinautla", value: "Chinautla" },
      { label: "Chuarrancho", value: "Chuarrancho" },
      { label: "Fraijanes", value: "Fraijanes" },
      { label: "Mixco", value: "Mixco" },
      { label: "Palencia", value: "Palencia" },
      { label: "San José Pinula", value: "San José Pinula" },
      { label: "San Miguel Petapa", value: "San Miguel Petapa" },
      { label: "San Pedro Ayampuc", value: "San Pedro Ayampuc" },
      { label: "San Pedro Sacatepéquez", value: "San Pedro Sacatepéquez" },
      { label: "San Raymundo", value: "San Raymundo" },
      { label: "Santa Catarina Pinula", value: "Santa Catarina Pinula" },
      { label: "Villa Canales", value: "Villa Canales" },
      { label: "Villa Nueva", value: "Villa Nueva" },
      { label: "San José del Golfo", value: "San José del Golfo" },
      { label: "San Juan Sacatepéquez", value: "San Juan Sacatepéquez" }
    ]
  },
  {
    department: "Huehuetenango",
    municipalities: [
      { label: "Huehuetenango", value: "Huehuetenango" },
      { label: "Chiantla", value: "Chiantla" },
      { label: "Colotenango", value: "Colotenango" },
      { label: "Concepción Huista", value: "Concepción Huista" },
      { label: "Cuilco", value: "Cuilco" },
      { label: "La Democracia", value: "La Democracia" },
      { label: "La Libertad", value: "La Libertad" },
      { label: "Malacatancito", value: "Malacatancito" },
      { label: "Nentón", value: "Nentón" },
      { label: "San Antonio Huista", value: "San Antonio Huista" },
      { label: "San Gaspar Ixchil", value: "San Gaspar Ixchil" },
      { label: "San Ildefonso Ixtahuacán", value: "San Ildefonso Ixtahuacán" },
      { label: "San Juan Atitán", value: "San Juan Atitán" },
      { label: "San Juan Ixcoy", value: "San Juan Ixcoy" },
      { label: "San Mateo Ixtatán", value: "San Mateo Ixtatán" },
      { label: "San Miguel Acatán", value: "San Miguel Acatán" },
      { label: "San Pedro Necta", value: "San Pedro Necta" },
      {
        label: "San Rafael La Independencia",
        value: "San Rafael La Independencia"
      },
      { label: "San Rafael Petzal", value: "San Rafael Petzal" },
      { label: "San Sebastián Coatán", value: "San Sebastián Coatán" },
      { label: "Santa Ana Huista", value: "Santa Ana Huista" },
      { label: "Santa Bárbara", value: "Santa Bárbara" },
      { label: "Santa Cruz Barillas", value: "Santa Cruz Barillas" },
      { label: "Santa Eulalia", value: "Santa Eulalia" },
      { label: "Santiago Chimaltenango", value: "Santiago Chimaltenango" },
      { label: "Todos Santos Cuchumatán", value: "Todos Santos Cuchumatán" },
      { label: "Jacaltenango", value: "Jacaltenango" },
      { label: "San Pedro Soloma", value: "San Pedro Soloma" },
      {
        label: "San Sebastián Huehuetenango",
        value: "San Sebastián Huehuetenango"
      },
      { label: "Tectitán", value: "Tectitán" },
      { label: "Aguacatán", value: "Aguacatán" }
    ]
  },
  {
    department: "Izabal",
    municipalities: [
      { label: "Puerto Barrios", value: "Puerto Barrios" },
      { label: "El Estor", value: "El Estor" },
      { label: "Livingston", value: "Livingston" },
      { label: "Los Amates", value: "Los Amates" },
      { label: "Morales", value: "Morales" }
    ]
  },
  {
    department: "Jalapa",
    municipalities: [
      { label: "Jalapa", value: "Jalapa" },
      { label: "Mataquescuintla", value: "Mataquescuintla" },
      { label: "Monjas", value: "Monjas" },
      { label: "San Carlos Alzatate", value: "San Carlos Alzatate" },
      { label: "San Luis Jilotepeque", value: "San Luis Jilotepeque" },
      { label: "San Manuel Chaparrón", value: "San Manuel Chaparrón" },
      { label: "San Pedro Pinula", value: "San Pedro Pinula" }
    ]
  },
  {
    department: "Jutiapa",
    municipalities: [
      { label: "Jutiapa", value: "Jutiapa" },
      { label: "Agua Blanca", value: "Agua Blanca" },
      { label: "Asunción Mita", value: "Asunción Mita" },
      { label: "Atescatempa", value: "Atescatempa" },
      { label: "Comapa", value: "Comapa" },
      { label: "Conguaco", value: "Conguaco" },
      { label: "El Adelanto", value: "El Adelanto" },
      { label: "El Progreso", value: "El Progreso" },
      { label: "Jalpatagua", value: "Jalpatagua" },
      { label: "Jerez", value: "Jerez" },
      { label: "Moyuta", value: "Moyuta" },
      { label: "Pasaco", value: "Pasaco" },
      { label: "Quezada", value: "Quezada" },
      { label: "San José Acatempa", value: "San José Acatempa" },
      { label: "Santa Catarina Mita", value: "Santa Catarina Mita" },
      { label: "Yupiltepeque", value: "Yupiltepeque" },
      { label: "Zapotitlán", value: "Zapotitlán" }
    ]
  },
  {
    department: "Quetzaltenango",
    municipalities: [
      { label: "Quetzaltenango", value: "Quetzaltenango" },
      { label: "Almolonga", value: "Almolonga" },
      { label: "Cantel", value: "Cantel" },
      { label: "Coatepeque", value: "Coatepeque" },
      { label: "Colomba", value: "Colomba" },
      { label: "Concepción Chiquirichapa", value: "Concepción Chiquirichapa" },
      { label: "El Palmar", value: "El Palmar" },
      { label: "Flores Costa Cuca", value: "Flores Costa Cuca" },
      { label: "Génova", value: "Génova" },
      { label: "Huitán", value: "Huitán" },
      { label: "La Esperanza", value: "La Esperanza" },
      { label: "Olintepeque", value: "Olintepeque" },
      { label: "Palestina de Los Altos", value: "Palestina de Los Altos" },
      { label: "Salcajá", value: "Salcajá" },
      { label: "San Carlos Sija", value: "San Carlos Sija" },
      { label: "San Francisco La Unión", value: "San Francisco La Unión" },
      { label: "San Juan Ostuncalco", value: "San Juan Ostuncalco" },
      { label: "San Martín Sacatepéquez", value: "San Martín Sacatepéquez" },
      { label: "San Mateo", value: "San Mateo" },
      { label: "San Miguel Sigüilá", value: "San Miguel Sigüilá" },
      { label: "Sibilia", value: "Sibilia" },
      { label: "Zunil", value: "Zunil" },
      { label: "Cabricán", value: "Cabricán" },
      { label: "Cajolá", value: "Cajolá" }
    ]
  },
  {
    department: "Quiché",
    municipalities: [
      { label: "Santa Cruz del Quiché", value: "Santa Cruz del Quiché" },
      { label: "Canillá", value: "Canillá" },
      { label: "Chajul", value: "Chajul" },
      { label: "Chicamán", value: "Chicamán" },
      { label: "Chiché", value: "Chiché" },
      { label: "Chinique", value: "Chinique" },
      { label: "Cunén", value: "Cunén" },
      { label: "Ixcán", value: "Ixcán" },
      { label: "Pachalum", value: "Pachalum" },
      { label: "Patzité", value: "Patzité" },
      { label: "Sacapulas", value: "Sacapulas" },
      { label: "San Andrés Sajcabajá", value: "San Andrés Sajcabajá" },
      { label: "San Antonio Ilotenango", value: "San Antonio Ilotenango" },
      {
        label: "San Bartolomé Jocotenango",
        value: "San Bartolomé Jocotenango"
      },
      { label: "San Juan Cotzal", value: "San Juan Cotzal" },
      { label: "San Pedro Jocopilas", value: "San Pedro Jocopilas" },
      { label: "Uspantán", value: "Uspantán" },
      { label: "Zacualpa", value: "Zacualpa" },
      {
        label: "Santo Tomás Chichicastenango",
        value: "Santo Tomás Chichicastenango"
      },
      { label: "Santa María Joyabaj", value: "Santa María Joyabaj" },
      { label: "Santa María Nebaj", value: "Santa María Nebaj" }
    ]
  },
  {
    department: "Retalhuleu",
    municipalities: [
      { label: "Retalhuleu", value: "Retalhuleu" },
      { label: "Champerico", value: "Champerico" },
      { label: "El Asintal", value: "El Asintal" },
      { label: "Nuevo San Carlos", value: "Nuevo San Carlos" },
      { label: "San Andrés Villa Seca", value: "San Andrés Villa Seca" },
      { label: "San Felipe", value: "San Felipe" },
      { label: "San Martín Zapotitlán", value: "San Martín Zapotitlán" },
      { label: "San Sebastián", value: "San Sebastián" },
      { label: "Santa Cruz Muluá", value: "Santa Cruz Muluá" }
    ]
  },
  {
    department: "Sacatepéquez",
    municipalities: [
      { label: "Antigua Guatemala", value: "Antigua Guatemala" },
      { label: "Ciudad Vieja", value: "Ciudad Vieja" },
      { label: "Jocotenango", value: "Jocotenango" },
      { label: "Magdalena Milpas Altas", value: "Magdalena Milpas Altas" },
      { label: "Pastores", value: "Pastores" },
      {
        label: "San Antonio Aguas Calientes",
        value: "San Antonio Aguas Calientes"
      },
      {
        label: "San Bartolomé Milpas Altas",
        value: "San Bartolomé Milpas Altas"
      },
      { label: "San Lucas Sacatepéquez", value: "San Lucas Sacatepéquez" },
      { label: "San Miguel Dueñas", value: "San Miguel Dueñas" },
      { label: "Santa Catarina Barahona", value: "Santa Catarina Barahona" },
      { label: "Santa Lucía Milpas Altas", value: "Santa Lucía Milpas Altas" },
      { label: "Santa María de Jesús", value: "Santa María de Jesús" },
      { label: "Santiago Sacatepéquez", value: "Santiago Sacatepéquez" },
      { label: "Santo Domingo Xenacoj", value: "Santo Domingo Xenacoj" },
      { label: "Sumpango", value: "Sumpango" },
      { label: "San Juan Alotenango", value: "San Juan Alotenango" }
    ]
  },
  {
    department: "San Marcos",
    municipalities: [
      { label: "San Marcos", value: "San Marcos" },
      { label: "Ayutla", value: "Ayutla" },
      { label: "Catarina", value: "Catarina" },
      { label: "Comitancillo", value: "Comitancillo" },
      { label: "Concepción Tutuapa", value: "Concepción Tutuapa" },
      { label: "El Quetzal", value: "El Quetzal" },
      { label: "El Rodeo", value: "El Rodeo" },
      { label: "El Tumbador", value: "El Tumbador" },
      { label: "Esquipulas Palo Gordo", value: "Esquipulas Palo Gordo" },
      { label: "Ixchiguan", value: "Ixchiguan" },
      { label: "La Reforma", value: "La Reforma" },
      { label: "Malacatán", value: "Malacatán" },
      { label: "Nuevo Progreso", value: "Nuevo Progreso" },
      { label: "Ocós", value: "Ocós" },
      { label: "Pajapita", value: "Pajapita" },
      { label: "Río Blanco", value: "Río Blanco" },
      { label: "San Antonio Sacatepéquez", value: "San Antonio Sacatepéquez" },
      { label: "San Cristóbal Cucho", value: "San Cristóbal Cucho" },
      { label: "San José Ojetenam", value: "San José Ojetenam" },
      { label: "San Lorenzo", value: "San Lorenzo" },
      { label: "San Miguel Ixtahuacán", value: "San Miguel Ixtahuacán" },
      { label: "San Pablo", value: "San Pablo" },
      { label: "San Pedro Sacatepéquez", value: "San Pedro Sacatepéquez" },
      {
        label: "San Rafael Pie de La Cuesta",
        value: "San Rafael Pie de La Cuesta"
      },
      { label: "Sibinal", value: "Sibinal" },
      { label: "Sipacapa", value: "Sipacapa" },
      { label: "Tacaná", value: "Tacaná" },
      { label: "Tajumulco", value: "Tajumulco" },
      { label: "Tejutla", value: "Tejutla" },
      { label: "La Blanca", value: "La Blanca" }
    ]
  },
  {
    department: "Santa Rosa",
    municipalities: [
      { label: "Cuilapa", value: "Cuilapa" },
      { label: "Barberena", value: "Barberena" },
      { label: "Casillas", value: "Casillas" },
      { label: "Chiquimulilla", value: "Chiquimulilla" },
      { label: "Monterrico", value: "Monterrico" },
      { label: "Guazacapán", value: "Guazacapán" },
      { label: "Nueva Santa Rosa", value: "Nueva Santa Rosa" },
      { label: "Oratorio", value: "Oratorio" },
      { label: "Pueblo Nuevo Viñas", value: "Pueblo Nuevo Viñas" },
      { label: "San Juan Tecuaco", value: "San Juan Tecuaco" },
      { label: "San Rafael Las Flores", value: "San Rafael Las Flores" },
      { label: "Santa Cruz Naranjo", value: "Santa Cruz Naranjo" },
      { label: "Santa María Ixhuatán", value: "Santa María Ixhuatán" },
      { label: "Taxisco", value: "Taxisco" },
      { label: "Santa Rosa de Lima", value: "Santa Rosa de Lima" }
    ]
  },
  {
    department: "Sololá",
    municipalities: [
      { label: "Sololá", value: "Sololá" },
      { label: "Concepción", value: "Concepción" },
      { label: "Nahualá", value: "Nahualá" },
      { label: "Panajachel", value: "Panajachel" },
      { label: "San Andrés Semetabaj", value: "San Andrés Semetabaj" },
      { label: "San Antonio Palopó", value: "San Antonio Palopó" },
      { label: "San José Chacayá", value: "San José Chacayá" },
      { label: "San Juan La Laguna", value: "San Juan La Laguna" },
      { label: "San Lucas Tolimán", value: "San Lucas Tolimán" },
      { label: "San Marcos La Laguna", value: "San Marcos La Laguna" },
      { label: "San Pablo La Laguna", value: "San Pablo La Laguna" },
      { label: "San Pedro La Laguna", value: "San Pedro La Laguna" },
      {
        label: "Santa Catarina Ixtahuacan",
        value: "Santa Catarina Ixtahuacan"
      },
      { label: "Santa Catarina Palopó", value: "Santa Catarina Palopó" },
      { label: "Santa Clara La Laguna", value: "Santa Clara La Laguna" },
      { label: "Santa Cruz La Laguna", value: "Santa Cruz La Laguna" },
      { label: "Santa Lucía Utatlán", value: "Santa Lucía Utatlán" },
      { label: "Santa María Visitación", value: "Santa María Visitación" },
      { label: "Santiago Atitlán", value: "Santiago Atitlán" }
    ]
  },
  {
    department: "Suchitepéquez",
    municipalities: [
      { label: "Mazatenango", value: "Mazatenango" },
      { label: "Chicacao", value: "Chicacao" },
      { label: "Cuyotenango", value: "Cuyotenango" },
      { label: "Patulul", value: "Patulul" },
      { label: "Pueblo Nuevo", value: "Pueblo Nuevo" },
      { label: "Río Bravo", value: "Río Bravo" },
      { label: "Samayac", value: "Samayac" },
      {
        label: "San Antonio Suchitepéquez",
        value: "San Antonio Suchitepéquez"
      },
      { label: "San Bernardino", value: "San Bernardino" },
      { label: "San Francisco Zapotitlán", value: "San Francisco Zapotitlán" },
      { label: "San Gabriel", value: "San Gabriel" },
      { label: "San José El Ídolo", value: "San José El Ídolo" },
      { label: "San Juan Bautista", value: "San Juan Bautista" },
      { label: "San Lorenzo", value: "San Lorenzo" },
      { label: "San Miguel Panán", value: "San Miguel Panán" },
      { label: "San Pablo Jocopilas", value: "San Pablo Jocopilas" },
      { label: "Santa Bárbara", value: "Santa Bárbara" },
      {
        label: "Santo Domingo Suchitepéquez",
        value: "Santo Domingo Suchitepéquez"
      },
      { label: "Santo Tomás La Unión", value: "Santo Tomás La Unión" },
      { label: "Zunilito", value: "Zunilito" },
      { label: "San José La Máquina", value: "San José La Máquina" }
    ]
  },
  {
    department: "Totonicapán",
    municipalities: [
      { label: "Totonicapán", value: "Totonicapán" },
      { label: "Momostenango", value: "Momostenango" },
      { label: "San Andrés Xecul", value: "San Andrés Xecul" },
      { label: "San Bartolo", value: "San Bartolo" },
      {
        label: "San Cristóbal Totonicapán",
        value: "San Cristóbal Totonicapán"
      },
      { label: "San Francisco El Alto", value: "San Francisco El Alto" },
      { label: "Santa Lucía La Reforma", value: "Santa Lucía La Reforma" },
      { label: "Santa María Chiquimula", value: "Santa María Chiquimula" }
    ]
  },

  {
    department: "Zacapa",
    municipalities: [
      { label: "Zacapa", value: "Zacapa" },
      { label: "Cabañas", value: "Cabañas" },
      { label: "Estanzuela", value: "Estanzuela" },
      { label: "Gualán", value: "Gualán" },
      { label: "Huité", value: "Huité" },
      { label: "La Unión", value: "La Unión" },
      { label: "Río Hondo", value: "Río Hondo" },
      { label: "San Diego", value: "San Diego" },
      { label: "Teculután", value: "Teculután" },
      { label: "Usumatlán", value: "Usumatlán" },
      { label: "San Jorge", value: "San Jorge" }
    ]
  }
];

export const paymentMethods = [
  { value: "DAILY", label: "Diario" },
  { value: "WEEKLY", label: "Semanal" },
  { value: "BIWEEKLY", label: "Quincenal" },
  { value: "FORTNIGHTLY", label: "Catorcenal" },
  { value: "MONTHLY", label: "Mensual (fin de mes)" }
];

export const professions = [
  { title: "Asalariado (trabaja para una empresa)", value: "SALARIED" },
  { title: "Tiene negocio propio", value: "BUSINESS" },
  {
    title: "Ambas, es asalariado y también tiene negocio propio",
    value: "SALARIEDANDBUSINESS"
  },
  { title: "Sin ingresos", value: "NOINCOME" }
];

export const loanPaymentMethods = [
  { label: "Producto diario", value: "PRODUCTO DIARIO" },
  {
    label: "Producto semanal",
    value: "PRODUCTO SEMANAL"
  },

  {
    label: "Quincenal",
    value: "QUINCENAL"
  },
  { label: "Fin de mes", value: "FIN DE MES" }
];

export const maritialStatus = [
  { label: "Soltero/a", value: "Single" },
  { label: "Casado/a", value: "Married" },
  { label: "Divorciado/a", value: "Divorced" },
  { label: "Viudo/a", value: "Widow" }
];

export const sexValues = [
  { label: "Masculino", value: "Male" },
  { label: "Femenino", value: "Female" }
];

export const wantCredit = [
  { label: "Sí", value: "yes" },
  { label: "No", value: "no" }
];

export const roles = [
  { label: "Promotor", value: "AGENT" },
  { label: "Gestor de Cobros", value: "COLLECTION-MANAGER" },
  { label: "Supervisor de Sucursal", value: "SUPERVISOR" },
  { label: "Auxiliar Comercial", value: "ASSISTANT" },
  { label: "Jefe Comercial", value: "SALES-DIRECTOR" },
  { label: "Supervisor de Cobro", value: "COLLECTION-DIRECTOR" },
  { label: "Auxiliar Operativo", value: "ACCOUNTING" },
  { label: "Gerente Comercial", value: "COMERCIAL-EXECUTIVE" },
  { label: "Gerente Financiero", value: "FINANCE-EXECUTIVE" },
  { label: "Jefe de Soporte", value: "SUPPORT-EXECUTIVE" },
  { label: "Administrador", value: "ADMIN" }
];

export const parentesco = [
  { label: "Hermano", value: "HERMANO" },
  { label: "Hermana", value: "HERMANA" },
  { label: "Papá", value: "PAPA" },
  { label: "Mamá", value: "MAMA" },
  { label: "Abuelo", value: "ABUELO" },
  { label: "Abuela", value: "ABUELA" },
  { label: "Primo", value: "PRIMO" },
  { label: "Prima", value: "PRIMA" },
  { label: "Sobrino", value: "SOBRINO" },
  { label: "Sobrina", value: "SOBRINA" },
  { label: "Cuñado", value: "CUÑADO" },
  { label: "Cuñada", value: "CUÑADA" },
  { label: "Tía", value: "TIA" },
  { label: "Tío", value: "TIO" },
  { label: "Hijo", value: "HIJO" },
  { label: "Hija", value: "HIJA" }
];

export const relacion = [
  { label: "Amigo", value: "AMIGO" },
  { label: "Amiga", value: "AMIGA" },
  { label: "Conocido", value: "CONOCIDO" },
  { label: "Conocida", value: "CONOCIDA" }
];

export const guaranteeTypes = [
  {
    title: "Garantía fiduciaria",
    value: "FIDUCIARIA",
    tip: "Firma contrato"
  },
  {
    title: "Prenda",
    value: "PRENDARIA",
    tip: "El cliente la puede seguir utilizando"
  },
  {
    title: "Cheque",
    value: "CHEQUE",
    tip: "Entrega como garantia en la agencia"
  },
  {
    title: "Mobiliaria",
    value: "MOBILIARIA",
    tip: "Registro formal ante el registro mercantil, pero el cliente puede seguir utilizando"
  },
  {
    title: "Hipotecaria",
    value: "HIPOTECARIA",
    tip: "Se crea un gravamen sobre la propiedad"
  },
  {
    title: "Compra - venta;",
    value: "COMPRA_VENTA",
    tip: "Si no me pagas, me quedo con la casa para venderla",
    disabled: true
  },
  {
    title: "Empeño",
    value: "EMPEÑO",
    tip: "Igual que la prendaria pero se queda en posesión por Al Chilazo",
    disabled: true
  }
];

export const tipoDeGarantiaOptions = [
  { value: "FIDUCIARIA", label: "Fiduciaria (firma contrato)" },
  {
    value: "PRENDARIA",
    label: "Prendaria (el cliente la puede seguir utilizando)"
  },
  { value: "CHEQUE", label: "Cheque (entrega como garantia en la agencia)" },
  {
    value: "MOBILIARIA",
    label:
      "Mobiliaria (registro formal ante el registro mercantil, pero el cliente puede seguir utilizando)"
  },
  {
    value: "HIPOTECARIA",
    label: "Hipotecaria (se crea un gravamen sobre la propiedad)"
  },
  {
    value: "COMPRA_VENTA",
    label: "Compra-venta (si no me pagas, me quedo con la casa para venderla)"
  },
  {
    value: "EMPEÑO",
    label:
      "Empeño (igual que la prendaria pero se queda en posesión por Al Chilazo)"
  }
];

export const categoríaValues = [
  {
    label: "Novato",
    value: "NOVATO"
  },
  {
    label: "Intermedio",
    value: "INTERMEDIO"
  },
  {
    label: "Experto",
    value: "EXPERTO"
  }
];

export const spanishMonths = {
  January: "Enero",
  February: "Febrero",
  March: "Marzo",
  April: "Abril",
  May: "Mayo",
  June: "Junio",
  July: "Julio",
  August: "Agosto",
  September: "Septiembre",
  October: "Octubre",
  November: "Noviembre",
  December: "Diciembre"
};

export const chartColors = [
  "#ea5545",
  "#ef9b20",
  "#f46a9b",
  "#7f8c8d",
  "#edbf33",
  "#ede15b",
  "#bdcf32",
  "#87bc45",
  "#27aeef",
  "#b33dc6",
  "#1abc9c",
  "#2ecc71",
  "#3498db",
  "#9b59b6",
  "#34495e",
  "#16a085",
  "#27ae60",
  "#2980b9",
  "#8e44ad",
  "#2c3e50",
  "#f1c40f",
  "#e67e22",
  "#e74c3c",
  "#ecf0f1",
  "#95a5a6",
  "#f39c12",
  "#d35400",
  "#c0392b",
  "#bdc3c7"
];

type DropDownItem = {
  label: string;
  value: string | number | null;
};
