function getNuggetBySecrets(secrets) {
  const config = secrets.split("|");
  return {
    historyId: config[2],
    signInUrl: `https://api.juejin.cn/growth_api/v1/check_in`, //签到
    drawUrl: `https://api.juejin.cn/growth_api/v1/lottery/draw`, //抽奖
    dipUrl: `https://api.juejin.cn/growth_api/v1/lottery_lucky/dip_lucky?aid=${config[0]}&uuid=${config[1]}`, //沾喜气
    headers: {
      cookie: `${config[3]}`,
      referer: "https://juejin.cn/",
      "Upgrade-Insecure-Requests": 1,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36",
    },
  };
}

const nuggets = Object.values(process.env).map((value) => {
  return getNuggetBySecrets(value);
});

module.exports = {
  //掘金
  nuggets,
  //微信推送
  pushPlus: {
    token: "3d26ef927a0543e6b33c4e2196fafd09",
    url: "http://www.pushplus.plus/send",
  },
};
