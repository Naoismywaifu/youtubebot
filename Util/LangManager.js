const { readdirSync } = require("fs")
const i18next = require("i18next")
const translationBackend = require("i18next-node-fs-backend")

class LocaleStructure {
    constructor(client) {
        this.client = client
        this.languages = ["en-US", "fr-FR"]
        this.ns = ["core", "commands"]
    }

    load() {
        try {
            this.startLocales()
            return true
        } catch (err) {
            console.error(err)
        }
    }

    async startLocales() {
        try {
            i18next.use(translationBackend).init({
                ns: this.ns,
                preload: await readdirSync("./locales/"),
                fallbackLng: "en-US",
                backend: {
                    loadPath: "./locales/{{lng}}/{{ns}}.json"
                },
                interpolation: {
                    escapeValue: false
                },
                returnEmpyString: false
            })
        } catch (err) {
            console.error(err)
        }
    }


}

module.exports = LocaleStructure