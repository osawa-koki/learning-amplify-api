# learning-amplify-api

🍲🍲🍲 AmplifyでAPIを実装してみる！  

![成果物](./docs/images/fruit.gif)  

<https://docs.amplify.aws/javascript/build-a-backend/graphqlapi/>  

## 準備方法

```shell
# `Amplify CLI`をインストール
yarn global add @aws-amplify/cli

# Amplifyの認証
amplify configure

# プロジェクトの初期化
amplify init

# プロジェクトにホスティング機能を追加
amplify add hosting

# プロジェクトにAPI機能を追加  
amplify add api

# プロジェクトをプッシュ
amplify push

# プロジェクトを公開
amplify publish

# -----

# モジュールをインストール
yarn install

# ローカルサーバーを起動
yarn dev
```

## デプロイ

`v-*`という形式のタグをつけると、GitHub Actionsで自動的にデプロイされます。  
GitHub Actionsのシークレット情報として以下の情報を設定してください。  

| シークレット名 | 説明 |
| --- | --- |
| AWS_ACCESS_KEY_ID | AWSのアクセスキー |
| AWS_SECRET_ACCESS_KEY | AWSのシークレットアクセスキー |
| AWS_REGION | AWSのリージョン |
| AMPLIFY_APP_ID | AmplifyのアプリID(`./amplify/team-provider-info.json`に記載) |
