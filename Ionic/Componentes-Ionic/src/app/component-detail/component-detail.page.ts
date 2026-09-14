import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';

type ComponentExample = {
  slug: string;
  name: string;
  description: string;
  usage: string;
};

@Component({
  selector: 'app-component-detail',
  templateUrl: './component-detail.page.html',
  styleUrls: ['./component-detail.page.scss'],
  standalone: false
})
export class ComponentDetailPage implements OnInit {
  readonly examples: Record<string, ComponentExample> = {
    'action-sheet': { slug: 'action-sheet', name: 'Action Sheet', description: 'Presenta un grupo de acciones desde la parte inferior.', usage: 'Acciones contextuales.' },
    alert: { slug: 'alert', name: 'Alert', description: 'Muestra información importante o solicita confirmación.', usage: 'Decisiones que requieren atención.' },
    avatar: { slug: 'avatar', name: 'Avatar', description: 'Representa a una persona o entidad con una imagen.', usage: 'Perfiles y usuarios.' },
    badge: { slug: 'badge', name: 'Badge', description: 'Indica estados, cantidades o categorías.', usage: 'Indicadores compactos.' },
    button: { slug: 'button', name: 'Button', description: 'Permite ejecutar una acción dentro de la interfaz.', usage: 'Acciones principales.' },
    card: { slug: 'card', name: 'Card', description: 'Agrupa información relacionada en un contenedor.', usage: 'Resúmenes y contenido destacado.' },
    chip: { slug: 'chip', name: 'Chip', description: 'Muestra etiquetas compactas y acciones removibles.', usage: 'Filtros y metadatos.' },
    icon: { slug: 'icon', name: 'Icon', description: 'Renderiza iconos de la librería Ionicons.', usage: 'Acciones reconocibles.' },
    item: { slug: 'item', name: 'Item', description: 'Es la fila fundamental para listas y formularios.', usage: 'Labels, iconos y controles.' },
    list: { slug: 'list', name: 'List', description: 'Organiza filas de información de forma consistente.', usage: 'Colecciones navegables.' },
    checkbox: { slug: 'checkbox', name: 'Checkbox', description: 'Permite seleccionar varias opciones.', usage: 'Preferencias acumulables.' },
    datetime: { slug: 'datetime', name: 'Datetime', description: 'Selecciona una fecha y una hora.', usage: 'Citas y recordatorios.' },
    input: { slug: 'input', name: 'Input', description: 'Captura texto, números y otros valores.', usage: 'Entradas con etiqueta clara.' },
    radio: { slug: 'radio', name: 'Radio', description: 'Permite escoger una sola opción.', usage: 'Opciones visibles y excluyentes.' },
    range: { slug: 'range', name: 'Range', description: 'Selecciona un valor dentro de un intervalo.', usage: 'Volumen, precio o intensidad.' },
    searchbar: { slug: 'searchbar', name: 'Searchbar', description: 'Filtra contenido conforme el usuario escribe.', usage: 'Listas extensas.' },
    select: { slug: 'select', name: 'Select', description: 'Abre un menú para elegir una opción.', usage: 'Muchas opciones en poco espacio.' },
    segment: { slug: 'segment', name: 'Segment', description: 'Cambia entre vistas relacionadas.', usage: 'Pocas opciones de navegación.' },
    toggle: { slug: 'toggle', name: 'Toggle', description: 'Activa o desactiva una preferencia.', usage: 'Estados booleanos.' },
    fab: { slug: 'fab', name: 'Fab', description: 'Botón flotante para la acción principal.', usage: 'Acciones frecuentes.' },
    loading: { slug: 'loading', name: 'Loading', description: 'Cubre temporalmente la interfaz durante una tarea.', usage: 'Espera con contexto.' },
    modal: { slug: 'modal', name: 'Modal', description: 'Presenta contenido encima de la pantalla actual.', usage: 'Tareas breves y enfocadas.' },
    'progress-bar': { slug: 'progress-bar', name: 'Progress Bar', description: 'Comunica cuánto falta para terminar una tarea.', usage: 'Progreso real y medible.' },
    spinner: { slug: 'spinner', name: 'Spinner', description: 'Indica una carga cuyo tiempo no conocemos.', usage: 'Estados de espera.' },
    toast: { slug: 'toast', name: 'Toast', description: 'Muestra una confirmación breve sin interrumpir.', usage: 'Avisos no críticos.' }
  };

  slug = '';
  example!: ComponentExample;
  checked = true;
  toggleValue = false;
  rangeValue = 60;
  searchValue = '';
  selectedValue = 'Angular';
  selectedSegment = 'codigo';
  progress = 0.65;
  isModalOpen = false;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.slug = params.get('slug') ?? 'button';
      this.example = this.examples[this.slug] ?? this.examples['button'];
    });
  }

  async openAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: '¡Hola Ionic!',
      message: 'Este mensaje lo muestra ion-alert.',
      buttons: ['Entendido']
    });
    await alert.present();
  }

  async openActionSheet(): Promise<void> {
    const sheet = await this.actionSheetController.create({
      header: 'Compartir componente',
      buttons: [{ text: 'Copiar enlace' }, { text: 'Enviar' }, { text: 'Cancelar', role: 'cancel' }]
    });
    await sheet.present();
  }

  async showToast(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'Cambios guardados correctamente',
      duration: 1800,
      position: 'bottom'
    });
    await toast.present();
  }

  simulateLoading(): void {
    this.isLoading = true;
    window.setTimeout(() => this.isLoading = false, 1400);
  }
}
