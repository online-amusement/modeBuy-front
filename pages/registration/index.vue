<template>
    <div class="conatainar">
        <div class="new_member_registration">
            新規会員登録
        </div>
        <div class="registration_form">
            <form method="post" action="" @submit.prevent>
                <div class="email_form">
                    <label>メールアドレス：</label>
                    <input type="text" v-model="email" />
                </div>
                <div class="sendMail">
                    <div class="button">
                        <button @click="emailRegistration()" type="button">登録</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div class="contents">

    </div>
</template>
<script setup lang="ts">
import ResponseData from '~/models/apis/responseData';

const email = ref("")

const emailRegistration = async () => {
    const response = await ResponseData.temporaryRegistration(email.value)
}
</script>
<style lang="scss" scoped>

</style>