import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'Modulos de Gestión'
  },
  {
    name: 'Gestión de Usuarios',
    iconComponent: { name: 'cil-people' },
    children: [
      {
        name: 'Usuario',
        url: '/usuario',
        iconComponent: { name: 'cil-user' }
      },
      {
        name: 'Rol',
        url: '/rol',
        iconComponent: { name: 'cil-star' }
      },
      {
        name: 'Permiso',
        url: '/permiso',
        iconComponent: { name: 'cil-lock-locked' }
      },
      {
        name: 'Bitacora',
        url: '/bitacora',
        iconComponent: { name: 'cil-notes' }
      },
      {
        name: 'Interfaz Rol',
        url: '/interfaz_rol',
        iconComponent: { name: 'cil-layers' }
      }
    ]
  },
  {
    name: 'Gestión de Médicos',
    iconComponent: { name: 'cil-people' },
    children: [
      {
        name: 'Médico',
        url: '/medico',
        iconComponent: { name: 'cil-user' }
      },
      {
        name: 'Especialidad',
        url: '/especialidad',
        iconComponent: { name: 'cil-list' }
      },
      {
        name: 'Horario de Atención',
        url: '/horario_atencion',
        iconComponent: { name: 'cil-calendar' }
      }
    ]
  },
  {
    name: 'Gestión de Pacientes',
    iconComponent: { name: 'cil-people' },
    children: [
      {
        name: 'Paciente',
        url: '/paciente',
        iconComponent: { name: 'cil-user' }
      },
      {
        name: 'Tipo de Cita',
        url: '/tipo_cita',
        iconComponent: { name: 'cil-list' }
      },
      {
        name: 'Cita Médica',
        url: '/cita_medica',
        iconComponent: { name: 'cil-home' }
      },
      {
        name: 'Diagnóstico',
        url: '/diagnostico',
        iconComponent: { name: 'cil-file' }
      },
      {
        name: 'Tratamiento',
        url: '/tratamiento',
        iconComponent: { name: 'cil-drop' }
      }
    ]
  }
];
