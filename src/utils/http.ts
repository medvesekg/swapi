export default {
  get<T>(url: string): Promise<T> {
    return fetch(url).then((response) => response.json() as T)
  },
}
