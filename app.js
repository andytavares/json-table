angular.module('app', ['jsonTable'])
    .controller('tableController', function() {
        var vm = this;
        vm.columns = [
            { field: "id", label:"ID", type: 'link',  sortable: true, route: 'edit/'},
            { field: "date", label:"Date", type: 'date' },
            { field: "fname", sortable: true, label:"First Name", type: 'text' },
            { field: "lname", label:"Last Name", type: 'text' },
            { field: "active", label:"Active", type: 'checkbox' },
            { label: "Actions", type: 'actions', actions: [
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
            {id: 1, date: '2018-02-01 11:00:00', fname: "First", lname: "Person", active: true},
            {id: 2, date: '2018-02-01 11:00:00', fname: "Second", lname: "Human", active: false},
            {id: 3, date: '2018-02-01 11:00:00', fname: "Third", lname: "Homosapien", active: false}
        ]
    })