/**
 * Created by rolandas on 11/12/16.
 */

(function(){

    var _ = require("lodash"),
        sha1 = require("sha1"),
        request = require("sync-request");

    var convertString = require("convert-string");


    var Protocol = function(teamName, clientName, isDev) {

        var sessionId;
        var sequenceNumber = 0;
        var secretDev = "pGq9lj5i";
        var secretProd = "RwX6Sm2tAeKy";

        var secret = isDev ? secretDev : secretProd;

        var getAuthCode = function() {
            var s1 = teamName + ":" + clientName + ":" + sessionId + ":" + sequenceNumber + secret;
            var bytes = convertString.UTF8.stringToBytes(s1);

            return sha1(bytes);
        };

        this.authenticate = function() {
            sessionId = _.random(0, 0x0FFFFFFF);

            var request = {
                TeamName: teamName,
                ClientName: clientName,
                SessionId: sessionId,
                SequenceNumber: sequenceNumber,
                AuthCode: getAuthCode(teamName, clientName)
            };

            sequenceNumber++;

            return request;

        };

        this.call = function(url, payload) {
            var baseUrl = "http://10.30.0.114/prod";
            if (isDev) {
                baseUrl = "http://10.30.0.114/dev";
            }

            var url = baseUrl + url;

            var resp = request("POST", url, {json: payload});
            var body = JSON.parse(resp.getBody('utf8'));

            return body;
        };

        this.createPlayer = function() {
            return this.call("/ClientService.svc/json/CreatePlayer", {Auth: this.authenticate()});
        };

        this.waitNextTurn = function(PlayerId, RefTurn) {
            return this.call("/ClientService.svc/json/WaitNextTurn", {
                PlayerId: PlayerId,
                RefTurn: RefTurn,
                Auth: this.authenticate()
            });
        };

        this.getPlayerView = function(PlayerId) {
            return this.call("/ClientService.svc/json/GetPlayerView", {
                PlayerId: PlayerId,
                Auth: this.authenticate()
            });
        };

        this.makeMove = function(PlayerId, positions) {

            /*
            var positionsJson = _.map(positions, function(posa){
                return {Row: posa[1], Col: posa[0]};
            });
            */

            return this.call("/ClientService.svc/json/PerformMove", {
                PlayerId: PlayerId,
                Positions: positions,
                Auth: this.authenticate()
            });
        };
    };

    module.exports = Protocol;
}());
