const { readdirSync } = require("fs")
const i18next = require("i18next")
const translationBackend = require("i18next-node-fs-backend")

class LocaleStructure {
    constructor(client) {
        this.client = client
        this.languages = ["en-US", "en-FR"]
        this.client.languages = this.languages;
        this.ns = ["about", "commands"]
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
        let prefix = this.client.functions.getPrefix()
        try {
            await i18next.use(translationBackend).init({
                ns: this.ns,
                preload: await readdirSync("./locales/"),
                fallbackLng: "en-US",
                backend: {
                    loadPath: "./locales/{{lng}}/{{ns}}.json"
                },
                interpolation: {
                    escapeValue: false,
                    defaultVariables: {
                        emojis: require("../config.js").EMOJIS,
                        prefix: Array.isArray(prefix) ? prefix[0] : prefix
                    }
                },
                returnEmptyString: false,
            })
        } catch (err) {
            console.error(err)
        }
    }

    async reloadLanguages() {
        try {
            await i18next.reloadResources();
        } catch (e) {
            throw new Error(`Failed to reload languages: ${e}`)
        }
            return true;

    }


}

module.exports = LocaleStructure