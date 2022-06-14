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
//     DEACON:
//       "2608|7031413657951864354|7108488786819940382|_ga=GA1.2.79742148.1623899076; MONITOR_WEB_ID=644abba8-220f-4306-bf53-dbfea0236673; __tea_cookie_tokens_2608=%257B%2522user_unique_id%2522%253A%25227031413657951864354%2522%252C%2522web_id%2522%253A%25227031413657951864354%2522%252C%2522timestamp%2522%253A1641797007509%257D; passport_csrf_token=c68dbc3dd24205a75a7c29803fe45618; passport_csrf_token_default=c68dbc3dd24205a75a7c29803fe45618; n_mh=CDG744xzgbpGjnFriyIBZT8Dn2bSMtugHNC6EaZlNeI; _tea_utm_cache_2608={%22utm_source%22:%22gold_browser_extension%22}; passport_auth_status=b3dcdf7744ba4f5f36df270a5bf3ba81%2C; passport_auth_status_ss=b3dcdf7744ba4f5f36df270a5bf3ba81%2C; sid_guard=fe34725d134d72d9ca90f72227f08431%7C1654151021%7C31536000%7CFri%2C+02-Jun-2023+06%3A23%3A41+GMT; uid_tt=126d8058178037b540d4ecde69433c9e; uid_tt_ss=126d8058178037b540d4ecde69433c9e; sid_tt=fe34725d134d72d9ca90f72227f08431; sessionid=fe34725d134d72d9ca90f72227f08431; sessionid_ss=fe34725d134d72d9ca90f72227f08431; sid_ucp_v1=1.0.0-KDYxYjVmYzkxODE4M2QyNjc3ZmEzMDMwMTBlNmU1MTM1ZTA5YTk3OTMKFwjt1LDA_fXtBBDtruGUBhiwFDgCQPEHGgJsZiIgZmUzNDcyNWQxMzRkNzJkOWNhOTBmNzIyMjdmMDg0MzE; ssid_ucp_v1=1.0.0-KDYxYjVmYzkxODE4M2QyNjc3ZmEzMDMwMTBlNmU1MTM1ZTA5YTk3OTMKFwjt1LDA_fXtBBDtruGUBhiwFDgCQPEHGgJsZiIgZmUzNDcyNWQxMzRkNzJkOWNhOTBmNzIyMjdmMDg0MzE; _gid=GA1.2.1174082657.1655091860",
//     DEACON1: "0|1|2|3",
//   },
// };

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
