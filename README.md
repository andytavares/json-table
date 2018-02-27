# Angular JSON Tables
A simple Angular 1.x directive to quickly and easily visualize large amounts of data in HTML tables.

## Dependencies
Angular 1.x (Obviously)
Bootstrap 3.3.7 (optional) It will work with out it, but it'll look terrible.

## Installation
1. Include jsonTable.min.js from the releases dir on your site.
2. Add jsonTable as a dependency in your angular app: `angular.module('myApp', ['jsonTable'])`

## Usage
JSON Table can be added to any page using the `<json-table headings="(table heading config)" contents="(table contents)"></json-table>` element.

The directive uses the heading configuration to manage how the data should be represented. The heading configuration array is as follows:
```json
[
    {
        field: string - optional,
        label: string - optional,
        type: string - required,
        sortable: boolean - optional
        route: string - required when 'type = link',
        actions: array - required when 'type = actions'
    }, ...
]
```

`field:` - optional

----
This represents the key which should be bound to this column when rendering the table. For example if your datasource returns this as a response:
``` 
    {
        foo: "bar"
        baz: "bang"
    }
```
`field: "foo"` would represent the key foo in the response opbject.

----

`label:` - optional

----

Represents a user friendly name which should be used as the column heading. If this is not defined, the `field:` value will be used as a fallback, if neither is defined an empty `<th>` tag will be generated.

----

`type:` string - required,
`sortable:` boolean - optional
`route:` string - required when 'type = link',
`actions:` array - required when 'type = actions'
