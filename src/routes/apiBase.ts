import * as express from "express";
import * as createError from 'http-errors';

/** API基底クラス */
export default class ApiBase {

    //#region プロパティ

    /** ルーター */
    public Router = express.Router();

    //#endregion

    //#region コンストラクタ

    /**
     * API基底クラス 初期化
     * @constructor
    */
    constructor()
    {
        // GET
        this.Router.get('/', (req, res, next) => {
            this.get(req, res, next);
        });

        // PUT
        this.Router.put('/', (req, res, next) => {
            this.put(req, res, next);
        });

        // POST
        this.Router.post('/', (req, res, next) => {
            this.post(req, res, next);
        });

        // DELETE
        this.Router.delete('/', (req, res, next) => {
            this.delete(req, res, next);
        });
    }

    //#endregion

    //#region エンドポイント(継承可能だが特段の事情が無い限り不要の想定)

    /**
     * GETエンドポイント
     * @param {express.Request} req - リクエスト
     * @param {express.Request} res - レスポンス
     * @param {express.Request} next - リダイレクト
    */
    public get(req : express.Request, res : express.Response, next : express.NextFunction)
    {
        try
        {
            res.header('Content-Type', 'application/json; charset=utf-8');
            let check = this.getCheck(req);
            if(check === null)
            {
                this.getEvent(req, res, next);
            }
            else
            {
                res.statusCode = 400;
                res.json(check);
            }
        }
        catch(ex)
        {
            console.log(ex);
            res.statusCode = 400;
            res.end();
        }
    }

    /**
     * PUTエンドポイント
     * @param {express.Request} req - リクエスト
     * @param {express.Request} res - レスポンス
     * @param {express.Request} next - リダイレクト
    */
    public put(req : express.Request, res : express.Response, next : express.NextFunction)
    {
        try
        {
            res.header('Content-Type', 'application/json; charset=utf-8');
            let check = this.putCheck(req);
            if(check === null)
            {
                this.putEvent(req, res, next);
            }
            else
            {
                res.statusCode = 400;
                res.json(check);
            }
        }
        catch(ex)
        {
            res.statusCode = 400;
            res.end();
        }
    }

    /**
     * POSTエンドポイント
     * @param {express.Request} req - リクエスト
     * @param {express.Request} res - レスポンス
     * @param {express.Request} next - リダイレクト
    */
    public post(req : express.Request, res : express.Response, next : express.NextFunction)
    {
        try
        {
            res.header('Content-Type', 'application/json; charset=utf-8');
            let check = this.postCheck(req);
            if(check === null)
            {
                this.postEvent(req, res, next);
            }
            else
            {
                res.statusCode = 400;
                res.json(check);
            }
        }
        catch(ex)
        {
            res.statusCode = 400;
            res.end();
        }
    }

    /**
     * DELETEエンドポイント
     * @param {express.Request} req - リクエスト
     * @param {express.Request} res - レスポンス
     * @param {express.Request} next - リダイレクト
    */
    public delete(req : express.Request, res : express.Response, next : express.NextFunction)
    {
        try
        {
            res.header('Content-Type', 'application/json; charset=utf-8');
            let check = this.deleteCheck(req);
            if(check === null)
            {
                this.deleteEvent(req, res, next);
            }
            else
            {
                res.statusCode = 400;
                res.json(check);
            }
        }
        catch(ex)
        {
            res.statusCode = 400;
            res.end();
        }
    }

    //#endregion

    //#region 継承すべき処理

    /**
     * GETエンドポイント処理
     * @param {express.Request} req - リクエスト
     * @param {express.Request} res - レスポンス
     * @param {express.Request} next - リダイレクト
    */
    protected getEvent(req : express.Request, res : express.Response, next : express.NextFunction)
    {
        res.statusCode = 404;
        res.end();
    }

    /**
     * PUTエンドポイント処理
     * @param {express.Request} req - リクエスト
     * @param {express.Request} res - レスポンス
     * @param {express.Request} next - リダイレクト
    */
    protected putEvent(req : express.Request, res : express.Response, next : express.NextFunction)
    {
        res.statusCode = 404;
        res.end();
    }

    /**
     * POSTエンドポイント処理
     * @param {express.Request} req - リクエスト
     * @param {express.Request} res - レスポンス
     * @param {express.Request} next - リダイレクト
    */
    protected postEvent(req : express.Request, res : express.Response, next : express.NextFunction)
    {
        res.statusCode = 404;
        res.end();
    }

    /**
     * DELETEエンドポイント処理
     * @param {express.Request} req - リクエスト
     * @param {express.Request} res - レスポンス
     * @param {express.Request} next - リダイレクト
    */
    protected deleteEvent(req : express.Request, res : express.Response, next : express.NextFunction)
    {
        res.statusCode = 404;
        res.end();
    }

    /**
     * GETパラメータチェック
     * @param {express.Request} req - リクエスト
    */
    protected getCheck(req : express.Request) : string
    {
        return null;
    }

    /**
     * PUTパラメータチェック
     * @param {express.Request} req - リクエスト
    */
    protected putCheck(req : express.Request) : string
    {
        return null;
    }

    /**
     * POSTパラメータチェック
     * @param {express.Request} req - リクエスト
    */
    protected postCheck(req : express.Request) : string
    {
        return null;
    }

    /**
     * DELETEパラメータチェック
     * @param {express.Request} req - リクエスト
    */
    protected deleteCheck(req : express.Request) : string
    {
        return null;
    }

    //#endregion
}