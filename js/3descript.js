var SVG;


function descrip() { //генерация описания
  var counter = 1; //устанавливаем значение счётчика на единицу
  $.each(SVG.LIST.reverse(), function (i) { //перебор списка клеток
    //      console.log(SVG.D);
    var counter2 = counter; //копируем значение счётчика в текущем цикле
    counter++; //увеличиваем значение счётчика
    var line = 1 + i / SVG.holst.W | 0; //текущая строка
    var num = 1 + i - ((i / SVG.holst.W | 0) * SVG.holst.W); //текущий номер в строке
    var thisSymbol = i; //копиуем текущий символ чтобы можно было его переопределить во втором типе нумерации
    var nextSymbol = i + 1; //копируем следующий символ для тех же целей
    //########################################################################
    //1 - 2/3 4/5
    //2 - 0/1 6/
    //3 - 1/2 3/4 | 5/6 7/8


    //+|+|+   -срабатывают оба события "рапорт"
    //|+|+    -вначале срабатывает событие "рапорт"
    //+|+|    -НЕ СРАБАТЫВАЕТ ВКОНЦЕ событие "рапорт"



    //    console.warn(SVG.RAP[i]);
    //    console.log(SVG.LIST[i]);
    //    if (SVG.RAP[i] != SVG.RAP[i - 1] && SVG.RAP[i - 1] !== undefined) console.error("qwe");
    if (SVG.RAP[i] != SVG.RAP[i - 1]) { //рапорт поменялся
      //      console.error("рапорт");
      //      console.error(
      //        "№стр" + num + " " +
      //        "№" + (i + 1) + " - " +
      //        SVG.RAP[i - 1] + ":" +
      //        SVG.RAP[i] + ":" +
      //        SVG.RAP[i + 1] +
      //        " рапорт"
      //      );
    }
    if (num == 1) { //первый символ
      //      console.error("1 символ");
      //      console.info(
      //        "№стр" + num + " " +
      //        "№" + (i + 1) + " - " +
      //        SVG.RAP[i - 1] + ":" +
      //        SVG.RAP[i] + ":" +
      //        SVG.RAP[i + 1] +
      //        " 1символ"
      //      );
    }
    if (num == SVG.holst.W) { //последний символ
      //      console.error("last символ ");
      //      console.info(
      //        "№стр" + num + " " +
      //        "№" + (i + 1) + " - " +
      //        SVG.RAP[i - 1] + ":" +
      //        SVG.RAP[i] + ":" +
      //        SVG.RAP[i + 1] +
      //        " lastCимвол"
      //      );
    }



    //    console.info(
    //      "№стр" + num + " " +
    //      "№" + (i + 1) + " - " +
    //      SVG.RAP[i - 1] + ":" +
    //      SVG.RAP[i] + ":" +
    //      SVG.RAP[i + 1] +
    //      ""
    //    );
    //    SVG.RAP[i]
    var ochered = " сред";
    if (num == 1) ochered = " перв";
    if (num == SVG.holst.W) ochered = " посл";
    var doo = SVG.RAP[i - 1];
    var posle = SVG.RAP[i + 1];
    if (doo === undefined) doo = "U";
    if (posle === undefined) posle = "U";
    var triger = "Рапорт";
    var qwe =

      num + "/" +
      thisSymbol +
      ochered + " " +
      doo + ":" +
      SVG.RAP[i] + ":" +
      posle + " " +
      triger;
    //    if (SVG.RAP[i] = 1 && SVG.RAP[i - 1] == 0)
    //    console.error("ДО " + SVG.RAP[i - 1] + "/" + SVG.RAP[i]);
    //    console.warn("ДО " + SVG.RAP[i - 1] + "/" + SVG.RAP[i]);



    if (num == SVG.holst.W) console.warn("---------------------------");
    //########################################################################









    if (num == 1) { //действия в начле каждой строки
      if (line != 1) { //if первый номер в сторке, то выводим закрывающий тег(кроме 1 строки)
        SVG.D = SVG.D + "</ul>";
      }
      var n = (SVG.nymberType == 2) ? line * 2 - 1 : line; //меняем вторую нумерацию
      SVG.D = SVG.D + "<ul><b>" + n + "-й ряд:</b> ";
    }
    //### ДО 1 ####################################################################
    if (doo == 0 && SVG.RAP[i] == 1) {
      console.error("до " + doo + "/" + SVG.RAP[i]);
      SVG.D = SVG.D + " <li><@</li> ";
    }
    if (num == 1 && SVG.RAP[i] == 1) {
      console.error("до перв");
      SVG.D = SVG.D + " <li><@</li> ";
    }
    //### ДО 2 ####################################################################
    if (SVG.nymberType == 1 && line % 2 === 0) { //если чётная строка и тип нумерации один
      // console.log("это чётная строка детка");
      thisSymbol = line * SVG.holst.W - num;
      nextSymbol = thisSymbol - 1; //неправильный символ в последнем элементе, но это не важно
    }
    // console.log(i+1+" "+SVG.LIST[thisSymbol]+" ts-"+thisSymbol+" nt-"+nextSymbol);
    if (SVG.LIST[thisSymbol] != SVG.LIST[nextSymbol] || num == SVG.holst.W) {
      //вывод если символ последний в строке
      //#TODO вывод если рапорт
      //вывод если следующий символ иной
      counter = 1; //обнуление счётчика
      var zpt = (num != SVG.holst.W) ? "," : ""; //убрать запятую у последнего элемента
      SVG.D = SVG.D + "<li><i>" + counter2 + "</i>&nbsp" + SVG.LIST[thisSymbol] + "</li>" + zpt + " ";
    }

    //### ПОСЛЕ 1 ####################################################################
    console.info(qwe);
    if (posle == 0 && SVG.RAP[i] == 1) {
      console.error("после " + posle + "/" + SVG.RAP[i]);
      SVG.D = SVG.D + " <li>@></li> ";
    }
    if (num == SVG.holst.W && SVG.RAP[i] == 1) {
      console.error("после last");
      SVG.D = SVG.D + " <li>@></li> ";
    }
    //### ПОСЛЕ 2 ####################################################################





    /*

<ul>
  <b>3-й ряд: </b>
  <li><i>2</i>дыни</li>
</ul>

    */
    //+новую строчку начинать с номера один даже если пеед этим такой же символ
    //+обнулять счётчик если символ другой
    //запятую в конце каждого символа кроме последнего
    //+не выводить повторы
    //+указание ряда
    //+перенос у второго и последующих рядов
    //
    //
    //
    //
    //у последнего символа запятая не ставится, определяется это так, если символ в последней строчке - запятую не выводим, однако последним символом может быть пустая клетка, которую в описание выводит не надо, таким образом последняя в ряду запись будет с запятой
    //указания рядов учитывая тип нумерации



    // console.log(this+" "+line+":"+num+" "+show+" "+show2+" "+show3+" "+counter2);





    SVG.GRID2.push(this + "");
    // SVG.GRID.push("dd");

  });
  //  console.log(SVG.LIST);
  SVG.D = SVG.D + "</ul>"; //закрываем список
  $("#container").html(SVG.D);
  // console.log(SVG.D);

}


/////////////////////////////
//нажатие/наведение
////

$(document).on({
  mouseenter: function () {
    $(this).parent().addClass('illumination-hover');
    //stuff to do on mouse enter
    // console.log("++");
  },
  mouseleave: function () {
    $(this).parent().removeClass('illumination-hover');
    // console.log("--");
    //stuff to do on mouse leave
  }
}, "#description b"); //pass the element as an argument to .on





$("body").on({
  mouseenter: function () {
    $(this).parent().addClass('illumination-hover');
    console.log($(this).text());
    //stuff to do on mouse enter
  },
  mouseleave: function () {
    console.log("-");
    //stuff to do on mouse leave
  }
}, "#description b7");



$("body").on("mouseout", "#description b", function () {}, function () {});

$('b').hover( // при наведении на1-йряд: - подсвечивать весь ряд
  function () {
    $(this).parent().addClass('illumination-hover');
  },
  function () {
    $(this).parent().removeClass('illumination-hover');
  }
);



$("body").on("click", "#description li", function () { /*закладка при клике на элемент*/
  if ($(this).hasClass("marker")) {
    $(this).removeClass("marker");
  } else {
    $(".marker").removeClass("marker");
    $(this).addClass("marker");
  }
});


$("body").on("click", "#description b", function () {
  $elm = $(this).parent();
  if ($elm.hasClass("illumination")) {
    $elm.removeClass("illumination");
  } else {
    $(".illumination").removeClass("illumination");
    $elm.addClass("illumination");
  }
});





/*
#container li.marker i{/* цифра в закладке* /background: orange;}
#container .illumination li{background: pink;}
  */
