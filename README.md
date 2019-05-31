# google-trend-notice-slack-using-lambda

Fetch [Google Trends](https://trends.google.com/trends/) text and send Slack using [AWS - Lambda](https://aws.amazon.com/lambda/)



## Setup

### Build lambda package


```
yarn
yarn build
```



### Incoming WebHooks (Slack)

Setup [Incoming WebHooks](https://slack.com/apps/A0F7XDUAZ-incoming-webhooks) at Your Slack workspace



### Setup AWS Lambda Layer

See here (Japanese post)

[AWS LambdaでPuppeteerを動かす](https://qiita.com/kodai-saito/items/9051d2b30a29c7d64f7d)



### Set env

Environment variable of lambda

* CHANNEL_NAME
* WEBHOOK_URL

(Both, your slack workspace)



### Setting Language

The default setting is US. if you want to get Japanese trend, you can do it by rewriting the source code.

```diff
  async function getTrendText() {
       headless: chromium.headless
     });
     const page = await browser.newPage();
-    const url = 'https://trends.google.com/trends/?geo=US';
+    const url = 'https://trends.google.com/trends/?geo=JP';

     await page.goto(url);
```

