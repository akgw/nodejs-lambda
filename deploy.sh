#!/usr/bin/bash
if [ "$1" = "" ]; then
  echo  "profileを指定してください"
  exit 1
fi

mkdir -p function && cp -r src/* function && cp -r node_modules function/  && cd function && zip -r ../function.zip ./* && cd ../



#aws --profile=$1 lambda update-function-code --function-name testFunction --zip-file fileb://function.zip
