/*jshint version: 6*/
/*global console*/


$(function(){
    window.history.pushState({}, document.title, "/Lab2");

    let point_canvas = document.getElementById("point");
    let canvas = document.getElementById("myGraph");
    let saved_canvas = document.getElementById("savedPoint");
    let ctx = canvas.getContext("2d");
    let point_ctx = point_canvas.getContext("2d");
    let saved_ctx = saved_canvas.getContext("2d");

    point_ctx.fillStyle = "#fff";
    ctx.font = "bold 14px Roboto";
    ctx.fillStyle = "#ffffff";
    saved_ctx.font = "bold 14px Roboto";
    saved_ctx.fillStyle = "#ffffff";
    let x_validate = false;
    let y_validate = false;
    let r_validate = false;
    let x_value = null;
    let y_value = null;
    let r_value = null;
    let adr = null;
    let x = null;
    let y = null;
    let rect;
    function isNumeric(n){
        return !isNaN(parseFloat(n) && isFinite(n))
    }
    //fix this function
    function validateForm(){
        return  validateY() && validateR() && validateX() ;
    }
    function validateX(){
        let numX = $("input:radio.x-value:checked")
        if (numX){
            $('xbox-label').removeClass('error');
            x_value = parseInt(numX.val());
            console.log(x_value);
            return true;
        } else {
            console.log("x not validated")
            $('xbox-label').addClass('error');
            return false;
        }
    }
    function validateY() {
        const Y_MAX = 3;
        const Y_MIN = -5;
        if(y_value == null){
            y_value = $('#y-value');
        }
        let numY = y_value.val().replace(',', '.');

        if (isNumeric(numY) && numY >= Y_MIN && numY <= Y_MAX) {
            y_value.removeClass('error');
            y_value = numY
            return true;
        } else {
            console.log("y not validated")
            y_validate = false;
            y_value.addClass('error');
            return false;
        }
    }
    function validateR(){
        const R_MAX = 5;
        const R_MIN = 2;

        let rField = $('#r-value');
        let numR = rField.val().replace(',', '.');

        if (isNumeric(numR) && numR >= R_MIN && numR <= R_MAX){
            r_validate = true;
            ctx.fillText(numR, 135, 15);
            ctx.fillText(numR, 135, 195);
            ctx.fillText(numR,  10, 140);
            ctx.fillText(numR, 185, 140);

            let halfR = (parseInt(numR) / 2).toString()
            ctx.fillText(halfR, 135, 85);
            ctx.fillText(halfR, 135, 195);
            ctx.fillText(halfR,  75, 140);
            ctx.fillText(halfR, 195, 140);
            saved_ctx.stroke();
            clearAllPoint();
            drawAllFilterPoint(numR);
            point_ctx.stroke();
            rField.removeClass('error');
            r_value = numR
            return true;
        } else {
            console.log("r not validated")
            r_validate = false;
            rField.addClass('error');
            return false;
        }
    }
    function getCursorPosition(point_canvas, event){
        rect = point_canvas.getBoundingClientRect();
        x = event.clientX - rect.left;
        y = event.clientY - rect.top
    }
    point_canvas.addEventListener('mousedown',function(){
        if(!validateR()){
            $('.error').addClass("invisible")
        } else {
            $('.error').removeClass("invisible")
        }
    })

    point_canvas.addEventListener('mousemove', function(e) {
        getCursorPosition(point_canvas, e)
        if(validateR()){
            clearPoint()
            drawPoint(x,y);
            point_canvas.addEventListener('mouseleave',function(){
                clearPoint();
                draw(x_value,y_value,r_value);
                x_validate = false;
                y_validate = false;
                x_value = null;
                y_value = null;
            })
            point_canvas.addEventListener('mousedown',function(){
                y_value = -(y-130)/adr;
                y_validate = true;
                $('#submit').removeAttr('disabled');
            })
        }
    })
    $("#point").click(function(){
        $("#submit").click();
    })
    function clearPoint(){
        point_ctx.beginPath();
        point_ctx.clearRect(0, 0, point_canvas.height, point_canvas.width);
        point_ctx.closePath();
    }
    function clearAllPoint(){
        saved_ctx.beginPath();
        saved_ctx.clearRect(0, 0, point_canvas.height, point_canvas.width);
        saved_ctx.closePath();
    }
    function draw(x_value, y_value, r_value){
        point_ctx.beginPath();
        point_ctx.clearRect(0, 0, point_canvas.height, point_canvas.width);
        point_ctx.closePath();
        adr = 130 / r_value;
        point_ctx.beginPath();
        point_ctx.arc(130 + parseInt(x_value*adr), 150 - parseFloat(y_value*adr), 2, 0, 2 * Math.PI, false)
        point_ctx.fill();
        point_ctx.closePath();
    }
    function drawPoint(x, y){
        adr = 150 / r_value;
        let x_nearest = nearestX(x, adr);
        point_ctx.beginPath();
        point_ctx.arc(x_nearest, y, 2, 0, 2 * Math.PI, false);
        point_ctx.fill();
    }
    function nearestX(x, adr){
        let j = 0;
        let xValues = [];
        for(let i = 10; i <= 280; i=i+adr){
            xValues[j] = i;
            j++;
        }
        const output = xValues.reduce((prev, curr) => Math.abs(curr - x) < Math.abs(prev - x) ? curr : prev);
        x_value = xValues.indexOf(output) - (xValues.length - 1) / 2;
        x_validate = true;
        return output;
    }
    const timezone = new Date().getTimezoneOffset();
    $('#clear-button').click(function(){
        $.ajax({
            url:'/Lab2/process',
            type: 'POST',
            data:{
                clear: $(this).val(),
            },
            success: function(){
                $('#table-body').load(location.href + " beans");
                clearAllPoint();
            },
            error: function(status, error, exception){
                alert(error);
                console.log(exception);
            }
        })
    })
    $('#submit-form').submit(function(event){
        if(validateForm()){
            $('.error').removeClass("invisible");
            $.ajax({
                url: '/Lab2/process',
                type: 'POST',
                data:{
                    xVal: x_value, yVal:y_value,rVal: r_value,timezone:timezone
                },
                success: function (){
                    $("#table-body").load(location.href + " #beans");
                    drawFilterPoint(x_value, y_value, r_value)
                },
                error: function(status, exception,error){
                    console.log(error)
                    alert(exception);
                }
            })
        } else {
            event.preventDefault();
            console.log("Not validated")
            $('.error').addClass("invisible");
        }
    })
    function drawFilterPoint(x_val, y_val, r_val){
        let r_adr = 140 / r_val;
        saved_ctx.beginPath();
        saved_ctx.arc(150+parseInt(x_val*r_adr), 150 - parseFloat(y_val*r_adr), 2, 0, 2 * Math.PI, false);
        saved_ctx.fill();
        saved_ctx.closePath();
    }
    function drawAllFilterPoint(filtered_r_value){
        $("#result-table tr").each(function(){
            if(parseInt($(this).find('td').eq(2).html()) === filtered_r_value){
                let x_val = $(this).find('td').eq(0).html()
                let y_val = $(this).find('td').eq(1).html()
                let r_val = $(this).find('td').eq(2).html()
                let s_adr = 140/r_val;
                saved_ctx.beginPath();
                saved_ctx.arc(150+Math.round(x_val*s_adr),150-Math.round(y_val*s_adr),2,0,2 * Math.PI, false);
                saved_ctx.fill();
                saved_ctx.closePath();
            }
        })
    }
});