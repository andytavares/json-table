angular.module('jsonTable')
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