import { Cookies } from "typescript-cookie"

export class ApiCall {
  static get = (url: string) => {
    const method = "GET"
    const Authorization: string = Cookies.get("auth") as string
    const headers = {
      Accept: "application/json",
      Authorization,
    }

    return fetch(`https://neos-proxy.kokoa.live/api/${url}`, {
      method,
      headers,
    })
      .then((response) => response.json())
      .catch((error) => error)
  }

  static post = (url: string, body: any) => {
    const method = "POST"
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    }

    return fetch(`https://neos-proxy.kokoa.live/api/${url}`, {
      method,
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .catch((error) => error)
  }
}
