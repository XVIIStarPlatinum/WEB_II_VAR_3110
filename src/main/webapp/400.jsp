<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>400</title>
    <link rel="stylesheet" type="text/css" href="<c:url value="/assets/style.css"/>">
<%--    <link rel="shortcut icon" href="<c:url value="images/biscuit.png"/>" type="image/x-icon"/>--%>
</head>
<body>
<div class="container">
    <jsp:include page="header.html"/>
    <div class="content">
        <p style="font-size: 20px;">Неправильный запрос (и его поймал <b>фильтр</b>)</p>
        <br>
        <img src="<c:url value="/images/400.jpg"/>" alt="Ошибка 400" width="500px">
    </div>
</div>

<jsp:include page="footer.html"/>

</body>
</html>