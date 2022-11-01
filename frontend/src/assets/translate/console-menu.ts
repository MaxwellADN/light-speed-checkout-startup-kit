import { NbMenuItem } from '@nebular/theme';

export const en: NbMenuItem[] = [
  {
    title: 'Users management',
    group: true
  },
  {
    title:'Users & Roles',
     link: '/admin/app/settings/users',
    icon: 'people-outline'
  },
  // {
  //   title: 'Connected bank accounts',
  //   group: true
  // },
  // {
  //   title:'Stripe accounts',
  //    link: '/admin/app/settings/stripe-accounts',
  //   icon: 'people-outline'
  // },
  {
    title: 'Pricing & Subscriptions',
    group: true
  },
  {
    title:'Pricings',
     link: '/admin/app/settings/pricings',
    icon: 'pricetags-outline'
  },
  {
    title:'Subscriptions',
     link: '/admin/app/settings/subscriptions',
    icon: 'credit-card-outline'
  },
  {
    title: 'Currencies',
    icon: 'credit-card-outline',
    link:'/admin/app/settings/currencies'
  },
  {
    title: 'Application settings',
    group: true
  },
  {
    title: 'Preferences',
    icon: 'layout-outline',
    link:'/admin/app/settings/general'
  },
  {
    title: 'Email settings',
    icon: 'email-outline',
    link:'/admin/app/settings/email'
  },
  {
    title: 'Social login',
    icon: 'email-outline',
    link:'/admin/app/settings/social-login'
  },
  {
    title: 'Banking & Payments settings',
    group: true
  },
  {
    title: 'Stripe & PayPal',
    icon: 'credit-card-outline',
    link:'/admin/app/settings/payment'
  },
  {
    title: 'Software license',
    group: true
  },
  {
    title: 'Activate',
    icon: 'settings-2-outline',
    link:'/admin/app/settings/license'
  },
];

export const fr: NbMenuItem[] = [
  {
    title: 'Gestion utilisateurs',
    group: true
  },
  {
    title:'Utilisateurs et rôles',
     link: '/admin/app/settings/users',
    icon: 'people-outline'
  },
  {
    title: 'Comptes bancaires connectés',
    group: true
  },
  {
    title:'Comptes Stripe',
     link: '/admin/app/settings/stripe-accounts',
    icon: 'people-outline'
  },
  {
    title: 'Pricing & Abonnements',
    group: true
  },
  {
    title:'Pricings',
     link: '/admin/app/settings/pricings',
    icon: 'pricetags-outline'
  },
  {
    title:'Abonnements',
     link: '/admin/app/settings/subscriptions',
    icon: 'credit-card-outline'
  },
  {
    title: 'Devises',
    icon: 'credit-card-outline',
    link:'/admin/app/settings/currencies'
  },
  {
    title: 'Paramètre de l\'application',
    group: true
  },
  {
    title: 'Préférences',
    icon: 'settings-2-outline',
    link:'/admin/app/settings/general'
  },
  {
    title: 'Paramètres email',
    icon: 'email-outline',
    link:'/admin/app/settings/email'
  },
  {
    title: 'Social login',
    icon: 'email-outline',
    link:'/admin/app/settings/social-login'
  },
  {
    title: 'Paramètre de paiements',
    group: true
  },
  {
    title: 'Stripe & PayPal',
    icon: 'credit-card-outline',
    link:'/admin/app/settings/payment'
  },
  {
    title: 'Licence',
    group: true
  },
  {
    title: 'Activer',
    icon: 'unlock-outline',
    link:'/admin/app/settings/license'
  },
]

export const SUPER_ADMIN_CONSOLE_MENUS: any = {
  en,
  fr
}
