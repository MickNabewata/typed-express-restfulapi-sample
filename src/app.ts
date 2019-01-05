import * as createError from 'http-errors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import * as favicon from 'serve-favicon'

import Index from './routes/index';
import example from './routes/api/example';

/** アプリケーションクラス */
export default class App
{
    //#region プロパティ

    /** Expressアプリケーション */
    private expressApp = express();

    /** CSRF保護ミドルウェア用 今のところ使っていない(送信元をチェックすべき対象 = Web画面 が無い) */
    private csrfProtection = csurf({ cookie: true });

    //#endregion

    //#region コンストラクタ

    /**
     * アプリケーションクラス初期化
     * @constructor
     */
    constructor()
    {
        // Viewエンジン
        this.expressApp.set('views', path.join(__dirname, 'views'));
        this.expressApp.set('view engine', 'jade');

        // ミドルウェア
        this.expressApp.use(logger('dev'));
        this.expressApp.use(express.json());
        this.expressApp.use(express.urlencoded({ extended: false }));
        this.expressApp.use(cookieParser());
        this.expressApp.use(favicon(__dirname + '/public/images/favi.ico'));
        this.expressApp.use(helmet());

        // URLマッピング
        this.expressApp.use('/', new Index().Router);
        this.expressApp.use('/api/example', new example().Router);

        // 404エラーをキャッチしてエラーハンドラへフォワード
        this.expressApp.use(function(req, res, next) {
            next(createError(404));
        });

        // エラーハンドラ
        this.expressApp.use(function(err, req, res, next) {

            // development構成の場合はロケールをセット
            res.locals.message = err.message;
            res.locals.error = req.this.expressApp.get('env') === 'development' ? err : {};

            // エラーページにリダイレクト
            res.status(err.status || 500);
            res.render('error');
        });
    }

    //#endregion
}

