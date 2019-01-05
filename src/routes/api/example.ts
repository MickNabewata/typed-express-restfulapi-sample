import * as express from "express";
import ApiBase from '../apiBase';
import { ExampleGetInput, ExampleGetOutput } from '../../models/example';

/** API実装例 */
export default class Example extends ApiBase
{
    //#region エンドポイント処理

    /**
     * GETエンドポイント
     * @param {express.Request} req - リクエスト
     * @param {express.Request} res - レスポンス
     * @param {express.Request} next - リダイレクト
    */
    protected getEvent(req : express.Request, res : express.Response, next : express.NextFunction)
    {
        // Inputのparam1を取得してそのままOutput用の変数に入れる
        let input = req.query as ExampleGetInput;
        let output : ExampleGetOutput = { param1 : input.param1 };

        // Cookie生成サンプル
        var sampleValue = req.cookies ? req.cookies.sample || 'set ok' : 'set ok';
        res.cookie(
            'sample',
            sampleValue, 
            {
                // 有効期限を15分間にする
                expires : new Date(Date.now() + 90000),

                // JavaScriptから取得不可能にする(Cookieを盗むJSへの対策)
                httpOnly : true
            });

        // 返却
        res.statusCode = 200;
        res.json(output);
    }

    //#endregion

    //#region チェック処理

    /**
     * GETパラメータチェック
     * @param {express.Request} req - リクエスト
    */
    protected getCheck(req : express.Request) : string
    {
        if(!req.query)
        {
            return 'query parameter is required.';
        }

        if(!('param1' in req.query))
        {
            return 'query parameter param1 is required.';
        }

        return null;
    }
    
    //#endregion
}