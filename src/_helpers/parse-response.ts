import { userService } from '../_services';

export async function parseResponse(res: Response) {
  console.log(res);
  const text = await res.text();
  const data = text && JSON.parse(text);
  console.log(data);

  if (!res.ok || (data && data.error)) {
    if (res.status === 401) {
      userService.logout();
    }

    const err: string =
      data && data.error
        ? Array.isArray(data.error)
          ? data.error.join('\n')
          : data.error
        : res.statusText;

    return Promise.reject(err);
  }

  return data;
}
