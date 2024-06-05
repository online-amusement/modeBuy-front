require('dotenv').config();
const environment = process.env.NODE_ENV || 'development';
const envSet = require(`./env.${environment}.ts`);
export default defineNuxtConfig({
  app:{
    head: {
      title: "modeBuy_App",
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href:"https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" },
        { href: 'https://fonts.googleapis.com/icon?family=Material+Icons', rel: 'stylesheet' },
      ],
    },
  },
  modules: ['@sidebase/nuxt-auth'],
  auth: {
    globalAppMiddleware: true,
    provider: {
      type: 'local',
      pages: {
        login: '/login',
      },
      endpoints: {
        signIn: { path: "/login", method: "post"},
        getSession: { path: "/me", method: "post"},
      },
      token: {
        // signInResponseTokenPointer: '/token', // レスポンスJSON内のtokenのキー
        type: 'Bearer',
        headerName: 'Authorization', // Authorization
        maxAgeInSeconds: 60 * 60 * 24 // バックエンドと同じか長くしないと不整合な状態になる（フロントが未ログイン、バックエンドがログイン中）
      },

      //getSession Return Type
      sessionDataType: { id: 'string', name: 'string', token: 'string' }
    },
    session: {
      //24時間経ったらsession(/me)のAPIを呼び出す
      enableRefreshPeriodically: 86400000,
      enableRefreshOnWindowFocus: true,
    },
    baseURL: envSet.APP_ENV.URL,
  },
  runtimeConfig: {
    dev: process.env.NODE_ENV !== 'production',
    ssr: false,
    public: {
      publicConfig: process.env.PUBLIC_CONFIG,
      appUrl: envSet.APP_ENV.URL
    },
  },
  devServer: {
    port: 3002,
  },
  plugins: [
    
  ],
});
