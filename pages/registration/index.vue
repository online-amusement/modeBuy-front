<template>
    <div class="conatainar">
        <div class="new_member_registration">
            <h1>新規会員登録</h1>
        </div>
        <div class="registration_form">
            <form method="post" action="" @submit.prevent>
                <div class="email_form">
                    <label class="email">メールアドレス：</label>
                    <input type="text" v-model="email" />
                </div>
                <p class="res-text">{{ errors.email }}</p>

                <p class="res-text" v-if="responseStatus == 200">{{ message }}</p>
                <p class="res-text" v-if="responseStatus != 200">{{ message }}</p>

                <div class="sendMail">
                    <div class="button">
                        <button class="btn" @click="emailRegistration()" type="button">登録</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
import * as yup from 'yup';
import { ref } from 'vue';
import ResponseData from '~/models/apis/responseData';
definePageMeta({ auth: false });


const email = ref("");
const message = ref('');
const errors = ref({});
const responseStatus = ref('200');

const validateScheme = yup.object({
    email: yup.string().email("メールアドレスの形式が正しくありません").required("メールアドレスを入力してください"),
})

const validate = (values: any) => {
    try {
        validateScheme.validateSync(values, {abortEarly: false})
        return true
    }catch(e: any){
        const validationErrors : any = {}
        e.inner.forEach((error:any) => {
            if (error.path) {
                validationErrors[error.path] = error.message;
            }
        });
        errors.value = validationErrors
        return false;
    }
}

const emailRegistration = async () => {

    if(false == validate({ email: email.value })){
        return;
    }

    message.value = ""

    const response = await ResponseData.temporaryRegistration(email.value)
    if(response.value){
        console.log("response", response.value)
        message.value = response.value.message
        responseStatus.value = response.value.status
    }  
}

</script>
<style lang="scss" scoped>

.new_member_registration {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
}
.registration_form {
    display: flex;
    justify-content: center;
}
.sendMail {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
}
.btn {
    width: 150px;
    height: 35px;
    background: #0000BB;
    color: #fff;
    border: none;
    border-radius: 5px;
}
.email_form {
    margin-bottom: 50px;
}
input {
    width: 400px;
    height: 35px;
}
.email {
    display: flex;
}
</style>