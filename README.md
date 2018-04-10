# Sofa-tool

发布在了内部cnpm服务器，sofa组件库开发脚手架，当前只开发了 *create* 命令；

## 使用

```sh
# 安装cnpm，若已安装跳过
sudo npm install cnpm -g

# 更换registry，至内部服务器
cnpm set registry http://10.188.40.14:7001

# 安装
cnpm i -g @sftc/sofa-tool

# 使用
cd sofa
sofa -c componentName

```