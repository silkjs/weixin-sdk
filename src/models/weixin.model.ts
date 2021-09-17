export type Apis =
  | "updateAppMessageShareData"
  | "updateTimelineShareData"
  | "onMenuShareTimeline" //（即将废弃）
  | "onMenuShareAppMessage" //（即将废弃）
  | "onMenuShareQQ" //（即将废弃）
  | "onMenuShareWeibo"
  | "onMenuShareQZone"
  | "startRecord"
  | "stopRecord"
  | "onVoiceRecordEnd"
  | "playVoice"
  | "pauseVoice"
  | "stopVoice"
  | "onVoicePlayEnd"
  | "uploadVoice"
  | "downloadVoice"
  | "chooseImage"
  | "previewImage"
  | "uploadImage"
  | "downloadImage"
  | "translateVoice"
  | "getNetworkType"
  | "openLocation"
  | "getLocation"
  | "hideOptionMenu"
  | "showOptionMenu"
  | "hideMenuItems"
  | "showMenuItems"
  | "hideAllNonBaseMenuItem"
  | "showAllNonBaseMenuItem"
  | "closeWindow"
  | "scanQRCode"
  | "chooseWXPay"
  | "openProductSpecificView"
  | "addCard"
  | "chooseCard"
  | "openCard";

export type Tags =
  | "wx-open-launch-weapp" // 跳转小程序
  | "wx-open-launch-app" // 跳转App
  | "wx-open-subscribe" // 服务号订阅通知
  | "wx-open-audio"; // 音频播放

export interface Configs {
  appId: string; // 公众号的唯一标识
  timestamp: string; // 生成签名的时间戳
  nonceStr: string; // 生成签名的随机串
  signature: string; // 签名
  jsApiList: Apis[]; // 需要使用的JS接口列表
  openTagList?: Tags[];
}
