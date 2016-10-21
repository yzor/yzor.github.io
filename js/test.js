var SVG;
$(function () { //jshint ignore:line
  //  test2();
});

function test2() {
  fileUrl(10);
}


function test() {
  createSVG();
  fake();
  descrip(); //jshint ignore:line
  console.warn("-------------");
  uiNameData(); //jshint ignore:line
}

function createSVG() {
  SVG = {
    LIST: [],
    RAP: [],
    date: "date", //дата
    name: "test", //имя файла
    DOUBLE1: {}, //отлов дубликатов строк #TODO перенести в descript();
    DOUBLE2: {}, //отлов дубликатов строк #TODO перенести в descript();
    TILES: {},
    GRID2: [],
    D: "",
    D2: "",
    holst: {
      H: 3, //высота холста
      W: 3, //ширина холста
      X: 1,
      Y: 0
    },
    raport: {
      H: 2,
      W: 2,
      X: 2,
      Y: 1
    },
    nymberType: 3,
    height: 4, //
    width: 3
  };

}

function fake() { //jshint ignore:line
  SVG.holst.H = 3; //высота холста
  SVG.holst.W = 7; //ширина холста
  SVG.nymberType = 2; //тип нумерации
  SVG.LIST = [
//  "ё", "ё", "ё",
//  "ё", "ё", "ё",
//  "ё", "ё", "ё",
//  "ю", "ю", "ю",
//  "ю", "ю", "ю",
//  "ё", "ё", "ё",
//  "ё", "ё", "ё"
  "лицевые", "лицевые", "лицевые",
  "лицевые", "лицевые", "лицевые",
  "накида", "накида", "накида",
  "накида", "накида", "накида",
  "лицевые", "лицевые", "лицевые",
  "лицевые", "лицевые", "лицевые",
  "накида", "накида", "накида"
];
  SVG.RAP = [
      1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 0
      //1, 0, 0,
      //1, 0, 0,
      //1, 0, 0
    ];


}









/*
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
function fake5() { //jshint ignore:line

  SVG = {
    GRID2: [],
    D: "",
    LIST: ["кишкаблуда", "кишкаблуда", "кишкаблуда", "", "толстая&nbspкишка", "толстая&nbspкишка", "толстая&nbspкишка", "толстая&nbspкишка", "вантуз", "вантуз", "вантуз", "рпхтухопаз",
           "ганорея",
           "школопенда", "базальт", "питерский&nbspбомж", "шаверма", "таракан", "чебуратор", "чебуратор", "болгарский&nbspперец", "бергамот", "велосипед", "чемодан", "чегивара", "чебуреки", "челядь", "чех", "чурбан", "чувак", "чашка", "портовая&nbspшлюха", "одно", "два&nbspслова", "тут&nbspтри&nbspслова", "тут&nbspцелых&nbspчетыре", "пять&nbspслов&nbspслов&nbspслов&nbspслов", "Эшельбе&nbspбешельме", "шайтанама обычная пробела", "обычный пробел", "обычный пробел без &nbsр"],
    holst: {
      H: 8,
      W: 8,
      X: 1,
      Y: 0
    },
    // raport: {H: 2,W: 2,X: 2,Y: 1},
    nymberType: 2,
    height: 4,
    width: 3
  };
  SVG = {
    GRID2: [],
    D: "",
    LIST: ["один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять"],
    holst: {
      H: 3,
      W: 3,
      X: 1,
      Y: 0
    },
    // raport: {H: 2,W: 2,X: 2,Y: 1},
    nymberType: 3,
    height: 4,
    width: 3
  };
  descrip(); //jshint ignore:line
}



function fake3() { //jshint ignore:line
  SVG.RAP = [
      1, 1, 1, 1, 1, 1
    ];
  descrip(); //jshint ignore:line
  console.warn("-------------");
}

function fake4() { //jshint ignore:line
  SVG.LIST = [
    "a", "a", "a", "a",
    "a", "a", "a", "a"
    ];
  SVG.RAP = [
      0, 1, 1, 0,
      0, 1, 1, 0
    ];
  SVG.holst = {
    H: 8,
    W: 4,
    X: 1,
    Y: 0
  };
  descrip(); //jshint ignore:line
}
