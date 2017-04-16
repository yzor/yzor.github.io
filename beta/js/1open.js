//#TODO при новой схеме обнулять выведеные элементы, дабы вывводилоь расширенное описание символов
/* jshint -W117 */
/* jshint -W098 */
var PSD = require('psd');
$(function () {
  document.getElementById('dropzone').addEventListener('dragover', onDragOver, true); //заглушает родные позывы?)
  document.getElementById('dropzone').addEventListener('drop', onDrop, true); //выбор перетаскиванием
  document.getElementById('file').addEventListener('change', wtf, false); //выбор через инпут
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
  evt.stopPropagation();
  evt.preventDefault();
  PSD.fromEvent(evt).then(function (psd) {
    ParsePsd(psd);
  });
}

function Psd(url) {//открыие по ссылке
  //  var PSD = require('psd');
  PSD.fromURL(url).then(function (psd) {
    ParsePsd(psd);
  });
}
