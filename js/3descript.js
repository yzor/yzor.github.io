if ("hintignore" === 0) {
  descrip();
  var SVG, $, document;
}


function descrip() { //генерация описания
  var counter = 1; //устанавливаем значение счётчика на единицу
  $.each(SVG.LIST /*.reverse() #FIXME вернуть перебор с конца*/ , function (i) { //перебор списка клеток
    //      console.log(SVG.D);
    var counter2 = counter; //копируем значение счётчика в текущем цикле
    counter++; //увеличиваем значение счётчика
    var line = 1 + i / SVG.holst.W | 0; //текущая строка
    var num = 1 + i - ((i / SVG.holst.W | 0) * SVG.holst.W); //текущий номер в строке
    var thisSymbol = i; //копиуем текущий символ чтобы можно было его переопределить во втором типе нумерации
    var afterSymbol = i + 1; //копируем следующий символ для тех же целей
    var beforeSymbol = i - 1; //копируем следующий символ для тех же целей






    //действия в начле каждой строки
    if (num == 1) {
      if (line != 1) { //if первый номер в сторке, то выводим закрывающий тег(кроме 1 строки)
        SVG.D = SVG.D + "</ul>";
      }
      var n = (SVG.nymberType == 2) ? line * 2 - 1 : line; //меняем вторую нумерацию
      SVG.D = SVG.D + "<ul><b>" + n + "-й ряд:</b> ";
    }
    //ЧЁТНАЯ СТРОКА В "1" ТИПЕ НУМЕРАЦИИ
    if (SVG.nymberType == 1 && line % 2 === 0) {
      thisSymbol = line * SVG.holst.W - num; //отсчитываем с конца
      beforeSymbol = thisSymbol + 1; //предыдущий символ с другой стороны
      afterSymbol = thisSymbol - 1; //следующий символ с другой стороны
      //beforeSymbol и afterSymbol неправильный символ в последнем элементе, но это не важно 14.09.16
    }



    //РАПОРТ
    //
    //поблемы:
    //1. читать рапорт надо с конца(отключил для тестов глобальный реверс)
    //2. проблемы с первой звёздочкой
    // т.к. звёздочка ставится перед символом, и по сути относится к предыдущему символу, то обнуление с выводом происходит на символ раньше
    //2.v1.0 если звёздочку выводить вместе с предыдущим символом, то как быть с 1 символом в строке, обрабатывать отдельно?
    //2.v1.1 Cделать отдельный триггер (если текущий не рапорт, а следующий рапорт)
    //2.v1.2 выводить звёздочку впереди если (текущий символ первый и он рапорт)
    //2.v2 выводить первую звёздочку отдельно, но триггеры сброса то всёравно нужны!!!



    var beforeStar = "";
    var afterStar = "";
    var zpt = (num != SVG.holst.W) ? "," : ""; //убрать запятую у последнего элемента
    var doo = SVG.RAP[beforeSymbol]; /*jshint ignore:line*/ //#TODO избавится
    var posle = SVG.RAP[afterSymbol]; //#TODO избавится
    if ( //первая звёздочка перед 1 символом
      SVG.RAP[thisSymbol] == 1 && //текущий символ в рапорте И...
      num == 1 //текущий символ 1 в строке
    ) {
      SVG.D = SVG.D + "<li>(#</li> "; //#TODO - пробел в конце убрать, но добавить через css
    }
    if ( //первая звёздочка в прочих случаях
      SVG.RAP[thisSymbol] === 0 && //символ не в рапорте И...
      posle == 1 && //следующий символ в рапорте
      num != SVG.holst.W //символ не последний в строке
    ) { //TODO если рапорт 1 символом обработать отдельно
      console.error("до ЗА1");
      beforeStar = "<li>(@</li> "; //#TODO - пробел в конце убрать, но добавить через css
    }
    //    if ( //первая звёздочка v1
    //      SVG.RAP[thisSymbol] == 1 && //Если текущий символ в рапорте И...
    //      (num == 1 || //если текущий символ 1 в строке ИЛИ...
    //        doo === 0) //если до этого символа символ не из рапорта
    //    ) {
    //      console.error("до UNI");
    //      beforeStar = "<li>(@</li> "; //#TODO - пробел в конце убрать, но добавить через css
    //    }
    if ( //вторая звёздочка
      SVG.RAP[thisSymbol] == 1 && //если текущий символ в рапорте И...
      (num == SVG.holst.W || //символ последний в строке ИЛИ..
        posle === 0) //следующий символ не в рапорте
    ) {
      zpt = ""; //если выводим рапорт, то запятая не нужна
      var more = "";
      if ( //выводим "закончить ряд"
        posle === 0 && //если далее ещё есть символы И...
        num != SVG.holst.W //символ не последний в строке
      ) {
        more = ", закончить ряд"; //#FIXME  сделать проверку чтобы не тырило данные из следующего ряда
      }
      console.error("после UNI");
      afterStar = " <li>@)</li>" + //#TODO - пробел в начале убрать, но добавить через css
        " повторять от * до *" + // после 2звёздочки, запятой и пробела "*, "
        more //если это не конец строки
      ;
    } //рапорт END

    // console.log(i+1+" "+SVG.LIST[thisSymbol]+" ts-"+thisSymbol+" nt-"+nextSymbol);
    if ( //триггеры вывода элементов в описание
      SVG.LIST[thisSymbol] != SVG.LIST[afterSymbol] || //если следующий символ иной
      num == SVG.holst.W //если символ последний в строке
      // вывод в конце рапорта работает #FIXME в 1 нумерации -чётных рядах ошибка
      || afterStar || //jshint ignore:line
      //(SVG.RAP[thisSymbol] === 0 && posle == 1) //текущий символ в рапорте А следующий не в рапорте (1*)



      beforeStar /*jshint ignore:line*/ //#FIXME неправильное срабатывание тригера при 1 звёздочке OLD VERSION
    ) {


      counter = 1; //обнуление счётчика
      SVG.D = SVG.D +
        "<li><i>" + //открываем теги номера и символа
        counter2 + //кол-во элементов подряд
        "</i>&nbsp" + //закрываем тег номера+ неразрывный пробел
        SVG.LIST[thisSymbol] + "</li>" + //вставляем название символа и закрываем тег
        afterStar + //вторая звёздочка если есть
        zpt + //запятая
        " " + // пробел #TODO перенести в запятую мб?
        beforeStar //первая звёздочка если есть
      ;
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

    //### TEST STAR ПОСЛЕ 1 ####################################################################
    console.info(qwe); //test параметры символа
    //test новая строка
    if (num == SVG.holst.W) console.warn("---------------------------"); //jshint ignore:line

    //### TEST STAR ПОСЛЕ 2 ####################################################################





    /*

<ul>
  <b>3-й ряд: </b>
  <li><i>2</i>дыни</li>
</ul>

    */
    //+новую строчку начинать с номера один даже если пеед этим такой же символ
    //+обнулять счётчик если символ другой
    //+запятую в конце каждого символа кроме последнего
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


$("body").on("click", "#description b", function () { //FIXME убрать //jshint ignore:line и вставить var
  $elm = $(this).parent(); //jshint ignore:line
  if ($elm.hasClass("illumination")) { //jshint ignore:line
    $elm.removeClass("illumination"); //jshint ignore:line
  } else {
    $(".illumination").removeClass("illumination");
    $elm.addClass("illumination"); //jshint ignore:line
  }
});





/*
#container li.marker i{/* цифра в закладке* /background: orange;}
#container .illumination li{background: pink;}
  */
