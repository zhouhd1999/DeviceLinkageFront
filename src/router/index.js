import Vue from "vue";
import VueRouter from "vue-router";
import Body from "../views/Body.vue";
import Index from "../views/Index.vue";
import Device from "../views/Device.vue";
import Linkage from "../views/Linkage.vue";
import Execution from "../views/Execution.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Body",
    component: Body,
    children:[ {
      path: '/',
      name: 'Index',
      component: Index
    }]
  },
  {
    path:'/Body',
    name:'Body',
    component:Body,
    children:[
      {
        path: '/',
        name: 'Index',
        component: Index
      },
      {
        path: 'Device',
        name: 'Device',
        component: Device
      },
      {
        path: 'Linkage',
        name: 'Linkage',
        component: Linkage
      },
      {
        path: 'Execution',
        name: 'Execution',
        component: Execution
      }]
  }
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = new VueRouter({
  routes
});

export default router;
