<%@page import="javax.faces.context.FacesContext"%>
<%@page import="org.apache.logging.log4j.core.config.Configuration"%>
<%@page import="org.apache.logging.log4j.core.LoggerContext"%>
<!DOCTYPE html>
<html lang="en-us" >

    <%@ page contentType="text/html;charset=UTF-8" %> 
    <%@page import="org.apache.logging.log4j.LogManager"%>
    <%@page import="org.apache.logging.log4j.Level"%>
    <%@page import="org.apache.logging.log4j.Logger"%>
    <%@ page import="java.util.ArrayList" %>
    <%@ page import="java.util.Iterator" %>
    <%@ page import="java.util.Enumeration" %>
    <%@ page import="java.util.TreeMap" %>
    <%@ page import="java.util.Map" %>
    <%@ page import="java.util.Set" %>
    <%@ page import="java.util.Collection" %>


    <%
 
        
        String[] loglevels = {"-Select-", "debug", "info", "warn", "error", "fatal", "off"};
        String targetClass = "";
        String newLevl = "";
        /*String resetAll="";

    if(request.getParameter("resetAll")!=null){
            resetAll=request.getParameter("resetAll");
    }*/

        if (request.getParameter("clsname") != null) {
            targetClass = request.getParameter("clsname");
        }

        if (request.getParameter("newLvl") != null) {
            newLevl = request.getParameter("newLvl");
        }

        if (!targetClass.equals("")) {

            Logger targetlogger = LogManager.getLogger(targetClass);
            LoggerContext ctx = (LoggerContext) LogManager.getContext(false);
            Configuration conf = ctx.getConfiguration();
            conf.getLoggerConfig(LogManager.ROOT_LOGGER_NAME).setLevel(Level.toLevel(newLevl));
            ctx.updateLoggers(conf);

        }

        /*if(!resetAll.equals("")){
            LogManager.resetConfiguration();
	 
	 
    }*/

    %>



    <head>
        <title></title>
        <script type="text/javascript">
            function setNewLogLevel(x) {
                // alert(x.id);
                //  alert(x.value);
                if (x.value !== "-Select-") {
                    document.loggermanagerfrm.action = "logmanager.jsp";
                } 
                document.loggermanagerfrm.method = "POST";
                x.form.clsname.value = x.id;
                x.form.newLvl.value = x.value;
                x.form.submit();
            }
        </script>
    </head>
    <body >
        <form name="loggermanagerfrm" id="loggermanagerfrm" action="" method="POST" >
            <table border="1">

                <tr>
                    <th>Class Name</th>
                    <th>Parent Logger</th>
                    <th>Current Log Level</th>
                    <th>Set Log Level to</th>
                </tr>

                <%                    //Enumeration loggers = LogManager.getCurrentLoggers();
                    LoggerContext ctx = (LoggerContext) LogManager.getContext(false);
                    Collection<? extends Logger> loggers = ctx.getLoggers();
                    Iterator<? extends Logger> loggerit = loggers.iterator();
                    TreeMap<String, Logger> loggermap = new TreeMap();
                    while (loggerit.hasNext()) {
                        Logger logger = loggerit.next();
                        loggermap.put(logger.getName(), logger);
                    }

                    Collection c = loggermap.values();
                    Iterator itr = c.iterator();

                    while (itr.hasNext()) {
                        Logger logger = (Logger) itr.next();
                %>


                <tr>
                    <%--1.1 Start--%>
                    <td><%= logger.getName()%></td>
                    <td><%= logger.getName()%></td>
                    <td><%= String.valueOf(logger.getLevel())%></td>
                    <%--1.1 End--%>
                    <td>
                        <select name="newloglevel" id="<%= logger.getName()%>" onchange="setNewLogLevel(this);"  >
                            <% for (int i = 0; i < loglevels.length; i++) {%>
                            <option value="<%=loglevels[i]%>"><%=loglevels[i]%></option>
                            <%} %>
                        </select>
                    </td>
                <tr>
                    <% }%>
            </table>
            <!-- <input type="button" value="Reset All loggers" name="bttn" onclick="resetAllLoggers(this);"/>-->
            <input type="hidden" name="clsname"/>
            <input type="hidden" name="newLvl"/>
            <!-- <input type="hidden" name="resetAll"/>-->
        </form>
    </body>
</html>