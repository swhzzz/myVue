import Vue from 'vue'

var app = new Vue({
    el: '#app',
    data: {
        newtodo: '',
        todoList: [],
    },
    methods: {
        addTodo: function() {
            let d = new Date()
            this.todoList.push({
                text: this.newtodo,
                done: false,
                createTime: '创建时间:' + d.getFullYear() + '.' + d.getMonth() + '.' +
                    d.getDate() + '  ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
            })
        },
        del: function(todo) {
            var index = this.todoList.indexOf(todo)
                // console.log(index)
            this.todoList.splice(index, 1)
        }
    },
    created: function() {
        window.onbeforeunload = () => {
            let dataString = JSON.stringify(this.todoList);
            window.localStorage.setItem("mytodos", dataString)
        }
        let oldDataString = window.localStorage.getItem("mytodos")
        let oldData = JSON.parse(oldDataString)
        this.todoList = oldData || []
    }
})