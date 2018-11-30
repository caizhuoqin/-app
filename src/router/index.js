import Vue from 'vue'
import Router from 'vue-router'

import Movie from '../pages/movie/Root'
import Cinema from '../pages/cinema/Root'
import Mine from '../pages/mine/Root'
import Search from '../pages/common/Search'
import CityList from '../pages/common/CityList'
import ComingList from '../pages/common/ComingList'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/movie',
      component: Movie,
      children: [
        {
          path: 'search',
          component: Search,
          props: {
            type: ['cinema', 'movie']
          }
        },
        {
          path: 'city-list',
          component: CityList
        },
        {
        	path: 'cominglist',
          component: ComingList
        	
        }
      ]
    },
    {
      path: '/cinema',
      component: Cinema,
      children: [
        {
          path: 'search',
          component: Search,
          props: {
            type: ['cinema']
          }
        },
        {
        	path:'city-list',
        	component:CityList
        	
        }
      ]
    },
    {
      path: '/mine',
      component: Mine
    },
    {
      path: '**',
      redirect: '/movie'
    }
  ]
})
