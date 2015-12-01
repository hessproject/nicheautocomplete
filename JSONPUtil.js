<<<<<<< HEAD
// Borrowed gratefully from Shoefitr.com
var JSONPUtil = {

    _oJsonpRequests: {},

    _iJsonpRequestCount: 0,

    DispatchJsonpResponse: function(oResponse, sEcho) {
        // sEcho contains the request id
        var callback = this._oJsonpRequests[sEcho];
        delete this._oJsonpRequests[sEcho];

        if (callback) {
            callback(oResponse);
        }
    },

    // Note that query string variables 'callback' and 'echo' are appended to sUrl, so your request URL
    // must not contain either of these. Also be sure to append "?sid=" + Math.random() to the URL to avoid
    // cache hits.
    LoadJSONP: function(sUrl, f) {
        // sEcho contains the request id
        var sEcho = this._iJsonpRequestCount++;
        this._oJsonpRequests[sEcho] = f;

        var script = document.createElement('script');
        script.setAttribute('src', sUrl +
            '&callback=JSONPUtil.DispatchJsonpResponse' +
            '&echo=' + sEcho
        );
        document.body.appendChild(script);
    }
};
=======
// Borrowed gratefully from Shoefitr.com
var JSONPUtil = {

    _oJsonpRequests: {},

    _iJsonpRequestCount: 0,

    DispatchJsonpResponse: function(oResponse, sEcho) {
        // sEcho contains the request id
        var callback = this._oJsonpRequests[sEcho];
        delete this._oJsonpRequests[sEcho];

        if (callback) {
            callback(oResponse);
        }
    },

    // Note that query string variables 'callback' and 'echo' are appended to sUrl, so your request URL
    // must not contain either of these. Also be sure to append "?sid=" + Math.random() to the URL to avoid
    // cache hits.
    LoadJSONP: function(sUrl, f) {
        // sEcho contains the request id
        var sEcho = this._iJsonpRequestCount++;
        this._oJsonpRequests[sEcho] = f;

        var script = document.createElement('script');
        script.setAttribute('src', sUrl +
            '&callback=JSONPUtil.DispatchJsonpResponse' +
            '&echo=' + sEcho
        );
        document.body.appendChild(script);
    }
};
>>>>>>> da8c42905f76fe28ddf46a4dcab6e067f2f0dd0f
