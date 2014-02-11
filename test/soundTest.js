require('./setup');


var clientId = 'testclientid',
    clientSecret = 'testclientsecret',
    redirectUri = 'testredirecturi',
    userName = 'testusername',
    password = 'testpassword';

describe('Authentication', function(done) {

    it('Should get access token', function() {
        var appendMock = sinon.stub();
        var submitMock = function(url, callback) {
            callback(null, {
                'access_token': '123'
            });
        };
        var requirejs = require('../src/config').context({
            'form-data': function() {
                this.append = appendMock;
                this.submit = submitMock;
            }
        });
        var SoundCloud = requirejs('sound');

        var sc = new SoundCloud(clientId, clientSecret, userName, password, redirectUri);

        expect(appendMock).to.have.calledWith('client_id', clientId);
        expect(appendMock).to.have.calledWith('client_secret', clientSecret);
        expect(appendMock).to.have.calledWith('grant_type', 'password');
        expect(appendMock).to.have.calledWith('redirect_uri', redirectUri);
        expect(appendMock).to.have.calledWith('username', userName);
    });

});