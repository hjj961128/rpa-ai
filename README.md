# RPAI

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### 开发环境配置
开发环境配置后端api地址，通过配置proxy, 禁止写死axios baseUrl, API_BASE_URL=''即可，
生产环境走的是nginx proxy
```js
  server: {
    // 本地跨域代理 https://cn.vitejs.dev/config/server-options.html#server-proxy
    proxy:{
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true
      }
    }
  }


```

