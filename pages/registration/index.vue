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
import { ref } from 'vue';
import ResponseData from '~/models/apis/responseData';
definePageMeta({ auth: false });


const email = ref("");

const emailRegistration = async () => {
    const response = await ResponseData.temporaryRegistration(email.value);
    console.log("response", response.value)
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