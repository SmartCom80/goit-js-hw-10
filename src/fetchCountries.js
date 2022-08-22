//функція відправки і отримання відповідні на запрос до бекенду сайта
const BASE_URL = 'https://restcountries.com/v3.1/name';

export function fetchCountries(name) {
  console.log('name :>> ', name);
  return fetch(
    `${BASE_URL}/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
