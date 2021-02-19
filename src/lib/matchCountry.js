import Countries from "../config/countries.json";

export default (locale) => Countries.find((country) => country.code === locale).name;
