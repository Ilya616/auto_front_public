export function year() {
  let years = [];
  let date = new Date();
  for (let year = date.getFullYear(); year >= 1900; year--) {
    years.push(year);
  }
  return years;
}
