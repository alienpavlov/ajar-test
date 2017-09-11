import _ from 'lodash';

const USER_TYPE_BASIC = 1;
const USER_TYPE_ADMIN = 2;
const USER_TYPE_MODERATOR = 3;
const usersTable = [
  {
    email: "admin@ajar.ae",
    password: "admin",
    userType: USER_TYPE_ADMIN,
    name: "Admin-name"
  }, {
    email: "user@ajar.ae",
    password: "user",
    userType: USER_TYPE_BASIC,
    name: "Username"
  }, {
    email: "moderator@ajar.ae",
    password: "moderator",
    userType: USER_TYPE_MODERATOR,
    name: "Moderator-name"
  }
];

const pretendRequest = (email, password, cb) => {
  setTimeout(function () {

    const user = _.find(usersTable, (user) => {
      return user.email === email;
    });

    if (user && email === user.email && password === user.password) {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7),
        user
      });
    } else {
      cb({authenticated: false});
    }
  }, 0);
};

export default {
  login(email, password, cb) {
    cb = arguments[arguments.length - 1];
    if (window.localStorage.getItem('token')) {
      if (cb) {
        cb(true);
      }
      this.onChange(true);
      return;
    }

    pretendRequest(email, password, (res) => {
      if (res.authenticated && window.localStorage) {
        window.localStorage.setItem('token', res.token);
        window.localStorage.setItem('userType', res.user.userType);
        window.localStorage.setItem('userName', res.user.name);
        if (cb) {
          cb(true);
        }
        this.onChange(true);
      } else {
        if (cb) {
          cb(false);
        }
        this.onChange(false);
      }
    })
  },

  getToken() {
    if (window.localStorage) return window.localStorage.getItem('token');
  },

  logout(cb) {
    if (window.localStorage) {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('userType');
      window.localStorage.removeItem('userName');
    }
    if (cb) {
      cb();
    }
    this.onChange(false);
  },

  loggedIn() {
    if (window.localStorage) return !!window.localStorage.getItem('token');
  },

  onChange() {
  },

  isAdmin() {
    if (window.localStorage) return parseInt(window.localStorage.getItem('userType'), 10) === USER_TYPE_ADMIN;
  },

  isModerator() {
    if (window.localStorage) return parseInt(window.localStorage.getItem('userType'), 10) === USER_TYPE_MODERATOR || parseInt(window.localStorage.getItem('userType'), 10) === USER_TYPE_ADMIN;
  },

  getUsername() {
    if (window.localStorage) return window.localStorage.getItem('userName');
  }
};