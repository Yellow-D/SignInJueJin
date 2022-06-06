const axios = require("axios");
const { nuggets, pushPlus } = require("./config");

/**
 * @param {String} title
 * @param {String} content
 */
const pushMsg = async (title, content) => {
  //获取配置参数
  const { url, token } = pushPlus;
  const res = await axios({
    url,
    method: "post",
    headers: { "Content-Type": "application/json" },
    data: { token, title, content },
  });
  console.log(res);
};

/**
 * 签到
 */
const signRequest = (nugget) => {
  return new Promise(async (resolve, reject) => {
    const { headers, signInUrl } = nugget.value;
    const signResult = await axios({ url: signInUrl, method: `post`, headers });
    try {
      if (signResult.data.err_no === 0) {
        luckDip(nugget);
        luckDraw(nugget);
        resolve(`Success ${nugget.key}`);
      } else {
        reject(`Error ${nugget.key}`);
      }
    } catch {
      reject(`Error ${nugget.key}`);
    }
  });
};
/**
 * 抽奖
 */
const luckDraw = async (nugget) => {
  const { headers, drawUrl } = nugget.value;
  axios({ url: drawUrl, method: `post`, headers });
};

/**
 * 沾喜气
 */
const luckDip = async (nugget) => {
  const { headers, historyId, dipUrl } = nugget.value;
  axios({
    url: dipUrl,
    method: `post`,
    headers,
    data: { lottery_history_id: historyId },
  });
};

const promiseArr = nuggets.map((nugget) => signRequest(nugget));

Promise.allSettled(promiseArr).then((res) => {
  const resStr = res
    .map((resItem) => resItem.reason)
    .reduce((resStr1, resStr2) => resStr1 + " & " + resStr2);
  pushMsg("TT", resStr);
  // console.log(resStr);
});
