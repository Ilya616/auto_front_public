export function position(setCity) {
  navigator.geolocation.getCurrentPosition(success, error, {
    enableHighAccuracy: true,
  });

  const address = [
    {
      Width: 56.3249152,
      Longitude: 43.99104,
      country: "Нижний Новгород",
    },
    {
      Width: 56.262656,
      Longitude: 43.892736,
      country: "Нижний Новгород",
    },
  ];
  function success({ coords }) {
    const { latitude, longitude } = coords;
    const position = [latitude, longitude];

    getPosition(position);
  }
  function getPosition(position) {
    for (let city of address) {
      if (city.Width == position[0] && city.Longitude == position[1]) {
        setCity(city.country);
      } else {
        setCity("Не Нижний");
      }
    }
  }

  function error({ message }) {
    setCity("Не Нижний");

    console.log(message); // при отказе в доступе получаем PositionError: User denied Geolocation
  }
}
