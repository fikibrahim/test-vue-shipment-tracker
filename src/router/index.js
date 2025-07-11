import { createRouter, createWebHistory } from 'vue-router'
import ShipmentList from '../views/ShipmentList.vue'
import ShipmentDetail from '../views/ShipmentDetail.vue'

const routes = [
  { path: '/', component: ShipmentList },
  { path: '/shipment/:id', component: ShipmentDetail }
]

export default createRouter({
  history: createWebHistory(),
  routes
})