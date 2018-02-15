angular.module('jsonTable')
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
    })