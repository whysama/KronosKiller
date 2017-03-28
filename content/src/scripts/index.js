/*chrome.runtime.sendMessage({
  from:    'content',
  subject: 'showPageAction'
});*/

import $ from 'jquery';

function getPeriod(oFrameDom) {
    var sMonth = $("select[name='month']",oFrameDom).val(),
        sYear = $("select[name='year']",oFrameDom).val(),
        oDate = new Date(sYear, parseInt(sMonth, 10) - 1, 2),
        sDate = oDate.toISOString().slice(0, 10).replace(/-/g, ""),
        iDateStart = parseInt(sDate, 10),
        iDateEnd = iDateStart + 30;
    return {
        start: iDateStart,
        end: iDateEnd
    };
}

function getProjectList(oFrameDom) {
    var aOptions = [],
        oPeriod = getPeriod(oFrameDom);
    for (var i = oPeriod.start; i <= oPeriod.end; i++) {
        $("select[name='" + i + "'] option:not(:disabled)",oFrameDom).each(function() {
            if ($(this).val() != "") { //$(this).val() != "0" && 0 is group name
                aOptions.push({
                    id: $(this).val(),
                    text: $(this).text()
                });
            }
        });
        if (aOptions.length > 0) {
            break;
        }
    }
    return aOptions;
}

chrome.runtime.onMessage.addListener(function (msg, sender, response) {

  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
    var oFrameDom = window.frames["main"].document,
        domInfo = {
          dom : oFrameDom,
          projects : getProjectList(oFrameDom),
          total:   document.querySelectorAll('*').length
        };
    
    response(domInfo);
  
  }

});

