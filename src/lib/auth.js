// /lib/auth.js

/**
 * Registers a new user by saving to localStorage.
 * @param {{ username: string, password: string }} param0
 */
export function signup({ username, password }) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
  }
  
  /**
   * Attempts to log in with given credentials.
   * @param {{ username: string, password: string }} param0
   * @returns {boolean} true if login succeeded
   */
  export function login({ username, password }) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const valid = users.some(u => u.username === username && u.password === password);
    if (valid) {
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    return false;
  }
  
  /**
   * Checks if a user is currently authenticated.
   * @returns {boolean}
   */
  export function isAuthenticated() {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
  
  /**
   * Logs out the current user.
   */
  export function logout() {
    localStorage.removeItem('isLoggedIn');
  }
  