import Vue from 'vue'
import Router from 'vue-router'
const Login = resolve => require(['@/views/login'], resolve)
const Home = resolve => require(['@/views/home'], resolve)
const Article = resolve => require(['@/views/contentPage/article'], resolve)
const ArticleEdit = resolve => require(['@/views/contentPage/articleEdit'], resolve)

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'login'
    }, {
      path: '/login',
      component: Login
    }, {
      path: '/home',
      redirect: '/home/datalist',
      component: Home,
      children: [{
        path: 'datalist',
        component: Article
      }, {
        path: 'datalist/edit/:id?',
        component: ArticleEdit
      }]
    }
  ]
})
