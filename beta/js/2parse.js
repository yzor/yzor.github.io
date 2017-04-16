/* jshint -W117 */
/* jshint -W098 */
function ParsePsd(psd) {
  var PSD = {};

  var n0 = psd.tree().childrenAtPath('Каркас/Нумерция/Слева2_4_6')[0].layer.visible;
  var n1 = psd.tree().childrenAtPath('Каркас/Нумерция/Справа1_3_5')[0].layer.visible;
  var n2 = psd.tree().childrenAtPath('Каркас/Нумерция/Справа135')[0].layer.visible;
  var n3 = psd.tree().childrenAtPath('Каркас/Нумерция/Справа123')[0].layer.visible;
  if (n0 && n1 && !n2 && !n3) {
    PSD.nymberType = 1;
  } else if (n2 && !n0 && !n1 && !n3) {
    PSD.nymberType = 2;
  } else if (n3 && !n0 && !n1 && !n2) {
    PSD.nymberType = 3;
  } else {
    PSD.nymberType = 0;
    alert("WTF траблы с нумерацией");
  }
  var holst = psd.tree().childrenAtPath('Каркас/Маска/Холст')[0].layer;
  var raport = psd.tree().childrenAtPath('Каркас/Рапорт')[0].layer;
  var kraski = psd.tree().childrenAtPath('Каркас/Маска/Раскраски')[0].children();

  function okr20(n) { //округление до 20
    n = Math.round(n / 20) * 20;
    return n;
  }

  PSD.name = "";
  PSD.holst = {
    H: okr20(holst.height), //holst.height-2;
    W: okr20(holst.width), //holst.width-2
    T: okr20(holst.top), //holst.top+1
    L: okr20(holst.left), //holst.left+1
  };
  PSD.holst.h = PSD.holst.H / 20;
  PSD.holst.w = PSD.holst.W / 20;
  // PSD.holst.t=PSD.holst.T/20;
  // PSD.holst.l=PSD.holst.L/20;
  PSD.raport = {
    H: okr20(raport.mask.height), //-2,
    W: okr20(raport.mask.width), //-2,
    T: okr20(raport.mask.top), //+1,
    L: okr20(raport.mask.left), //+1
  };
  PSD.raport.t = (PSD.raport.T - PSD.holst.T) / 20; //для вычесления
  PSD.raport.l = (PSD.raport.L - PSD.holst.L) / 20; //рапорта
  PSD.raport.r = (okr20(raport.mask.right) - PSD.holst.L) / 20; //без отрисовки
  PSD.raport.b = (okr20(raport.mask.bottom) - PSD.holst.T) / 20; //по координатам
  // PSD.raport.h=PSD.raport.H/20;
  PSD.raport.w = PSD.raport.W / 20;
  // PSD.raport.t=PSD.raport.T/20;
  // PSD.raport.l=PSD.raport.L/20;
  PSD.PIX = [];
  PSD.PIX2 = [];



  $(kraski).each(function (i, e) {
    cellVal(e);
  });
  // console.log(PSD.PIX);
  console.time();
  description(PSD);
  console.timeEnd();

  function cellVal(node) { //получение значений слоя
    if (node.layer.mask.defaultColor === undefined) {
      console.error(node.name, "- маски нет");
      return false;
    }
    var layerW = node.width;
    var layerH = node.height;
    var layerT = node.top;
    var layerL = node.left;
    var maskW = node.layer.mask.width;
    var maskH = node.layer.mask.height;
    var maskT = node.layer.mask.top - PSD.holst.T;
    var maskL = node.layer.mask.left - PSD.holst.L;
    var maskC = node.get("mask").defaultColor;
    var name = node.name;

    // console.warn(name);
    var newCanvas = document.createElement("canvas"); //новый canvas
    //можно избавится от второго канваса если делать белую подложку
    var newCanMin = document.createElement("canvas"); //новый canvas
//    document.getElementById('psd').appendChild(newCanvas); //вставляем в html
//    document.getElementById('psd').appendChild(newCanMin); //вставляем в html
    newCanvas.height = PSD.holst.H;
    newCanvas.width = PSD.holst.W; // подогяем размеры canvas
    newCanMin.height = PSD.holst.h;
    newCanMin.width = PSD.holst.w; // подогяем размеры canvas
    var ctx = newCanvas.getContext('2d');
    var ctM = newCanMin.getContext('2d');
    if (maskC !== 0) { //если цвет не 0, закрашиваем Rect для Layer (этим/чёрным?)
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, PSD.holst.W, PSD.holst.H); //#TODO проверить
    }
    if (maskW !== 0 && maskH !== 0) { //если размеы маски не 0 то рисуем её
      // console.time("parse");
      var checkMask = ParseMask(GetMask()); //!!!
      // console.timeEnd("parse");

      if (checkMask) {
        var MaskImage = ctx.createImageData(maskW, maskH); //изображение из маски
        if (MaskImage.data.set) { // браузеры поддерживающие TypedArrays
          MaskImage.data.set(checkMask); //!!! #todo попробовать делать сразу в array8
          // console.warn(MaskImage);
        } else { // IE9
          checkMask.forEach(function (val, i) { //#TODO не проверял работу
            MaskImage.data[i] = val;
          });
        }
        ctx.putImageData(MaskImage, maskL, maskT); //рисуем маску со смещениями
      } else {
        console.error("что то пошло не так");
      }
    }
    //уменьшаем в 20 раз
    ctM.drawImage(newCanvas, //sx, sy, sw, sh, dx, dy, dw, dh
      0, //PSD.holst.L, //20,//вырез прямоугольника x
      0, //PSD.holst.T, //0,//вырез прямоугольника y
      PSD.holst.W, //140,//вырез прямоугольника w
      PSD.holst.H, //100,//вырез прямоугольника h
      0, 0, //координаты x/y
      PSD.holst.w, //7,//масштаб W
      PSD.holst.h //5 //масштаб h
    );
    //получение пикселей
    var LINK = [];
    var Pixel = ctM.getImageData(0, 0, PSD.holst.w, PSD.holst.h).data; //получаем пиксели


    // $(Pixel).each(function (i) { //перебираем пиксели выбирая непрозрачные
    //   if (Pixel[(i + 1) * 4 - 1] > 0) { //Если пиксель не позрачен
    //     if(PSD.PIX[i]){console.error(
    //       "WTF походу клетка закрашена на нескольких слоях",PSD.PIX[i],i);//#TODO проверить
    //     }
    //     PSD.PIX[i] = name;
    //   }
    //   return (Pixel.length / 4 - 1 != i); //закончить на четверти
    // });

    //v [[1],[2],[3]],[[1],[2],[3]],[[1],[2],[3]]
    //vOLD[1],[2],[3],  [4],[5],[6],  [7],[8],[9]
    var countRow = 0;
    var countCol = 0;
    for (var i = 3; i < Pixel.length; i = i + 4) {
      if (countCol == PSD.holst.w) { //достижение конца ряда
        countRow++;
        countCol = 0;
      }
      if (countCol === 0 && !PSD.PIX[countRow]) {
        PSD.PIX[countRow] = []; //создаём подмасив ряда
        PSD.PIX[countRow].length = PSD.holst.w; //задаём длину, на случай пустышек
      }
      if (Pixel[i] > 0) { //если пиксель закрашен
        if (PSD.PIX[countRow][countCol]) {
          console.error(
            "WTF походу клетка закрашена на нескольких слоях",
            PSD.PIX[countRow][countCol], i); //#TODO проверить
        }
        PSD.PIX[countRow][countCol] = name;
      }
      countCol++;
    }

    for (var I = 3; I < Pixel.length; I = I + 4) {
      if (Pixel[I] > 0) { //если пиксель закрашен
        if (PSD.PIX2[(I + 1) / 4 - 1]) {
          console.error(
            "WTF походу клетка закрашена на нескольких слоях",
            PSD.PIX2[(I + 1) / 4 - 1], i); //#TODO проверить
        }
        PSD.PIX2[(I + 1) / 4 - 1] = name;
      }
    }

    function GetMask() { //получение маски
      if ( /*image.hasMask&&*/ node.layer.mask.width /*>0*/ && node.layer.mask.height /*>0*/ ) {
        var StartPos = node.layer.image.startPos;
        var EndPos;
        var inf = node.get("channelsInfo");
        for (var i = 0; i < inf.length; i++) {
          var elem = inf[i];
          if (elem.id == -2) { //-2 mask channel
            EndPos = StartPos + elem.length;
            break;
          } else {
            StartPos = StartPos + elem.length;
          }
        }
        // $(node.get("channelsInfo")).each(function(i,elem) {
        // 	if (elem.id==-2){//-2 mask channel
        // 	  EndPos=StartPos+elem.length;
        // 		 return false;
        // 	}else{
        // 	  StartPos=StartPos+elem.length;
        // 	}
        // });
        return psd.file.data.slice(StartPos, EndPos);
      } else {
        console.error("oops, it seems there is no mask");
        return false;
      }
    }
    // ParseMask(GetMask());
    function ParseMask(mask) {
      if (mask instanceof Uint8Array /*||Array.isArray(mask)*/ ) {} else {
        console.error("No array received");
        return false;
      }
      var МaskData = [];
      var ModeRAW = 0;
      var NotUseful = node.layer.mask.height * 2 + 2;
      if (mask[1] == 1) { //RLE
        for (var i = NotUseful; i < mask.length; i++) {
          var elem = mask[i];
          if (ModeRAW === 0) {
            //if(mask[i+1]===undefined)console.error("No next character!");
            if (elem < 128) { // 128?
              ModeRAW = +elem + 1; //Enable modeRAW to elem+1
            } else {
              var Repeat = 257 - elem; //257
              var Color = mask[i + 1];
              var r = 0;
              while (r < Repeat) { //Duplicate characters
                МaskData.push(0, 0, 0, Color);
                r++;
              }
              i++; //skip next step
            }
          } else { //ModeRAW
            МaskData.push(0, 0, 0, elem);
            ModeRAW--;
          }
        }
        // var NotUseful=node.layer.mask.height*2+1;
        //var ColorRLE=0;//del?
        //if(mask[1]==1){//RLE
        // $(mask).each(function(i,elem) {
        //   if(i>NotUseful){//пропускаем системные пары
        //     if(ModeRAW===0){
        //       if(ColorRLE==1){//ColorRLE-skip
        //         ColorRLE=0;
        //       }else if(mask[i+1]===undefined){
        //         console.error("что то пошло не так!\n"+
        //         "нет следующего символа, либо это не RLE, либо сбились");
        //       }else{
        //         if(elem<128){//точно 128?
        //           ModeRAW=+elem+1;//включаем RAW на elem+1 раз
        //         }else{
        //           ColorRLE=1;
        //           var Repeat = 257-elem;//257
        //           var Color = mask[i+1];
        //           var I = 0;
        //           while (I < Repeat) {//повтор одинаковых символов
        //             МaskData.push(0,0,0,Color);
        //             I++;
        //           }
        //         }
        //       }
        //     }else{ //ModeRAW
        //       МaskData.push(0,0,0,elem);
        //       ModeRAW--;
        //     }
        //   }
        // });
      } else if (mask[1] === 0) { //RAW
        МaskData = mask.join(',0,0,0,').slice(10).split(','); //не числовое
      } else { //zip?
        console.error("oops", mask[0], mask[1]);
      }
      return МaskData;
    }
  }
}
