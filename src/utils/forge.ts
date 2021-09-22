import { md } from "node-forge";

// md5 消息摘要
export function md5(raw: string): string {
  return md.md5.create().update(raw).digest().toHex();
}
