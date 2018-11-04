const Service = require('../message-client')
const messageClient = new Service();
const assert = require('chai').assert;
const expect = require("chai").expect;
const request = require("request");
const baseUrl = "http://localhost:9003/api/v3";

describe('Client', () => {

    describe('messageClient', () => {
        it('should be an object', () => {
            assert.typeOf(messageClient, 'object')
        })
    })

    describe('getMessages()', () => {
        it('should be of type function', () => {
            assert.typeOf(messageClient.getMessages, 'function')
        })
    })

    describe('sendMessage()', () => {
        it('should be of type function', () => {
            assert.typeOf(messageClient.sendMessage, 'function')
        })

        it('should receive 2 parameters', () => {
            assert.equal(messageClient.sendMessage.length, 2)
        })
    })

    describe('addCredits', () => {
        it('should be of type function', () => {
            assert.typeOf(messageClient.addCredits, 'function')
        })

        it('should receive 1 parameters', () => {
            assert.equal(messageClient.addCredits.length, 1)
        })
    })
})

describe('API end point', function () {
    it('All tests pass', function (done) {
        request.get({ url: baseUrl + '/messages' },
            function (error, response, body) {
                let bodyObj =  {
                    ok: true,
                    message: JSON.parse(body)
                  }
                
                describe('/messages', () => {
                    it('should return an array', () => {
                        assert.typeOf(bodyObj.message, 'array');
                    })

                    it("messages length should be 3", () => {
                        assert.equal(bodyObj.message.length, 3)
                    })

                    it("should return object", () => {
                        assert.typeOf(bodyObj, 'object')
                    })

                    it('response status should be 200', () => {
                        expect(response.statusCode).to.equal(200);
                    })
                })
            });
        done();
    });
});


