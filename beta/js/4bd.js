/* jshint -W117 */
/* jshint -W098 */

//#TODO если первый символ цифровой...
//#TODO обязательный пробел в длинных символах и описаниях

var BD = {}; //база данных
var deferreds = []; //ожидание ajax
deferreds.push( //deferreds для продолжения только полсе окончани я ajax запроса
  // $(function () { /*jshint ignore:line*/ //#TODO удалить function?
  $.ajax({
    //url:"//spreadsheets.google.com/feeds/list/1xvyuuYG4l3hzTqAdLIIdpb4HHlzPohu8KpfixN103Uc/od6/public/values?alt=json",
    url: "//spreadsheets.google.com/feeds/list/1jIrB9JlPAPmEt7dGRMBvlUkxcdLLc2i4PSwgtyRFR0A/od6/public/values?alt=json",
    dataType: "json",
    success: createBD, //обработка файла
    error: errorCreateBD //функция если файла нет
  })
  // ;})
);

function createBD(data) {
  var arr = data.feed.entry; //в данном массиве все строки
  $.each(arr, function (i, tableLine) { //перебор строк
    var link; //название символа, чтобы обратится к нему во время перебора свойств
    $.each(tableLine, function (i, tableСolumn) { //перебор столбцов строки
      if (i == "gsx$сокрназв.") { //стобец названий
        link = tableСolumn.$t; //название символа в склонении
        BD[link] = {
          w: []
        }; //заносим название в BD
      } else if ((i == "gsx$склонение1" || i == "gsx$склонение3" || i == "gsx$склонение5" //столбцы склонения
        ) && tableСolumn.$t) { //и не пустое значение
        var text = tableСolumn.$t; //значение ячейки
        text = text.replace(/\s/g, '&nbsp;'); //замена пробела на неразрывный &nbsp;
        BD[link].w.push(text); //добавляем значение в массив склонений
        // BD[link].w.push(tableСolumn.$t); //добавляем значение в массив склонений
      } else if (i == "gsx$description" && tableСolumn.$t) { //если есть описание
        BD[link].d = tableСolumn.$t;
      } else if (i == "gsx$_chk2m" && tableСolumn.$t) { //если указана цена($= "_cre1l","_chk2m")
        BD[link].p = tableСolumn.$t;
      }
    });
  });
}

function errorCreateBD() {
  console.error("не удалось получить доступ к BD");
}
/*
//VVVVVVVVV_вариант_1_#########################################################
DATABASE = { //w-word d-description p-price;
  "лицевая": {
    w: ["лицевая", "лицевых", "лицевых"],
    p: 2,
    d: "показывать полупрозрачными плюсами"
  },
  "изнаночная": {
    w: ["изнаночная", "изнаночных", "изнаночных"],
    p: 1
  },
  "лиц скрещ п": {
    w: ["лицевая скрещенная", "лицевых скрещенных", "лицевых скрещенных"],
    p: 1
  },
  "накид": {
    w: ["накид", "накида", "накидов"],
    d: "отображать ноликами"
  }
};
//^^^^^^^^^^##################################################################
//VVVVVVVVVV_вариант_2_########################################################
DATABASE2 = {
  WORD: {
    "лицевая": ["лицевая", "лицевых", "лицевых"],
    "изнаночная": ["изнаночная", "изнаночных", "изнаночных"],
    "лиц скрещ п": ["лицевая скрещенная", "лицевых скрещенных", "лицевых скрещенных"],
    "накид": ["накид", "накида", "накидов"]
  },
  PRICE: {
    "лицевая": 1,
    "изнаночная": 2,
    "лиц скрещ п": 1,
    "накид": 0
  },
  DESCRIPT: {
    "лицевая": "показывать полупрозрачными плюсами",
    "накид": "отображать ноликами"
  }
};
//^^^^^^^^^^##################################################################
*/








function RUS3(w) { //выдаём 3 склонение
  if (BD[w]) {
    w = BD[w].w[1];
  }
  return w;
}

$.when.apply($, deferreds).done(function () { //дождатся окончания ajax
  //все запросы к RUS Обвернуть в данную конструкцию
  // console.log(BD);
  //  console.info(PRICE("лицевая"));
  //  console.info(RUS(25, "лицевая"));
  //  console.log(RUS(22, "накид"));
  //  console.log(RUS(25, "накsыд"));

  // console.log(PRICE("нак и п снять"));
  // console.log(PRICE("изнаночная")+PRICE("изнаночная")+PRICE("изнаночная"));
  // console.log(PRICE("накид"));

});

// console.log(BD);

  var noDouble={};
//var SVG = { //#TODO удалить?
//};
//var QWE = { //#TODO удалить?
//  noDouble: {}//для вывода расширенного описания только в 1 раз
//};

function PRICE(w) {
  var n = 0;
  if (BD[w] && BD[w].p) { //если есть цена
    n = BD[w].p; //n-цена
    if (n == "-") {
      console.error("(" + w + ")? Данный символ не может быть в первой строке?");
    }
    if (isFinite(n)) { // если число... //if (n > 0) {//old
      n = n * 1; //приводим строку к числу
    } else {
      n = 0; //если было не числовое значение, то ставим ноль
    }
  }
  return n;
}

function RUS(n, w) {
  //  console.warn(w);
  var RUnum;
  if (w) {
    //    console.info(w);
    if (BD[w]) { //если слово есть в списке...
      //Склонение по числительным
      if (n == /\d*1\d$/.exec(n) || n == /\d*[567890]$/.exec(n)) {
        //если в массиве только 2 элемента то и при 3 и 2 вернётся второй
        RUnum = BD[w].w[BD[w].w.length - 1];
      } //5-9;10-11
      else if (n == /\d*[234]$/.exec(n)) {
        RUnum = BD[w].w[1];
      } //2-4
      else if (n == /\d*[1]$/.exec(n)) {
        RUnum = BD[w].w[0];
      } //1
      //обработка символов начинающихся с цифры
      if (n == 1 && isFinite(RUnum[0])) { //если первый символ число (и символ только один подряд, нужно?)
        n = RUnum[0]; //изменяем кол-во с одного на то которое указано
        RUnum = RUnum.substr(0, 8).replace(/(&nbsp;|\s|\d)/g, '') + RUnum.substr(8); //удалить из начала строки пробел, цифры и нерарзывный пробел//
      }
      //вывод доплнительного описания
      RUnum = "<span class='box'><i>" + n + "</i>&nbsp;" + RUnum + "</span>";
      if (
        BD[w].d && //если есть описание И...
        noDouble[w] === undefined //если элемент выводится первый раз
      ) {
        RUnum = "<span class='note-box'>" + RUnum + " <span class='note'>" /*+"(="*/ + BD[w].d + /*")"+*/ "</span></span>";
      }
    } else { //если слова нет в списке
      console.error('символа "' + w + '" нету в списке');
      RUnum = "<span class='box'><i>" + n + "</i>&nbsp;" + w + "</span>";
    }
    noDouble[w] = "+"; //добавляем элемент в массив чтобы отлавливать дубли
  } else {
    RUnum = "";
    console.warn("пустая клетка");
  }



  return RUnum;
}
