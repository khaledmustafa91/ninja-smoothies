import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import addSmoothie from "@/components/addSmoothie";
import editSmoothie from "@/components/editSmoothie";
import index from "@/components/index"

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      component:index,
      name: 'index'
    },
    {
      path: '/add-smoothie',
      component: addSmoothie,
      name: 'AddSmoothie',
    },
    {
      path: '/edit-smoothie/:slug',
      component: editSmoothie,
      name: 'editSmoothie'
    }
  ]
})
