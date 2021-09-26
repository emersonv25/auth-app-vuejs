export default [
      {
        path: '/login',
        name: 'Login',
        component: () => import('../views/auth/Login'),
        meta: {
          guest: true
        }
      },
      {
        path: '/register',
        name: 'Registro',
        component: () => import('../views/auth/Register'),
        meta: {
          guest: true
        }
      },
      {
        path: '/admin',
        name: 'Admin',
        component: () => import('../views/admin/Admin'),
        meta: {
          isAdmin: true
        }
      },
      {
        path: '*',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: {
          requiresAuth: true
        }
      },
]