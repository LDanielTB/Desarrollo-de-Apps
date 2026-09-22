<template>
  <ion-page>

    <ion-header>
      <ion-toolbar>
        <ion-title>Photo Gallery</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Photo Gallery</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-grid>
        <ion-row>
          <ion-col size="6" :key="photo.filepath" v-for="(photo, index) in photos">

            <img :src="photo.webviewPath" :alt="`Photo ${index + 1}`" loading="lazy" />

          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-fab vertical="bottom" horizontal="center" slot="fixed">

        <!-- CHANGE: Add a click event listener to the floating action button -->
        <ion-fab-button @click="takePhoto()">
          <!--
            @click="addNewToGallery()":
              Al tocar el botón, ejecuta el método addNewToGallery
              (definido en usePhotoGallery.ts), que abre la cámara,
              guarda la foto en el filesystem y la agrega al array
              reactivo `photos` (lo cual dispara re-render automático
              del v-for de arriba + el watch() que persiste en Preferences).
          -->
          <ion-icon :icon="camera"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <ion-toast
        :is-open="showResolutionToast"
        message="Foto tomada con resolución máxima (100%)."
        :duration="2500"
        @didDismiss="showResolutionToast = false"
      ></ion-toast>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">

import { ref } from 'vue';

import { camera } from 'ionicons/icons';

import {
  IonPage,
  IonHeader,
  IonFab,
  IonFabButton,
  IonIcon,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonToast,
} from '@ionic/vue';
// Importa explícitamente cada componente de Ionic usado en el template.

import { usePhotoGallery } from '@/composables/usePhotoGallery';
// Importa el "composable" que encapsula toda la lógica de negocio de la galería

// CHANGE: Add `photos` array to destructure from `usePhotoGallery()`
const { photos, addNewToGallery } = usePhotoGallery();

const showResolutionToast = ref(false);

const takePhoto = async () => {
  await addNewToGallery();
  showResolutionToast.value = true;
};

</script>