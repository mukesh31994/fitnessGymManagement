/* global Ext */

function Ajax() {

    this.url = null;
    this.type = 'post';
    this.data = {};
    this.dataType = 'text';
    this.divId;
    this.model;
    this.sync = false;
    this.maskingText = '';
    this.contentType = 'application/json';
    this.headers = {};


    this.setContentType = function (pContentType) {
        this.contentType = pContentType;
    };

    this.getContentType = function () {
        return this.contentType;
    };


    this.setData = function (pData) {
        this.data = pData;
    };

    this.getData = function () {
        return this.data;
    };

    this.setMaskingText = function (pMaskingText) {
        this.maskingText = pMaskingText;
    };


    this.setSync = function (pSync) {
        this.sync = pSync;
    };

    this.getSync = function () {
        return this.sync;
    };


    this.setUrl = function (pUrl) {
        this.url = pUrl;
    };

    this.setType = function (pType) {
        this.type = pType;
    };

    this.setDataType = function (pDataType) {
        this.dataType = pDataType;
    };

    this.setDivId = function (pDivId) {
        this.divId = pDivId;
    };

    this.eventListeners = new Array();


    this.addEventListener = function (eventName, fn) {
        this.eventListeners[eventName] = fn;
    };


    this.execute = function () {
        $(document).ajaxStart(function () {
            Pace.restart();
        }); 

        that = this;
        $.ajax({
            url: this.url,
            type: this.type,
            data: this.data,
            dataType: this.dataType,
            async: !this.sync,
            headers: this.getHeaders(),
            contentType: this.contentType,
            error: function (jqXHR, textStatus, errorThrown) {
                if (that.eventListeners['error']) {
                    that.eventListeners['error'](textStatus, errorThrown);
                }
            },
            beforeSend: function () {
                try {
                    //that.model.loadMask(that.maskingText, that.divId);
                    //tbd with pace Piyush
                } catch (err) {
                }

                if (that.eventListeners['beforeSend']) {
                    that.eventListeners['beforeSend']();
                }

            },
            complete: function (jqXHR, textStatus) {
                try {
                    //that.model.removeMask();
                    //tbd with pace  Piyush
                } catch (err) {
                }

                if (that.eventListeners['complete']) {
                    that.eventListeners['complete'](textStatus);
                }
            },
            success: function (responseText) {

                if (that.eventListeners['success']) {
                    that.eventListeners['success'](responseText);
                }
            }
        });

    };

    this.setHeader = function (pKey, pValue) {
        this.headers[pKey] = pValue;
    };

    this.getHeader = function (pKey) {
        return this.headers[pKey];
    };

    this.getHeaders = function () {
        return this.headers;
    };

}


/**
 * Fired before execution of ajax call...
 *
 * @event beforeSend 
 *   
 */

/**
 * Fired after completion of ajax call..
 *
 * @event complete
 * @param {status} status of ajax
 */

/**
 * Fired when ajax call returns success...
 *
 * @event success
 * @param {string} responseText from Ajax
 */

/**
 * Fired when an error occurs...
 *
 * @event error
 * @param {textStatus}  Status
 * @param {errorThrown} Error
 */

 