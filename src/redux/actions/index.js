const GET_USER_EMAIL = 'GET_USER_EMAIL';

const getUserEmail = (email) => ({
  type: GET_USER_EMAIL,
  email,
});

export default getUserEmail;
