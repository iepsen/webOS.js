/*
 * Copyright (c) 2013-2015 LG Electronics
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

/**
 * @lends webOS
 */

//Convenience wrapper around PmLogLib logging API

// Log level constants
var levelNone	  = -1;
var levelEmergency =  0;
var levelAlert	 =  1;
var levelCritical  =  2;
var levelError	 =  3;
var levelWarning   =  4;
var levelNotice	=  5;
var levelInfo	  =  6;
var levelDebug	 =  7;
var isObject = function(obj) {
	return !!obj && (typeof obj === "object") && (Object.prototype.toString.call(obj) !== "[object Array]");
};

// Log function stringifies and escapes keyVals, and passes to PmLogString
var log = function(level, messageId, keyVals, freeText) {
	if(window.PalmSystem) {
		if(keyVals && !isObject(keyVals)) {
			level = levelError;
			keyVals = { msgid: messageId };
			messageId = "MISMATCHED_FMT";
			freeText = null;
			console.warn("webOSLog called with invalid format: keyVals must be an object");
		}
		if(!messageId && level != levelDebug) {
			console.warn("webOSLog called with invalid format: messageId was empty");
		}
		if (keyVals) {
			keyVals = JSON.stringify(keyVals);
		}
		if(window.PalmSystem.PmLogString) {
			if(level==levelDebug) { //debug only accepts 2 arguments
				window.PalmSystem.PmLogString(level, null, null, freeText);
			} else {
				window.PalmSystem.PmLogString(level, messageId, keyVals, freeText);
			}
		} else {
			console.error("Unable to send log; PmLogString not found in this version of PalmSystem");
		}
	}
};

/*
 * window.webOS.* namespace
 */

/**
 * Logs with PmLogLib at the "emergency" level
 * @param {string} messageId - Short string that uniquely identifies the log message within a component.
 * @param {object} keyVals - Key-value pairs to log
 * @param {string} freeText - Text string to log
 */
webOS.emergency = function(messageId, keyVals, freeText) {
	log(levelEmergency, messageId, keyVals, freeText);
};

/**
 * Logs with PmLogLib at the "alert" level
 * @param {string} messageId - Short string that uniquely identifies the log message within a component.
 * @param {object} keyVals - Key-value pairs to log
 * @param {string} freeText - Text string to log
 */
webOS.alert = function(messageId, keyVals, freeText) {
	log(levelAlert, messageId, keyVals, freeText);
};

/**
 * Logs with PmLogLib at the "critical" level
 * @param {string} messageId - Short string that uniquely identifies the log message within a component.
 * @param {object} keyVals - Key-value pairs to log
 * @param {string} freeText - Text string to log
 */
webOS.critical = function(messageId, keyVals, freeText) {
	log(levelCritical, messageId, keyVals, freeText);
};

/**
 * Logs with PmLogLib at the "error" level
 * @param {string} messageId - Short string that uniquely identifies the log message within a component.
 * @param {object} keyVals - Key-value pairs to log
 * @param {string} freeText - Text string to log
 */
webOS.error = function(messageId, keyVals, freeText) {
	log(levelError, messageId, keyVals, freeText);
};

/**
 * Logs with PmLogLib at the "warning" level
 * @param {string} messageId - Short string that uniquely identifies the log message within a component.
 * @param {object} keyVals - Key-value pairs to log
 * @param {string} freeText - Text string to log
 */
webOS.warning = function(messageId, keyVals, freeText) {
	log(levelWarning, messageId, keyVals, freeText);
};

/**
 * Logs with PmLogLib at the "notice" level
 * @param {string} messageId - Short string that uniquely identifies the log message within a component.
 * @param {object} keyVals - Key-value pairs to log
 * @param {string} freeText - Text string to log
 */
webOS.notice = function(messageId, keyVals, freeText) {
	log(levelNotice, messageId, keyVals, freeText);
};

/**
 * Logs with PmLogLib at the "info" level
 * @param {string} messageId - Short string that uniquely identifies the log message within a component.
 * @param {object} keyVals - Key-value pairs to log
 * @param {string} freeText - Text string to log
 */
webOS.info = function(messageId, keyVals, freeText) {
	log(levelInfo, messageId, keyVals, freeText);
};

/**
 * Logs with PmLogLib at the "debug" level
 * @param {string} freeText - Text string to log
 */
webOS.debug = function(freeText) {
	log(levelDebug, "", "", freeText);
};
