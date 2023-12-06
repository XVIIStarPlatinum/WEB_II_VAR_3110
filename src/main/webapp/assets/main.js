const table = document.querySelector("table#results-table")
const form = document.querySelector("form")
const yInput = form.querySelector("input#y-value")
const rInput = form.querySelector("input#r-value")
const xRadioInputs = form.querySelectorAll('input[type="radio"][name="x-value"]')
const submitButton = form.querySelector('button[type="submit"]')
let frame = document.getElementsByClassName("mb-3")
let canvas = document.getElementById("myGraph");
let ctx = canvas.getContext("2d");
let center_y = 150;
let center_x = 150;
const plot_r = 125;
ctx.font = "bold 18px Roboto";
ctx.fillStyle = "#ffffff";
const params = {
	x: undefined,
	y: Number(yInput.value),
	r: Number(rInput.value),
	timezone: new Date().getTimezoneOffset()
}
const array4 = Array(Math.round(params.r)).fill(undefined, undefined, undefined)
document.querySelector("#grid-table tbody").innerHTML = `${array4.map(r => `<tr>${array4.map(c => '<td></td>').join('')}</tr>`).join('')}`

xRadioInputs.forEach((input) => {
    input.addEventListener("change", (e) => {
        const value = Number(e.target.value)
        params.x = value
        updateXValueLabel(value)
    })
})

const updateXValueLabel = (x) => (
    document.querySelector("#x-value-label").innerHTML = x
)

yInput.addEventListener("change", (e) => {
    params.y = Number(e.target.value)
})

rInput.addEventListener("change", (e) => {
    params.r = Number(e.target.value)
})

const getGridCoord= (n) => {
    const length = 300
    const points = 4
    const halfLength = length / 2
    const pointLength = length / points
    let coord= n - halfLength
    coord = Number((coord/ pointLength).toFixed(7))
    const co25 = coord+ 0.25
    const ceilCoord= Math.ceil(coord)
    const floorCoord= Math.floor(coord)
    if ((coord+ 0.25) >= ceilCoord) {
        return ceilCoord
    } else if (0.25 <= Math.abs(coord- (floorCoord+ 0.25))) {
        return floorCoord+ 0.5
    } else {
        return floorCoord
    }
}

const setX = (x) => {
    x = getGridCoord(x)
    params.x = x
    xRadioInputs.forEach((input) => input.checked = input.value === x)
    updateXValueLabel(x)
    submitButton.click()
}
const validateX = () => {
    if(params.x !== undefined || params.x !== null){
        $(frame).removeClass('error');
        return true
    } else {
        console.log("x not validated");
        $(frame).addClass('error')
        return false
    }
}
const validateY = () => {
    const Y_MAX = 3;
    const Y_MIN = -5;
    let numY = parseFloat(yInput.value?.replace(",", "."));

    if (!isNaN(numY) && numY >= Y_MIN && numY <= Y_MAX) {
        params.y = numY
        $(frame).removeClass('error')
        return true;
    } else {
        console.log("y not validated")
        $(frame).addClass('error')
        return false;
    }
}
const validateR = () => {
    const R_MAX = 5;
    const R_MIN = 2;
    let numR = parseFloat(rInput.value?.replace(',', '.'));
    if (!isNaN(numR) && numR >= R_MIN && numR <= R_MAX){
        params.r = numR;
        $(frame).removeClass('error')
        return true;
    } else {
        console.log("r not validated")
        $(frame).addClass('error')
        return false;
    }
}
const validateParams = () => {
    return validateX() && validateY() && validateR()
}
form.addEventListener("submit", async (e) => {
    e.preventDefault()
    if (!validateParams()) {
        console.log("Client-side validation failed:");
        return false
    }
    console.log("submitting", params)
    const postData = {
        xVal: params.x,
        yVal: params.y,
        rVal: params.r,
        timezone: params.timezone
    }
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
            console.log(error, exception);
        }
    })
})
return $.ajax({
    url: '/Lab2/process',
    type: 'POST',
    data: postData,
    timeout: 0,
        success: function (data){
            $("#table-body").load(location.href + " #beans")
            drawPointForPage(postData.xVal, postData.yVal, postData.rVal);
        },
        error: function(status, exception){
            console.log(exception)
        }
    }) && false
})

function drawPoint(x, y, delta = 2) {
	ctx.rect(x - delta / 2, y - delta / 2, delta, delta);
}

function drawTextWithDeltaX(text, x, y, delta = 4) {
    ctx.fillText(text, x + delta, y);
    drawPoint(x, y);
}
function drawTextWithDeltaY(text, x, y, delta = 4) {
    ctx.fillText(text, x, y - delta);
    drawPoint(x, y);
}
function drawArrow(x, y, arrowDelta, direction) {
    ctx.moveTo(x, y);
    if (direction === "right")
        ctx.lineTo(x - arrowDelta, y - arrowDelta);
    else
        ctx.lineTo(x - arrowDelta, y + arrowDelta);
        ctx.moveTo(x, y);
        if (direction === "right")
			ctx.lineTo(x - arrowDelta, y + arrowDelta);
		else
			ctx.lineTo(x + arrowDelta, y + arrowDelta);
}
function drawGraphAxes(rad, d){
    let arrowDelta = 4;
    ctx.beginPath();

    drawPoint(center_x, center_y, 4);

    ctx.moveTo(center_x - rad - d, center_y);
    ctx.lineTo(center_x + rad + d, center_y);

    drawArrow(center_x + rad + d, center_y, arrowDelta, "right");
    ctx.fillText("X", center_x + rad + d, center_y);

    ctx.moveTo(center_x, center_y + rad + d);
    ctx.lineTo(center_x, center_y - rad - d);
    drawArrow(center_x, center_y - rad - d, arrowDelta, "up");
    ctx.fillText("Y", center_x, center_y - rad - d);

    drawTextWithDeltaY("-R", center_x - rad, center_y);
    drawTextWithDeltaY("-R/2", center_x - rad / 2, center_y);
    drawTextWithDeltaY("R/2", center_x + rad / 2, center_y);
    drawTextWithDeltaY("R", center_x + rad, center_y);

    drawTextWithDeltaX("-R", center_x, center_y + rad);
    drawTextWithDeltaX("-R/2", center_x, center_y + rad / 2);
    drawTextWithDeltaX("R/2", center_x, center_y - rad / 2);
    drawTextWithDeltaX("R", center_x, center_y - rad);

    ctx.stroke();
}
function drawFirstQuarter(height, width){
    ctx.moveTo(center_x, center_y);
    ctx.lineTo(center_x, center_y - height);
    ctx.lineTo(center_x + width, center_y);
    ctx.lineTo(center_x, center_y);
}
function drawThirdQuarter(height, width){
    ctx.moveTo(center_x, center_y);
    ctx.lineTo(center_x - width, center_y);
    ctx.lineTo(center_x - width, center_y + height);
    ctx.lineTo(center_x, center_y + height);
    ctx.lineTo(center_x, center_y);
}
function drawFourthQuarter(rad) {
    ctx.moveTo(center_x, center_y);
    ctx.arc(center_x, center_y, rad,
        Math.PI / 2, Math.PI * 2,
        true);
    ctx.fill();
}
function drawPlot() {
    ctx.beginPath();

    drawFirstQuarter(plot_r, (plot_r / 2));
    drawThirdQuarter(plot_r, plot_r);
    drawFourthQuarter(plot_r)

    ctx.closePath();
    ctx.strokeStyle = "yellow";
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.stroke();
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
    drawGraphAxes(plot_r, 14);
}
drawPlot()

function nearestX(x){
    let xValues = [-2.0, -1.5, -1.0, -0.5, 0, 0.5, 1, 1.5, 2.0];
    let closest = xValues[0];
    let closestDiff = Math.abs(x - closest);
    for (let i = 1; i < xValues.length; i++) {
        let current = xValues[i];
        let currentDiff = Math.abs(x - current);
        if (currentDiff < closestDiff) {
            closest = current;
            closestDiff = currentDiff;
        }
    }
    return closest;
}

function drawPointForPage(mathX, mathY, delta = 2) {
	let x = mathX * plot_r / params.r + center_x;
	let y = center_y - mathY * plot_r / params.r;

	ctx.beginPath();
	ctx.arc(x, y, delta, 0, Math.PI * 2);
	ctx.fillStyle = "cyan";
	ctx.fill();
}
function clearAllPoint(){
	ctx.beginPath();
	ctx.clearRect(0, 0, canvas.height, canvas.width);
	ctx.closePath();
	drawPlot();
}
canvas.addEventListener("mousedown", (event) => {
    let rect = canvas.getBoundingClientRect();
    let x = (event.clientX - rect.left);
    let y = (event.clientY - rect.top);
    if(validateR()){
        let r_ = params.r;
        params.y = (center_y - y) / plot_r * r_;
        params.x = nearestX((x - center_x) / plot_r * r_);
        yInput.value = params.y;
        submitButton.click();
    } else {
        console.log("r not set")
    }
})
