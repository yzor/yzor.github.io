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
    var nextSymbol = i + 1; //#TODO удалить
    var afterSymbol = i + 1; //копируем следующий символ для тех же целей
    var beforeSymbol = i - 1; //копируем следующий символ для тех же целей
    //########################################################################
    var ochered = " ср";
    if (num == 1) ochered = " пе"; //jshint ignore:line
    if (num == SVG.holst.W) ochered = " по"; //jshint ignore:line


    //    if (SVG.RAP[i] = 1 && SVG.RAP[i - 1] == 0)
    //    console.error("ДО " + SVG.RAP[i - 1] + "/" + SVG.RAP[i]);
    //    console.warn("ДО " + SVG.RAP[i - 1] + "/" + SVG.RAP[i]);



    //    console.warn("qwe-" +
    //      (line * SVG.holst.W - num)
    //    );
    //########################################################################









    if (num == 1) { //действия в начле каждой строки
      if (line != 1) { //if первый номер в сторке, то выводим закрывающий тег(кроме 1 строки)
        SVG.D = SVG.D + "</ul>";
      }
      var n = (SVG.nymberType == 2) ? line * 2 - 1 : line; //меняем вторую нумерацию
      SVG.D = SVG.D + "<ul><b>" + n + "-й ряд:</b> ";
    }
    if (SVG.nymberType == 1 && line % 2 === 0) { //если чётная строка и тип нумерации один
      // console.log("это чётная строка детка");
      thisSymbol = line * SVG.holst.W - num; //отсчитываем с конца
      beforeSymbol = thisSymbol + 1; //предыдущий символ с другой стороны
      afterSymbol = thisSymbol - 1; //следующий символ с другой стороны
      //beforeSymbol и afterSymbol неправильный символ в последнем элементе, но это не важно 14.09.16
      nextSymbol = thisSymbol - 1; //#TODO удалить
    }
    //### ДО 1 ####################################################################
    //doo

    var doo = SVG.RAP[beforeSymbol]; //#TODO избавится
    var posle = SVG.RAP[afterSymbol]; //#TODO избавится
    if (doo === undefined) doo = "U"; //#TODO избавится
    if (posle === undefined) posle = "U"; //#TODO избавится




    if (doo == 0 && SVG.RAP[thisSymbol] == 1) {
      console.error("до " + doo + "/" + SVG.RAP[thisSymbol]);
      SVG.D = SVG.D + " <li><@</li> ";
    }
    if (num == 1 && SVG.RAP[thisSymbol] == 1) {
      console.error("до перв");
      SVG.D = SVG.D + " <li><@</li> ";
    }
    //### ДО 2 ####################################################################
    // console.log(i+1+" "+SVG.LIST[thisSymbol]+" ts-"+thisSymbol+" nt-"+nextSymbol);
    if (SVG.LIST[thisSymbol] != SVG.LIST[nextSymbol] || num == SVG.holst.W) {
      //вывод если символ последний в строке
      //#TODO вывод если рапорт
      //вывод если следующий символ иной
      counter = 1; //обнуление счётчика
      var zpt = (num != SVG.holst.W) ? "," : ""; //убрать запятую у последнего элемента
      SVG.D = SVG.D + "<li><i>" + counter2 + "</i>&nbsp" + SVG.LIST[thisSymbol] + "</li>" + zpt + " ";
    }
    var qwe =
      //      "c-" + counter + "|" +
      //      "c2-" + counter2 + "|" +
      //      "l-" + line + "|" +
      "" + (i - 1) + "<" + i + ">" + (i + 1) + "|" +
      //      "n-" + num + "|" +
      beforeSymbol + "<" +
      thisSymbol + ">" +
      afterSymbol + "|" + SVG.LIST[thisSymbol]
      //+ ochered
      //    + " " + doo + ":" + SVG.RAP[i] + ":" + posle
    ;

    //### ПОСЛЕ 1 ####################################################################
    //posle = after
    console.info(qwe);
    if (posle == 0 && SVG.RAP[thisSymbol] == 1) {
      console.error("после " + posle + "/" + SVG.RAP[thisSymbol]);
      SVG.D = SVG.D + " <li>@></li> ";
    }
    if (num == SVG.holst.W && SVG.RAP[thisSymbol] == 1) {
      console.error("после last");
      SVG.D = SVG.D + " <li>@></li> ";
    }
    //### ПОСЛЕ 2 ####################################################################
    if (num == SVG.holst.W) console.warn("---------------------------"); //test





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
