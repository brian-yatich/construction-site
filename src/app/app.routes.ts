import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then((m) => m.Home),
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about').then((m) => m.About),
  },
  {
    path: 'services',
    loadComponent: () => import('./features/services/services-list/services-list').then((m) => m.ServicesList),
  },
  {
    path: 'services/:slug',
    loadComponent: () => import('./features/services/service-detail/service-detail').then((m) => m.ServiceDetail),
  },
  {
    path: 'projects',
    loadComponent: () => import('./features/projects/projects-list/projects-list').then((m) => m.ProjectsList),
  },
  {
    path: 'projects/:slug',
    loadComponent: () => import('./features/projects/project-detail/project-detail').then((m) => m.ProjectDetail),
  },
  {
    path: 'careers',
    loadComponent: () => import('./features/careers/careers-list/careers-list').then((m) => m.CareersList),
  },
  {
    path: 'careers/:id',
    loadComponent: () => import('./features/careers/career-detail/career-detail').then((m) => m.CareerDetail),
  },
  {
    path: 'news',
    loadComponent: () => import('./features/blog/blog-list/blog-list').then((m) => m.BlogList),
  },
  {
    path: 'news/:slug',
    loadComponent: () => import('./features/blog/blog-detail/blog-detail').then((m) => m.BlogDetail),
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact').then((m) => m.Contact),
  },
  {
    path: 'request-quote',
    loadComponent: () => import('./features/quotation/quotation').then((m) => m.Quotation),
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./features/legal/legal-page').then((m) => m.LegalPage),
    data: { title: 'Privacy Policy' },
  },
  {
    path: 'terms-conditions',
    loadComponent: () => import('./features/legal/legal-page').then((m) => m.LegalPage),
    data: { title: 'Terms & Conditions' },
  },
  {
    path: '404',
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound),
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound),
  },
];
