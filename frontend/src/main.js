import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import './index.css'

class server {
    constructor(name) {
        this.name = name
        const app = createApp(App);
        app.use(router);
        app.mount('#' + this.name);
    }
}

const company = import.meta.env.VITE_ROOT_API.split(',')
for(c in company) {
    var name = company[c]
    var vue = new server(name[-1])
}

