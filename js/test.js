var SVG;
$(function () { //jshint ignore:line
  //  console.clear();
  //  fileUrl(11);
  fake2();
  //  fake3();
  //  fake4();


  uiNameData(); //jshint ignore:line
});


// fileUrl('//googledrive.com/host/0B0zTgDj4fTXrYzZIdXE4cjhWbFE/2.svg');
function fake2() { //jshint ignore:line
  SVG = {
    LIST: [
      "г", "г", "г", "г", "г", "г",
      "г", "г", "г", "г", "г", "г",
      "6", "5", "4", "3", "2", "1"

    ],
    RAP: [ //#FIXME перебор списка производится реверсно  так что номер рапорта тоже надо тянуть реверсно
      1, 1, 1, 0, 0, 0,
      1, 1, 1, 0, 0, 0,
      1, 1, 1, 0, 0, 0
    ],
    nymberType: 1,
    holst: {
      H: 2,
      W: 6,
      X: 1,
      Y: 0
    },
    D: "",
    // raport: {H: 2,W: 2,X: 2,Y: 1},
    GRID2: [],
    name: "test3"
  };
  descrip(); //jshint ignore:line
  console.warn("-------------");
}

function fake() { //jshint ignore:line

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
