/**
 * 打招呼
 * @param name 对方姓名
 * @param from 己方姓名
 * @returns 招呼话术
 */
export function SayHello(name: string, from: string): string {
  return `Hi, ${name}! I'm your new neighbor, my name is ${from}`;
}
