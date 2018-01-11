# unity-launcher
Unity起動アプリ

***macのみしか対応してないです***

## できること
* `/Application` ディレクトリ配下に存在するUnityを一覧で表示し、選択されたUnityを起動
* 最近使用したプロジェクトの一覧から対応するUnityを起動（現状5.x系のみ、他はいつか対応する）

## ビルド
``` bash
npm install
npm run build
# build配下のdmgからインストール（未検証）
# もしくはbuild/mac/unity-launcher.appを/Applicationsもしくは~/Applicationsに移動
```
