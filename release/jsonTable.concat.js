'use strict'
angular.module('jsonTable', []);angular.module('jsonTable')
    .directive('jsonTable', function() {
        var ctrl = ['$scope', function($scope) {
            var vm =  this;
        }];
        var template =  '<table class="table table-hover" headings="vm.headings" contents="vm.contents" json-table-contents></table>';
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
        var ctrl = function($filter) {
            var vm = this;
            vm.headings = vm.headings || [];
            
            vm.actions = vm.headings.filter(function(heading) {
                return !angular.isUndefined(heading.actions);
            })
            vm.filterDate = function(data, filterParam) {
                return $filter('date')(new Date(data), filterParam || 'MM/dd/yyyy');
            };
        }
        ctrl.$inject = ["$filter"];
        var tmpl = '<tbody>' +
        '<tr ng-repeat="row in vm.contents | orderBy:vm.orderBy:vm.reverseOrder">' +
          '<td ng-repeat="heading in vm.headings">' +
            '<span ng-if="heading.type === \'text\'">{{ row[heading.field] }}{{heading.filterParam}}</span>' +
            '<span ng-if="heading.type === \'date\'">{{ vm.filterDate(row[heading.field]) }}</span>' +
            '<span ng-if="heading.type === \'link\'"><a ng-href="{{heading.route}}{{row[heading.field]}}">{{ row[heading.field] }}</a></span>' +
            '<span ng-if="heading.type === \'checkbox\'"><input type="checkbox" ng-model="row[heading.field]"></input></span>' +
            '<span ng-if="heading.type === \'actions\'">' +
                '<button class="btn btn-sm {{ action.class }}" ng-repeat="action in heading.actions" ng-click="action.action(row)">{{ action.label }}</button>' +
            '</span>' +
          '</td>' +
        '</tr>' +
      '</tbody>';
        return {
            restrict: 'EA',
            scope: {
                contents: '=',
                headings: '<',
                orderBy: '<',
                reverseOrder: '<'
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
            template: '<json-table-heading headings="vm.headings" order-by="vm.orderBy" reverse-order="vm.reverseOrder"></json-table-heading>' +
                      '<json-table-body contents="vm.contents" headings="vm.headings" order-by="vm.orderBy" reverse-order="vm.reverseOrder"></json-table-body>',
            controllerAs: 'vm',
            bindToController: true
        }
    });angular.module('jsonTable')
    .directive('jsonTableHeading', function() {
        return {
            restrict: 'EA',
            scope: {
                headings: '=',
                orderBy: '=',
                reverseOrder: '=',
            },
            controller: function() {
                var vm = this;
                vm.sortTable = function(target) {
                    vm.orderBy = target.field;
                    vm.reverseOrder = !vm.reverseOrder || false
                }
            },
            template: '<thead>' +
                        '<tr>' +
                          '<th ng-repeat="heading in vm.headings">' +
                            '<span ng-if="!heading.sortable">{{ heading.label || heading.field }}</span>' +
                            '<span ng-if="heading.sortable" ng-click="vm.sortTable(heading)">' +
                                '{{ heading.label || heading.field }}' +
                                '<i ng-show="vm.orderBy === heading.field && !vm.reverseOrder" class="glyphicon glyphicon-arrow-up"></i>' +
                                '<i ng-show="vm.orderBy === heading.field && vm.reverseOrder" class="glyphicon glyphicon-arrow-down"></i>' +
                                '<i ng-show="vm.orderBy !== heading.field" class="glyphicon glyphicon-resize-vertical"></i>' +
                            '</span>' +
                            '</th>' +
                        '</tr>' +
                      '</thead>',
            controllerAs: 'vm',
            bindToController: true,
            replace: true
        }
    })