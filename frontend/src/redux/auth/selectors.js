export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectUser = (state) => {
  return state.auth.user;
};

export const selectIsRefreshing = (state) => state.auth.isRefreshing;

export const selectIsLoading = (state) => state.auth.isLoading;

export const selectAuthError = (state) => state.auth.error;

export const selectToken = (state) => state.auth.token;
