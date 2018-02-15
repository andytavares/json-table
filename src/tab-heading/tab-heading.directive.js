angular.module('jsonTable')
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