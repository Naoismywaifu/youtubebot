module.exports = {
    ENV: "PRODUCTION",
    TOKEN: "",
    PREFIX: ["yt!", "yt*"],
    BOTID: "",
    OWNERS: [],
    SHARDS: 3,
    YTAPIKEY: "",
    KSoftAPI: "",
    MUSIC: {
        MAX_QUEUE_LENGTH: 150,
        PREMIUM_MAX_QUEUE_LENGTH: 500,
        MAX_VOLUME: 150,
        PREMIUM_MAX_VOLUME: 250,
    },
    BOTLISTS: {
    },
    SUPPORTGUILDID: "",
    PREMIUM: {
        WAITINGPREMIUM:"",
        PREMIUM:"",
        WEBHOOKS: {
            ID: "id",
            TOKEN: "token"
        }
    },
    SHARDSLOGGER: {
        ID: "id",
        TOKEN: "token"
    },
    CMDSLOGGER: {
        ID: "id",
        TOKEN:"commandstoken"
    },
    NODES: [
        {
            id: "Free01", reconnectInterval: 5*60*1000, host: "test.test", port:2333 , password: "test"
        },
    ],
    EMOJIS: {
        HELPEMOJIS: {
            Music:"",
            Premium:"",
            Radio:"",
            Notifier:"",
            Owner:"",
            Fun:"",
            Config:"",
            Core:"",
            Filters:""
        },
        "yes":"",
        "no":"",
        "plus":"",
        "upload":"",
        "disk":"",
        "check":"",
        "enabled":"",
        "warn":"",
        "certified":"",
        "clock":"",
        "router":"",
        "search":"",
        "disabled":"",
        "youtube":"",
        "loading":"",
        "arrow":"",
        "premium":"",
        "music_notes": "",
        "beta_tester":"",
        STATUSEMOJIS: {
            online:"",
            idle:"",
            dnd:"",
            offline:""
        }
    }
}
