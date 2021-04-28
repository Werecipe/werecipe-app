
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
      }       
    ]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/Dashboard.vue'),
    children: [
      {
        path: '/recipeSearch', component: () => import('pages/Recipe-search.vue'),
      },
      {
        path: '/myRecipes', component: () => import('pages/MyRecipesPage.vue'),
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
