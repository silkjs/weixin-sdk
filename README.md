# weixin-sdk

微信接口说明 [JS-SDK](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)

## 使用说明

在需要调用 JS 接口的页面引入如下 JS 文件，（支持 https）：http://res.wx.qq.com/open/js/jweixin-1.6.0.js

> 建议下载 JS 文件，并通过静态引用的方式加载。

```html
<script src="{path}/jweixin-1.6.0.js"></script>
```

安装`@silkjs/weixin-sdk`

```bash
npm install --save @silkjs/weixin-sdk
```

| 参数        | 类型     | 必填  | 说明                         |
| ----------- | -------- | ----- | ---------------------------- |
| signature   | Function | true  | 鉴权函数                     |
| jsApiList   | Apis[]   | true  | 需要使用的接口列表           |
| openTagList | Tags[]   | false | 需要用的的标签列表；默认`[]` |
| debug       | boolean  | false | 调试模式；默认`false`       |

> utils/weixin-sdk.ts

```typescript
import { WeiXinSdk } from "@silkjs/weixin-sdk";
export const sdk = new WeiXinSdk({
  signature: async (url) => {
    // 获取鉴权配置信息
    const config = await GetSignature(url);
    return {
      appId: config.appid,
      timestamp: config.timestamp,
      nonceStr: config.nonce_str,
      signature: config.signature,
    };
  },
  jsApiList: ["getNetworkType", "closeWindow"],
  openTagList: ["wx-open-subscribe"],
});
```

## 接口调用

在需要使用微信开放接口的位置引入初始化好的`sdk`，直接调用相关接口即可，无需命令式触发 config 注册验证，`@silkjs/weixin-sdk`将自动接管相关注册工作，并缓存好相关状态。

```ts
import { sdk } from "{path}/utils/weixin-sdk.ts";

async function App {
  // 网页授权链接
  sdk.authorize({
    appid: "<appid>",
    redirect_uri: "<redirect_uri>",
    response_type: "<response_type>",
    scope: "<scope>",
    state: "<state>",
  })
  // 主动初始化
  await sdk.init()
  // 获取网络状态
  await sdk.getNetworkType();
}
```
