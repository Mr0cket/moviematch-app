export const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://my-heroku-backend-or-whatever-you-call-it.herokuapp.com"
    : "http://192.168.1.20:4000";
