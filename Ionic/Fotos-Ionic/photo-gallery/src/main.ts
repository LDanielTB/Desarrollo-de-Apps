import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { IonicVue } from '@ionic/vue';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import './theme/variables.css';

defineCustomElements(window);
const app = createApp(App)   // crea la app con el componente raíz App.vue
  .use(IonicVue)              // registra el plugin de Ionic (componentes/estilos)
  .use(router);               // registra el router para navegación entre páginas

router.isReady().then(() => {
  app.mount('#app');
});