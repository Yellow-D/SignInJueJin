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
    const { headers, signInUrl } = nuggetValue; //签到相关参数
    const res = await axios({
      url: signInUrl,
      method: `post`,
      headers,
    });
    if (res && res.data && res.data.err_no === 0) {
      resolve();
      luckDraw(nuggetValue);
      luckDip(nuggetValue);
    } else {
      reject("sign error !");
    }
  });
};
/**
 * 抽奖
 */
const luckDraw = async (nuggetValue) => {
  const { headers, drawUrl } = nuggetValue; //抽奖相关参数
  const res = await axios({
    url: drawUrl,
    method: `post`,
    headers,
  });
};

/**
 * 沾喜气
 */
const luckDip = async (nuggetValue) => {
  const { headers, historyId, dipUrl } = nuggetValue; //抽奖相关参数
  const res = await axios({
    url: dipUrl,
    method: `post`,
    headers,
    data: { lottery_history_id: historyId },
  });
};

nuggets.forEach((nugget) => {
  const { key, value } = nugget;
  signRequest(value).catch((e) => pushMsg(key, e));
});
