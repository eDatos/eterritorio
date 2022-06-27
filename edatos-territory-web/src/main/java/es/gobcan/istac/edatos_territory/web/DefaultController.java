package es.gobcan.istac.edatos_territory.web;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.support.RequestContextUtils;

@Controller
public class DefaultController {
    private static final Logger LOGGER = LoggerFactory.getLogger(DefaultController.class);

    @RequestMapping(value = {"", "/index.html", "/**/{path:[^\\.]*}"})
    @SuppressWarnings("unchecked")
    public ModelAndView index(HttpServletRequest request) {

        LOGGER.debug("DefaultController: Contextpath = {}  ServletPath = {}", request.getContextPath(), request.getServletPath());
        Map<String, Object> model = new HashMap<>();

        Map<String, Object> flashMap = (Map<String, Object>) RequestContextUtils.getInputFlashMap(request);
        if (flashMap != null) {
            model.putAll(flashMap);
        }

        return new ModelAndView("index", model);
    }
}
