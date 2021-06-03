const apiLogin = process.env['REACT_APP_API_LOGIN_URL'];
const clientURL = process.env['REACT_APP_CLIENT_URL'];

const loginRedirect = (token: string): string => {
  return `${apiLogin}/${token}?redirect_to=${clientURL}`;
};

export default loginRedirect;
