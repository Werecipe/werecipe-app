
const routes = [
  {
    path: '/',
    component: () => import('layouts/Main.vue'),
    children: [
      {
        path: '', component: () => import('pages/Index.vue'),
      },
      {
        path: '/login', component: () => import('pages/TheLogInPage.vue'),
 
      },
      {
        path: '/sign-up', component: () => import('pages/TheSignUpPage')
      },      
      {
        path: '/requestLogin', component: () => import('pages/TheRequestLoginPage')
      }       
    ]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/Dashboard.vue'),
     meta: {
          requiresAuth: true,
        },
    children: [
      {
        path: '/recipeSearch', component: () => import('pages/Recipe-search.vue'),
         meta: {
          requiresAuth: true,
      
        }
      },
      {
        path: '/myRecipes', component: () => import('pages/MyRecipesPage.vue'),
        meta: {
          requiresAuth: true,
         
        }
      },
      
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
