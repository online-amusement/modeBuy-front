<template>
    <div class="container">
        login2
        <button @click="onClickGoogleLogin">Google</button>

        <button @click="onClickLogin">Login</button>
        <div id="firebaseui-auth-container"></div>
    </div>
</template>
<script lang="ts" setup>
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { app } from "~/models/accessAnalysis";

import * as firebaseui from 'firebaseui';

definePageMeta({
    auth: {
        unauthenticatedOnly: false
    }
})

const ui = new firebaseui.auth.AuthUI(getAuth(app));

onAuthStateChanged(getAuth(app), (user) => {
    console.log("user", user)
    console.log("currentUser", getAuth(app).currentUser)

    if(user){
       
    }
})

const onClickGoogleLogin = () => {

    const provider = new GoogleAuthProvider();

    signInWithRedirect(getAuth(app), provider);

}

const onClickLogin = () => {
    
    ui.start('#firebaseui-auth-container', {
        signInOptions: [
            {
                provider: EmailAuthProvider.PROVIDER_ID,
                requireDisplayName: false
            },
            {
                provider: GoogleAuthProvider.PROVIDER_ID
            }
        ]
    });
}
</script>
<style lang="scss" scoped>

</style>