import { Injectable } from '@angular/core';

export interface BadgeItem {
    type: string;
    value: string;
}
export interface Saperator {
    name: string;
    type?: string;
}
export interface SubChildren {
    state: string;
    name: string;
    type?: string;
}
export interface ChildrenItems {
    state: string;
    name: string;
    role?: string[]; /* new */
    type?: string;
    child?: SubChildren[];
}

export interface Menu {
    state: string;
    name: string;
    type: string;
    icon: string;
    role?: string[]; /* new */
    badge?: BadgeItem[];
    saperator?: Saperator[];
    children?: ChildrenItems[];
}

const MENUITEMS: any =
[
  {
    state: 'consultas',
    name: 'Consultas',
    type: 'link',
    icon: 'manage_search',
    role : ['consulta'],
    children: []
  },
  {
    state: 'registros',
    name: 'Registros',
    type: 'link',
    icon: 'edit_note',
    role : ['operador'],
    children: []
  },
  {
    state: 'verificacion',
    name: 'Verificación',
    type: 'link',
    icon: 'checklist_rtl',
    role : ['supervisor'],
    children: []
  },
  {
    state: 'administrador',
    name: 'Administrador',
    type: 'link',
    icon: 'settings',
    role : ['administrador'],
    children: []
  },

  {
    state: 'config',
    name: 'Configuración',
    type: 'link',
    icon: 'settings',
    role : ['administrador'],
    children: []
  },
  {
    state: 'productos',
    name: 'Productos',
    type: 'link',
    icon: 'settings',
    role : ['administrador'],
    children: []
  },
  {
    state: 'almacen',
    name: 'Almacen',
    type: 'link',
    icon: 'settings',
    role : ['administrador'],
    children: []
  },
  {
    state: 'reportes',
    name: 'Reportes',
    type: 'link',
    icon: 'settings',
    role : ['administrador'],
    children: []
  },

];

@Injectable()
export class MenuItems {
    getMenuitem(): Menu[] {
        return MENUITEMS;
    }
}
