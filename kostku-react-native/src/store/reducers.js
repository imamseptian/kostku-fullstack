import {ADDITION, SUBSTRACTION} from './actionTypes';
import {combineReducers} from 'redux';

const AuthState = {
  isAuth: false,
  user: null,
  token: null,
  kost: [],
};

const AuthReducer = (state = AuthState, action) => {
  if (action.type === 'SET_AUTH') {
    return {
      ...state,
      isAuth: true,
      user: action.user,
      token: action.token,
    };
  }
  if (action.type === 'SET_USER') {
    return {
      ...state,
      user: action.user,
    };
  }

  if (action.type === 'UNSET_AUTH') {
    return {
      ...state,
      isAuth: false,
      user: undefined,
      kost: undefined,
    };
  }
  if (action.type === 'SET_KOST') {
    return {
      ...state,
      kost: action.kost,
    };
  }

  return state;
};

const initialState = {
  counter: 0,
  name: 'Henrique',
};

const initialStateLogin = {
  name: 'Henrik Akhmud',
  age: 32,
};

const initialStateRegister = {
  name: 'Lacari',
  age: 32,
  desc: 'malding',
};

const initialAsal = {
  lib: {
    emo1: 'gachiW',
    emo2: 'gachiRoll',
    emo3: 'gachiHYPER',
  },
  fav: 'wideHardo',
  ban: 'ayaya',
};

const AsalReducer = (state = initialAsal, action) => {
  if (action.type === 'SET_JUDUL') {
    return {
      ...state,
      fav: 'widepeepoHappy',
    };
  }
  if (action.type === 'SET_FORM') {
    console.log('di reducers ');
    return {
      ...state,
      lib: {
        ...state.lib,
        [action.inputType]: action.inputValue,
      },
    };
  }
  return state;
};

const LoginReducer = (state = initialStateLogin, action) => {
  return state;
};

const RegisterReducer = (state = initialStateRegister, action) => {
  return state;
};

const reducer = combineReducers({
  LoginReducer,
  RegisterReducer,
  AsalReducer,
  AuthReducer,
});

// Single
// const reducer = (state = initialState, action) => {
//   return state;
// };

export default reducer;

// export const mainReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADDITION:
//       return {...state, counter: state.counter + 1};

//     case SUBSTRACTION:
//       return {...state, counter: state.counter - 1};

//     default:
//       return state;
//   }
// };
