const PROXY_CFG = [
    {
        context: [
            "/api"
        ],

        target: "http://localhost:4001",
        secure: false
    }
    ]
    module.exports = PROXY_CFG;
