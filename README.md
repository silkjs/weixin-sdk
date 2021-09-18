# weixin-sdk

微信 [JS-SDK](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)

## 使用说明

### 1. 初始化 SDK

| 参数        | 类型     | 说明               |
| ----------- | -------- | ------------------ |
| signature   | Function | 鉴权函数           |
| jsApiList   | Apis[]   | 需要使用的接口列表 |
| openTagList | Tags[]   | 需要用的的标签列表 |

> utils/weixin-sdk.ts

```typescript
import { WeiXinSdk } from "@silkjs/weixin-sdk";
export const sdk = new WeiXinSdk({
  signature: async (url) => {
    return {
      appId: "",
      timestamp: "",
      nonceStr: "",
      signature: "",
      url,
    };
  },
  jsApiList: [],
  openTagList: [],
});
```

### 2. 接口调用

在需要使用微信开放接口的位置引入初始化好的`sdk`，直接调用相关接口即可，无需命令式触发 config 注册验证，`@silkjs/weixin-sdk`将自动接管相关注册工作，并缓存好相关状态。

```typescript
import { sdk } from "{path}/utils/weixin-sdk.ts";

sdk.getNetworkType();
```
