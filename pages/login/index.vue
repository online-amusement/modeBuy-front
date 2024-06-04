<template>
    <div class="containar">
        <div class="title">
            <h1>ログイン</h1>
        </div>
        <div class="login-conatents">
            <form method="POST" action="" @submit.prevent>
                <div class="email-area">
                    <label class="email" for="email">メールアドレス:</label>
                    <input v-model="email" type="text" placeholder="メールアドレス" id="email"/>
                </div>
                <div class="password-area">
                    <label class="password" for="password">パスワード:</label>
                    <div class="password-check">
                        <input  v-model="password" :type="pass_check == false ? 'password' : 'text'" placeholder="パスワード" id="password" :value="password" />
                        <span v-if="pass_check == false" class="material-icons" @click="passwordCheck()" :class="pass_check == false ? 'visibility' : 'visibility_off' ">visibility</span>
                        <span v-if="pass_check == true" class="material-icons" @click="passwordCheck()" :class="pass_check == true ? 'visibility' : 'visibility_off' " >visibility_off</span>
                    </div>
                </div>
                <div class="btn-area">
                    <button @click="login()" class="btn" type="submit">ログイン</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { pass } from 'three/examples/jsm/nodes/Nodes.js';
import { ref } from 'vue';
import * as yup from 'yup';

import ResponseData from '~/models/apis/responseData';


definePageMeta({
    auth: {
        unauthenticatedOnly: false
    }
})

const schema = yup.object({
  email: yup.string().required("メールアドレスを入力してください").email("メールアドレスの形式が正しくありません"),
  password: yup.string().required("パスワードを入力してください").min(8, "パスワードは8文字以上で入力してください"),
})

//const email = ref("");
const email = ref("");
const password = ref("");

const { signIn, token, status, data, signOut } = useAuth();
const router = useRouter();
const accessToken = ref("");
const error = ref('');
const pass_check = ref(false);


const login = async() => {
    localStorage.removeItem("auth._token");
    const response = await signIn({
        email: email.value,
        password: password.value
    }, {
        redirect: false
    });
    console.log(token.value)
    localStorage.setItem("auth._token", token.value)
    if(status.value == 'authenticated') {
        router.push('/home')
    }
}
    //バリデーション
    /*const validated = await schema.validate({
        email: email.value,
        password: password.value
    }).catch((err) => {
        alert((err as any).message)
        return;
    })

    if(!validated){
        return;
    }
    
    try {
        //forget token
        localStorage.removeItem("auth._token");

        const response = await signIn({
            email: (validated as any).email,
            password: (validated as any).value,
        },{
            redirect: false
        })

        //console.log("response", response, token.value, status.value, data.value)

        const data_value = data.value as any

        if(data_value.result && token.value){
            localStorage.setItem("auth._token", token.value)
            if(status.value == "authenticated") {
                router.push('/home/')
            }else {
                router.push('/registration/profile/')
            }
        }else{
            alert(data_value.message)
        }
    }catch(error){
        //error = "ログインできませんでした。"
        console.log(error)
        alert("ログインできませんでした。")
    }
}*/

const passwordCheck = () => {
    pass_check.value =! pass_check.value
    console.log(pass_check.value);
}


</script>
<style lang="scss" scoped>
.title {
    display: flex;
    justify-content: center;
}
.login-conatents {
    display: flex;
    justify-content: center;
}
.btn {
    width: 150px;
    height: 35px;
    background: #0000BB;
    color: #fff;
    border: none;
    border-radius: 3px;
}
.email-area {
    margin-bottom: 20px;
}
.email {
    letter-spacing: 2px;
    display: flex;
    align-items: center;
}
.password {
    letter-spacing: 7.5px;
    display: flex;
    align-items: center;
}
.password-area {
    margin-bottom: 50px;
}
input {
    width: 400px;
    height: 35px;
}
.btn-area {
    display: flex;
    justify-content: center;
}
.password-check {
    display: flex;
    align-items: center;
}
</style>