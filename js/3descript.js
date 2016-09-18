if ("hintignore" === 0) {
  descrip();
  var SVG, $;
}


function descrip() { //генерация описания
  var counter = 1; //устанавливаем значение счётчика на единицу
  var str = "";
  SVG.RAP.reverse(); //переворачиваем задом наперёд массив рапорта
  $.each(SVG.LIST.reverse(), function (i) { //перебор списка клеток
    //      console.log(SVG.D);
    var counter2 = counter; //копируем значение счётчика в текущем цикле
    counter++; //увеличиваем значение счётчика
    var line = 1 + i / SVG.holst.W | 0; //текущая строка
    var num = 1 + i - ((i / SVG.holst.W | 0) * SVG.holst.W); //текущий номер в строке
    var thisSymbol = i; //копиуем текущий символ чтобы можно было его переопределить во втором типе нумерации
    var afterSymbol = i + 1; //копируем следующий символ для тех же целей
    var beforeSymbol = i - 1; //копируем следующий символ для тех же целей
    var zpt = (num != SVG.holst.W) ? "," : ""; //убрать запятую у последнего элемента

    //# DUPLICATE ###############
    if (num == 1) { //первый сивол в строке;
      str = ""; //DUPLICATE
    }
    //# DUPLICATE end ###############


    //действия в начле каждой строки
    if (num == 1) {
      var n = (SVG.nymberType == 2) ? line * 2 - 1 : line; //меняем вторую нумерацию
      SVG.D = SVG.D + "<ul><b>" + n + "-й ряд:</b> ";
      //  str = str + "<ul><b>" + n + "-й ряд:</b> "; //DUPLICATE
    }
    //ЧЁТНАЯ СТРОКА В "1" ТИПЕ НУМЕРАЦИИ
    if (SVG.nymberType == 1 && line % 2 === 0) {
      thisSymbol = line * SVG.holst.W - num; //отсчитываем с конца
      beforeSymbol = thisSymbol + 1; //предыдущий символ с другой стороны
      afterSymbol = thisSymbol - 1; //следующий символ с другой стороны
      //beforeSymbol и afterSymbol неправильный символ в последнем элементе, но это не важно 14.09.16
    }



    //РАПОРТ
    var beforeStar = "";
    var afterStar = "";
    //var doo = SVG.RAP[beforeSymbol]; //DEL
    var checkNextRaport = SVG.RAP[afterSymbol]; //указывает в рапорте ли следующий символ
    if ( //первая звёздочка перед 1 символом
      SVG.RAP[thisSymbol] == 1 && //текущий символ в рапорте И...
      num == 1 //текущий символ 1 в строке
    ) {
      SVG.D = SVG.D + "<li class='raport r'>*</li>"; //💩
      str = str + "<li class='raport r'>*</li>"; //💩DUPLICATE
    }
    if ( //первая звёздочка в прочих случаях
      SVG.RAP[thisSymbol] === 0 && //символ не в рапорте И...
      checkNextRaport == 1 && //следующий символ в рапорте
      num != SVG.holst.W //символ не последний в строке
    ) {
      console.error("до ЗА1");
      beforeStar = "<li class='raport r'>*</li>"; //💩
    }
    if ( //вторая звёздочка
      SVG.RAP[thisSymbol] == 1 && //если текущий символ в рапорте И...
      (num == SVG.holst.W || //символ последний в строке ИЛИ..
        checkNextRaport === 0) //следующий символ не в рапорте
    ) {
      zpt = ""; //рас выводим рапорт, то запятая не нужна
      var more = "";
      if ( //выводим "закончить ряд"
        checkNextRaport === 0 && //если далее ещё есть символы И...
        num != SVG.holst.W //символ не последний в строке
      ) {
        more = ", закончить ряд";
      }
      //      console.error("после UNI");
      afterStar = "<li class='raport l'>*</li>" + //💩
        //" повторять от * до *" + // после 2звёздочки, запятой и пробела "*, "
        " повторять от&nbsp<li class='raport l'>*</li> до&nbsp<li class='raport l'>*</li>" + // после 2звёздочки, запятой и пробела "*, "
        more //если это не конец строки
      ;
    } //рапорт END
    //ВЫВОД
    if ( //триггеры вывода элементов в описание
      SVG.LIST[thisSymbol] != SVG.LIST[afterSymbol] || //если следующий символ иной
      num == SVG.holst.W || //если символ последний в строке
      afterStar || // вывод первой звёздочки
      beforeStar //вывод второй звёздочки
    ) {
      counter = 1; //обнуление счётчика
      SVG.D = SVG.D +
        "<li><i>" + //открываем теги номера и символа
        counter2 + //кол-во элементов подряд
        "</i>&nbsp" + //закрываем тег номера+ неразрывный пробел
        SVG.LIST[thisSymbol] + "</li>" + //вставляем название символа и закрываем тег
        afterStar + //вторая звёздочка если есть
        zpt + //запятая
        " " + // пробел, перенести в запятую мб?
        beforeStar //первая звёздочка если есть
      ;
      str = str +
        "<li><i>" + //открываем теги номера и символа
        counter2 + //кол-во элементов подряд
        "</i>&nbsp" + //закрываем тег номера+ неразрывный пробел
        SVG.LIST[thisSymbol] + "</li>" + //вставляем название символа и закрываем тег
        afterStar + //вторая звёздочка если есть
        zpt + //запятая
        " " + // пробел, перенести в запятую мб?
        beforeStar //первая звёздочка если есть
      ; //DUPLICATE
    }
    if (num == SVG.holst.W) { //если последний элемент в строке то закрывающий тег
      SVG.D = SVG.D + "</ul>";
      str = str + "</ul>"; //DUPLICATE
    }




    //# DUPLICATE ###############

    if (num == SVG.holst.W) { //последний символ в строке
      var qqq = (SVG.nymberType == 2) ? line * 2 - 1 : line; //меняем 2ю нумерацию #FIXME qqq изменить на n
      //      str = str + "<ul><b>" + qqq + "-й ряд:</b> "; //DUPLICATE
      SVG.DOUBLE1[qqq] = str;
      if (SVG.DOUBLE2[str] === undefined) {
        SVG.DOUBLE2[str] = qqq;
      }
    }
    //# DUPLICATE end ###############



    //### TEST STAR ПОСЛЕ 1 ####################################################################
    /*
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

    //    console.info(qwe); //test параметры символа
    //test новая строка
    //    if (num == SVG.holst.W) console.warn("---------------------------"); //jshint ignore:line
*/
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
  $.each(SVG.DOUBLE1, function (i) { //перебор списка клеток
    if (SVG.DOUBLE2[this]) {
      if (i == SVG.DOUBLE2[this]) {
        console.log(i + " - " + this);
        SVG.D2 = SVG.D2 + "<ul><b>" + i + "-й ряд:</b> " + this;
      } else {
        console.log(i + "-й ряд: вязать как " + SVG.DOUBLE2[this] + "-й ряд");
        SVG.D2 = SVG.D2 + "<ul><b>" + i + "-й ряд:</b> вязать как <li>" + SVG.DOUBLE2[this] + "-й ряд</li></ul>"; //#FIXME оформление html
      }
    }
  });


  //  console.log(SVG.LIST);
  $("#container").html(SVG.D2);

  //  console.log(SVG.DOUBLE1);
  //  console.log(SVG.DOUBLE2);

}
