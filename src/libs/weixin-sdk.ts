import { SDKOptions, WeiXinSdkCore } from "./core.js";

export class WeiXinSdk extends WeiXinSdkCore {
  constructor(options: SDKOptions) {
    super(options);
  }

  /**
   * 网页登录授权
   * @param redirect 回调地址
   * @returns
   */
  async sign(redirect: string) {
    const url = new URL(
      "https://open.weixin.qq.com/connect/oauth2/authorize#wechat_redirect"
    );
    url.searchParams.append("appid", this.appid);
    url.searchParams.append("redirect_uri", redirect);
    url.searchParams.append("response_type", "code");
    url.searchParams.append("scope", "snsapi_userinfo");
    url.searchParams.append("state", "STATE");
    return url.toString();
  }
  /**
   * 获取网络状态
   * @returns <"2g" | "3g" | "4g" | "wifi">
   */
  getNetworkType() {
    return this.command<"2g" | "3g" | "4g" | "wifi">(
      "getNetworkType",
      {},
      {
        success: ({ subtype }) => {
          return subtype;
        },
        fail: (err) => {
          console.log(err);
          return new Error("接口调用失败");
        },
      }
    );
  }
  /**
   * 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
   * @param options.title 分享标题
   * @param options.desc 分享描述
   * @param options.link 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
   * @param options.imgUrl 分享图标
   */
  updateAppMessageShareData(options: {
    title: string;
    desc: string;
    link: string;
    imgUrl: string;
  }) {
    return this.command("updateAppMessageShareData", {
      title: options.title,
      desc: options.desc,
      link: options.link,
      imgUrl: options.imgUrl,
    });
  }
  /**
   * 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
   * @param options.title 分享标题
   * @param options.link 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
   * @param options.imgUrl 分享图标
   */
  updateTimelineShareData(options: {
    title: string;
    link: string;
    imgUrl: string;
  }) {
    return this.command("updateTimelineShareData", {
      title: options.title,
      link: options.link,
      imgUrl: options.imgUrl,
    });
  }
  /**
   * @deprecated
   * 获取“分享到朋友圈”按钮点击状态及自定义分享内容
   * @param options.title 分享标题
   * @param options.link 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
   * @param options.imgUrl 分享图标
   */
  onMenuShareTimeline(options: {
    title: string;
    link: string;
    imgUrl: string;
  }) {
    return this.command("onMenuShareTimeline", {
      title: options.title,
      link: options.link,
      imgUrl: options.imgUrl,
    });
  }
  /**
   * @deprecated
   * 获取“分享给朋友”按钮点击状态及自定义分享内容
   * @param options.title 分享标题
   * @param options.desc 分享描述
   * @param options.link 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
   * @param options.imgUrl 分享图标
   * @param options.type 分享类型,music、video或link，不填默认为link
   * @param options.dataUrl 如果type是music或video，则要提供数据链接，默认为空
   */
  onMenuShareAppMessage(options: {
    title: string;
    desc: string;
    link: string;
    imgUrl: string;
    type?: "music" | "video" | "link";
    dataUrl?: string;
  }) {
    return this.command("onMenuShareAppMessage", {
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
   * 获取“分享到QQ”按钮点击状态及自定义分享内容
   * @param options.title 分享标题
   * @param options.desc 分享描述
   * @param options.link 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
   * @param options.imgUrl 分享图标
   */
  onMenuShareQQ(options: {
    title: string;
    desc: string;
    link: string;
    imgUrl: string;
  }) {
    return this.command("onMenuShareQQ", {
      title: options.title,
      desc: options.desc,
      link: options.link,
      imgUrl: options.imgUrl,
    });
  }
  /**
   * 获取“分享到腾讯微博”按钮点击状态及自定义分享内容
   * @param options.title 分享标题
   * @param options.desc 分享描述
   * @param options.link 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
   * @param options.imgUrl 分享图标
   */
  onMenuShareWeibo(options: {
    title: string;
    desc: string;
    link: string;
    imgUrl: string;
  }) {
    return this.command("onMenuShareWeibo", {
      title: options.title,
      desc: options.desc,
      link: options.link,
      imgUrl: options.imgUrl,
    });
  }
  /**
   * @deprecated
   * 获取“分享到QQ空间”按钮点击状态及自定义分享内容
   * @param options.title 分享标题
   * @param options.desc 分享描述
   * @param options.link 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
   * @param options.imgUrl 分享图标
   */
  onMenuShareQZone(options: {
    title: string;
    desc: string;
    link: string;
    imgUrl: string;
  }) {
    return this.command("onMenuShareQZone", {
      title: options.title,
      desc: options.desc,
      link: options.link,
      imgUrl: options.imgUrl,
    });
  }
  /**
   * 开始录音
   */
  startRecord() {
    return this.command("startRecord");
  }
  /**
   * 停止录音
   */
  stopRecord() {
    return this.command("stopRecord");
  }
  /**
   * 监听录音自动停止
   */
  onVoiceRecordEnd() {
    return this.command("onVoiceRecordEnd");
  }
  /**
   * 播放语音
   * @param localId 需要播放的音频的本地ID，由stopRecord接口获得
   */
  playVoice(localId: string) {
    return this.command("playVoice", {
      localId,
    });
  }
  /**
   * 暂停播放
   * @param localId 需要暂停的音频的本地ID，由stopRecord接口获得
   */
  pauseVoice(localId: string) {
    return this.command("pauseVoice", {
      localId,
    });
  }
  /**
   * 停止播放
   * @param localId 需要停止的音频的本地ID，由stopRecord接口获得
   */
  stopVoice(localId: string) {
    return this.command("stopVoice", {
      localId,
    });
  }
  /**
   * 监听语音播放完毕
   */
  onVoicePlayEnd() {
    return this.command("onVoicePlayEnd");
  }
  /**
   * 上传语音
   * @param options.localId 需要上传的音频的本地ID，由stopRecord接口获得
   * @param options.isShowProgressTips 默认为1，显示进度提示
   */
  uploadVoice(options: { localId: string; isShowProgressTips?: number }) {
    return this.command("uploadVoice", {
      localId: options.localId,
      isShowProgressTips: options.isShowProgressTips,
    });
  }
  /**
   * 下载语音
   * @param options.localId 需要下载的音频的服务器端ID，由uploadVoice接口获得
   * @param options.isShowProgressTips 默认为1，显示进度提示
   */
  downloadVoice(options: { serverId: string; isShowProgressTips?: number }) {
    return this.command("downloadVoice", {
      serverId: options.serverId,
      isShowProgressTips: options.isShowProgressTips,
    });
  }
  /**
   * 拍照或从手机相册中选图
   * @param options.count 默认9
   * @param options.sizeType 可以指定是原图还是压缩图，默认二者都有
   * @param options.sourceType 可以指定来源是相册还是相机，默认二者都有
   */
  chooseImage(options: {
    count?: number;
    sizeType?: Array<"original" | "compressed">;
    sourceType?: Array<"album" | "camera">;
  }) {
    return this.command("chooseImage", {
      count: options.count,
      sizeType: options.sizeType,
      sourceType: options.sourceType,
    });
  }
  /**
   * 预览图片
   * @param options.current 当前显示图片的http链接
   * @param options.urls 需要预览的图片http链接列表
   */
  previewImage(options: { current: string; urls: string[] }) {
    return this.command("previewImage", {
      current: options.current,
      urls: options.urls,
    });
  }
  /**
   * 上传图片
   * @param options.localId 需要上传的图片的本地ID，由chooseImage接口获得
   * @param options.isShowProgressTips 默认为1，显示进度提示
   */
  uploadImage(options: { localId: string; isShowProgressTips?: number }) {
    return this.command("uploadImage", {
      localId: options.localId,
      isShowProgressTips: options.isShowProgressTips,
    });
  }
  /**
   * 下载图片
   * @param options.serverId 需要下载的图片的服务器端ID，由uploadImage接口获得
   * @param options.isShowProgressTips 默认为1，显示进度提示
   */
  downloadImage(options: { serverId: string; isShowProgressTips?: number }) {
    return this.command("downloadImage", {
      serverId: options.serverId,
      isShowProgressTips: options.isShowProgressTips,
    });
  }
  /**
   * 识别音频并返回识别结果
   * @param options.localId 需要识别的音频的本地Id，由录音相关接口获得
   * @param options.isShowProgressTips 默认为1，显示进度提示
   */
  translateVoice(options: { localId: string; isShowProgressTips?: number }) {
    return this.command("translateVoice", {
      localId: options.localId,
      isShowProgressTips: options.isShowProgressTips,
    });
  }
  /**
   * 使用微信内置地图查看位置
   * @param options.latitude 纬度，浮点数，范围为90 ~ -90
   * @param options.longitude 经度，浮点数，范围为180 ~ -180。
   * @param options.name 位置名
   * @param options.address 地址详情说明
   * @param options.scale 地图缩放级别,整型值,范围从1~28。默认为最大
   * @param options.infoUrl 在查看位置界面底部显示的超链接,可点击跳转
   */
  openLocation(options: {
    latitude: number; //
    longitude: number;
    name: string;
    address: string;
    scale?: number;
    infoUrl: string;
  }) {
    return this.command("openLocation", {
      latitude: options.latitude,
      longitude: options.longitude,
      name: options.name,
      address: options.address,
      scale: options.scale,
      infoUrl: options.infoUrl,
    });
  }
  /**
   * 获取地理位置
   * @param type 坐标类型 "wgs84" | "gcj02"
   */
  getLocation(type: "wgs84" | "gcj02") {
    return this.command("getLocation", {
      type,
    });
  }
  /**
   * 批量隐藏功能按钮
   * @param menuList 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
   */
  hideMenuItems(menuList: string[]) {
    return this.command("hideMenuItems", {
      menuList,
    });
  }
  /**
   * 批量显示功能按钮
   * @param menuList 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
   */
  showMenuItems(menuList: string[]) {
    return this.command("showMenuItems", {
      menuList,
    });
  }
  /**
   * 隐藏所有非基础按钮
   */
  hideAllNonBaseMenuItem() {
    return this.command("hideAllNonBaseMenuItem");
  }
  /**
   * 显示所有功能按钮
   */
  showAllNonBaseMenuItem() {
    return this.command("showAllNonBaseMenuItem");
  }
  /**
   * 关闭当前网页窗口
   */
  closeWindow() {
    return this.command("closeWindow");
  }
  /**
   * 调起微信扫一扫
   */
  scanQRCode(options: {
    needResult: number; // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
    scanType: Array<"qrCode" | "barCode">; // 可以指定扫二维码还是一维码，默认二者都有
  }) {
    return this.command("scanQRCode", {
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
  }) {
    return this.command("chooseWXPay", {
      timestamp: options.timestamp,
      nonceStr: options.nonceStr,
      package: options.package,
      signType: options.signType,
      paySign: options.paySign,
    });
  }
  /**
   * 跳转微信商品页
   */
  openProductSpecificView(options: {
    productId: string; // 商品id
    viewType: string; // 0.默认值，普通商品详情页1.扫一扫商品详情页2.小店商品详情页
  }) {
    return this.command("openProductSpecificView", {
      productId: options.productId,
      viewType: options.viewType,
    });
  }
  /**
   * 批量添加卡券
   * @param options  需要添加的卡券列表
   */
  addCard(
    options: Array<{
      cardId: string;
      cardExt: string;
    }>
  ) {
    return this.command("addCard", {
      cardList: options,
    });
  }
  /**
   * 拉取适用卡券列表并获取用户选择信息
   * @param options.shopId 门店Id
   * @param options.cardType 卡券类型
   * @param options.cardId 卡券Id
   * @param options.timestamp 卡券签名时间戳
   * @param options.nonceStr 卡券签名随机串
   * @param options.signType 签名方式，默认'SHA1'
   * @param options.cardSign 卡券签名
   */
  chooseCard(options: {
    shopId: string;
    cardType: string;
    cardId: string;
    timestamp: number;
    nonceStr: string;
    signType?: string;
    cardSign: string;
  }) {
    return this.command("chooseCard", {
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
   * 查看微信卡包中的卡券
   * @param options 需要打开的卡券列表
   */
  openCard(
    options: Array<{
      cardId: string;
      code: string;
    }>
  ) {
    return this.command("openCard", {
      cardList: options,
    });
  }
}
