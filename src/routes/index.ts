import * as express from "express";

/** ホームページクラス */
export default class Index {

    /** ルーター */
    public Router = express.Router();

    /** 
     * ホームページクラス 初期化
     * @constructor
     */
    constructor()
    {
        // ページ初期表示
        this.Router.get('/', function(req, res, next) {
            res.render('index', { title: 'Express' });
        });
    }
}