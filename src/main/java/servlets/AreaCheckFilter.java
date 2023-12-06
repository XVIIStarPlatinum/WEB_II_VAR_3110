package servlets;

import beans.EntriesBean;
import beans.Entry;
import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.servlet.ServletException;
import java.io.IOException;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

import static servlets.AreaCheckServlet.validateValues;

@WebFilter(filterName = "AreaCheckFilter", urlPatterns = "/filter")
public class AreaCheckFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException{
        System.out.println("Filter initiated");
    }
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        String xString = request.getParameter("xVal");
        String yString = request.getParameter("yVal");
        String rString = request.getParameter("rVal");
        boolean isValid = validateValues(xString, yString, rString);
        if (isValid) {
            double xValue = Double.parseDouble(xString);
            double yValue = Double.parseDouble(yString);
            double rValue = Double.parseDouble(rString);
            HttpSession session = ((HttpServletRequest) request).getSession();
            OffsetDateTime currentTimeObject = OffsetDateTime.now(ZoneOffset.UTC);
            String currentTime;
            try {
                currentTimeObject = currentTimeObject.minusMinutes(Long.parseLong(request.getParameter("timezone")));
                currentTime = currentTimeObject.format(DateTimeFormatter.ofPattern("d/M/y HH:mm:ss"));
            } catch (Exception e) {
                currentTime = "d/M/y HH:mm:ss";
            }
            EntriesBean entries = (EntriesBean) session.getAttribute("entries");
            if (entries == null){
                entries = new EntriesBean();
                session.setAttribute("entries", entries);
            }
            EntriesBean.getEntries().add(new Entry(xValue, yValue, rValue, currentTime));
            filterChain.doFilter(request, response);
        } else {
            ((HttpServletResponse) response).sendRedirect("/400.jsp");
        }
    }
    @Override
    public void destroy(){
        System.out.println("Filter destroyed");
    }
}
