const PROXY_CONFIG = [
    {
        context: ["/statistical-resources"],
        target: "http://localhost:8080/metamac-statistical-resources-external-web/apis",
        secure: false,
    },
];

module.exports = PROXY_CONFIG;
