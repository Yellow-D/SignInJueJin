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

Promise.all(promiseArr)
  .then((res) => {
    res.map((detail) => {
      const { res, nugget } = detail;
      if (!res.data || res.data.err_no !== 0) return;
      luckDip(nugget);
      luckDraw(nugget);
    });
    pushMsg("T", JSON.stringify(res));
  })
  .catch((e) => {
    pushMsg("F", JSON.stringify(e));
  });
