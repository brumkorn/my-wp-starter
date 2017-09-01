import angular from 'angular';
import {app} from './app.module';

export const common = angular
  .module('common', [
    app,
  ])
  .run(($transitions, cfpLoadingBar) => {
    'ngInject';

    $transitions.onStart({}, cfpLoadingBar.start);
    $transitions.onSuccess({}, cfpLoadingBar.complete);
  })
  .name;
