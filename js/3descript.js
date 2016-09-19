if ("hintignore" == "OFF") {
  descrip();
  var SVG, $;
}


function descrip() { //генерация описания
  var counter = 1; //устанавливаем значение счётчика на единицу
  var str = ""; //записываем каждую строку сначала в переменную для отлова дубликатов
  var loopRap = 0; //кол-во петель в набор
  var loop = 0; //кол-во петель в набор

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
    //##### кол-во петель в набор ############
    function price() {
      //      console.info(SVG.LIST[i]);//#TODO высчитывать реальную цену символа из списка
      return 1;
    }
    if (line == 1) { //кол-во петель в набор
      if (SVG.RAP[thisSymbol] == 1) { //символ (в/не в) рапорте
        loopRap = loopRap + price();
      } else {
        loop = loop + price();
      }
      if (num == SVG.holst.W) {

        SVG.D = SVG.D +
          "Число петель кратно " +
          loopRap +
          " + " +
          loop +
          " + 2 кромочные петли. Каждый ряд начинать и заканчивать кромочной петлёй.";
      }
    }
    //##### кол-во петель в набор ############




    //действия в начле каждой строки
    if (num == 1) {
      str = ""; //очищаем строку
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
    var checkNextRaport = SVG.RAP[afterSymbol]; //указывает в рапорте ли следующий символ
    if ( //первая звёздочка перед 1 символом
      SVG.RAP[thisSymbol] == 1 && //текущий символ в рапорте И...
      num == 1 //текущий символ 1 в строке
    ) {
      str = str + "<li class='raport r'>*</li>"; //💩
    }
    if ( //первая звёздочка в прочих случаях
      SVG.RAP[thisSymbol] === 0 && //символ не в рапорте И...
      checkNextRaport == 1 && //следующий символ в рапорте
      num != SVG.holst.W //символ не последний в строке
    ) {
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
      afterStar = "<li class='raport l'>*</li>" + //💩
        " повторять от&nbsp<li class='raport l'>*</li> до&nbsp<li class='raport l'>*</li>" +
        more //если это не конец строки то выводим "закончить ряд"
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
      str = str +
        "<li><i>" + //открываем теги номера и символа
        counter2 + //кол-во элементов подряд
        "</i>&nbsp" + //закрываем тег номера+ неразрывный пробел
        SVG.LIST[thisSymbol] + "</li>" + //вставляем название символа и закрываем тег
        afterStar + //вторая звёздочка если есть
        zpt + //запятая
        " " + // пробел, перенести в запятую мб?
        beforeStar //первая звёздочка если есть
      ;
    }
    if (num == SVG.holst.W) { //если последний элемент в строке то ставим закрывающий тег
      str = str + "</ul>";
    }
    //отсев дубликатов
    if (num == SVG.holst.W) { //последний символ в строке
      var n = (SVG.nymberType == 2) ? line * 2 - 1 : line; //меняем 2ю нумерацию
      SVG.DOUBLE1[n] = str; //вывод всех строчек в массив
      if (SVG.DOUBLE2[str] === undefined) { //поиск дуликатов
        SVG.DOUBLE2[str] = n; //вывод только первого совпадения в массив
      }
    }


    // SVG.GRID2.push(this + ""); //#TODO вспомнить что это
    // SVG.GRID.push("dd");

  }); //перебор списка клеток END
  //ПЕРЕБОР СТРОК С ОТСЕВОМ ДУБЛИКАТОВ
  $.each(SVG.DOUBLE1, function (i) {
    if (SVG.DOUBLE2[this]) {
      if (i == SVG.DOUBLE2[this]) {
        SVG.D = SVG.D + "<ul><b>" + i + "-й ряд:</b> " + this;
      } else {
        SVG.D = SVG.D + "<ul><b>" + i + "-й ряд:</b> вязать как <li>" + SVG.DOUBLE2[this] + "-й ряд</li></ul>";
      }
    }
  });
  //## последняя строка #############
  if (qwe === undefined) {
    var qwe = 777;
  }
  qwe = 33;
  //если тип нумерации 1 и 3 то выводить номер последнего ряда
  //если тип нумерации 2 то выводить номер последнего ряда плюс один
  console.log(SVG.DOUBLE1);

  SVG.D = SVG.D + "Повторять узор в высоту с 1-го по " + qwe + "-й ряд.";
  //## последняя строка #############

  //  console.log(SVG.LIST);
  $("#container").html(SVG.D); //выводим в HTML
  //  console.warn(SVG.GRID2);
  //  console.log(SVG.D + "qwe");
  //  console.log(SVG.DOUBLE1);
  //  console.log(SVG.DOUBLE2);

}
