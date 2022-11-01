import { NbMenuItem } from '@nebular/theme';
import * as adminComponentConfig  from '../../app/modules/admin/admin-components.config'


export const en: NbMenuItem[] = [
  {
	  title: 'Applications',
	  link: '/admin/applications',
	  icon: 'grid-outline',
    home: true
	},
  {
	  title: 'Component builder',
	  link: '/admin/models/build',
	  icon: 'edit-2-outline'
	},
  {
	  title: 'Components',
	  link: '/admin/models',
	  icon: 'cube-outline'
	},
  ...adminComponentConfig.enMenuItems,
  {
	  title: 'Settings',
	  link: '/admin/settings/users',
	  icon: 'settings-outline'
	},
];

export const fr: NbMenuItem[] = [
  {
	  title: 'Applications',
	  link: '/admin/applications',
	  icon: 'checkmark-square-outline'
	},
  {
	  title: 'Component builder',
	  link: '/admin/models/build',
	  icon: 'edit-2-outline'
	},
  {
	  title: 'Components',
	  link: '/admin/models',
	  icon: 'cube-outline'
	},
  ...adminComponentConfig.frMenuItems,
  {
	  title: 'Paramètres',
	  link: '/admin/settings/users',
	  icon: 'settings-outline'
	},

];

export const SIDEBAR_MENUS: any = {
  en,
  fr
}
