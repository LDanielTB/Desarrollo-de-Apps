import { Component } from '@angular/core';

type Componente = [slug: string, nombre: string, descripcion: string];

interface GrupoComponentes {
  titulo: string;
  componentes: Componente[];
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  readonly grupos: GrupoComponentes[] = [
    {
      titulo: 'Base',
      componentes: [
        ['action-sheet', 'Action Sheet', 'Menú de acciones contextual'], ['alert', 'Alert', 'Mensajes y confirmaciones'],
        ['avatar', 'Avatar', 'Imagen o inicial de usuario'], ['badge', 'Badge', 'Indicadores compactos'],
        ['button', 'Button', 'Acciones principales'], ['card', 'Card', 'Contenido agrupado'],
        ['chip', 'Chip', 'Etiquetas y filtros'], ['icon', 'Icon', 'Iconos de Ionicons'],
        ['item', 'Item', 'Fila base de Ionic'], ['list', 'List', 'Listas de contenido']
      ]
    },
    {
      titulo: 'Formularios',
      componentes: [
        ['checkbox', 'Checkbox', 'Selección múltiple'], ['datetime', 'Datetime', 'Fecha y hora'],
        ['input', 'Input', 'Entrada de texto'], ['radio', 'Radio', 'Selección única'],
        ['range', 'Range', 'Valor dentro de un rango'], ['searchbar', 'Searchbar', 'Búsqueda instantánea'],
        ['select', 'Select', 'Menú de opciones'], ['segment', 'Segment', 'Cambio entre vistas'],
        ['toggle', 'Toggle', 'Interruptor booleano']
      ]
    },
    {
      titulo: 'Feedback y navegación',
      componentes: [
        ['fab', 'Fab', 'Botón de acción flotante'], ['loading', 'Loading', 'Estado de carga'],
        ['modal', 'Modal', 'Contenido superpuesto'], ['progress-bar', 'Progress Bar', 'Progreso de una tarea'],
        ['spinner', 'Spinner', 'Carga indeterminada'], ['toast', 'Toast', 'Aviso breve']
      ]
    }
  ];

}
