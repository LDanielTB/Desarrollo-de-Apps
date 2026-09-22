import { ref, watch, onMounted } from 'vue';
// ref: para crear estado reactivo (el array de fotos)
// watch: para "escuchar" cambios en una variable reactiva
// onMounted: hook del ciclo de vida de Vue, se ejecuta al montar el componente

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import type { Photo } from '@capacitor/camera';
// API de Capacitor para acceder a la cámara del dispositivo/navegador

import { Filesystem, Directory } from '@capacitor/filesystem';
// API de Capacitor para leer y escribir archivos en el sistema de archivos

import { Preferences } from '@capacitor/preferences';
// API de Capacitor tipo "clave-valor", similar a localStorage pero multiplataforma

export const usePhotoGallery = () => {

  // Estado reactivo: array de fotos que se muestra en la UI
  const photos = ref<UserPhoto[]>([]);

  // Clave (nombre) bajo la cual se guardará el array de fotos en Preferences.
  const PHOTO_STORAGE = 'photos';

  // Tomar una nueva foto y agregarla a la galería
  const addNewToGallery = async () => {
    // Abre la cámara y espera la foto
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, // devuelve una URI temporal a la imagen
      source: CameraSource.Camera,      // fuerza a usar la cámara (no galería)
      quality: 100,                     // calidad máxima
    });

    // Nombre único para el archivo, basado en timestamp actual
    const fileName = Date.now() + '.jpeg';

    // Guarda la foto físicamente en el filesystem y devuelve el objeto UserPhoto
    const savedImageFile = await savePicture(capturedPhoto, fileName);

    // Inserta la nueva foto al inicio del array
    // Esto dispara automáticamente el watch() de abajo, que guarda en Preferences
    photos.value = [savedImageFile, ...photos.value];
  };

  // Guardar el archivo de imagen físicamente en el filesystem
  const savePicture = async (photo: Photo, fileName: string): Promise<UserPhoto> => {
    // Descarga la imagen (desde su URI temporal) como blob binario
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();

    // Convierte el blob a una cadena base64
    const base64Data = await base64FromPath(photo.webPath!);

    // Escribe el archivo en el almacenamiento persistente de la app
    const savedFile = await Filesystem.writeFile({
      path: fileName,          // nombre del archivo dentro del directorio
      data: base64Data,        // contenido en base64
      directory: Directory.Data, // carpeta privada de datos de la app
    });

    return {
      filepath: fileName,
      webviewPath: photo.webPath,
    };
  };

  // Convertir un archivo/imagen a base64 usando FileReader
  const base64FromPath = async (path: string): Promise<string> => {
    const response = await fetch(path);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject('method did not return a string');
        }
      };
      reader.readAsDataURL(blob); // lee el blob como data URL (base64)
    });
  };

  // Guardar el ARRAY de fotos (no las imágenes) en Preferences
  const cachePhotos = () => {
    Preferences.set({
      key: PHOTO_STORAGE,
      value: JSON.stringify(photos.value),
    });
  };

  // Cargar las fotos guardadas al iniciar la app
  const loadSaved = async () => {
    // Recupera el string JSON guardado bajo la clave PHOTO_STORAGE
    const photoList = await Preferences.get({ key: PHOTO_STORAGE });

    // Si existe valor, lo parsea a array; si no, usa un array vacío
    const photosInPreferences = photoList.value ? JSON.parse(photoList.value) : [];

    for (const photo of photosInPreferences) {
      const file = await Filesystem.readFile({
        path: photo.filepath,     // ruta guardada del archivo
        directory: Directory.Data, // mismo directorio donde se guardó
      });
      photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
    }

    // Actualiza el estado reactivo con las fotos ya "hidratadas" con su base64
    photos.value = photosInPreferences;
  };

  onMounted(loadSaved);

  watch(photos, cachePhotos);

  // Expone lo que el resto de la app (componentes) necesita usar
  return {
    addNewToGallery,
    photos,
  };
};

// Interfaz que describe la forma de cada foto en el array `photos`
export interface UserPhoto {
  filepath: string;       // nombre/ruta del archivo en el filesystem
  webviewPath?: string;   // URL usable en <img src="">: webPath o data URL base64
}