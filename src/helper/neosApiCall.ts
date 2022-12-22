export class ApiCall {
  static get = (url: string) => {
    const method = "GET"
    const headers = {
      Accept: "application/json",
    }

    return fetch(`https://neos-proxy.kokoa.live/api/${url}`, {
      method,
      headers,
    })
      .then((response) => response.json())
      .catch((error) => error)
  }
}
