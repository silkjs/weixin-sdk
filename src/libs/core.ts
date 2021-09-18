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

export class WeiXinSdkCore {
  private readonly _wx = Reflect.get(window, "wx") ?? {};
  private readonly authenticated = new Set<string>();
  private readonly signature: SignatureFn;
  private readonly jsApiList: Apis[];
  private readonly openTagList: Tags[];

  constructor(options: {
    signature: SignatureFn;
    jsApiList: Apis[];
    openTagList?: Tags[];
  }) {
    this.signature = options.signature;
    this.jsApiList = options.jsApiList;
    this.openTagList = options.openTagList ?? [];
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
  command<T = any>(
    operation: Apis,
    options: CommandOptions = {},
    actions: CommandActions<T> = {}
  ): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.config()
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
  private config(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const url = `${location.origin}${location.pathname}${location.search}`;
      const sign = md5(url);
      if (this.authenticated.has(sign)) {
        resolve();
      } else {
        this.signature(url)
          .then(({ appId, timestamp, nonceStr, signature }) => {
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
              resolve();
            });
            this._wx.error((err: any) => {
              reject(err);
            });
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  }
}
