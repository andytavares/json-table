angular.module('jsonTable')
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
    })