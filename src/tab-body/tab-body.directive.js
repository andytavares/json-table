angular.module('jsonTable')
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
        var tmpl = '<tbody>' +
        '<tr ng-repeat="row in vm.contents | orderBy:vm.orderBy:vm.reverseOrder">' +
          '<td ng-repeat="heading in vm.headings">' +
            '<span ng-if="heading.type === \'text\'">{{ row[heading.field] }}{{heading.filterParam}}</span>' +
            '<span ng-if="heading.type === \'date\'">{{ vm.filterDate(row[heading.field], heading.filterParam) }}</span>' +
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
    })