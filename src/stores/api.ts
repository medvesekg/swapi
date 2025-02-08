import type { ApiResource, ApiResourceList } from '@/types/api'
import http from '@/utils/http'
import { removeTrailingSlash } from '@/utils/path'
import { defineStore } from 'pinia'

const BASE_URL = 'https://swapi.dev/api'
const cache: { [key: string]: unknown } = {}

export const useApiStore = defineStore('api', () => {
  async function getResources(
    resource: string,
    page: number,
    search: string = '',
  ): Promise<ApiResourceList> {
    let url = `${BASE_URL}/${resource}?page=${page}`
    if (search) {
      url += `&search=${search}`
    }
    if (cache[url]) {
      return cache[url] as ApiResourceList
    }
    return http.get<ApiResourceList>(url).then((response) => {
      cache[url] = response
      for (const resource of response.results) {
        cache[removeTrailingSlash(resource.url)] = resource
      }
      return response
    })
  }

  async function getResource(resource: string, id: number | string): Promise<ApiResource> {
    const url = `${BASE_URL}/${resource}/${id}`
    if (cache[url]) {
      return cache[url] as ApiResource
    }
    return http.get<ApiResource>(url).then((response) => {
      cache[url] = response
      return response
    })
  }

  return { getResources, getResource }
})
