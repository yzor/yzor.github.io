function description(QWE) { //генерация описания
  //++перебор осуществляется с конца
  //++чётные строки в 1 типе нумерации в обрадном порядке/9
  //+отсеивать одинаковые ряды учитывая направление вязания (1 тип нумерации)
  //+в ряду все одинаковые/9
  //+пустые ячейки/13
  //+счётчик повтора одинаковых символов
  //+указание номера ряда учитывая нумерацию
  //сколнения
  //символы исключения → (3 вм) по факту 1 символ, а в счётчике 3?
  //расширенное описание у некторых символов при первом вхождении
  //+рассчитать кол-во петель вряду
  //+найти первый ряд с рапортом для рассчёта кол-ва петель
  //+выводить надпись о том скакого по какойряд повторять
  //+найти последний ряд с рапортом для правильного вывода с каого по какой ряд повторять
  //для каждого символа при выводе либо в класс либо в data прописывать номера клеток
  //+не выводить кол-во петель вне рапорта если сумма равняется 0
  //+во втором типе нумерации повторять от до - прибавлять один до чётного числа
  //если первый ряд срапортом не высчитывается, (провязать как 3 ряд) , то проследить чтоб кол-во петель в ряду высчитывалось

  function Fprice(L) { //#TODO удалить
    // console.warn(L);
    var n = 3;
    if (L === undefined) n = 0;
    // if(L===undefined)console.error("UUUU");
    if (L == "НАК") n = 0;
    if (L == "ЛИЦ") n = 2;
    if (L == "ИЗН") n = 1;
    return n;
  }


  //номер ряда
  function rowN(n) {
    if (QWE.nymberType == 2) { //если нумерация 2
      n = n * 2; //то пропускаем все чётные
    }
    n++; //прибавляем 1 дабы привести к человеческому виду
    return n;
  } //console.log(rowN(i)+"-й ряд: ");

  var D = ""; //описание
  var douRow = {}; //дубликаты рядов
  var repDouRow = []; //дубликаты подряд
  var loopRap = 0; //кол-во петель в набор
  var loop = 0; //кол-во петель в набор


  //читаем справа снизу с поправкой на 1 нумерацию
  QWE.PIX.reverse(); //читаем строки снизу
  $.each(QWE.PIX, function (i) { //перебор списка рядов
    if (QWE.nymberType != 1 || i + 1 & 1) { //если нумерация не 1 или чётный ряд
      QWE.PIX[i].reverse(); //переворачиваем ряд
    }
  });

  //парсинг описания
  $.when.apply($, deferreds).done(function () { //дождатся окончания ajax
    $.each(QWE.PIX, function (i) { //перебор списка рядов

      var LINE = ""; //собираем строку в данной переменной

      //вывод одинаковых рядов в виде "7ряд: провязать как 3"
      var oneRow = QWE.PIX[i]; //берём ряд
      if (
        QWE.holst.w != QWE.raport.w && //ширина рапорта и холста НЕ равны
        QWE.holst.h - QWE.raport.b <= i && QWE.holst.h - QWE.raport.t > i //в ряду есть рапорт
      ) {
        oneRow = QWE.PIX[i] + "R"; //добавляем R к ряду, дабы отличать ряды в рапотре
      }
      if (douRow[oneRow] !== undefined) { //если ряд уже есть
        if (QWE.PIX[i] + "" == QWE.PIX[i + 1] + "") { //если следующий ряд такой-же, то сразу не выводим
          repDouRow.push(rowN(i)); //делаем список одинаковых рядов подряд
        } else { //ежели следующий ряд иной
          LINE += "повтор " + rowN(douRow[oneRow]) + " ряда ";
          if (repDouRow[0]) { //если уже были повторы
            // вывод всех элементов через запятую
            // if(QWE.nymberType==2){//если вторая нумерация, то выводить все элементы через запятую
            //   D+=repDouRow+","+rowN(i)+"й ряды: "+LINE+"\n<br>";
            // }else{
            //   D+=repDouRow[0]+"-"+rowN(i)+"й ряды: "+LINE+"\n<br>";
            // }
            D += repDouRow[0] + "-" + rowN(i) + "й ряды: " + LINE + "\n<br>";
          } else {
            D += rowN(i) + "-й ряд: " + LINE + "\n<br>";
          }
        }
        return; //не продолжать вычисления если подобный ряд уже есть
      } else { //если такого ряда не было, то записываем
        douRow[oneRow] = i;
        repDouRow = []; //обнуляем повторы
      }

      //Символ в рапорте?
      function isRap(y, x) {
        if (x > QWE.holst.w - 1 || x < 0) {
          return false; //защита от рапорта больше холста, only-X
        }
        if (QWE.nymberType != 1 || y + 1 & 1) { //чётный ряд
          x = QWE.holst.w - x; //в первом типе нумерации
        } else {
          x++;
        }
        y = QWE.holst.h - y;
        if (x > QWE.raport.l && x <= QWE.raport.r && y > QWE.raport.t && y <= QWE.raport.b) {
          return true;
        } else {
          return false;
        }
      }

      var v = []; //v - значит Vtoroy perebor ryada
      var sameAll = 0; //для однотипных строк

      $.each(QWE.PIX[i], function (I) { //1ый перебор ряда

        //кол-во петель в набор
        if (i === 0) { //первый ряд
          var iRap = QWE.holst.h - QWE.raport.b; //первый ряд с рапортом
          if (isRap(iRap, I)) { //если есть рапорт
            loopRap = PRICE(QWE.PIX[iRap][I]) + loopRap;
          } else {
            loop = PRICE(QWE.PIX[iRap][I]) + loop;
          }
          if (I + 1 == QWE.holst.w) { //последний в ряду
            if (loop) {
              loop = " + " + loop;
            } else {
              loop = "";
            } //если 0 то убираем
            D = "Число петель кратно " +loopRap + loop + " + 2 кромочные петли. Каждый ряд начинать и заканчивать кромочной петлёй.<br>" + D;
          }
        }


        //если все символы как первый, то все одинаковые
        //возможно стоит перебросить во второй перебор
        if (QWE.PIX[i][I] == QWE.PIX[i][1]) {
          sameAll++;
          if (sameAll == QWE.PIX[i].length) {
            // console.warn("Все одинаковые",QWE.PIX[i]);
            D += rowN(i) + "-й ряд: все " + QWE.PIX[i][0] + "\n<br>";
            return; //не продолжать вычисления если все одинаковые
          }
        }

        //отсев пустых клеток
        if (QWE.PIX[i][I]) {
          v.push(I);
        }

        var counter = 0; //счётчик петель

        if (QWE.holst.w == I + 1) { //последний элемент в ряду первого перебора, начинаем второй

          $.each(v, function (I) { // 2 перебор only закрашеных клеток

            counter++; //увеличиваем счётчик петель
            var spase = ", "; //пунктуация, а также вторая звёздочка
            //var inf1 = isRap(i,v[I]) ? "#" : " ";//рапорт
            //var inf2=[];
            var BbIBOD; //триггеры вывода
            if (I + 1 == v.length) { /*inf2.push("LAST");*/
              spase = "";
            } //последний символ, удаляем пробел
            if (!isRap(i, v[I]) && isRap(i, v[I + 1])) { /*inf2.push("1*");*/
              BbIBOD = true;
            } //вывод перед 1 звёздочкой
            if (isRap(i, v[I]) && !isRap(i, v[I - 1])) { /*console.warn("*1");*/
//              LINE += "(1*)";
              LINE += '<span class="star">*</span>';

            } //Первая звёздочка
            if (isRap(i, v[I]) && !isRap(i, v[I + 1])) {
              spase = "* повторять от * до *";
              BbIBOD = true;
            } //конец рапорта/2*
            if (isRap(i, v[I]) && !isRap(i, v[I + 1]) && v[I + 1]) {
              spase += ", закончить ряд ";
            } //если существует символ после рапорта
            if (QWE.PIX[i][v[I]] != QWE.PIX[i][v[I + 1]]) { /*inf2.push("nextSim");*/
              BbIBOD = true;
            } //следующий символ другой

            //inf2.push(spase);//,_
            // console.log(inf1, v[I],[counter,QWE.PIX[i][v[I]]],inf2);
            // LINE=LINE+QWE.PIX[i][v[I]]+" ";
            if (BbIBOD) //если хоть один триггер сработал то выводим

              LINE += RUS(counter, QWE.PIX[i][v[I]]) + spase;
            //            LINE += "<span><span>" + counter + "</span>" + "-" + QWE.PIX[i][v[I]] + "</span>" + spase;

            if (QWE.PIX[i][v[I]] != QWE.PIX[i][v[I + 1]]) counter = 0; //если следующий символ другой
            if (!isRap(i, v[I]) && isRap(i, v[I + 1])) counter = 0; //сброс перед 1*
            if (isRap(i, v[I]) && !isRap(i, v[I + 1])) counter = 0; //сброс перед 2*
            // if(  isRap(i,v[I])&&!isRap(i,v[I+1])   ) console.warn("*2");//Вторая звёздочка

          }); //2 перебор onlyзакрашеных END
          // console.info(LINE);
          D += "<p><b>"+rowN(i) + "-й ряд:</b> " + LINE + "</p>";

        }
      }); //1перебор ряда END
    }); //перебор рядов END
    // console.error(RUS(3,"лицевая"));
    // console.error(PRICE("лицевая"));
    //потвор узора в высоту без учёта рапорта в одну клетку высотой
    var a = rowN(QWE.holst.h - QWE.raport.t - 1); //по
    var b = rowN(QWE.holst.h - QWE.raport.b); //с
    if (QWE.nymberType == 2) a++; //если второй тип нумерации то увеличить на один, до чётного
    D += "Повторять узор в высоту с " + b + "-го по " + a + "-й ряд.";

    $("#description").html(D); //выводим описание
  }); //end ajax
}
