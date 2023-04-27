package es.gobcan.istac.edatos_territory.web;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Arrays;
import java.util.Collection;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.Environment;

@SpringBootApplication
public class EdatosTerritoryWebApplication {
    private static final Logger LOGGER = LoggerFactory.getLogger(EdatosTerritoryWebApplication.class);

    private final Environment env;

    public EdatosTerritoryWebApplication(Environment env) {
        this.env = env;
    }

    @PostConstruct
    public void checkActiveProfiles() {
        Collection<String> activeProfiles = Arrays.asList(env.getActiveProfiles());
        if (activeProfiles.contains("dev") && activeProfiles.contains("env")) {
            LOGGER.error("You have misconfigured your application! It should not run with both the 'dev' and 'env' profiles at the same time.");
        }
    }

    public static void main(String[] args) throws UnknownHostException {
        ConfigurableApplicationContext appContext = SpringApplication.run(EdatosTerritoryWebApplication.class, args);
        Environment env = appContext.getEnvironment();
        String protocol = "http";
        if (env.getProperty("server.ssl.key-store") != null) {
            protocol = "https";
        }
        LOGGER.info("\n"
                + "----------------------------------------------------------\n\t"
                + "La aplicación '{}' se ha lanzado! URLs:\n\t"
                + "Local: \t\t{}://localhost:{}\n\t"
                + "Externa: \t{}://{}:{}\n\t"
                + "Perfiles(s): \t{}" +
                "\n----------------------------------------------------------",
                    env.getProperty("spring.application.name"),
                    protocol,
                    env.getProperty("server.port"),
                    protocol,
                    InetAddress.getLocalHost().getHostAddress(),
                    env.getProperty("server.port"),
                    env.getActiveProfiles());
    }

}
