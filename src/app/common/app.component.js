import templateUrl from './app.html';

export const appComponent = {
  templateUrl,
  controller: class AppComponent {
    /**
     * 
     * @param {obj} $state
     */
    constructor($state) {
      'ngInject';

      this.$state = $state;
    }
  },
};
