# TRY OUT AZURE STATIC WEB APPS

## 概要

azure static web apps を利用した web application 実装手順を試す
[Set up local development for Azure Static Web Apps](https://docs.microsoft.com/en-us/azure/static-web-apps/local-development) を参考に実装を行っている. 

## Pre requirements

* nodejs: 16.14
* [static-web-apps-cli](https://github.com/Azure/static-web-apps-cli)
* [azure-functions-core-tools](https://github.com/Azure/azure-functions-core-tools)

nodejs には npm (nodejs package manager) が付属する.
`npm` 又は公式のガイドにを従い `static-web-apps-cli`, `azure-functions-core-tools` のインストールを行う.
実行可能な `azfun`, `swa` コマンドにパスが通ることを確認する.

* Azure Functions Core Tools の version

```
Azure Functions Core Tools
Core Tools Version:       4.0.4670 Commit hash: N/A  (64-bit)
Function Runtime Version: 4.7.2.18626
```

* python: 3.9

azure functions の runtime は python3.9.
OS 公式の手順に従いインストールを行う.

## ローカルでの web app の実行

* 下記のコマンドを実行する.

```
swa start app_build/ --api-location api/
```

* 実行後, ブラウザから http://localhost:4280 でデモページを確認できる.
* API は http://localhost:7071 で起動しているため `curl` から下記例の通り実行できる.

```
[~]$curl -XPOST http://localhost:7071/api/message/hello/1 -d '{"message":"hello"}'| jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    69    0    50  100    19   6250   2375 --:--:-- --:--:-- --:--:--  8625
{
  "message": "echo back `hello` from POST method."
}
```


## Backend API

### 依存パッケージのインストール

* 必要に応じて `venv` を利用.

```
[api]$pip install -r requirements.txt
```

### ユニットテスト

* `pytest` を利用.

```
# run unit testing
[api]$python -m pytest

# check C0 coverage.
[api]$python -m pytest --cov
```

### ローカルでの実行

* FE の dev サーバーが port 3000 で起動するため, cors を設定する.

```
[api]$func start --cors http://127.0.0.1:3000
```

## Frontend APP

`react`, `next` による SPP.
[こちらの boilerplate](https://github.com/shimpeiws/react-boilerplate-2022) を参考にしている.

### 依存関係のインストール

* `yarn` を利用

```
[app]$yarn install
```

### ローカルでのデバッグ実行

```
[app]$npx next dev
```

### ビルド＆エクスポート

See [here](https://nextjs.org/docs/advanced-features/static-html-export).

```
[app]$npx next build && npx next export -o ../app_build
```
