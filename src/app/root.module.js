import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import {components} from './components/components.module';
import {common} from './common/common.module';
import {rootComponent} from './root.component';
import './root.scss';


export const root = angular
  .module('root', [
    /* ng dependencies */

    /* 3rd party dependencies */
    uiRouter,

    /* app module dependencies */
    common,
    components,
  ])
  .component('root', rootComponent)
  .config(($locationProvider, $urlRouterProvider) => {
    'ngInject';

    $locationProvider.html5Mode(true);
  })
  .name;
