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
const signRequest = async (nugget) => {
  const { headers, signInUrl } = nugget; //签到相关参数
  const res = await axios({
    url: signInUrl,
    method: `post`,
    headers,
  });
  if (res && res.data && res.data.err_no === 0) {
    luckDip(nugget);
    luckDraw(nugget);
  }
  pushMsg("signRequest", res.data);
};
/**
 * 抽奖
 */
const luckDraw = async (nugget) => {
  const { headers, drawUrl } = nugget; //抽奖相关参数
  const res = await axios({
    url: drawUrl,
    method: `post`,
    headers,
  });
  pushMsg("luckDraw", res.data.data);
};

/**
 * 沾喜气
 */
const luckDip = async (nugget) => {
  const { headers, historyId, dipUrl } = nugget; //抽奖相关参数
  const res = await axios({
    url: dipUrl,
    method: `post`,
    headers,
    data: { lottery_history_id: historyId },
  });
  pushMsg("luckDip", res.data.data);
};

nuggets.forEach((nugget) => {
  signRequest(nugget); //签到函数
});
