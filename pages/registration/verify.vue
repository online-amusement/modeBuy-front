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
            <div class="error-area">
                    <p class="error-text">{{ errors.name }}</p>
                </div>
            <div class="password">
                <label class="password-title">パスワード：</label>
                <input type="password" class="password-input" v-model="password">
            </div>
            <p class="error-text">{{ errors.password }}</p>
            <div class="country">
                <label class="country-title">国：</label>
                <input type="text" class="country-input" v-model="country">
            </div>
            <p class="error-text">{{ errors.country }}</p>
            <div class="address">
                <label class="address-title">住所：</label>
                <input type="text" class="address-input" v-model="address">
            </div>
            <p class="error-text">{{ errors.address }}</p>
            <div class="city">
                <label class="city-title">住所2：</label>
                <input type="text" class="city-input" v-model="city">
            </div>
            <p class="error-text">{{ errors.city }}</p>
            <div class="button">
                <button @click="register()" type="button" class="btn">登録</button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ResponseData from '~/models/apis/responseData';
import * as yup from 'yup';

definePageMeta({ auth: false });
const url = ref('');
const token = ref('');
const name = ref('');
const password = ref('');
const country = ref('');
const address = ref('');
const city = ref('');
const errors = ref('');
const router = useRouter();

const verifyToken = ( async () => {
    url.value = location.search.substring(7);
    token.value = url.value;
})

const validateScheme = yup.object({
    name: yup.string().required("名前を入力してください"),
    password: yup.string().required("パスワードを入力してください").min(8, "パスワードは8文字以上入力してください"),
    country: yup.string().required("国を入力してください"),
    address: yup.string().required("住所を入力してください。"),
    city: yup.string().required("マンション名を入力してください。"),
})

const validate = (values: any) => {
    try {
        validateScheme.validateSync(values, {abortEarly: false})
        return true
    }catch(e: any){
        const validationErrors : any = {}
        //innerにエラー内容が入っている
        e.inner.forEach((error:any) => {
            if (error.path) {
                validationErrors[error.path] = error.message;
            }
        });
        errors.value = validationErrors
        return false;
    }
}

const register = ( async () => {

    const values = {
        name: name.value,
        password: password.value,
        country: country.value,
        address: address.value,
        city: city.value
    }

    //バリデーション実行
    if(false == validate(values)){
        //バリデーションエラーの場合は何も返さない
        return 
    }

    //本登録
    const response = await ResponseData.officialRegistration(name.value, password.value, token.value, country.value, address.value, city.value)
    console.log("response", response.value)
    localStorage.setItem("auth._token", token.value)

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
.error-text {
    display: flex;
    justify-content: center;
    color: #CC0000;
}
</style>