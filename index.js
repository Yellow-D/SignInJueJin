//需要使用的包文件
const axios = require("axios");
const schedule = require("node-schedule");
//相关参数保存在文件内
const { nuggets, pushPlus } = require("./config");
const msg = {};
/**
 * pushplus消息推送，关注wx公众号可以调用他们的接口进行wx消息推送
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
const signRequest = async () => {
  const { headers, signInUrl } = nuggets; //签到相关参数
  const res = await axios({
    url: signInUrl,
    method: `post`,
    headers,
  });
  if (res && res.data && res.data.err_no === 0) {
    luckDraw();
    luckDip();
  }
  pushMsg(`掘金签到`, res.data.data);
};
/**
 * 抽奖
 */
const luckDraw = async () => {
  const { headers, drawUrl } = nuggets; //抽奖相关参数
  const res = await axios({
    url: drawUrl,
    method: `post`,
    headers,
  });
  pushMsg(`掘金抽奖`, res.data.data);
};

/**
 * 沾喜气
 */
const luckDip = async () => {
  const { headers, dipUrl } = nuggets; //抽奖相关参数
  const res = await axios({
    url: dipUrl,
    method: `post`,
    headers,
  });
  pushMsg(`掘金沾喜气`, res.data.data);
};

/**
 * 定时触发任务
 */
const signTask = () => {
  schedule.scheduleJob("0 30 9 * * *", () => {
    setTimeout(() => {
      signRequest(); //签到函数
    }, Math.random() * 60 * 30 * 1000);
  });
};

signTask();
