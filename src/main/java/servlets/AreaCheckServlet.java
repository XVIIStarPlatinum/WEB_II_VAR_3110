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
            getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
        } else {
            getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
        }

    }
    private static boolean validateX(String xString){
        try {
            Double[] xRange = {-2.0, -1.5, -1.0, -0.5, 0.0, 0.5, 1.0, 1.5, 2.0};
            double xValue = Double.parseDouble(xString);
            return Arrays.asList(xRange).contains(xValue);
        } catch (NumberFormatException nfe) {
            return false;
        }
    }
    private static boolean validateY(String yString){
        try {
            double yValue = Double.parseDouble(yString);
            return yValue >= -5 && yValue <= 3;
        } catch (NumberFormatException nfe) {
            return false;
        }
    }
    private static boolean validateR(String rString){
        try {
            double rValue = Double.parseDouble(rString);
            return rValue >= 2 && rValue <= 5;
        } catch (NumberFormatException nfe) {
            return false;
        }
    }
    public static boolean validateValues(String xValues, String yValues, String rValues){
        return validateX(xValues) && validateY(yValues) && validateR(rValues);
    }
        private static boolean checkTriangle(double xValue, double yValue, double rValue){
        return xValue >= 0 && yValue >= 0 && xValue <= rValue / 2 && yValue <= rValue && yValue / 2 <= (-xValue + rValue / 2);
    }
        private static boolean checkRectangle(double xValue, double yValue, double rValue){
        return xValue <= 0 && yValue <= 0 && Math.abs(xValue) <= rValue && Math.abs(yValue) <= rValue;
    }
        private static boolean checkCircle(double xValue, double yValue, double rValue){
        return xValue >= 0 && yValue <= 0 && Math.sqrt(xValue * xValue + yValue * yValue) <= rValue;
    }
        public static boolean checkHit(double xValue, double yValue, double rValue){
        return checkTriangle(xValue, yValue, rValue) || checkRectangle(xValue, yValue, rValue) || checkCircle(xValue, yValue, rValue);
    }
}
