import { useRouter } from 'vue-router'

export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/personagem/:id',
    name: 'CharacterDetails',
    component: () => import('@/views/CharacterDetails.vue'),
    props: true,
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFound.vue') },
]
