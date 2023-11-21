Короче, какой-то негодяй попытался обмануть всю ПИиКТ, удалив этот метод, поэтому я заархивировал этот фрагмент.

Вариант 1:
Загружаем WildFly в свою папку
https://docs.google.com/document/d/1ERKz7M5CnF_sDTW6Fkhw4zmlbiLbEUtRtWUz8PIujSQ/edit
В 316 строчке в standalone.sh убираем скобки AGENT_SET = $(...)
В файле standalone.xml листаем вниз и ставим свой offset. Ваш порт будет 8080 + offset
В папку deployments загружаем war файл
Запускаем bin/standalone.sh
Заходим в командную строку и пробрасываем порты:
ssh -L PORT:localhost:PORT sXXXXXX@helios.se.ifmo.ru -p 2222
Вводим пароль и заходим на localhost:PORT/var_name

Вариант 1, подробно:
Открываете WinSCP, создаете директорию для своей лабы, перетаскиваете туда папку с разархивированным WildFly

В этой папке есть директория bin, находите в ней файл standalone.sh. В его содержимом в стоке 316 убираете скобки, должно получится:
=$echo "MODULE_OPTS" | $GREP "\-javaagent:


Возвращаемся в главную папку WildFly, открываем standalone/configuration/standalone.xml, в самом конце есть тег socket-binding-group, у него есть атрибут port-offset, которому присваивается смещение, там нужно написать свое число:

port-offset="${jboss.socket.binding.port-offset:<ваше смещение>}

Тогда ваш номер вашего порта будет равен значению port из дочернего тега <socket-binding name="http" port="${jboss.http.port:8080}"/>( по дефолту это 8080) плюс смещение.

Например, здесь номер порта будет 8080+1020 = 9100:
```xml
<socket-binding-group name="standard-sockets" default-interface="public" port-offset="${jboss.socket.binding.port-offset:1020}">
    	<socket-binding name="ajp" port="${jboss.ajp.port:8009}"/>
    	<socket-binding name="http" port="${jboss.http.port:8080}"/>
    	<socket-binding name="https" port="${jboss.https.port:8443}"/>
			*тут другие дочерние теги *
</socket-binding-group>
```
Возвращаемся в главную директорию WildFly, переходим в каталог standalone/deployments, перетаскиваем сюда из идеи ваш собранный варник(убедитесь, что вы загружаете нормальный вариант)
bash bin/standalone.sh
возвращаемся в главную директорию WildFly, прописываем команду, это запускает ваш сервер. Могут быть ошибки, например, если этот порт уже занят, придется вернуться на шаг 3) и указать другое смещение

Открываете командную строку вашей локальной машины!!! Не с Гелиосом! И прописываете команду:
ssh -L PORT:localhost:PORT sXXXXXX@helios.se.ifmo.ru -p 2222
вместо PORT без пробелов подставляете номер вашего порта, полученного на шаге 3)
Далее вам нужно будет ввести пароль от хелиоса

Остается открыть браузер и ввести http://localhost:18100/web3-1.0-SNAPSHOT.
 Если все прошло нормально, то на этом localhost:<номер порта>
 адресе должна быть странична WildFly

Вот это метод, который находится на гитхабе Бориса Дворкина (worthant/MVC-GeoValidator/blob/main/README-ru.md). В теории он рабочий, но первый метод всё-таки попроще и лично для меня сработал)
Вариант 2:
1) скачать zip-архив с wildfly с его сайта;
        2) этот архив распаковать, полученную папку поместить на гелиос;
        2*) на гелиос заходить, пробрасывая порты на тот порт, на котором будете 	смотреть лабу (дальше про номер порта и portbase чуть подробнее)
        3) в этой папке (которая уже на гелиосе) найти файл standalone.xml по пути standalone/configuration/standalone.xml
        В этом файле заменить
        <interface name="public">
         <inet-address value="${jboss.bind.address:127.0.0.1}"/>
         </interface>
        на
        <interface name="public">
         <any-address/>
         </interface>
        а также строчку
        <socket-binding name="http" port="${jboss.http.port:8080}"/>
        на ваш Portbase из гугл-таблички по вебу (+ необязательно добавить к нему число от 0 до 99, т.к. Portbase выдают с расчётом, что 100 портов, идущие после него, тоже ваши, и вы их можете спокойно использовать}"/>
   5) чтобы задеплоить лабу, первое - запускаете сервер:
        bash <путь к wildfly>/bin/standalone.sh
        второе - копируете war-архив с вашей лабой в папку <путь к wildfly>/standalone/deployments
   6) Если пробрасывали порты, то лаба доступна по адресу localhost:<ваш порт>/lab2
