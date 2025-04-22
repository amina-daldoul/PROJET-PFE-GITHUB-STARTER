export const getTokens = () => {
  const tokens = JSON.parse(localStorage.getItem('sb-qxyrsnxgwxvzqqevdgvx-auth-token') || '{}')
  return {
    access_token: tokens.provider_token,
    refresh_token: tokens.refresh_token,
  }
}

export const clearTokens = () => {
  localStorage.removeItem('sb-qxyrsnxgwxvzqqevdgvx-auth-token')
}
