angular.module('jsonTable')
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
    })