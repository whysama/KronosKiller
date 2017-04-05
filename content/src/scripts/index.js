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
        year: sYear,
        month: (parseInt(sMonth, 10) - 1).toString(),
        start: iDateStart,
        end: iDateEnd
    };
}

function getDisabledDates(oFrameDom) {
    var oPeriod = getPeriod(oFrameDom),
        aDisabledDates = [];
    for (var i = oPeriod.start; i <= oPeriod.end; i++) {
        if ($("select[name='" + i + "']",oFrameDom).length === 0) {
            aDisabledDates.push(i.toString());
        }
    }
    return aDisabledDates;
}

function getProjectList(oFrameDom) {
    var aOptions = [],
        oPeriod = getPeriod(oFrameDom);
    for (var i = oPeriod.start; i <= oPeriod.end; i++) {
        $("select[name='" + i + "'] option:not(:disabled)",oFrameDom).each(function() {
            if ($(this).val() != "") { //$(this).val() != "0" && => 0 is group name
                aOptions.push({
                    id: $(this).val(),
                    value: $(this).val(),
                    label: $.trim($(this).text())
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

  if ((msg.from === 'popup') && (msg.subject === 'DOMInfo') && window.frames["main"]) {
    var oFrameDom = window.frames["main"].document,
        domInfo = {
          dom : oFrameDom,
          projects : getProjectList(oFrameDom),
          period : getPeriod(oFrameDom),
          disabled : getDisabledDates(oFrameDom),
          total:   document.querySelectorAll('*').length
        };
    
    response(domInfo);
  
  }

  if ((msg.from === 'popup') && (msg.subject === 'ContentAction') && window.frames["main"]) {
    var oFrameDom = window.frames["main"].document,
        aSelectedDays = msg.selectedDays,
        sSelectedProject = msg.selectedProject,
        sText = msg.text.replace(/\n/g,' ');
    console.log(sText);
    //Clear Allchanges
    $(oFrameDom).find("div.selected-day").removeClass("selected-day");
    $("select[name*='" + getPeriod(oFrameDom).year + "']", oFrameDom).val("");
    $("input[name*='comment" + getPeriod(oFrameDom).year + "']", oFrameDom).val("");
    //Set Selected Days / Projec
    for (var i = 0; i < aSelectedDays.length; i++) {
        $("select[name='" + aSelectedDays[i] + "']", oFrameDom).parent().addClass("selected-day");
        $("select[name='" + aSelectedDays[i] + "']", oFrameDom).val(sSelectedProject);
        $("input[name='comment" + aSelectedDays[i] + "']", oFrameDom).val(sText);
    }
  }

});