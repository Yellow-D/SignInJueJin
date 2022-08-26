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

// const process = {
//   env: {
//     SIGN: "2608|7031413657951864354|7135665166527512607|_ga=GA1.2.79742148.1623899076; MONITOR_WEB_ID=644abba8-220f-4306-bf53-dbfea0236673; __tea_cookie_tokens_2608=%257B%2522user_unique_id%2522%253A%25227031413657951864354%2522%252C%2522web_id%2522%253A%25227031413657951864354%2522%252C%2522timestamp%2522%253A1641797007509%257D; n_mh=CDG744xzgbpGjnFriyIBZT8Dn2bSMtugHNC6EaZlNeI; _tea_utm_cache_2608={%22utm_source%22:%22gold_browser_extension%22}; _gid=GA1.2.2101608005.1661225562; passport_csrf_token=5bfd6008b2d039597956ccd3145b405c; passport_csrf_token_default=5bfd6008b2d039597956ccd3145b405c; _tea_utm_cache_2018=undefined; passport_auth_status=5cee4d2d6af13a7a6e1615aa98de9c0a%2C; passport_auth_status_ss=5cee4d2d6af13a7a6e1615aa98de9c0a%2C; sid_guard=c706f4985e1b53e6b56b1f5abc4d48a3%7C1661406068%7C31536000%7CFri%2C+25-Aug-2023+05%3A41%3A08+GMT; uid_tt=5e4dcec4774b6edb37147a144a248454; uid_tt_ss=5e4dcec4774b6edb37147a144a248454; sid_tt=c706f4985e1b53e6b56b1f5abc4d48a3; sessionid=c706f4985e1b53e6b56b1f5abc4d48a3; sessionid_ss=c706f4985e1b53e6b56b1f5abc4d48a3; sid_ucp_v1=1.0.0-KGY5Mjc1MzZlOTJjMjY3MzY3MzE3ZDg4NTViZDk3MWU1ODQ2YjA5NzYKFwjt1LDA_fXtBBD0lpyYBhiwFDgCQPEHGgJsZiIgYzcwNmY0OTg1ZTFiNTNlNmI1NmIxZjVhYmM0ZDQ4YTM; ssid_ucp_v1=1.0.0-KGY5Mjc1MzZlOTJjMjY3MzY3MzE3ZDg4NTViZDk3MWU1ODQ2YjA5NzYKFwjt1LDA_fXtBBD0lpyYBhiwFDgCQPEHGgJsZiIgYzcwNmY0OTg1ZTFiNTNlNmI1NmIxZjVhYmM0ZDQ4YTM",
//   },
// };

const nuggets = [];
Object.entries(process.env).forEach(([key, value]) => {
  if (key.startsWith("SIGN")) nuggets.push(getNuggetBySecrets(key, value));
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
