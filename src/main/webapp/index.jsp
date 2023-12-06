<%@ page import="beans.EntriesBean" %>
<%@ page contentType="text/html;charset=UTF-8"%>
<jsp:useBean id="entries" class="beans.EntriesBean" scope="session"/>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lab2_XVIIstarPt_</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="assets/style.css">
    <link rel="icon" href="img/1610x2048_0xac120004_12729490751685971103.jpeg">
</head>

<body class="bg-dark">
<div class="container text-light">
    <div class="row mb-5">
        <div class="col-12" style="height: 300px;">
            <h1 class="text-center mt-3">Лабораторная работа №2, Болорболд Аригуун; группа P3211; вариант 3110</h1>
            <img class="text-reptilian" src="img/reptilian_header.png"  alt="Болорболд Аригуун группа P3211 вариант 3110">
        </div>
    </div>
    <div class="row mb-5" style="margin-top: 100px">
        <div class="col-md-6">
            <div class="graphics">
                <table id="grid-table">
                    <tbody></tbody>
                </table>
                <canvas class="bg-whites" id="myGraph" width="300px" height="300px"></canvas>

            </div>
        </div>
        <div class="col-md-6">
            <form>
                <div class="mb-3">
                    <div class="x-values">
                        <label class="value-header">X:&nbsp;<b id="x-value-label"></b></label><br>
                        <div class="labels">
                            <br>
                            <label class="label mx-2">
                                <input type="radio" class="x-value" value="-2" name="x-value" />
                                <p class="values">-2</p>
                            </label>
                            <label class="label mx-2">
                                <input type="radio" class="x-value" value="-1.5" name="x-value" />
                                <p class="values">-1.5</p>
                            </label>
                            <label class="label mx-2">
                                <input type="radio" class="x-value" value="-1" name="x-value" />
                                <p class="values">-1</p>
                            </label>
                            <label class="label mx-2">
                                <input type="radio" class="x-value" value="-0.5" name="x-value" />
                                <p class="values">-0.5</p>
                            </label>
                            <label class="label mx-2">
                                <input type="radio" class="x-value" value="0" name="x-value" />
                                <p class="values">0</p>
                            </label>
                            <label class="label mx-2">
                                <input type="radio" class="x-value" value="0.5" name="x-value" />
                                <p class="values">0.5</p>
                            </label>
                            <label class="label mx-2">
                                <input type="radio" class="x-value" value="1" name="x-value" />
                                <p class="values">1</p>
                            </label>
                            <label class="label mx-2">
                                <input type="radio" class="x-value" value="1.5" name="x-value" />
                                <p class="values">1.5</p>
                            </label>
                            <label class="label mx-2">
                                <input type="radio" class="x-value" value="2" name="x-value" />
                                <p class="values">2</p>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="y-value" class="form-label">Y:</label>
                    <input type="text" class="form-control" id="y-value" placeholder="[-5; 3]">
                </div>
                <div class="mb-3">
                    <label for="r-value" class="form-label">Radius:</label>
                    <input type="text" value="2" class="form-control" id="r-value" placeholder="[2; 5]">
                </div>
                <div class="mb-3">
                    <button type="submit" class="btn btn-success w-100">Submit</button>
                </div>
            </form>
        </div>
    </div>
    <div class="row mb-5 bg-light text-dark d-none">
        <div class="col-12">
            <h2 class="text-center">Result</h2>
            <table class="table w-100" id="results-table">
                <thead>
                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Date</th>
                    <th>Run Time</th>
                    <th>Result</th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
    <div class="row mb-5">
        <div class="col-12">
            <div class="w-100 overflow-hidden">
                <div>
                    <h2 id="result-h2">Result</h2>
                </div>
                <div class="table-items">
                    <table class="table w-100" id="result-table">
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
</div>

</body>
<script src="assets/jquery-3.6.0.min.js"></script>
<script src="assets/main.js"></script>
<script>
    rInput.addEventListener("change", function() {
        clearAllPoint();
        <% if (!EntriesBean.entries.isEmpty()){
            for(int i = EntriesBean.entries.size() - 1; i >= 0; i--){%>
                drawPointForPage(<%= EntriesBean.entries.get(i).getxValue() %>,
                <%= EntriesBean.entries.get(i).getyValue() %>, 2);
                <%
            }
        }
        %>
    })
    window.onload = () => {
        <% if (!EntriesBean.entries.isEmpty()){
            for(int i = EntriesBean.entries.size() - 1; i >= 0; i--){%>
                drawPointForPage(<%= EntriesBean.entries.get(i).getxValue() %>,
                <%= EntriesBean.entries.get(i).getyValue() %>, 2);
            <%
            }
        }
%>  }

</script>
<footer></footer>
</html>
