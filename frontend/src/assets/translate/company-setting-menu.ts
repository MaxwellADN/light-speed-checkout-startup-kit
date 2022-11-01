import { NbMenuItem } from '@nebular/theme';

export const en: NbMenuItem[] = [
  //Company settings
  {
    title: 'Company settings',
    group: true
  },
  {
    title: 'Company profile',
    icon: 'clipboard-outline',
    link:'/admin/settings/company'
  },
  {
    title: 'Users & Roles',
    icon: 'people-outline',
     link: '/admin/settings/users',
  },
  {
	  title: 'Currencies',
	   link: '/admin/settings/currencies',
	  icon: 'file-remove-outline'
	},
  {
	  title: 'Invoice customization',
	  link: '/admin/settings/invoice/customization',
	  icon: 'file-outline'
	},
  {
    title: 'Subscriptions',
    group: true
  },
  {
    title:'Subscriptions',
     link: '/admin/settings/subscriptions',
    icon: 'shopping-bag-outline'
  },
  {
    title:'Pricings',
     link: '/admin/settings/pricings',
    icon: 'pricetags-outline'
  },
  {
    title: 'Products & sevices',
    group: true
  },
  {
	  title: 'Categories',
	   link: '/admin/settings/category-list',
	  icon: 'folder-outline'
	},
  {
    title: 'Accounting',
    group: true
  },
  {
	  title: 'Taxes',
	  link: '/admin/settings/taxes',
	  icon: 'file-remove-outline'
	},
  {
    title: 'Account',
    group: true
  },
  {
    title: 'User profile',
    icon: 'clipboard-outline',
    link:'/admin/settings/users/profile'
  },
  {
    title: 'License activation',
    icon: 'unlock-outline',
    link: '/admin/settings/license',
  },
  {
    title: 'Close account',
    icon: 'close-circle-outline',
    link:'/admin/settings/users/account/close'
  },
];

export const fr: NbMenuItem[] = [
  // Company settings
  {
    title: 'Paramètre entreprise',
    group: true
  },
  {
    title: 'Profil entreprise',
    icon: 'clipboard-outline',
    link:'/admin/settings/company'
  },
  {
    title: 'Utilisateurs & Rôles',
    icon: 'people-outline',
     link: '/admin/settings/users',
  },
  {
	  title: 'Devises',
	   link: '/admin/settings/currencies',
	  icon: 'file-remove-outline'
	},
  {
	  title: 'Personnalisation de facture',
	  link: '/admin/settings/invoice/customization',
	  icon: 'file-outline'
	},
  {
    title: 'Abonnements',
    group: true
  },
  {
    title:'Abonnements',
     link: '/admin/settings/subscriptions',
    icon: 'shopping-bag-outline'
  },
  {
    title:'Pricings',
     link: '/admin/settings/pricings',
    icon: 'pricetags-outline'
  },
  {
    title: 'Produits & sevices',
    group: true
  },
  {
	  title: 'Categories',
	   link: '/admin/settings/category-list',
	  icon: 'folder-outline'
	},
  {
    title: 'Compatabilités',
    group: true
  },
  {
	  title: 'Taxes',
	  link: '/admin/settings/taxes',
	  icon: 'file-remove-outline'
	},
  {
    title: 'Comptes',
    group: true
  },
  {
    title: 'Profil utilisateur',
    icon: 'clipboard-outline',
    link:'/admin/settings/users/profile'
  },
  {
    title: 'Fermer le compte',
    icon: 'close-circle-outline',
    link:'/admin/settings/users/account/close'
  },
];

export const COMPANY_SETTINGS_MENUS: any = {
  en,
  fr
}
