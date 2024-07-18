let domain = "http://local.modebuy" + "/api"

const headers = computed(() => {
  const tokenString = localStorage.getItem(
    'auth._token'
  );
  
  return new Headers({
    Authorization: 'Bearer ' + tokenString
  })
});


//仮登録
const temporaryRegistration = (data) => {
  return useFetch(domain + "/member/temporary-registration", {
    method: "POST",
    headers: headers,
    body: {
      email: data.email,
    },
    onResponseError({ request, response, options }) {
      // ネットワークのエラー対応
      alert("network error")
    }
  })
};

//本登録
const officialRegistration = (data) => {
  return useFetch(domain + "/member/official-registration", {
    method: "POST",
    body: {
      name: data.name,
      password: data.password,
      token: data.token,
      address: data.address,
      city: data.city,
      country: data.country
    }
  });
};

//ログイン
const login = (data) => useFetch(domain + "/login", {
  method: "POST",
  headers: headers,
  body: {
    email: data.email,
    password: data.password
  }
});

//ログアウト
const logout = (data) => useFetch(domain + "/logout", {
  method: "GET",
  headers: headers,
  body: {
    token: data.token,
  }
});

export {
  temporaryRegistration,
  officialRegistration,
  login,
  logout
}

