const axios = require("axios");
const { nuggets, pushPlus } = require("./config");

/**
 * @param {String} title
 * @param {String} content
 */
const pushMsg = async (title, content) => {
  //获取配置参数
  const { url, token } = pushPlus;
  axios({
    url,
    method: "post",
    headers: { "Content-Type": "application/json" },
    data: { token, title, content },
  });
};

/**
 * 签到
 */
const signRequest = async (nugget) => {
  try {
    const { headers, signInUrl } = nugget.value;
    const res = await axios({ url: signInUrl, method: `post`, headers });
    if (res.data && res.data.err_no === 0) {
      return Promise.resolve({ res: res.data, nugget });
    } else {
      return Promise.reject({ err: res.data, nugget });
    }
  } catch (err) {
    return Promise.reject({ err, nugget });
  }
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

Promise.allSettled(promiseArr).then((results) => {
  try {
    const messages = [];
    results.forEach((result) => {
      if (result.status === "fulfilled") {
        luckDip(nugget);
        luckDraw(nugget);
        const { res, nugget } = result.value;
        messages.push({ res, user: nugget.key });
      } else if (result.status === "rejected") {
        const { err, nugget } = result.reason;
        messages.push({ err, user: nugget.key });
      }
    });
    // console.log(messages);
    pushMsg("Have a nice day !", JSON.stringify(results));
  } catch (e) {
    pushMsg("Have a nice day !", JSON.stringify(e));
  }
});
