#GitHub源码风格比较

###源码一：
[https://github.com/tastejs/todomvc/edit/master/tests/test.js](https://github.com/tastejs/todomvc/edit/master/tests/test.js)

``` javascript
'use strict';

var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var test = require('selenium-webdriver/testing');
var Page = require('./page');
var PageLaxMode = require('./pageLaxMode');
var TestOperations = require('./testOperations');

module.exports.todoMVCTest = function (frameworkName, baseUrl, speedMode, laxMode, browserName) {

	test.describe('TodoMVC - ' + frameworkName, function () {

		var TODO_ITEM_ONE = 'buy some cheese';
		var TODO_ITEM_TWO = 'feed the cat';
		var TODO_ITEM_THREE = 'book a doctors appointment';
		var browser, testOps, page;

		// a number of tests use this set of ToDo items.
		function createStandardItems(done) {
			page.enterItem(TODO_ITEM_ONE);
			page.enterItem(TODO_ITEM_TWO);
			return page.enterItem(TODO_ITEM_THREE)
				.then(function () {
					if (done instanceof Function) {
						done();
					}
				});
		}

		function launchBrowser(done) {
			var chromeOptions = new chrome.Options();
			chromeOptions.addArguments('no-sandbox');

			if (process.env.CHROME_PATH !== undefined) {
				chromeOptions.setChromeBinaryPath(process.env.CHROME_PATH);
			}

			browser = new webdriver.Builder()
				.withCapabilities({browserName: browserName})
				.setChromeOptions(chromeOptions)
				.build();

			browser.get(baseUrl);

			page = laxMode ? new PageLaxMode(browser) : new Page(browser);
			testOps = new TestOperations(page);

			return page.ensureAppIsVisibleAndLoaded()
				.then(function () {
					if (done instanceof Function) {
						done();
					}
				});
		}

		function printCapturedLogs() {
			var logs = browser.manage().logs();

			return logs.get('browser')
				.then(function (entries) {
					if (entries && entries.length) {
						console.log(entries);
					}
				});
		}

		function closeBrowser(done) {
			return browser
				.quit()
				.then(function () {
					if (done instanceof Function) { done(); }
				});
		}

	});

};
```
此代码几乎没有注释，function、if代码段会有空格（例如：`function () {...}`、`if () {...}`）,代码缩进为tab（四个空格），每个语句后都加分号，变量声明与函数等块级语句间有空行，等号两边有空格。

###源码二：
[https://github.com/JsAaron/jQuery/blob/master/2.0.3/Dom.js](https://github.com/JsAaron/jQuery/blob/master/2.0.3/Dom.js)

``` javascript
    var isSimple = /^.[^:#\[\.,]*$/,
        rparentsprev = /^(?:parents|prev(?:Until|All))/,
        rneedsContext = jQuery.expr.match.needsContext,
        // methods guaranteed to produce a unique set when starting from a unique set
        guaranteedUnique = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };
        
    // Support: 1.x compatibility
    // Manipulating tables requires a tbody

    function manipulationTarget(elem, content) {
        return jQuery.nodeName(elem, "table") &&
            jQuery.nodeName(content.nodeType === 1 ? content : content.firstChild, "tr") ?

        elem.getElementsByTagName("tbody")[0] ||
            elem.appendChild(elem.ownerDocument.createElement("tbody")) :
            elem;
    }

    // Replace/restore the type attribute of script elements for safe DOM manipulation

    function disableScript(elem) {
        elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
        return elem;
    }

    function restoreScript(elem) {
        var match = rscriptTypeMasked.exec(elem.type);

        if (match) {
            elem.type = match[1];
        } else {
            elem.removeAttribute("type");
        }

        return elem;
    }

    // Mark scripts as having already been evaluated

    function setGlobalEval(elems, refElements) {
        var l = elems.length,
            i = 0;

        for (; i < l; i++) {
            data_priv.set(
                elems[i], "globalEval", !refElements || data_priv.get(refElements[i], "globalEval")
            );
        }
    }
```
此代码开始部分没有各种声明的注释，代码内部重要的注释都有并且与代码间上下各空一行，function、if、for代码段会有空格（例如：`function () {...}`、`if () {...}`、`for (i = 0; i < l; i++) {...}`）,代码缩进为tab（四个空格），每条语句后都加分号，变量声明与函数等块级语句间有空行，等号两边有空格。

###源码三：
[https://github.com/Semantic-Org/Semantic-UI/edit/master/test/helpers/sinon.js](https://github.com/Semantic-Org/Semantic-UI/edit/master/test/helpers/sinon.js)

``` javascript
/**
 * Sinon.JS 1.9.1, 2014/04/03
 *
 * @author Christian Johansen (christian@cjohansen.no)
 * @author Contributors: https://github.com/cjohansen/Sinon.JS/blob/master/AUTHORS
 *
 * (The BSD License)
 *
 * Copyright (c) 2010-2014, Christian Johansen, christian@cjohansen.no
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright notice,
 *       this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright notice,
 *       this list of conditions and the following disclaimer in the documentation
 *       and/or other materials provided with the distribution.
 *     * Neither the name of Christian Johansen nor the names of his contributors
 *       may be used to endorse or promote products derived from this software
 *       without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 * THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

this.sinon = (function () {
var samsam, formatio;
function define(mod, deps, fn) { if (mod == "samsam") { samsam = deps(); } else { formatio = fn(samsam); } }
define.amd = true;
((typeof define === "function" && define.amd && function (m) { define("samsam", m); }) ||
 (typeof module === "object" &&
      function (m) { module.exports = m(); }) || // Node
 function (m) { this.samsam = m(); } // Browser globals
)(function () {
    var o = Object.prototype;
    var div = typeof document !== "undefined" && document.createElement("div");

    function isNaN(value) {
        // Unlike global isNaN, this avoids type coercion
        // typeof check avoids IE host object issues, hat tip to
        // lodash
        var val = value; // JsLint thinks value !== value is "weird"
        return typeof value === "number" && value !== val;
    }

    /**
     * @name samsam.isArguments
     * @param Object object
     *
     * Returns ``true`` if ``object`` is an ``arguments`` object,
     * ``false`` otherwise.
     */
    function isArguments(object) {
        if (typeof object !== "object" || typeof object.length !== "number" ||
                getClass(object) === "Array") {
            return false;
        }
        if (typeof object.callee == "function") { return true; }
        try {
            object[object.length] = 6;
            delete object[object.length];
        } catch (e) {
            return true;
        }
        return false;
    }

    /**
     * @name samsam.keys
     * @param Object object
     *
     * Return an array of own property names.
     */
    function keys(object) {
        var ks = [], prop;
        for (prop in object) {
            if (o.hasOwnProperty.call(object, prop)) { ks.push(prop); }
        }
        return ks;
    }

});

return sinon;}.call(typeof window != 'undefined' && window || {}));
```
此代码开始部分对文件的版本等信息作出了详细的注释声明，代码内部注释位于被注释代码前面紧密相连，与前面代码空行相隔并且也很详细，function、if、for代码段会有空格（例如：`function () {...}`、`if () {...}`、`for (i = 0; i < l; i++) {...}`）,代码缩进为tab（四个空格），每条语句后都加分号，等号两边有空格。

###总结
我喜欢的代码风格： 
1、代码开始之前对代码的信息做一个整体注释 
2、代码内部注释尽量详细，并且被注释代码紧跟其后 
3、代码缩进用Tab（四个空格）  
4、每条语句后面加分号 
5、变量声明与其他代码块之间加空行 
6、function、if、for代码段不加空格（例如：`function(){...}`、`if(){...}`、`for(i = 0; i < l; i++){...}`） 
7、等号两边加空格 

个人认为按照以上规则编写代码能兼顾效率和美观，也便于理解和阅读。但是目前我自己还没有完全做到这些（尤其是注释），今后学习编写代码过程中会尽量按以上规范形成自己的代码风格。