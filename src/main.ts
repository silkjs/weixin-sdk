import { WeiXinSdk } from "./libs/weixin-sdk";
import { Configs } from "./models/weixin.model";

/**
 * 打招呼
 * @param name 对方姓名
 * @param from 己方姓名
 * @returns 招呼话术
 */
export function SayHello(name: string, from: string): string {
  return `Hi, ${name}! I'm your new neighbor, my name is ${from}`;
}

/**
 * 获取微信sdk对象
 * @param configs 初始化参数
 */
export function GetWeiXinSdk(configs: Configs): Promise<WeiXinSdk> {
  return new Promise((resolve, reject) => {
    const wx = Reflect.get(window, "wx");
    wx.config({
      appId: configs.appId,
      timestamp: configs.timestamp,
      nonceStr: configs.nonceStr,
      signature: configs.signature,
      jsApiList: configs.jsApiList,
      openTagList: configs.openTagList,
    });
    wx.ready(() => {
      resolve(new WeiXinSdk(wx));
    });
    wx.error((res: any) => {
      reject(res);
    });
  });
}

export { WeiXinSdk };
