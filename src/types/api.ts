export interface ApiResource {
  url: string
  [key: string]: unknown
}

export type ApiResourceList = {
  count: number
  next: string | null
  previous: string | null
  results: ApiResource[]
}
