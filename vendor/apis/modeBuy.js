let domain = "http://local.modebuy/api";

const headers = computed(() => {
  const tokenString = localStorage.getItem(
    'auth._token.local'
  );

  return new Headers({
    Authorization: `Bearer ` + tokenString
  })
});



//仮登録
const temporaryRegistration = (data)  => useFetch(domain + "/member/temporary-registration", {
  method: "POST",
  headers: headers,
  body: {
    email: data.email,
  }
});

//本登録
const officialRegistration = (data)  => useFetch(domain + "/member/official-registration", {
  method: "POST",
  headers: headers,
  body: {
    name: data.name,
    password: data.password,
    token: data.token,
    address: data.address,
    city: data.city,
    country: data.country
  }
});

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
  method: "POST",
  headers: headers,
  body: {
    member_id: data.member_id,
  }
});


export {
  temporaryRegistration,
  officialRegistration,
  login,
  logout
}

