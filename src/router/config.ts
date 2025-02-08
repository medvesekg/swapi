export type RouteConfig = {
  path: string
  apiPath: string
  title: string
  description: string
  listFields: string[]
}

const routeConfig: RouteConfig[] = [
  {
    path: 'characters',
    apiPath: 'people',
    title: 'Characters',
    description: 'Browse Star Wars characters',
    listFields: ['name', 'height', 'mass', 'hair_color'],
  },
  {
    path: 'planets',
    apiPath: 'planets',
    title: 'Planets',
    description: 'Browse Star Wars planets',
    listFields: ['name', 'terrain', 'climate'],
  },
  {
    path: 'starships',
    apiPath: 'starships',
    title: 'Starships',
    description: 'Browse Star Wars ships',
    listFields: ['name', 'model', 'manufacturer'],
  },
  /*
  {
    path: 'vehicles',
    apiPath: 'vehicles',
    title: 'Vehicles',
    description: 'Browse Star Wars vehicles',
    listFields: ['name', 'model'],
  },
  */
]

export default routeConfig
