module app {

  'use strict';

  /**
   * Configures the application (before running).
   */
  function mainConfig($provide: ng.auto.IProvideService,
                      $stateProvider: angular.ui.IStateProvider,
                      $urlRouterProvider: angular.ui.IUrlRouterProvider,
                      config: any) {

    // Extend the $exceptionHandler service to output logs.
    $provide.decorator('$exceptionHandler', function ($delegate: any, $injector: any) {
      return function (exception: any, cause: any) {
        $delegate(exception, cause);

        var logger = $injector.get('logger').getLogger('exceptionHandler');
        logger.error(exception + (cause ? ' (' + cause + ')' : ''));
      };
    });

    // Disable debug logs in production version
    $provide.decorator('$log', function ($delegate: any) {
      if (!config.debug) {
        $delegate.log = angular.noop;
        $delegate.debug = angular.noop;
      }
      return $delegate;
    });

    // Routes configuration
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('app', {
        templateUrl: 'modules/shell/shell.html',
        controller: 'shellController as vm'
      })
      .state('app.home', {
        url: '/',
        templateUrl: 'modules/screens/home/home.html',
        controller: 'homeController as vm'
      })
      .state('app.about', {
        url: '/about',
        templateUrl: 'modules/screens/about/about.html',
        controller: 'aboutController as vm'
      });
  }

  angular
    .module('app')
    .config(mainConfig);

}

