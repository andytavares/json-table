angular.module('app', ['jsonTable'])
    .controller('tableController', function() {
        var vm = this;
        vm.columns = [
            { field: "id", label:"ID", link: true, route: 'edit'},
            { field: "fname", label:"First Name" },
            { field: "lname", label:"Last Name" },
            { label: "Actions", actions: [
                {
                    type: 'button',
                    action: function(context) {
                        alert("Routing to EDIT: " + context.id);
                    },
                    label: 'Edit',
                    class: 'btn-success'
                },
                {
                    type: 'button',
                    action: function(context) {
                        alert("Deleting: " +  context.id);
                    },
                    label: 'Delete',
                    class: 'btn-danger'
                }
            ]}
        ]

        vm.results = [
            {id: 1, fname: "First", lname: "Person"},
            {id: 2, fname: "Second", lname: "Human"},
            {id: 3, fname: "Third", lname: "Homosapien"}
        ]
    })