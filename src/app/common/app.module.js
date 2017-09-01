import uiRouter from '@uirouter/angularjs';
import {appComponent} from './app.component';
import './app.scss';

export const app = angular
  .module('common.app', [
    uiRouter,
  ])
  .component('app', appComponent)
  .config(($stateProvider, $urlRouterProvider) => {
    'ngInject';

    $stateProvider
      .state('app', {
        url: '/app',
        component: 'app',
      });

    $urlRouterProvider.otherwise('/app');
  })
  .name;
