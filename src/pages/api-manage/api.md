---
title: 接口管理
---

<div class="mt-1/12 text-center">
  <!-- You can use Vue components inside markdown -->
  <div i-carbon-dicom-overlay class="text-4xl -mb-6 m-auto" />
  <h2 font-bold>关于本项目API接口</h2>
</div>

# 接口
## 1	环境变量

### 默认环境1
| 参数名 | 字段值 |
| ------ | ------ |
|baseUrl|http://localhost:8004|


## 2	接口

##### 说明
> 



##### 联系方式
- **联系人：yungam**
- **邮箱：**
- **网址：**//

##### 文档版本
```
1.0
```


## 3	Menu Controller

## 3.1	getMenuByRoleId

> GET  /menuApi/menus
### 请求参数(Query Param)
| 参数名称 | 默认值 | 描述 |
| ------ | ------ | ------ |
|roleId||角色 id|
### 响应体
● 200 响应数据格式：JSON
| 参数名称 | 类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| code|int32||false||
| data|object||false||
| message|string||false||

##### 接口描述
> 




## 3.2	getMenuTreeData

> GET  /menuApi/tree
### 响应体
● 200 响应数据格式：JSON
| 参数名称 | 类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| code|int32||false||
| data|object||false||
| message|string||false||

##### 接口描述
> 




## 4	数据

## 4.1	告警数据

> GET  /data/alarmData
### 请求参数(Query Param)
| 参数名称 | 默认值 | 描述 |
| ------ | ------ | ------ |
|current||当前页数|
|equipmentId||设备id|
|itemId||采集项id(有此项时类型必填)|
|itemType||类型|
|pageSize||每页数量|
|start||开始时间 yyyy-MM-dd HH:mm:ss|
|stop||结束时间 yyyy-MM-dd HH:mm:ss|
### 响应体
● 200 响应数据格式：JSON
| 参数名称 | 类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| code|int32||false||
| data|object||false||
|⇥ current|int32||false||
|⇥ pages|int32||false||
|⇥ records|array[object]||false||
|⇥⇥ devName|string||false|采集项dt配置(设备名/设备位置)|
|⇥⇥ equipmentId|int32||false|设备id|
|⇥⇥ id|int32||false||
|⇥⇥ index|int32||false|采集项dt配置(index)|
|⇥⇥ itemId|int32||false|数据参数id|
|⇥⇥ itemType|string||false|数据类型|
|⇥⇥ maxValue|number||false|阈值最大值|
|⇥⇥ minValue|number||false|阈值最小值|
|⇥⇥ paramName|string||false|采集项dt配置(参数名)|
|⇥⇥ paramUnit|string||false|采集项dt配置(单位)|
|⇥⇥ time|string||false|告警时间|
|⇥⇥ value|number||false|数据值|
|⇥ size|int32||false||
|⇥ total|int32||false||
| message|string||false||

##### 接口描述
> 




## 4.2	告警数据统计

> GET  /data/alarmDataCnt
### 响应体
● 200 响应数据格式：JSON
| 参数名称 | 类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| code|int32||false||
| data|object||false||
| message|string||false||

##### 接口描述
> 




## 4.3	数据

> GET  /data/data
### 请求参数(Query Param)
| 参数名称 | 默认值 | 描述 |
| ------ | ------ | ------ |
|equipmentId||设备id|
|itemId||采集项id|
|itemType||类型|
|start||开始时间 yyyy-MM-dd HH:mm:ss|
|stop||结束时间 yyyy-MM-dd HH:mm:ss|
### 响应体
● 200 响应数据格式：JSON
| 参数名称 | 类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| code|int32||false||
| data|object||false||
| message|string||false||

##### 接口描述
> 




## 4.4	最新值

> GET  /data/lastData
### 响应体
● 200 响应数据格式：JSON
| 参数名称 | 类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| code|int32||false||
| data|array[object]||false||
|⇥ devName|string||false||
|⇥ paramName|string||false||
|⇥ paramUnit|string||false||
|⇥ timestamp|int32||false||
|⇥ value|number||false||
| message|string||false||

##### 接口描述
> 




## 5	设备

## 5.1	删除

> POST  /equipment/delete
### 请求参数(Query Param)
| 参数名称 | 默认值 | 描述 |
| ------ | ------ | ------ |
|equipmentId||equipmentId|
### 响应体
● 200 响应数据格式：JSON
| 参数名称 | 类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| code|int32||false||
| data|object||false||
| message|string||false||

##### 接口描述
> 




## 5.2	新增

> POST  /equipment/insert
### 请求体(Request Body)
| 参数名称 | 数据类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| collectInterval|int32||false|采集间隔(毫秒)|
| id|int32||false||
| information|string||false|出厂信息|
| ip|string||false|设备ip|
| name|string||false|设备名|
| port|int32||false|设备端口号|
| productionDate|string||false|出厂时间|
| type|string||false|设备类型|
### 响应体
● 200 响应数据格式：JSON
| 参数名称 | 类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| code|int32||false||
| data|object||false||
| message|string||false||

##### 接口描述
> 




## 5.3	查询

> GET  /equipment/select
### 请求参数(Query Param)
| 参数名称 | 默认值 | 描述 |
| ------ | ------ | ------ |
|current||当前页数|
|size||每页数量|
### 响应体
● 200 响应数据格式：JSON
| 参数名称 | 类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| code|int32||false||
| data|object||false||
|⇥ current|int32||false||
|⇥ pages|int32||false||
|⇥ records|array[object]||false||
|⇥⇥ collectInterval|int32||false|采集间隔(毫秒)|
|⇥⇥ id|int32||false||
|⇥⇥ information|string||false|出厂信息|
|⇥⇥ ip|string||false|设备ip|
|⇥⇥ name|string||false|设备名|
|⇥⇥ port|int32||false|设备端口号|
|⇥⇥ productionDate|string||false|出厂时间|
|⇥⇥ type|string||false|设备类型|
|⇥ size|int32||false||
|⇥ total|int32||false||
| message|string||false||

##### 接口描述
> 




## 5.4	根据IP查询

> GET  /equipment/selectByIp
### 请求参数(Query Param)
| 参数名称 | 默认值 | 描述 |
| ------ | ------ | ------ |
|ip||设备IP|
### 响应体
● 200 响应数据格式：JSON
| 参数名称 | 类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| code|int32||false||
| data|object||false||
|⇥ collectInterval|int32||false|采集间隔(毫秒)|
|⇥ id|int32||false||
|⇥ information|string||false|出厂信息|
|⇥ ip|string||false|设备ip|
|⇥ name|string||false|设备名|
|⇥ port|int32||false|设备端口号|
|⇥ productionDate|string||false|出厂时间|
|⇥ type|string||false|设备类型|
| message|string||false||

##### 接口描述
> 




## 5.5	开始采集

> POST  /equipment/start
### 请求参数(Query Param)
| 参数名称 | 默认值 | 描述 |
| ------ | ------ | ------ |
|equipmentId||equipmentId|
### 响应体
● 200 响应数据格式：JSON
| 参数名称 | 类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| code|int32||false||
| data|object||false||
| message|string||false||

##### 接口描述
> 




## 5.6	停止采集

> POST  /equipment/stop
### 请求参数(Query Param)
| 参数名称 | 默认值 | 描述 |
| ------ | ------ | ------ |
|equipmentId||equipmentId|
### 响应体
● 200 响应数据格式：JSON
| 参数名称 | 类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| code|int32||false||
| data|object||false||
| message|string||false||

##### 接口描述
> 




## 5.7	修改

> POST  /equipment/update
### 请求体(Request Body)
| 参数名称 | 数据类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| collectInterval|int32||false|采集间隔(毫秒)|
| id|int32||false||
| information|string||false|出厂信息|
| ip|string||false|设备ip|
| name|string||false|设备名|
| port|int32||false|设备端口号|
| productionDate|string||false|出厂时间|
| type|string||false|设备类型|
### 响应体
● 200 响应数据格式：JSON
| 参数名称 | 类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| code|int32||false||
| data|object||false||
| message|string||false||

##### 接口描述
> 




## 6	用户管理页面接口

## 6.1	更新用户头像

> POST  /userApi/avatar
### 请求体(Request Body)
| 参数名称 | 数据类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| avatar|string||false||
| createTime|string||false||
| id|int32||false||
| name|string||false||
| password|string||false||
| role|object||false||
|⇥ createTime|string||false||
|⇥ description|string||false||
|⇥ id|int32||false||
|⇥ menuIdList|array[int32]||false||
|⇥ name|string||false||
|⇥ updateTime|string||false||
| roleId|int32||false||
| updateTime|string||false||
| username|string||false||
### 响应体
● 200 响应数据格式：JSON
| 参数名称 | 类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| code|int32||false||
| data|object||false||
| message|string||false||

##### 接口描述
> 




## 6.2	获取用户列表

> GET  /userApi/user
### 请求参数(Query Param)
| 参数名称 | 默认值 | 描述 |
| ------ | ------ | ------ |
|createTime|||
|current||页码|
|name|||
|pageSize||一页数量|
|roleId|||
|updateTime|||
|username|||
### 响应体
● 200 响应数据格式：JSON
| 参数名称 | 类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| code|int32||false||
| data|object||false||
| message|string||false||

##### 接口描述
> 




## 6.3	添加用户

> POST  /userApi/user
### 请求体(Request Body)
| 参数名称 | 数据类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| avatar|string||false||
| createTime|string||false||
| id|int32||false||
| name|string||false||
| password|string||false||
| role|object||false||
|⇥ createTime|string||false||
|⇥ description|string||false||
|⇥ id|int32||false||
|⇥ menuIdList|array[int32]||false||
|⇥ name|string||false||
|⇥ updateTime|string||false||
| roleId|int32||false||
| updateTime|string||false||
| username|string||false||
### 响应体
● 200 响应数据格式：JSON
| 参数名称 | 类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| code|int32||false||
| data|object||false||
| message|string||false||

##### 接口描述
> 




## 6.4	删除用户

> DELETE  /userApi/user
### 响应体
● 200 响应数据格式：JSON
| 参数名称 | 类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| code|int32||false||
| data|object||false||
| message|string||false||

##### 接口描述
> 




## 6.5	更新用户

> PUT  /userApi/user
### 请求体(Request Body)
| 参数名称 | 数据类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| avatar|string||false||
| createTime|string||false||
| id|int32||false||
| name|string||false||
| password|string||false||
| role|object||false||
|⇥ createTime|string||false||
|⇥ description|string||false||
|⇥ id|int32||false||
|⇥ menuIdList|array[int32]||false||
|⇥ name|string||false||
|⇥ updateTime|string||false||
| roleId|int32||false||
| updateTime|string||false||
| username|string||false||
### 响应体
● 200 响应数据格式：JSON
| 参数名称 | 类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| code|int32||false||
| data|object||false||
| message|string||false||

##### 接口描述
> 




## 7	Auth Controller

## 7.1	登录功能

> GET  /authApi/login
### 请求参数(Query Param)
| 参数名称 | 默认值 | 描述 |
| ------ | ------ | ------ |
|password||密码|
|username||用户名|
### 响应体
● 200 响应数据格式：JSON
| 参数名称 | 类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| code|int32||false||
| data|object||false||
| message|string||false||

##### 接口描述
> 




## 7.2	修改用户密码

> POST  /authApi/password
### 响应体
● 200 响应数据格式：JSON
| 参数名称 | 类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| code|int32||false||
| data|object||false||
| message|string||false||

##### 接口描述
> 




## 8	Role Controller

## 8.1	获取角色列表

> GET  /roleApi/role
### 请求参数(Query Param)
| 参数名称 | 默认值 | 描述 |
| ------ | ------ | ------ |
|createTime|||
|current||页码|
|name|||
|pageSize||一页数量|
|updateTime|||
### 响应体
● 200 响应数据格式：JSON
| 参数名称 | 类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| code|int32||false||
| data|object||false||
| message|string||false||

##### 接口描述
> 




## 8.2	添加角色

> POST  /roleApi/role
### 请求体(Request Body)
| 参数名称 | 数据类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| createTime|string||false||
| description|string||false||
| id|int32||false||
| menuIdList|array[int32]||false||
| name|string||false||
| updateTime|string||false||
### 响应体
● 200 响应数据格式：JSON
| 参数名称 | 类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| code|int32||false||
| data|object||false||
| message|string||false||

##### 接口描述
> 




## 8.3	删除角色

> DELETE  /roleApi/role
### 响应体
● 200 响应数据格式：JSON
| 参数名称 | 类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| code|int32||false||
| data|object||false||
| message|string||false||

##### 接口描述
> 




## 8.4	修改角色

> PUT  /roleApi/role
### 请求体(Request Body)
| 参数名称 | 数据类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| createTime|string||false||
| description|string||false||
| id|int32||false||
| menuIdList|array[int32]||false||
| name|string||false||
| updateTime|string||false||
### 响应体
● 200 响应数据格式：JSON
| 参数名称 | 类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| code|int32||false||
| data|object||false||
| message|string||false||

##### 接口描述
> 




## 9	系统状态项配置

## 9.1	删除

> POST  /statusItem/delete
### 请求参数(Query Param)
| 参数名称 | 默认值 | 描述 |
| ------ | ------ | ------ |
|statusItemId||statusItemId|
### 响应体
● 200 响应数据格式：JSON
| 参数名称 | 类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| code|int32||false||
| data|object||false||
| message|string||false||

##### 接口描述
> 设备删除后自动删除, 但与默认不同的情况需要手动删除




## 9.2	新增

> POST  /statusItem/insert
### 请求体(Request Body)
| 参数名称 | 数据类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| alarmValue|boolean||false|告警值|
| equipmentId|int32||false|设备id|
| id|int32||false||
| paramName|string||false|参数名|
| position|int32||false|位置|
| toMes|boolean||false|是否传给mes|
### 响应体
● 200 响应数据格式：JSON
| 参数名称 | 类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| code|int32||false||
| data|object||false||
| message|string||false||

##### 接口描述
> 创建设备时会自动添加默认配置, 但与默认不同的情况需要手动新增




## 9.3	查询

> GET  /statusItem/select
### 请求参数(Query Param)
| 参数名称 | 默认值 | 描述 |
| ------ | ------ | ------ |
|current||当前页数|
|equipmentId||设备id|
|pageSize||每页数量|
### 响应体
● 200 响应数据格式：JSON
| 参数名称 | 类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| code|int32||false||
| data|object||false||
|⇥ current|int32||false||
|⇥ pages|int32||false||
|⇥ records|array[object]||false||
|⇥⇥ alarmValue|boolean||false|告警值|
|⇥⇥ equipmentId|int32||false|设备id|
|⇥⇥ id|int32||false||
|⇥⇥ paramName|string||false|参数名|
|⇥⇥ position|int32||false|位置|
|⇥⇥ toMes|boolean||false|是否传给mes|
|⇥ size|int32||false||
|⇥ total|int32||false||
| message|string||false||

##### 接口描述
> 




## 9.4	修改

> POST  /statusItem/update
### 请求体(Request Body)
| 参数名称 | 数据类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| alarmValue|boolean||false|告警值|
| equipmentId|int32||false|设备id|
| id|int32||false||
| paramName|string||false|参数名|
| position|int32||false|位置|
| toMes|boolean||false|是否传给mes|
### 响应体
● 200 响应数据格式：JSON
| 参数名称 | 类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| code|int32||false||
| data|object||false||
| message|string||false||

##### 接口描述
> 修改阈值, 或者与默认不同的情况需要手动修改




## 9.5	批量修改

> POST  /statusItem/updateByBatch
### 请求体(Request Body)
| 参数名称 | 数据类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| alarmValue|boolean||false|告警值|
| equipmentId|int32||false|设备id|
| id|int32||false||
| paramName|string||false|参数名|
| position|int32||false|位置|
| toMes|boolean||false|是否传给mes|
### 响应体
● 200 响应数据格式：JSON
| 参数名称 | 类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| code|int32||false||
| data|object||false||
| message|string||false||

##### 接口描述
> 修改阈值, 或者与默认不同的情况需要手动修改




## 10	Collect Item Con

## 10.1	删除

> POST  /collectItem/delete
### 请求参数(Query Param)
| 参数名称 | 默认值 | 描述 |
| ------ | ------ | ------ |
|collectItemId||collectItemId|
### 响应体
● 200 响应数据格式：JSON
| 参数名称 | 类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| code|int32||false||
| data|object||false||
| message|string||false||

##### 接口描述
> 设备删除后自动删除, 且删除后重新启动会自动添加, 一般不主动删除




## 10.2	新增

> POST  /collectItem/insert
### 请求体(Request Body)
| 参数名称 | 数据类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| devName|string||false|采集项dt配置(设备名/设备位置)|
| equipmentId|int32||false|设备id|
| id|int32||false||
| index|int32||false|采集项dt配置(index)|
| maxValue|number||false|阈值最大值|
| minValue|number||false|阈值最小值|
| paramName|string||false|采集项dt配置(参数名)|
| paramUnit|string||false|采集项dt配置(单位)|
| precision|int32||false|采集项dt配置(精度)|
| toMes|boolean||false|是否传给mes|
### 响应体
● 200 响应数据格式：JSON
| 参数名称 | 类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| code|int32||false||
| data|object||false||
| message|string||false||

##### 接口描述
> 连接设备后自动添加, 一般不主动新增




## 10.3	查询

> GET  /collectItem/select
### 请求参数(Query Param)
| 参数名称 | 默认值 | 描述 |
| ------ | ------ | ------ |
|current||当前页数|
|equipmentId||设备id|
|pageSize||每页数量|
### 响应体
● 200 响应数据格式：JSON
| 参数名称 | 类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| code|int32||false||
| data|object||false||
|⇥ current|int32||false||
|⇥ pages|int32||false||
|⇥ records|array[object]||false||
|⇥⇥ devName|string||false|采集项dt配置(设备名/设备位置)|
|⇥⇥ equipmentId|int32||false|设备id|
|⇥⇥ id|int32||false||
|⇥⇥ index|int32||false|采集项dt配置(index)|
|⇥⇥ maxValue|number||false|阈值最大值|
|⇥⇥ minValue|number||false|阈值最小值|
|⇥⇥ paramName|string||false|采集项dt配置(参数名)|
|⇥⇥ paramUnit|string||false|采集项dt配置(单位)|
|⇥⇥ precision|int32||false|采集项dt配置(精度)|
|⇥⇥ toMes|boolean||false|是否传给mes|
|⇥ size|int32||false||
|⇥ total|int32||false||
| message|string||false||

##### 接口描述
> 




## 10.4	修改

> POST  /collectItem/update
### 请求体(Request Body)
| 参数名称 | 数据类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| devName|string||false|采集项dt配置(设备名/设备位置)|
| equipmentId|int32||false|设备id|
| id|int32||false||
| index|int32||false|采集项dt配置(index)|
| maxValue|number||false|阈值最大值|
| minValue|number||false|阈值最小值|
| paramName|string||false|采集项dt配置(参数名)|
| paramUnit|string||false|采集项dt配置(单位)|
| precision|int32||false|采集项dt配置(精度)|
| toMes|boolean||false|是否传给mes|
### 响应体
● 200 响应数据格式：JSON
| 参数名称 | 类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| code|int32||false||
| data|object||false||
| message|string||false||

##### 接口描述
> 只能修改阈值




## 10.5	批量修改

> POST  /collectItem/updateByBatch
### 请求体(Request Body)
| 参数名称 | 数据类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| devName|string||false|采集项dt配置(设备名/设备位置)|
| equipmentId|int32||false|设备id|
| id|int32||false||
| index|int32||false|采集项dt配置(index)|
| maxValue|number||false|阈值最大值|
| minValue|number||false|阈值最小值|
| paramName|string||false|采集项dt配置(参数名)|
| paramUnit|string||false|采集项dt配置(单位)|
| precision|int32||false|采集项dt配置(精度)|
| toMes|boolean||false|是否传给mes|
### 响应体
● 200 响应数据格式：JSON
| 参数名称 | 类型 | 默认值 | 不为空 | 描述 |
| ------ | ------ | ------ | ------ | ------ |
| code|int32||false||
| data|object||false||
| message|string||false||

##### 接口描述
> 只能修改阈值



