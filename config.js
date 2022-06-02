const referer = "https://juejin.cn/";
const signInUrl = "https://api.juejin.cn/growth_api/v1/check_in";
const drawUrl = "https://api.juejin.cn/growth_api/v1/lottery/draw";
const dipUrl = "https://api.juejin.cn/growth_api/v1/lottery_lucky/dip_lucky";
const userAgent =
  "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36";

function getNuggetBySecrets(key, value) {
  const config = value.split("|");
  return {
    key,
    value: {
      drawUrl, //抽奖
      signInUrl, //签到
      historyId: config[2],
      dipUrl: `${dipUrl}?aid=${config[0]}&uuid=${config[1]}`, //沾喜气
      headers: {
        referer,
        cookie: `${config[3]}`,
        "User-Agent": userAgent,
        "Upgrade-Insecure-Requests": 1,
      },
    },
  };
}

const nuggets = Object.entries(process.env).map(([key, value]) =>
  getNuggetBySecrets(key, value)
);

module.exports = {
  //掘金
  nuggets,
  //微信推送
  pushPlus: {
    token: "3d26ef927a0543e6b33c4e2196fafd09",
    url: "http://www.pushplus.plus/send",
  },
};
