/* eslint-disable @typescript-eslint/no-explicit-any */
import { md5 } from "../utils/forge.js";
import { Apis, SignatureFn, Tags } from "../models/weixin.model.js";
interface CommandActions<T> {
  success?: (res: any) => T; // 接口调用成功时执行的回调函数。
  fail?: (err: any) => Error; // 接口调用失败时执行的回调函数。
  complete?: () => void; // 接口调用完成时执行的回调函数，无论成功或失败都会执行。
  cancel?: () => void; // 用户点击取消时的回调函数，仅部分有用户取消操作的api才会用到。
  trigger?: () => void; // 监听Menu中的按钮点击时触发的方法，该方法仅支持Menu中的相关接口。
}
interface CommandOptions {
  [key: string]: any;
}

export interface SDKOptions {
  signature: SignatureFn;
  jsApiList: Apis[];
  openTagList?: Tags[];
  debug?: boolean;
}

export class WeiXinSdkCore {
  private readonly debug: boolean;
  private readonly _wx = Reflect.get(window, "wx") ?? {};
  private readonly authenticated = new Set<string>();
  private readonly signature: SignatureFn;
  private readonly jsApiList: Apis[];
  private readonly openTagList: Tags[];

  constructor(options: SDKOptions) {
    this.signature = options.signature;
    this.jsApiList = options.jsApiList;
    this.openTagList = options.openTagList ?? [];
    this.debug = options.debug ?? false;
  }
  protected logger(message?: any, ...optionalParams: any[]) {
    if (this.debug) {
      console.log(message, ...optionalParams);
    }
  }
  /**
   * 主动初始化
   */
  init(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const url = location.href.split("#")[0];
      const sign = md5(url);
      this.logger({
        url,
        sign,
      });
      if (this.authenticated.has(sign)) {
        this.logger({
          action: "init",
          sign,
          type: "cache",
        });
        resolve();
      } else {
        this.signature(url)
          .then(({ appId, timestamp, nonceStr, signature }) => {
            this.logger({
              action: "init",
              sign,
              type: "signature(then)",
            });
            this._wx.config({
              appId,
              timestamp,
              nonceStr,
              signature,
              jsApiList: this.jsApiList,
              openTagList: this.openTagList,
            });
            this._wx.ready(() => {
              this.authenticated.add(sign);
              this.logger({
                action: "init",
                sign,
                type: "config(ready)",
              });
              resolve();
            });
            this._wx.error((err: any) => {
              this.logger({
                action: "init",
                sign,
                type: "config(error)",
              });
              reject(err);
            });
          })
          .catch((err) => {
            this.logger({
              action: "init",
              sign,
              type: "signature(catch)",
            });
            reject(err);
          });
      }
    });
  }

  /**
   * 网页登录授权
   * @param options.appid 公众号的唯一标识
   * @param options.redirect_uri 授权后重定向的回调链接地址(不用urlEncode处理，本接口会自行编码)
   * @param options.response_type 返回类型，请填写code
   * @param options.scope 应用授权作用域
   * @param options.state 重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
   */
  authorize(options: {
    appid: string;
    redirect_uri: string;
    response_type: string;
    scope: "snsapi_base" | "snsapi_userinfo";
    state: string;
  }) {
    const url = new URL(
      "https://open.weixin.qq.com/connect/oauth2/authorize#wechat_redirect"
    );
    url.searchParams.append("appid", options.appid);
    url.searchParams.append("redirect_uri", options.redirect_uri);
    url.searchParams.append("response_type", options.response_type);
    url.searchParams.append("scope", options.scope);
    url.searchParams.append("state", options.state);
    return url.toString();
  }

  /**
   * 判断当前客户端版本是否支持指定JS接口
   */
  checkJsApi(apis: Apis[]) {
    return new Promise<{
      [key in Apis]?: true;
    }>((resolve, reject) => {
      this._wx.checkJsApi({
        jsApiList: apis, // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: (res: any) => {
          // 以键值对的形式返回，可用的api值true，不可用为false
          // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}

          resolve(res.checkResult);
        },
        fail: () => {
          reject();
        },
      });
    });
  }

  /**
   * 微信SDK通用接口调用
   * @param operation 接口名称
   * @param options 接口参数
   */
  command<T = any>(
    operation: Apis,
    options: CommandOptions = {},
    actions: CommandActions<T> = {}
  ): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.init()
        .then(() => {
          this._wx[operation](
            Object.assign(options, {
              success: (res: any) => {
                resolve(actions.success?.(res) ?? res);
              },
              fail: (err: any) => {
                reject(actions.fail?.(err) ?? err);
              },
            })
          );
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
