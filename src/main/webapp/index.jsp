<%@ page import="beans.EntriesBean" %>
<%@ page contentType="text/html;charset=UTF-8"%>
<jsp:useBean id="entries" class="beans.EntriesBean" scope="session"/>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <link rel="icon" href="img/logo.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Work+Sans&display=swap" rel="stylesheet">
    <link id="theme" rel="stylesheet" type="text/css" href="css/reptilian.css">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lab2_XVIIstarPt_</title>
</head>
<body>
    <div class="container">
        <div class="content">
            <div class="bg-opacity"></div>
            <div class="header">
                <p>Лабораторная работа №2</p>
            </div>
            <div class="left">
                <img id="header" src="img/reptilian_header.png" alt="
                Болорболд Аригуун
                P3211
                Вариант 3110">
                <a href="https://www.youtube.com/shorts/hf9hH65SwNI" target="_blank"><button type="button" class="github">GitHub</button></a>
            </div>
        </div>
        <div class="main">
            <div class="graph">
                <object id="graph" data="img/Task.svg" style="overflow: visible"></object>
                <canvas id="myGraph" height="300px" width="300px"></canvas>
                <canvas id="savedPoint" height="300px" width="300px"></canvas>
                <canvas id="point" height="300px" width="300px"></canvas>
            </div>
            <form id="submit-form">
                <div class="x-values">
                    <label class="value-header">x:</label><br>
                    <div class="labels">
                        <hr>
                        <label class="label">
                            <input type="radio" class="x-value" value="-2" name="xVal" />
                            <p class="values">-2</p>
                        </label>
                        <label class="label">
                            <input type="radio" class="x-value" value="-1.5" name="xVal" />
                            <p class="values">-1.5</p>
                        </label>
                        <label class="label">
                            <input type="radio" class="x-value" value="-1" name="xVal" />
                            <p class="values">-1</p>
                        </label>
                        <label class="label">
                            <input type="radio" class="x-value" value="-0.5" name="xVal" />
                            <p class="values">-0.5</p>
                        </label>
                        <label class="label">
                            <input type="radio" class="x-value" value="0" name="xVal" />
                            <p class="values">0</p>
                        </label>
                        <label class="label">
                            <input type="radio" class="x-value" value="0.5" name="xVal" />
                            <p class="values">0.5</p>
                        </label>
                        <label class="label">
                            <input type="radio" class="x-value" value="1" name="xVal" />
                            <p class="values">1</p>
                        </label>
                        <label class="label">
                            <input type="radio" class="x-value" value="1.5" name="xVal" />
                            <p class="values">1.5</p>
                        </label>
                        <label class="label">
                            <input type="radio" class="x-value" value="2" name="xVal" />
                            <p class="values">2</p>
                        </label>
                    </div>
                </div>
                <div class="y-values">
                    <label for="y-value" class="value-header">y:</label>
                    <input type="text" name="yVal" id="y-value" placeholder="[-5; 3]"/>
                </div>
                <div class="r-values">
                    <label for="r-value" class="value-header">r:</label>
                    <input type="text" name="yVal" id="r-value"  value="2" placeholder="[2; 5]"/>
                </div>
                <div class="check-button">
                    <span class="error">Invalid input</span>
                    <input id="submit" type="submit" class="check-button"/>
                </div>
            </form>
        </div>
        <div class="result">
            <div class="table">
                <div>
                    <h2 id="result-h2">Result</h2>
                </div>
                <div class="table-items">
                    <table id="result-table">
                        <thead>
                        <tr>
                            <th>X</th>
                            <th>Y</th>
                            <th>R</th>
                            <th>Date</th>
                            <th>Runtime</th>
                            <th>Result</th>
                        </tr>
                        </thead>
                        <tbody id="table-body">
                        <%
                            if(!EntriesBean.entries.isEmpty()){
                                for(int i = EntriesBean.entries.size() - 1; i >= 0; i--){
                                    out.println("<tr id='beans'>");
                                    out.println("<td id='x'>"+EntriesBean.entries.get(i).getxValue()+"</td>");
                                    out.println("<td id='y'>"+EntriesBean.entries.get(i).getyValue()+"</td>");
                                    out.println("<td id='r'>"+EntriesBean.entries.get(i).getrValue()+"</td>");
                                    out.println("<td>"+EntriesBean.entries.get(i).getCurrentTime()+"</td>");
                                    out.println("<td>"+EntriesBean.entries.get(i).getExecutionTime()+"</td>");
                                    out.println("<td>"+EntriesBean.entries.get(i).isHitResult()+"</td>");
                                    out.println("</tr>");
                                }
                            }
                        %>
                        </tbody>
                    </table>
                </div>
                <button id="clear-button" value="true">Clear</button>
            </div>
        </div>
    </div>
<footer>
    &#169 2023 I/İTMO
</footer>
    <script type="text/javascript" src="jquery-3.6.0.min.js"></script>
    <script type="text/javascript" src="main.js"></script>
<%--    <script>--%>
<%--        function toggleTheme() {--%>
<%--            let theme = document.getElementById("theme");--%>
<%--            if(theme.getAttribute('href') === 'reptilian.css'){--%>
<%--                theme.setAttribute('href', 'rus.css');--%>
<%--            } else {--%>
<%--                theme.setAttribute('href', 'reptilian.css');--%>
<%--            }--%>
<%--        }--%>
<%--    </script>--%>
</body>
</html>
