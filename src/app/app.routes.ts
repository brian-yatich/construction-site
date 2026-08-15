import { Routes } from '@angular/router';
import { adminGuard } from './admin/core/admin.guard';
import {
  PROJECTS_CONFIG,
  SERVICES_CONFIG,
  TEAM_CONFIG,
  TESTIMONIALS_CONFIG,
  BLOG_CONFIG,
  CAREERS_CONFIG,
  STATS_CONFIG,
  CERTIFICATIONS_CONFIG,
  PARTNERS_CONFIG,
  VALUES_CONFIG,
  TIMELINE_CONFIG,
} from './admin/core/resource-configs';
import { ResourceConfig } from './admin/core/resource-config';

function resourceRoutes(config: ResourceConfig) {
  return [
    {
      path: config.routeSegment,
      loadComponent: () => import('./admin/shared/resource-list/resource-list').then((m) => m.ResourceList),
      data: { config },
    },
    {
      path: `${config.routeSegment}/new`,
      loadComponent: () => import('./admin/shared/resource-form/resource-form').then((m) => m.ResourceForm),
      data: { config },
    },
    {
      path: `${config.routeSegment}/:id/edit`,
      loadComponent: () => import('./admin/shared/resource-form/resource-form').then((m) => m.ResourceForm),
      data: { config },
    },
  ];
}

export const routes: Routes = [
  {
    path: 'admin/login',
    loadComponent: () => import('./admin/login/login').then((m) => m.Login),
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/layout/layout').then((m) => m.Layout),
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./admin/dashboard/dashboard').then((m) => m.Dashboard),
      },
      ...resourceRoutes(PROJECTS_CONFIG),
      ...resourceRoutes(SERVICES_CONFIG),
      ...resourceRoutes(TEAM_CONFIG),
      ...resourceRoutes(TESTIMONIALS_CONFIG),
      ...resourceRoutes(BLOG_CONFIG),
      ...resourceRoutes(CAREERS_CONFIG),
      ...resourceRoutes(STATS_CONFIG),
      ...resourceRoutes(CERTIFICATIONS_CONFIG),
      ...resourceRoutes(PARTNERS_CONFIG),
      ...resourceRoutes(VALUES_CONFIG),
      ...resourceRoutes(TIMELINE_CONFIG),
      {
        path: 'leads/contact',
        loadComponent: () => import('./admin/leads/leads-list').then((m) => m.LeadsList),
        data: { kind: 'contact' },
      },
      {
        path: 'leads/quotes',
        loadComponent: () => import('./admin/leads/leads-list').then((m) => m.LeadsList),
        data: { kind: 'quotes' },
      },
    ],
  },
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
    path: 'terms-of-use',
    loadComponent: () => import('./features/legal/legal-page').then((m) => m.LegalPage),
    data: { title: 'Terms of Use' },
  },
  {
    path: 'privacy-notice',
    loadComponent: () => import('./features/legal/legal-page').then((m) => m.LegalPage),
    data: { title: 'Privacy Notice' },
  },
  {
    path: 'disclaimer',
    loadComponent: () => import('./features/legal/legal-page').then((m) => m.LegalPage),
    data: { title: 'Disclaimer' },
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
