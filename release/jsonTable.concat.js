'use strict'
angular.module('jsonTable', []);angular.module('jsonTable')
    .directive('jsonTable', function() {
        var ctrl = ['$scope', function($scope) {
            var vm =  this;
        }];
        var template =  '<table class="table table-striped" headings="vm.headings" contents="vm.contents" json-table-contents></table>';
        return {
            restrict: 'E',
            scope: {
                headings: '=',
                contents: '='
            },
            controller: ctrl,
            controllerAs: 'vm',
            template: template,
            bindToController: true
        }
    });angular.module('jsonTable')
    .directive('jsonTableBody', function() {
        var ctrl = function() {
            var vm = this;
            vm.headings = vm.headings || [];
            
            vm.actions = vm.headings.filter(function(heading) {
                return !angular.isUndefined(heading.actions);
            })
        }
        var tmpl = '<tbody>' +
        '<tr ng-repeat="row in vm.contents">' +
          '<td ng-repeat="heading in vm.headings">' +
            '<span ng-if="!heading.actions && !heading.link">{{ row[heading.field] }}</span>' +
            '<span ng-if="!heading.actions && heading.link"><a ng-href="{{heading.route}}/{{row[heading.field]}}">{{ row[heading.field] }}</a></span>' +
            '<span ng-if="heading.actions">' +
                '<button class="btn btn-sm {{ action.class }}" ng-repeat="action in heading.actions" ng-click="action.action(row)">{{ action.label }}</button>' +
            '</span>' +
          '</td>' +
        '</tr>' +
      '</tbody><pre>{{vm.contents}}</pre>';
        return {
            restrict: 'EA',
            scope: {
                contents: '=',
                headings: '<'
            },
            controller: ctrl,
            template: tmpl,
            controllerAs: 'vm',
            bindToController: true,
            replace: true
        }
    });angular.module('jsonTable')
    .directive('jsonTableContents', function() {
        return {
            restrict: 'EA',
            scope: {
                headings: '=',
                contents: '='
            },
            controller: function() {
                var vm = this;
            },
            template: '<json-table-heading headings="vm.headings"></json-table-heading>' +
                      '<json-table-body contents="vm.contents" headings="vm.headings"></json-table-body>',
            controllerAs: 'vm',
            bindToController: true
        }
    });angular.module('jsonTable')
    .directive('jsonTableHeading', function() {
        return {
            restrict: 'EA',
            scope: {
                headings: '='
            },
            controller: function() {
                var vm = this;
            },
            template: '<thead>' +
                        '<tr>' +
                          '<th ng-repeat="heading in vm.headings">{{ heading.label || heading.field }}</th>' +
                        '</tr>' +
                      '</thead>',
            controllerAs: 'vm',
            bindToController: true,
            replace: true
        }
    })