import Vue from 'vue'
var app = new Vue({
    el: '#app',
    data: {
        newTodo: '',
        todos: [],
        type: 'signup'
    },
    created: function() {
        window.onbeforeunload = () => {
            var dataString = JSON.stringify(this.todos)
            window.localStorage.setItem("dataOfTodos", dataString)
        }
        var oldDataString = window.localStorage.getItem("dataOfTodos")
        var oldData = JSON.parse(oldDataString)
        console.log(oldData)
        this.todos = oldData
    },
    methods: {
        addTodo: function() {
            this.todos.push({
                content: this.newTodo,
                done: false
            })
        },
        delTodo: function(todo) {
            var index = this.todos.indexOf(todo)
            this.todos.splice(index, 1)
        }
    }
})