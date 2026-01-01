const USER_KEY = 'user';

const userState = {
  getUser() {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  setUser(user: any) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  removeUser() {
    localStorage.removeItem(USER_KEY);
  },
};

export default userState;
