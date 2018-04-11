# Sofa-tool

发布在了内部cnpm服务器，sofa组件库开发脚手架，当前只开发了 *create*、*delete* 命令；更多命令集结中~

## 使用

```sh
# 安装cnpm，若已安装跳过
sudo npm install cnpm -g

# 更换registry，至内部服务器
cnpm set registry http://10.188.40.14:7001

# 安装
cnpm i -g @sftc/sofa-tool

# 新增
cd sofa
sofa -c componentName

# 测试一下
npm run test

# 删除（删除声明）
sofa -d componentName

```

## create

* create folder: packages/{componentName}
* create document: test/unit/specs/{componentName}.spec.js

## delete

delete the declare of the component

## 更新记录

* v1.0.3 新增delete命令；
* v1.0.4 完善package模板（雨扬）；
