import { frontendURL } from '../../../helper/URLHelper';
import BookingsView from './BookingsView.vue';

export const routes = [
  {
    path: frontendURL('accounts/:accountId/bookings'),
    name: 'bookings',
    component: BookingsView,
    meta: {
      permissions: ['administrator', 'agent', 'custom_role', 'conversation_manage'],
    },
  },
];

