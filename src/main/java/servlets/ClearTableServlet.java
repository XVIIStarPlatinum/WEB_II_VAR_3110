package servlets;

import beans.EntriesBean;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "ClearTableServlet", urlPatterns = "/clear")
public class ClearTableServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if(request.getParameter("clear") != null && request.getParameter("clear").equals("true")){
            EntriesBean entries = (EntriesBean) request.getSession().getAttribute("entries");
            if(entries == null) entries = new EntriesBean();
            EntriesBean.getEntries().clear();
            request.getSession().setAttribute("entries", entries);
            getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
        } else {
            getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
        }
    }
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
        getServletContext().getRequestDispatcher("/index.jsp").forward(request, response);
    }
}
