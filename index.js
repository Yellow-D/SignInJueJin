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
    Promise.resolve({ res, nugget });
  } catch (err) {
    Promise.reject({ err, nugget });
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
  const messages = [];
  results.forEach((result) => {
    if (result.status === "fulfilled") {
      const res = result.value;
      if (res.data && res.data.err_no === 0) {
        luckDip(nugget);
        luckDraw(nugget);
      } else {
        messages.push({ err: res, user: nugget.key });
      }
    } else if (result.status === "rejected") {
      const res = result.reason;
      messages.push({ err: res, user: nugget.key });
    }
  });
  pushMsg("A", JSON.stringify(messages));
});
