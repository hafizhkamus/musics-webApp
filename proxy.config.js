const PROXY_CFG = [
    {
        context: [
            "/api"
        ],

        target: "http://localhost:4000",
        secure: false
    }
    ]
    module.exports = PROXY_CFG;
