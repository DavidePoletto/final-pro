// store/modules/cookieModule.js
import Cookies from 'js-cookie';

export const state = {
  theme: Cookies.get('theme') || 'light',
  cookieConsent: Cookies.get('cookieConsent') === 'true',
};

export const mutations = {
  SET_THEME(state, theme) {
    state.theme = theme;
    Cookies.set('theme', theme, { expires: 7 });
  },
  SET_COOKIE_CONSENT(state) {
    state.cookieConsent = true;
    Cookies.set('cookieConsent', 'true', { expires: 365 });
  },
};

export const actions = {
  setTheme({ commit }, theme) {
    commit('SET_THEME', theme);
  },
  giveCookieConsent({ commit }) {
    commit('SET_COOKIE_CONSENT');
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
