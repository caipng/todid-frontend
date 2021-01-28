const palette = ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'];

export function stringToColor(str: string) {
  let idx = 0;
  for (let i = 0; i < str.length; i++) {
    idx = (idx + str.charCodeAt(i)) % palette.length;
  }

  return palette[idx];
}
