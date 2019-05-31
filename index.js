const chromium = require('chrome-aws-lambda');
const pptr = require('puppeteer-core');
const rp = require('request-promise');

async function getTrendText() {
  let browser = null;
  try {
    browser = await pptr.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless
    });
    const page = await browser.newPage();
    const url = 'https://trends.google.com/trends/?geo=US';

    await page.goto(url);
    await page.waitFor(5000); // sleep

    const listSelector = '.recently-trending-list-item';
    const dataMapList = await page.evaluate(selector => {
      const list = Array.from(document.querySelectorAll(selector));
      return list.map(data => {
        const title = data.querySelector('.list-item-title').textContent;
        const searches = data.querySelector('.list-item-searches').textContent;
        return { title, searches };
      });
    }, listSelector);

    await browser.close();

    return dataMapList;
  } catch (error) {
    if (browser !== null) {
      await browser.close();
    }

    throw error;
  }
}

function createResultText(data) {
  return data.map(d => {
    return `${d.title} : ${d.searches}`;
  });
}

async function sendSlack(webhookUrl, channel, text) {
  const body = {
    channel,
    text
  };

  const options = {
    method: 'POST',
    uri: webhookUrl,
    body,
    json: true
  };

  return rp(options);
}

exports.handler = async (event, context) => {
  console.log('[google-trend-notice-slack-using-lambda]: START');

  try {
    const trendText = await getTrendText();
    const result = createResultText(trendText);
    console.log(
      '[google-trend-notice-slack-using-lambda]: ',
      result.join('\n')
    );

    const sendSlackResult = await sendSlack(
      process.env['WEBHOOK_URL'],
      process.env['CHANNEL_NAME'],
      result.join('\n')
    );
    console.log('[google-trend-notice-slack-using-lambda]:', sendSlackResult);

    console.log('[google-trend-notice-slack-using-lambda]: FINISH');

    return context.succeed(result);
  } catch (error) {
    return context.fail(error);
  }
};
