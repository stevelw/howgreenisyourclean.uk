import axios from "axios";

const api = axios.create({
  baseURL: "https://api.carbonintensity.org.uk",
});

export function fetchNextFourHours(postcodeArea) {
  return fetchNextForPostcodeArea(24, postcodeArea).then((data) => {
    if (!data.length) return {};
    data.length = 8;
    const max = Math.max(
      ...data.map((datapoint) => datapoint.intensity.forecast)
    );
    const min = Math.min(
      ...data.map((datapoint) => datapoint.intensity.forecast)
    );
    const average = data.reduce((acc, { intensity: { forecast } }) => {
      return Math.round(acc + forecast / data.length);
    }, 0);
    return {
      max,
      average,
      min,
    };
  });
}

export function fetchNextFortyEightHours(postcodeArea) {
  return fetchNextForPostcodeArea(48, postcodeArea).then((data) => {
    return data.map((datapoint) => {
      return {
        timestamp: datapoint.from,
        intensity: datapoint.intensity.forecast,
      };
    });
  });
}

function fetchNextForPostcodeArea(hours, postcodeArea) {
  const validHours = [24, 48];
  if (!validHours.includes)
    return Promise.reject({ msg: "Invalid hours option" });

  const currentDateTime = new Date().toISOString();
  const endpoint = `/regional/intensity/${currentDateTime}/fw${hours}h/postcode/${postcodeArea}`;
  return api
    .get(endpoint)
    .then(({ data }) => {
      if (data) {
        return data.data.data;
      } else {
        return []; // Postcode doesn't exist
      }
    })
    .catch((err) => {
      console.log(err.message);
      return [];
    });
}
