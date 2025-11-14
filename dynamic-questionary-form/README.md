### 说明

   这个项目是借鉴https://github.com/trionesdev/triones-designable的准备做项目二次开发的

## 快速开始

   二次开发的

   lerna version --no-private
   lerna publish from-package

### 检查
# dynamic-questionaries
dynamic-questionaries develop packages
### 准备打包用的
  lerna version 改变版本号

  1. 正确检查 Scope 的权限
要检查 @portalzyt Scope 的权限，可以使用以下命令：

npm access list packages @portalzyt
这将列出你在 @portalzyt Scope 下有权限管理的包。

2. 检查单个包的权限
如果你想检查某个具体包（例如 @portalzyt/designable-formily-setters）的权限，可以运行：

npm access list collaborators @portalzyt/designable-formily-setters
这将列出该包的所有 Collaborators 和权限级别。

3. 验证 Scope 的注册表配置
确保 @portalzyt Scope 的注册表配置正确。运行以下命令：

npm config get @portalzyt:registry
如果返回 undefined，需要配置：
npm config set @portalzyt:registry https://registry.npmjs.org/
4. 验证登录状态
确保你已登录到 NPM，并且登录的用户有权限发布到 @portalzyt Scope：

npm whoami
如果返回你的用户名，说明已登录。
如果未登录，请运行以下命令重新登录：
npm login --scope=@portalzyt --registry=https://registry.npmjs.org/
5. 手动发布测试
尝试手动发布一个包，排除 lerna 的问题。进入 setters 目录，运行以下命令：

npm publish --access public --registry=https://registry.npmjs.org/
如果手动发布成功，说明问题出在 lerna 配置。
如果手动发布失败，请检查错误日志，可能是权限或配置问题。
6. 清理缓存
清理 NPM 和 Yarn 的缓存，避免缓存问题导致错误：

npm cache clean --force
yarn cache clean
7. 重新运行 Lerna 发布
清理并重新运行 lerna 发布命令：

npx lerna clean
npx lerna bootstrap
npx lerna publish from-package --yes --registry=https://registry.npmjs.org/ --loglevel verbose
总结
使用正确的命令检查权限：npm access list packages @portalzyt。
确保 Scope 的注册表配置正确。
验证登录状态和权限。
手动发布测试，排除 lerna 的问题。
如果问题仍未解决，请提供手动发布的结果或 lerna publish 的完整日志，以便进一步排查。
