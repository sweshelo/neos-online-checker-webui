export class ApiCall {
  static get = (url: string) => {
    const method = "GET"
    const headers = {
      Accept: "application/json",
    }

    return fetch(url, {
      method,
      headers,
      mode: "no-cors",
    })
      .then((response) => response.json())
      .catch((error) => error)
  }
}
