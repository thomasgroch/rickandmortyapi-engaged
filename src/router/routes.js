import { useRouter } from 'vue-router'

export default [
  {
    path: '/:query/:page(\\d+)?',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    props: true,
    children: [
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /:page/personagem/:id is matched
        path: 'personagem/:query/:id',
        name: 'CharacterDetails',
        component: () => import('@/views/CharacterDetails.vue'),
        props: true,
      },
    ]
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFound.vue') },
]
