import { describe, it } from 'mocha';
import * as chai from 'chai';
import * as sinon from 'sinon';
import example from '../../../src/routes/api/example';
import { ExampleGetInput, ExampleGetOutput } from '../../../src/models/example';
import * as express from "express";

describe('example - get', () => {
    it('正常系', () => {
        // テスト値
        let clock = sinon.useFakeTimers(+new Date('2019/01/01'));
        let content  = { param1 : 'value1' } as ExampleGetInput;
        let expectedResponse : ExampleGetOutput = { param1 : 'value1' };
        let expectedStatusCode = 200;
        let expectedCookieName = 'sample';
        let expectedCookieValue = 'set ok';
        let expectedCookieOptions = {
            expires : new Date(Date.now() + 90000),
            httpOnly : true
        };

        // 実行
        let req : Partial<express.Request> = { query : content };
        let res : Partial<express.Response> = { header: sinon.stub(), json: sinon.stub(), end: sinon.stub(), cookie : sinon.stub() };
        let next : Partial<express.NextFunction> = {};
        new example().get(<express.Request>req, <express.Response>res, <express.NextFunction>next);
        clock.restore();
        
        // 確認
        chai.expect((res.json as sinon.SinonStub).args[0][0] as ExampleGetOutput).to.deep.equal(expectedResponse);
        chai.expect((res.cookie as sinon.SinonStub).args[0][0]).to.deep.equal(expectedCookieName);
        chai.expect((res.cookie as sinon.SinonStub).args[0][1]).to.deep.equal(expectedCookieValue);
        chai.expect((res.cookie as sinon.SinonStub).args[0][2]).to.deep.equal(expectedCookieOptions);
        chai.expect(res.statusCode).to.deep.equal(expectedStatusCode);
    });

    it('URLパラメータ無し', () => {
        // テスト値
        let expectedResponse = 'query parameter is required.';
        let expectedStatusCode = 400;

        // 実行
        let req : Partial<express.Request> = {};
        let res : Partial<express.Response> = { header: sinon.stub(), json: sinon.stub(), end: sinon.stub() };
        let next : Partial<express.NextFunction> = {};
        new example().get(<express.Request>req, <express.Response>res, <express.NextFunction>next);
        
        // 確認
        chai.expect((res.json as sinon.SinonStub).args[0][0]).to.deep.equal(expectedResponse);
        chai.expect(res.statusCode).to.deep.equal(expectedStatusCode);
    });

    it('URLパラメータ名誤り', () => {
        // テスト値
        let content  = { paramNotExists : 'value1' } as ExampleGetInput;
        let expectedResponse = 'query parameter param1 is required.';
        let expectedStatusCode = 400;

        // 実行
        let req : Partial<express.Request> = { query : content };
        let res : Partial<express.Response> = { header: sinon.stub(), json: sinon.stub(), end: sinon.stub() };
        let next : Partial<express.NextFunction> = {};
        new example().get(<express.Request>req, <express.Response>res, <express.NextFunction>next);
        
        // 確認
        chai.expect((res.json as sinon.SinonStub).args[0][0]).to.deep.equal(expectedResponse);
        chai.expect(res.statusCode).to.deep.equal(expectedStatusCode);
    });
});