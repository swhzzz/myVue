import Vue from 'vue'
import AV from 'leancloud-storage'
import './css/index.css'

var APP_ID = 'bKh6BzhqmNS5UIRdrg9BCKvo-gzGzoHsz';
var APP_KEY = 'xJiGNTlbP7rieCiDgLcX4wBI';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var app = new Vue({
    el: '#app',
    data: {
        actionType: 'signup',
        formData: {
            username: '',
            password: ''
        },
        currentUser: null,
        newtodo: '',
        todoList: [],
        classObject: {
            toLeft: false,
            toRight: false
        }
    },
    methods: {
        addTodo: function() {
            let d = new Date()
            let month = d.getMonth()
            let date = d.getDate()
            let hours = d.getHours()
            let minutes = d.getMinutes()
            month = month > 9 ? month : '0' + month
            date = date > 9 ? date : '0' + date
            hours = hours > 9 ? hours : '0' + hours
            minutes = minutes > 9 ? minutes : '0' + minutes
            this.todoList.push({
                text: this.newtodo,
                createTime: `
                创建时间 ${month}月${date}日 ${hours}:${minutes}
                `,
                isDone: false
            })
            this.newtodo = ''
        },
        del: function(todo) {
            var index = this.todoList.indexOf(todo)
            this.todoList.splice(index, 1)
        },
        signUp: function() {
            if (this.formData.username === '' && this.formData.password === '') {
                alert('请输入用户名和密码');
                return;
            } else
            if (this.formData.username === '') {
                alert('请输入用户名');
                return false;
            } else if (this.formData.password === '') {
                alert('请输入密码');
                return false;
            }
            let user = new AV.User();
            user.setUsername(this.formData.username);
            user.setPassword(this.formData.password);
            user.signUp().then((loginedUser) => {
                alert('注册成功')
            }, error => {
                alert('该用户名已存在')
            })
        },
        logIn: function() {
            AV.User.logIn(this.formData.username, this.formData.password)
                .then((loginedUser) => {
                    this.currentUser = this.getCurrentUser()
                }, error => {
                    alert('账户或者密码不正确')
                });
            let formRow = document.getElementsByClassName('formRow')
            for (let i = 0; i < formRow.length; i++) {
                formRow[i].value = ''
            }
        },
        getCurrentUser: function() {
            let { id, createdAt, attributes: { username } } = AV.User.current()
            return { id, username, createdAt }
        },
        toLeft: function() { //横线往左
            let line = document.getElementsByClassName('line')[0]
            this.classObject.toRight = false
            this.classObject.toLeft = true
                // line.classList.remove('toRight')
                // line.classList.add('toLeft')
        },
        toRight: function() { //横线往右
            let line = document.getElementsByClassName('line')[0]
            this.classObject.toLeft = false
            this.classObject.toRight = true
                // line.classList.remove('toLeft')
                // line.classList.add('toRight')
        },
        logout: function() {
            var currentUser = null
            window.location.reload()
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