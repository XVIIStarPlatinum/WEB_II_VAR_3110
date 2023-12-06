<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>400</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/style.css">
    <link rel="icon" href="img/1610x2048_0xac120004_12729490751685971103.jpeg">
</head>
<body>
<div class="container">
    <jsp:include page="header.html"/>
    <div class="content">
        <p style="font-size: 20px;">Неправильный запрос (и его поймал <b>фильтр</b>)</p>
        <br>
        <img src="${pageContext.request.contextPath}/img/400.jpg" alt="Ошибка 400" width="750">
    </div>
</div>
<jsp:include page="footer.html"/>
</body>
</html>