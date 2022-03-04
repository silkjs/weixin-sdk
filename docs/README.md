# Docs

## npm package

```bash
# 查看本地当前使用的registry
npm config get registry

# 设置registry
npm config set registry https://registry.npmjs.org/

# 登录
npm login

# 确认是否登录成功
npm whoami

# 版本更新
npm version patch [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease ]

# 发布
npm publish --access public

# 删除指定版本,超过24小时就不能删除了。删除后24小时内相同版本不能再publish
npm unpublish @silkjs/weixin-sdk@1.0.0 --force

# 遗弃指定版本
npm deprecate @silkjs/weixin-sdk@0.0.8 "this package has been deprecated"
```
