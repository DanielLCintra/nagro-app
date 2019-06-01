import GrowersContainer from './GrowersContainer.vue'
import GrowersList from './GrowersList.vue'
import GrowersRegister from './GrowersRegister.vue'

const routes = {
  path: '/growers',
  component: GrowersContainer,
  children: [
    {
      path: '',
      name: 'growers.list',
      component: GrowersList
    },
    {
      path: 'create',
      name: 'growers.create',
      component: GrowersRegister
    },
    {
      path: ':id/update',
      name: 'growers.update',
      component: GrowersRegister,
      props: route => ({
        growerId: route.params.id
      })
    }
  ]
}

export default routes
