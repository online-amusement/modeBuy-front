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
