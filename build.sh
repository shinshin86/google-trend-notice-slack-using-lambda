#!/bin/bash

# remake
if [ -f ./google-trend-notice-slack.zip ]; then
  rm ./google-trend-notice-slack.zip
fi

# not need dev dependencies
yarn install --production

zip -r ./google-trend-notice-slack.zip .
chmod 755 ./google-trend-notice-slack.zip
