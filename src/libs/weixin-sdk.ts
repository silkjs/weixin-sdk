import { WeiXinSdkCore } from "./core.js";
import { Apis, SignatureFn, Tags } from "../models/weixin.model.js";

export class WeiXinSdk extends WeiXinSdkCore {
  constructor(options: {
    signature: SignatureFn;
    jsApiList: Apis[];
    openTagList?: Tags[];
  }) {
    super(options);
  }
  /**
   * 打招呼
   * @param name 对方姓名
   * @param from 己方姓名
   * @returns 招呼话术
   */
  SayHello(name: string, from: string): string {
    return `Hi, ${name}! I'm your new neighbor, my name is ${from}`;
  }
  /**
   * 获取网络状态接口
   * @returns <"2g" | "3g" | "4g" | "wifi">
   */
  getNetworkType(): Promise<"2g" | "3g" | "4g" | "wifi"> {
    return this.command<"2g" | "3g" | "4g" | "wifi">(
      "getNetworkType",
      {},
      {
        success: ({ networkType }) => {
          return networkType;
        },
        fail: (err) => {
          console.log(err);
          return new Error("接口调用失败");
        },
      }
    );
  }
  /**
   * 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（
   * @param options.title 分享标题
   * @param options.desc 分享描述
   * @returns void
   */
  updateAppMessageShareData(options: {
    title: string; // 分享标题
    desc: string; // 分享描述
    link: string; // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: string; // 分享图标
  }): Promise<void> {
    return this.command("updateAppMessageShareData", {
      title: options.title,
      desc: options.desc,
      link: options.link,
      imgUrl: options.imgUrl,
    });
  }
  /**
   * 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
   * @param options
   */
  updateTimelineShareData(options: {
    title: string; // 分享标题
    link: string; // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: string; // 分享图标
  }): Promise<void> {
    return this.command("updateTimelineShareData", {
      title: options.title,
      link: options.link,
      imgUrl: options.imgUrl,
    });
  }
  /**
   * @deprecated
   * 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
   */
  onMenuShareTimeline(options: {
    title: string; // 分享标题
    link: string; // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: string; // 分享图标
  }): Promise<void> {
    return this.command("updateTimelineShareData", {
      title: options.title,
      link: options.link,
      imgUrl: options.imgUrl,
    });
  }
  /**
   * @deprecated
   * 获取“分享给朋友”按钮点击状态及自定义分享内容接口
   */
  onMenuShareAppMessage(options: {
    title: string; // 分享标题
    desc: string; // 分享描述
    link: string; // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: string; // 分享图标
    type: string; // 分享类型,music、video或link，不填默认为link
    dataUrl: string; // 如果type是music或video，则要提供数据链接，默认为空
  }): Promise<void> {
    return this.command("updateTimelineShareData", {
      title: options.title,
      desc: options.desc,
      link: options.link,
      imgUrl: options.imgUrl,
      type: options.type,
      dataUrl: options.dataUrl,
    });
  }
  /**
   * @deprecated
   * 获取“分享到QQ”按钮点击状态及自定义分享内容接口
   */
  onMenuShareQQ(options: {
    title: string; // 分享标题
    desc: string; // 分享描述
    link: string; // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: string; // 分享图标
  }): Promise<void> {
    return this.command("updateTimelineShareData", {
      title: options.title,
      desc: options.desc,
      link: options.link,
      imgUrl: options.imgUrl,
    });
  }
  /**
   * 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
   */
  onMenuShareWeibo(options: {
    title: string; // 分享标题
    desc: string; // 分享描述
    link: string; // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: string; // 分享图标
  }): Promise<void> {
    return this.command("updateTimelineShareData", {
      title: options.title,
      desc: options.desc,
      link: options.link,
      imgUrl: options.imgUrl,
    });
  }
  /**
   * @deprecated
   * 获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
   */
  onMenuShareQZone(options: {
    title: string; // 分享标题
    desc: string; // 分享描述
    link: string; // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: string; // 分享图标
  }): Promise<void> {
    return this.command("updateTimelineShareData", {
      title: options.title,
      desc: options.desc,
      link: options.link,
      imgUrl: options.imgUrl,
    });
  }
  /**
   * 开始录音接口
   */
  startRecord(): Promise<void> {
    return this.command("updateTimelineShareData");
  }
  /**
   * 停止录音接口
   */
  stopRecord(): Promise<void> {
    return this.command("updateTimelineShareData");
  }
  /**
   * 监听录音自动停止接口
   */
  onVoiceRecordEnd(): Promise<void> {
    return this.command("updateTimelineShareData");
  }
  /**
   * 播放语音接口
   * @param localId 需要播放的音频的本地ID，由stopRecord接口获得
   */
  playVoice(localId: string): Promise<void> {
    return this.command("updateTimelineShareData", {
      localId,
    });
  }
  /**
   * 暂停播放接口
   * @param localId 需要暂停的音频的本地ID，由stopRecord接口获得
   */
  pauseVoice(localId: string): Promise<void> {
    return this.command("updateTimelineShareData", {
      localId,
    });
  }
  /**
   * 停止播放接口
   * @param localId 需要停止的音频的本地ID，由stopRecord接口获得
   */
  stopVoice(localId: string): Promise<void> {
    return this.command("updateTimelineShareData", {
      localId,
    });
  }
  /**
   * 监听语音播放完毕接口
   */
  onVoicePlayEnd(): Promise<void> {
    return this.command("updateTimelineShareData");
  }
  /**
   * 上传语音接口
   */
  uploadVoice(options: {
    localId: string; // 需要上传的音频的本地ID，由stopRecord接口获得
    isShowProgressTips: number; // 默认为1，显示进度提示
  }): Promise<void> {
    return this.command("updateTimelineShareData", {
      localId: options.localId,
      isShowProgressTips: options.isShowProgressTips,
    });
  }
  /**
   * 下载语音接口
   */
  downloadVoice(options: {
    serverId: string; // 需要下载的音频的服务器端ID，由uploadVoice接口获得
    isShowProgressTips: number; // 默认为1，显示进度提示
  }): Promise<void> {
    return this.command("updateTimelineShareData", {
      serverId: options.serverId,
      isShowProgressTips: options.isShowProgressTips,
    });
  }
  /**
   * 拍照或从手机相册中选图接口
   */
  chooseImage(options: {
    count: number; // 默认9
    sizeType: Array<"original" | "compressed">; // 可以指定是原图还是压缩图，默认二者都有
    sourceType: Array<"album" | "camera">; // 可以指定来源是相册还是相机，默认二者都有
  }): Promise<void> {
    return this.command("updateTimelineShareData", {
      count: options.count,
      sizeType: options.sizeType,
      sourceType: options.sourceType,
    });
  }
  /**
   * 预览图片接口
   */
  previewImage(options: {
    current: string; // 当前显示图片的http链接
    urls: string[]; // 需要预览的图片http链接列表
  }): Promise<void> {
    return this.command("updateTimelineShareData", {
      current: options.current,
      urls: options.urls,
    });
  }
  /**
   * 上传图片接口
   */
  uploadImage(options: {
    localId: string; // 需要上传的图片的本地ID，由chooseImage接口获得
    isShowProgressTips: number; // 默认为1，显示进度提示
  }): Promise<void> {
    return this.command("updateTimelineShareData", {
      localId: options.localId,
      isShowProgressTips: options.isShowProgressTips,
    });
  }
  /**
   * 下载图片接口
   */
  downloadImage(options: {
    serverId: string; // 需要下载的图片的服务器端ID，由uploadImage接口获得
    isShowProgressTips: number; // 默认为1，显示进度提示
  }): Promise<void> {
    return this.command("updateTimelineShareData", {
      serverId: options.serverId,
      isShowProgressTips: options.isShowProgressTips,
    });
  }
  /**
   * 识别音频并返回识别结果接口
   */
  translateVoice(options: {
    localId: string; // 需要识别的音频的本地Id，由录音相关接口获得
    isShowProgressTips: number; // 默认为1，显示进度提示
  }): Promise<void> {
    return this.command("updateTimelineShareData", {
      localId: options.localId,
      isShowProgressTips: options.isShowProgressTips,
    });
  }
  /**
   * 使用微信内置地图查看位置接口
   */
  openLocation(options: {
    latitude: number; // 纬度，浮点数，范围为90 ~ -90
    longitude: number; // 经度，浮点数，范围为180 ~ -180。
    name: string; // 位置名
    address: string; // 地址详情说明
    scale: number; // 地图缩放级别,整型值,范围从1~28。默认为最大
    infoUrl: string; // 在查看位置界面底部显示的超链接,可点击跳转
  }): Promise<void> {
    return this.command("updateTimelineShareData", {
      latitude: options.latitude,
      longitude: options.longitude,
      name: options.name,
      address: options.address,
      scale: options.scale,
      infoUrl: options.infoUrl,
    });
  }
  /**
   * 获取地理位置接口
   * @param type 坐标类型
   */
  getLocation(type: "wgs84" | "gcj02"): Promise<void> {
    return this.command("updateTimelineShareData", {
      type,
    });
  }
  /**
   * 批量隐藏功能按钮接口
   * @param menuList 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
   */
  hideMenuItems(menuList: string[]): Promise<void> {
    return this.command("updateTimelineShareData", {
      menuList,
    });
  }
  /**
   * 批量显示功能按钮接口
   * @param menuList 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
   */
  showMenuItems(menuList: string[]): Promise<void> {
    return this.command("updateTimelineShareData", {
      menuList,
    });
  }
  /**
   * 隐藏所有非基础按钮接口
   */
  hideAllNonBaseMenuItem(): Promise<void> {
    return this.command("updateTimelineShareData");
  }
  /**
   * 显示所有功能按钮接口
   */
  showAllNonBaseMenuItem(): Promise<void> {
    return this.command("updateTimelineShareData");
  }
  /**
   * 关闭当前网页窗口接口
   */
  closeWindow(): Promise<void> {
    return this.command("updateTimelineShareData");
  }
  /**
   * 调起微信扫一扫接口
   */
  scanQRCode(options: {
    needResult: number; // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
    scanType: Array<"qrCode" | "barCode">; // 可以指定扫二维码还是一维码，默认二者都有
  }): Promise<void> {
    return this.command("updateTimelineShareData", {
      needResult: options.needResult,
      scanType: options.scanType,
    });
  }
  /**
   * 发起一个微信支付请求
   */
  chooseWXPay(options: {
    timestamp: number; // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
    nonceStr: string; // 支付签名随机串，不长于 32 位
    package: string; // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
    signType: string; // 微信支付V3的传入RSA,微信支付V2的传入格式与V2统一下单的签名格式保持一致
    paySign: string; // 支付签名
  }): Promise<void> {
    return this.command("updateTimelineShareData", {
      timestamp: options.timestamp,
      nonceStr: options.nonceStr,
      package: options.package,
      signType: options.signType,
      paySign: options.paySign,
    });
  }
  /**
   * 跳转微信商品页接口
   */
  openProductSpecificView(options: {
    productId: string; // 商品id
    viewType: string; // 0.默认值，普通商品详情页1.扫一扫商品详情页2.小店商品详情页
  }): Promise<void> {
    return this.command("updateTimelineShareData", {
      productId: options.productId,
      viewType: options.viewType,
    });
  }
  /**
   * 批量添加卡券接口
   * @param options  需要添加的卡券列表
   */
  addCard(
    options: Array<{
      cardId: string;
      cardExt: string;
    }>
  ): Promise<void> {
    return this.command("updateTimelineShareData", {
      cardList: options,
    });
  }
  /**
   * 拉取适用卡券列表并获取用户选择信息
   */
  chooseCard(options: {
    shopId: string; // 门店Id
    cardType: string; // 卡券类型
    cardId: string; // 卡券Id
    timestamp: number; // 卡券签名时间戳
    nonceStr: string; // 卡券签名随机串
    signType: string; // 签名方式，默认'SHA1'
    cardSign: string; // 卡券签名
  }): Promise<void> {
    return this.command("updateTimelineShareData", {
      shopId: options.shopId,
      cardType: options.cardType,
      cardId: options.cardId,
      timestamp: options.timestamp,
      nonceStr: options.nonceStr,
      signType: options.signType,
      cardSign: options.cardSign,
    });
  }
  /**
   * 查看微信卡包中的卡券接口
   * @param options 需要打开的卡券列表
   */
  openCard(
    options: Array<{
      cardId: string;
      code: string;
    }>
  ): Promise<void> {
    return this.command("updateTimelineShareData", {
      cardList: options,
    });
  }
}
