/* jshint -W117 */
/* jshint -W098 */
var PSD = require('psd');
$(function () {
  document.getElementById('dropzone').addEventListener('dragover', onDragOver, true); //заглушает родные позывы?)
  document.getElementById('dropzone').addEventListener('drop', onDrop, true); //выбор перетаскиванием
  //  document.getElementById('file').addEventListener('change', wtf, false); //выбор через инпут
});

function wtf(e) {
  e.dataTransfer = document.getElementById("file");
  onDrop(e);
}

function onDragOver(e) {
  e.stopPropagation();
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';
}

function onDrop(evt) {
  var name = evt.dataTransfer.files[0].name;
  name = name.substring(0, name.length - 4);
  Ya("numPSD", name);
  evt.stopPropagation();
  evt.preventDefault();
  PSD.fromEvent(evt).then(function (psd) {
    ParsePsd(psd);
  });
}

function Psd(url) { //открыие по ссылке
  //  var PSD = require('psd');
  PSD.fromURL(url).then(function (psd) {
    ParsePsd(psd);
  });
}






function Ya(type, param, param2) { /*Ya метрика*/ //jshint ignore:line
  if (typeof yaCounter41032864 !== "undefined") {
    if (type == 'numURL' || type == 'numSVG'|| type == 'numPSD') {
      var num10 = param - (param % 10); //округление до десятков....
      var num20 = param - (param % 20);
      var num50 = param - (param % 50);
      var num100 = param - (param % 100);
      //      console.info("Ya_" + type + "-" + param + ":" + num10 + ":" + num20 + ":" + num50 + ":" + num100);
      // yaCounter41032864.reachGoal('NUMBER', {
      //   "NUMBER": qwe
      // });
      if (type == 'numURL') {
        yaCounter41032864.reachGoal('NUMBER', { //jshint ignore:line
          openURL: {
            NUM: param,
            NUM10: num10,
            NUM20: num20,
            NUM50: num50,
            NUM100: num100
          }
        });
      } else if (type == 'numSVG') {
        yaCounter41032864.reachGoal('NUMBER', { //jshint ignore:line
          openSVG: {
            NUM: param,
            NUM10: num10,
            NUM20: num20,
            NUM50: num50,
            NUM100: num100
          }
        });
      } else if (type == 'numPSD') {
        yaCounter41032864.reachGoal('NUMBER', { //jshint ignore:line
          openPSD: {
            NUM: param,
            NUM10: num10,
            NUM20: num20,
            NUM50: num50,
            NUM100: num100
          }
        });
      }
    }
  }
}
