#!/bin/bash

# remake
if [ -f ./google-trend-notice-slack-using-lambda.zip ]; then
  rm ./google-trend-notice-slack-using-lambda.zip
fi

# not need dev dependencies
yarn install --production

zip -r ./google-trend-notice-slack-using-lambda.zip .
chmod 755 ./google-trend-notice-slack-using-lambda.zip
