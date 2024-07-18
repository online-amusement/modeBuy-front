<template>
    <div class="containar">
        <div class="title">
            <h1>ログイン</h1>
        </div>
        <div class="login-conatents">
            <form method="POST" action="" @submit.prevent>
                <div class="email-area">
                    <label class="email" for="email">メールアドレス:</label>
                    <input v-model="email" type="email" placeholder="メールアドレス" id="email" />
                    <p class="error-text">{{ errors.email }}</p>
                </div>
                <div class="password-area">
                    <label class="password" for="password">パスワード:</label>
                    <div class="password-check">
                        <input  v-model="password" :type="pass_check == false ? 'password' : 'text'" placeholder="パスワード" id="password" :value="password" />
                        <span v-if="pass_check == false" class="material-icons" @click="passwordCheck()" :class="pass_check == false ? 'visibility' : 'visibility_off' ">visibility</span>
                        <span v-if="pass_check == true" class="material-icons" @click="passwordCheck()" :class="pass_check == true ? 'visibility' : 'visibility_off' " >visibility_off</span>
                    </div>
                    <p class="error-text">{{ errors.password }}</p>
                </div>
                <div class="btn-area">
                    <button @click="login()" class="btn" type="submit">ログイン</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import * as yup from 'yup';
import ResponseData from '~/models/apis/responseData';


definePageMeta({
    auth: {
        unauthenticatedOnly: false
    }
})

const email = ref('');
const password = ref('');
const errors = ref({});
const { signIn, token, status, data, signOut } = useAuth();
const { setToken } = useAuthState();
const router = useRouter();
const accessToken = ref("");
const pass_check = ref(false);

const validateScheme = yup.object({
    email: yup.string().email("メールアドレスの形式が正しくありません").required("メールアドレスを入力してください"),
    password: yup.string().required("パスワードを入力してください").min(8, "パスワードは8文字以上入力してください"),
})

//バリデーション関数定義
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

    
//ログイン処理
const login = async() => {

    const values = {
        email: email.value,
        password: password.value,
    }

    //バリデーション実行
    if(false == validate(values)){
        //バリデーションエラーの場合は何も返さない
        return 
    }

    localStorage.removeItem("auth._token");
    setToken(null);
    
    console.log("token", token.value)
    
    const response = await signIn({
        email: values.email,
        password: values.password,
    }, {
        redirect: false
    });
    try {
        console.log("tokenTest", token.value)
        if(token.value) {
            localStorage.setItem("auth._token", token.value)
            
            if(status.value == 'authenticated') {
                router.push('/home')
            }
        }
    }catch(e) {
        return e
    }
    
}

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
.error-text {
    color: #FF0000	;
}
</style>