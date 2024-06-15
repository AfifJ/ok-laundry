exports.getSession = (cookie) => {
  // Parse the cookie and return the session object
  // This is a simplified example, you may want to use a library to parse the cookie
  const session = {};
  const cookies = cookie.split('; ');
  for (let i = 0; i < cookies.length; i++) {
    const [name, value] = cookies[i].split('=');
    if (name === 'okelaundry_id') {
      session.okelaundry_id = value;
    }
  }
  return session;
};