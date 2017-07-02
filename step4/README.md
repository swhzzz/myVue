
#### 碰到的问题


#### LeanCloud使用指南
1. 在LeanCloud上创建一个项目

2. 安装LeanCloud SDK
```
npm i leancloud-storage --save
```
3. 初始化

```
import AV from 'leancloud-storage';
var APP_ID = 'bKh6BzhqmNS5UIRdrg9BCKvo-gzGzoHsz';
var APP_KEY = 'xJiGNTlbP7rieCiDgLcX4wBI';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});
```
[CleanCloud初始化](https://leancloud.cn/docs/sdk_setup-js.html#初始化)

4. 验证LeanCloud SDK是否安装成功
```
...
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

var TestObject = AV.Object.extend('TestObject');
var testObject = new TestObject();
testObject.save({
  words: 'Hello World!'
}).then(function(object) {
  alert('LeanCloud Rocks!');
})

var app = new Vue({ ...
```
[LeanCloud SDK验证](https://leancloud.cn/docs/sdk_setup-js.html#验证)

5. 注册和登录
```
signUp: function() {
    let user = new AV.User();
    user.setUsername(this.formData.username);
    user.setPassword(this.formData.password);
    user.signUp().then((loginedUser) => {
        alert('注册成功')
    }, error => {
        alert('注册失败')
    })
},
logIn: function() {
    AV.User.logIn(this.formData.username, this.formData.password)
        .then((loginedUser) => {
            this.currentUser = this.getCurrentUser()
            console.log(this.currentUser)
        }, error => {
            alert('登录失败')
        });

},
getCurrentUser: function() {
    let { id, createdAt, attributes: { username } } = AV.User.current()
    return { id ,username, createdAt}
}
```


[online preview](https://swhzzz.github.io/myVue/step4/index.html)
