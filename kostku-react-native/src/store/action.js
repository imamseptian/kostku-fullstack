export const setForm = (value, input) => {
  return {type: 'SET_FORM', inputType: input, inputValue: value};
};

export const setAuthRedux = (user, token) => {
  return {type: 'SET_AUTH', user: user, token: token};
};

export const setUserRedux = (user) => {
  return {type: 'SET_USER', user: user};
};

export const setKostRedux = (kost) => {
  return {type: 'SET_KOST', kost: kost};
};

export const unsetAuthRedux = () => {
  return {type: 'UNSET_AUTH'};
};

export const setJudul = () => {
  return {type: 'SET_JUDUL'};
};
