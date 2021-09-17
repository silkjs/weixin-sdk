import { Apis, Configs, RefreshFn } from "../models/weixin.model";

type CommandOptions = {
  [key: string]: any;
};

export class WeiXinSdkCore {
  private readonly _wx = Reflect.get(window, "wx") ?? {};
  private readonly refresh: RefreshFn;

  constructor(options: { refresh: RefreshFn }) {
    this.refresh = options.refresh;
  }
  /**
   * 通过config接口注入权限验证配置
   * 所有需要使用JS-SDK的页面必须先注入配置信息，否则将无法调用（同一个url仅需调用一次，对于变化url
   * 的SPA的web app可在每次url变化时进行调用
   */
  config(configs: Configs): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._wx.config({
        appId: configs.appId,
        timestamp: configs.timestamp,
        nonceStr: configs.nonceStr,
        signature: configs.signature,
        jsApiList: configs.jsApiList,
        openTagList: configs.openTagList,
      });
      this._wx.ready(() => {
        resolve();
      });
      this._wx.error((res: any) => {
        reject(res);
      });
    });
  }
  /**
   * 判断当前客户端版本是否支持指定JS接口
   */
  checkJsApi(apis: Apis[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._wx.checkJsApi({
        jsApiList: apis, // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: (res: any) => {
          // 以键值对的形式返回，可用的api值true，不可用为false
          // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
          resolve(res);
        },
        fail: () => {
          reject();
        },
      });
    });
  }
  /**
   * 微信SDK通用接口调用
   * @param action 接口名称
   * @param options 接口参数
   */
  command<T = void>(action: Apis, options?: CommandOptions): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this._wx[action]({
        ...(options ?? {}),
        success: (res: any) => {
          // 以键值对的形式返回，可用的api值true，不可用为false
          // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
          resolve(res);
        },
        fail: () => {
          reject();
        },
      });
    });
  }
}
