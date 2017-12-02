
# 项目介绍

一个搜罗了部分动漫信息的网站

### 首页

首页轮播图和部分动漫

logo旁边为网易云音乐的外链播放器

点击动漫图片或标题进入动漫详情页

点击 **找找看** 可跳转到百度搜索页面

点击 **加入补番计划** 可将该动漫添加至补番列表，前提是已登录，未登录则会跳转到登录页

可通过点击 **查看更多** 进入动漫列表页

点击右下角的补番表进入已添加的补番列表，前提是已登录，未登录则会跳转到登录页

![首页](http://upload-images.jianshu.io/upload_images/3629578-a311cc6e7c60350b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 登录页

登陆成功后首页登陆和注册按钮消失，取而代之的是用户名和注销按钮，用户可以使用补番表功能（记录你要补得番），登录信息将会保留七天

![登录页](http://upload-images.jianshu.io/upload_images/3629578-39bf4f5a9276df25.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 注册页

注册信息填写有误点击注册将不能注册，并且会将光标聚焦到信息有误的那一项

![注册页](http://upload-images.jianshu.io/upload_images/3629578-58dac2523a781866.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 列表页

可以根据分类筛选不同类型的动漫，每页最多显示四个，可以通过分页按钮切换页数

选择排序方式

搜索框输入关键词后按下回车会筛选出包含关键词的动漫

![列表页](http://upload-images.jianshu.io/upload_images/3629578-69571da7ab783b80.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 补番表页

罗列出用户添加的动漫，包含动漫缩略图，动漫名，热度，小计，数量修改（实际没什么卵用），找找看按钮，点击右上角x的按钮可以将其删除；补番表为空的时候会提示你该去列表页找点东西看了

![补番表页](http://upload-images.jianshu.io/upload_images/3629578-c3ea68438442f2f3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 404页

当用户在地址栏输入了某些未知的东西，或者请求的资源服务器上已经没了将跳转到这个炫酷的404页面（网上找的）

![404](http://upload-images.jianshu.io/upload_images/3629578-485a255b78def1c6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


# 开发介绍

前端使用bootstrap布局

后端服务器使用Node.js，用了express框架

数据库为MongoDB

### express

##### 介绍

> express是基于 Node.js 平台，快速、开放、极简的 web 开发框架。

##### 安装

> cnpm install express --save

##### 目录结构

bin：存放启动项目的脚本文件，默认www

node_modules： 存放所有的项目依赖库

public：静态资源文件夹，默认images、javascripts、stylesheets

routes：路由文件相当于MVC中的Controller，默认index.js、users.js

views：页面文件，相当于MVC中的view，Ejs模板或者jade模板，默认error.jade、index.jade、layout.jade

package.json：项目依赖配置及开发者信息

app.js：应用核心配置文件，项目入口，程序从这里开始

##### 路由工作方式

前端页面发送的请求（a标签的 href="/login"， 或者 ajax请求 url: "/user/login"，），都会去`router`目录下找对应的路由文件，其中写在`index.js` 里请求可以省略index，即：请求index.js中的login时，直接写 `/login` 就行，而如果是在 `user` 或者其他路由文件下的就必须把全称写上 `/user/register`

通过 `router.get(url, (req, res, next)=>{ res.render( ejs, {} ) })` 或 `router.post` 处理客户端请求，render方法会给客户端返回一个ejs模板编译过后的html，ejs文件的后缀名可以省略，第二个参数为渲染模板时需要用到的数据

##### 运行

在CMD进入项目目录，执行`node app.js`，在浏览器地址栏输入 `localhost:3000`，后面的端口号可以在bin目录下的www文件中配置


### MongoDB

##### MongoDB介绍

> MongoDB 是一个基于分布式文件存储的非关系型数据库，通过安装目录下的`mongod.exe`启动服务

##### MongoDB常用操作

1. 与服务器建立连接

	```
	//连接数据库，传入回调函数来接收库对象
	const connect_mongo = (callback) => {
	    var MongoClient = require('mongodb').MongoClient;

	    // Connection URL
	    var url = 'mongodb://localhost:27017/village';
	    // Use connect method to connect to the Server
	    MongoClient.connect(url, function (err, db) {//db就是 village库对象
	        callback(db)

	        // db.close();//断开连接
	    });
	}
	module.exports = connect_mongo
	```

2. 查看所有数据库

	`show dbs`

3. 使用/创建数据库

	`use 数据库名`

4. 删除当前数据库

	`db.dropDatabase`

5. 创建集合（显式）

	`db.createCollection("集合名")`

6. 创建集合（隐式）

	`db.集合名.insert({})`

7. 查询

	`db.集合名.find()` // 查询全部
	`db.集合名.find({id: '8', name: 'leon'})` // 查询id为8，name为leon的数据

8. 插入

	`db.集合名.insert({id: '5', name: 'tom'})`

9. 更新

	`db.集合名.update({id: '1'}, {$set: {name: 'tim'}})` // 将id为1的数据的name替换为tim

10. 删除

	`db.集合名.remove({id: '2'})` // 删除id为2的数据

##### 数据库结构

1. banner集合

	存放首页轮播图信息

	{"_id": "自动生成的id", "bannerurl": "轮播图路径", "bannertitle": "轮播图标题信息"}

2. class集合
	
	存放动画分类信息

	{"_id": "自动生成的id", "class": "分类", "classid": "分类id"}

3. comics集合
	
	存放动画信息

	{"_id": "自动生成的id", "name": "动画名", "keyword": "关键字", "imgurl": "图片地址", "classid": "分类", "hot": "热度"}

4. users集合

	存放用户信息

	{"_id": "自动生成的id", "username": "用户名", "password": "密码", "nickname": "昵称"}

5. cart集合
	
	存放用户购物车信息

	{"_id": "自动生成的id", "uid": "当前用户id", "comics": [{"comid": "动画id", "num", "数量"}, {}, {""}]}