const axios = require("axios");
const { nuggets, pushPlus } = require("./config");

/**
 * @param {String} title
 * @param {JSON} content
 */
const pushMsg = async (title, content) => {
  //获取配置参数
  const { url, token } = pushPlus;
  const res = await axios({
    url,
    method: `get`,
    params: {
      token,
      template: `json`,
      title,
      content,
    },
  });
};

/**
 * 签到
 */
const signRequest = (nuggetValue) => {
  return new Promise(async (resolve, reject) => {
    const { headers, signInUrl } = nuggetValue;
    const signResult = await axios({ url: signInUrl, method: `post`, headers });
    try {
      if (signResult.data.err_no === 0) {
        luckDip(nuggetValue);
        luckDraw(nuggetValue);
        resolve("sign success !");
      } else {
        reject("sign error !");
      }
    } catch {
      reject("sign error !");
    }
  });
};
/**
 * 抽奖
 */
const luckDraw = async (nuggetValue) => {
  const { headers, drawUrl } = nuggetValue;
  axios({ url: drawUrl, method: `post`, headers });
};

/**
 * 沾喜气
 */
const luckDip = async (nuggetValue) => {
  const { headers, historyId, dipUrl } = nuggetValue;
  axios({
    headers,
    url: dipUrl,
    method: `post`,
    data: { lottery_history_id: historyId },
  });
};

nuggets.forEach((nugget) => {
  const { key, value } = nugget;
  signRequest(value)
    .then((e) => pushMsg(key, { success: e }))
    .catch((e) => pushMsg(key, { error: e }));
});
