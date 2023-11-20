package servlets;

import beans.EntriesBean;
import beans.Entry;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;

@WebServlet(name = "AreaCheckServlet", urlPatterns = "/checker")
public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        if(request.getParameter("xVal") != null && request.getParameter("yVal") != null && request.getParameter("rVal") != null){
            long startTime = System.nanoTime();
            String xString = request.getParameter("xVal");
            String yString = request.getParameter("yVal");
            String rString = request.getParameter("rVal");
            boolean isValid = validateValues(xString, yString, rString);
            if(isValid) {
                double xValue = Double.parseDouble(xString);
                double yValue = Double.parseDouble(yString);
                double rValue = Double.parseDouble(rString);
                boolean isHit = checkHit(xValue, yValue, rValue);
                OffsetDateTime currentTimeObject = OffsetDateTime.now(ZoneOffset.UTC);
                String currentTime;
                try {
                    currentTimeObject = currentTimeObject.minusMinutes(Long.parseLong(request.getParameter("timezone")));
                    currentTime = currentTimeObject.format(DateTimeFormatter.ofPattern("d/M/y HH:mm:ss"));
                } catch (Exception e){
                    currentTime = "d/M/y HH:mm:ss";
                }
                String executionTime = String.valueOf(System.nanoTime() - startTime);
                EntriesBean entries = (EntriesBean) request.getSession().getAttribute("entries");
                if(entries == null) entries = new EntriesBean();
                entries.getEntries().add(new Entry(xValue, yValue, rValue, currentTime, executionTime, isHit));
                request.getSession().setAttribute("entries", entries);
                getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
            }
        } else {
            getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
        }

    }
    private boolean validateX(String xString){
        try {
            Double[] xRange = {-2.0, -1.5, -1.0, -0.5, 0.0, 0.5, 1.0, 1.5, 2.0};
            double xValue = Double.parseDouble(xString);
            return Arrays.asList(xRange).contains(xValue);
        } catch (NumberFormatException nfe) {
            return false;
        }
    }
    private boolean validateY(String yString){
        try {
            double yValue = Double.parseDouble(yString);
            return yValue >= -5 && yValue <= 3;
        } catch (NumberFormatException nfe) {
            return false;
        }
    }
    private boolean validateR(String rString){
        try {
            double rValue = Double.parseDouble(rString);
            return rValue >= 2 && rValue <= 5;
        } catch (NumberFormatException nfe) {
            return false;
        }
    }
    private boolean validateValues(String xValues, String yValues, String rValues){
        return validateX(xValues) && validateY(yValues) && validateR(rValues);
    }
    private boolean checkTriangle(double xValue, double yValue, double rValue){
        return xValue >= 0 && yValue >= 0 && yValue >= (xValue + rValue / 2);
    }
    private boolean checkRectangle(double xValue, double yValue, double rValue){
        return xValue <= 0 && yValue <= 0 && xValue <= rValue && yValue <= rValue;
    }
    private boolean checkCircle(double xValue, double yValue, double rValue){
        return xValue >= 0 && yValue <= 0 && Math.sqrt(xValue * xValue + yValue * yValue) <= rValue;
    }
    private boolean checkHit(double xValue, double yValue, double rValue){
        return checkTriangle(xValue,yValue,rValue) || checkRectangle(xValue, yValue, rValue) || checkCircle(xValue, yValue, rValue);
    }
}
