<template>
    <div class="containar">
        <div class="section-title">
            <h1>プロフィール登録</h1>
        </div>
        <div class="member-info">
            <div class="name">
                <label class="name-title">氏名：</label>
                <input type="text" class="name-input" v-model="name">
            </div>
            <div class="password">
                <label class="password-title">パスワード：</label>
                <input type="password" class="password-input" v-model="password">
            </div>
            <div class="country">
                <label class="country-title">国：</label>
                <input type="text" class="country-input" v-model="country">
            </div>
            <div class="address">
                <label class="address-title">住所：</label>
                <input type="text" class="address-input" v-model="address">
            </div>
            <div class="city">
                <label class="city-title">住所2：</label>
                <input type="text" class="city-input" v-model="city">
            </div>
            <div class="button">
                <button @click="register()" type="button" class="btn">登録</button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ResponseData from '~/models/apis/responseData';
definePageMeta({ auth: false });
const url = ref('');
const token = ref('');
const name = ref('');
const password = ref('');
const country = ref('');
const address = ref('');
const city = ref('');
const router = useRouter();

const verifyToken = ( async () => {
    url.value = location.search.substring(7);
    token.value = url.value;
})

const register = ( async () => {
    //本登録
    const response = await ResponseData.officialRegistration(name.value, password.value, token.value, country.value, address.value, city.value)
    console.log("response", response)
    localStorage.setItem("auth._token", response.value.token)

    if(response.value.token)
    {
        router.push('/login')
    }else {
        return
    }
})

onMounted(() => {
    verifyToken();
    console.log(token.value);
})

</script>
<style lang="scss" scoped>
.section-title {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
}
input {
    width: 400px;
    height: 35px;
}
label {
    display: inline-block;
    width: 100px;
    vertical-align: top;
}
.name {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}
.password {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}
.country {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}
.address {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}
.city {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}
.button {
    display: flex;
    justify-content: center;
}
.btn {
    width: 350px;
    height: 35px;
    background: #0000BB;
    color: #fff;
    border: none;
    border-radius: 5px;
}
</style>