import Countries from "../config/countries.json";

export default (locale) => {
  const country = Countries.find((country) => country.code === locale);
  return country ? country.name : "";
};
