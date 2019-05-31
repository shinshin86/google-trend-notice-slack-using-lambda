# google-trend-notice-slack

Fetch [google trend](https://trends.google.com/trends/?geo=US) text and send Slack



## Setup

### Build lambda package


```
yarn build
```



### Incoming WebHooks

Setup [Incoming WebHooks](https://slack.com/apps/A0F7XDUAZ-incoming-webhooks) at Your Slack's workspace



### Setup env

Environment variable of lambda

* CHANNEL_NAME
* WEBHOOK_URL



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

