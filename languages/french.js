let langinfos = {
	lang: "French (Français)",
	name: "french",
    contributors: ["HiiZun"]
}

let c = require("../config.json");
const uptime = require("../commands/uptime");
let e = c.emojis;



module.exports = class {
    constructor() {
		this.language = {

			// Utils
			PREFIX_INFO: (prefix) => `le préfixe de ce serveur est \`${prefix}\``,
			UTILS: {
				YES: "Oui",
				NO: "Non",
				USER: "Utilisateur",
				TOTAL_SERVERS: "Total serveurs",
				MEMBERS: "Membres",
				STATUS: {
					"dnd": "Ne pas déranger",
					"idle": "AFK (idle)",
					"offline": "Déconnecté",
					"online": "En ligne"
				},
				NO_REASON_PROVIDED: "pas de raison donnée",
				UNDEFINED: "❌ | Indéfini",
				PLEASE_WAIT: `${e.loading} | Veuillez patienter...`,
				PREFIX: "Préfixe",
				ANDMORE: "**et plus...**",
				TITLE: "Titre",
				ID: "Identifiant",
				OWNER: "Créateur",
				REGION: "Région",
				TOTAL: "Total",
				HUMANS: "Humains",
				BOTS: "Bots",
				VERIFLEVEL: "Niveau de verif",
				ROLES: "Roles",
				CREATIONDATE: "Date de création",
				PREMIUM: "Premium",
				ERROR: "Erreur",
				CHANNELS: "Salons",
                NAME: "Nom",
				ALIASES: "alias",
				LANGUAGE: "Langue",
				CURRENT: "Actuel",
                DESCRIPTION:"Description",
                USAGE: "Utilisation",
                COOLDOWN: "Cooldown",
                ON: "activé",
                OFF: "désactivé",
				AUTHOR: "Auteur",
				SIGN_OUT: "Déconnexion",
				YOUR_PROFILE: "Votre profil",
				UPDATE: "Mettre à jour",
				SERVERS: "Serveurs",
				MANAGE: "Paramétrer",
				STATS: "Statistiques",
                COMMANDS: "Commandes",
				SECONDS: "seconde(s)",
				LIKES: `Likes`,
				DISLIKES: `Dislikes`,
				VIEWS: `Vues`,
				HOME: "Accueil",
				SANCTIONS: "Sanctions",
				FRENCH: "Français",
				ENGLISH: "Anglais",
				NO_CHANNEL: "Aucun salon",
				PROFILE: "Profil",
				KNOW_MORE: "En savoir plus",
				SETTINGS: "Paramètres",
				SERVER_SETTINGS: "Paramètres du serveur",
				GLOBAL_STATS: "Globales",
				LEADERBOARD: "Classement",
				COMMANDS_USAGE: "Utilisation des commandes",
				WEBSITE: "Site",
				DISCONNECT: "Me déconnecter"
			},

			CHECK_ENABLED: `✔ | Activé`,
			CHECK_DISABLED: `❌ | Désactivé`,

				FOOTER_REQUESTEDBY: (user) => `Demandé par ${user}`,
			/* MESSAGE ERRORS */

			MESSAGE_ERROR_DISABLED: `${e.no} | Cette commande est désactivée !`,
			MESSAGE_ERROR_ARGS: `${e.no} | Vous n'avez pas défini tous les arguments !`,
			MESSAGE_ERROR_ARGS_CORRECT: (prefix, command, usage) => `${e.no} | Utilisation correcte: ${prefix}${command} ${usage}`,
			MESSAGE_ERROR_OWNERONLY: `${e.no} | Cette commande est réservée uniquement au staff du bot !`,
			MESSAGE_ERROR_WAIT: (time, command) => `${e.no} | Veillez attendre ${time} seconde(s) avant de pouvoir effectuer la commande ${command.name}`,
			MESSAGE_ERROR_CMDEXEC: `${e.no} | Quelquechose ne s'est pas bien passé durant l'execution de la commande, essayez de contacter mon créateur.`,
			
			
			/* HELP */
            HELP_COMMAND_EXIST: `${e.no} | Cette commande n'existe pas !`,
            HELP_DESC_TOP: (cmdsl, prefix) => `• Le prefix du serveur est \`${prefix}\`\nVoici la liste de mes commandes (\`${cmdsl}\`) !\n**conseil de pro:** utilise \`${prefix}help <commande>\` pour avoir des informations sur la commande !`,
            HELP_ERROR_GENERATION: `${e.no} | quelquechose s'est mal passé durant la génération du message, merci de re-essayer plus tard !`,
            
            /* UPTIME */
            UPTIME_MESSAGE: (uptime) => `je suis en ligne depuis ${uptime}`,

            /* MUSIC */

            MUSIC_NO_CHANNEL: `${e.no} | Vous devez rejoindre un salon vocal avant de faire cette commande !`,
            MUSIC_NO_PLAYING: `${e.no} | Je ne joue actuellement rien !`,
			MUSIC_JOIN_ERROR: (err) => `${e.no} | Je ne peux pas rejoindre le salon !\n ${err}`,
			MUSIC_NO_EXIST: `${e.no} | Je ne peux jouer cette musique car elle n'existe pas !`,
			MUSIC_ERR_COPYRIGHT: `${e.no} | Je ne peux pas jouer cette musique car elle est soumise a des droits d'auteur !`,
			MUSIC_ERR_QUOTA: `${e.no} | Je ne peux pas jouer cette musique car j'ai éxédé mon quota quotidien !`,
			MUSIC_ENDED: `${e.no} | La liste de lecture est terminée !`,
			MUSIC_NOWPLAYING: `Lecture en cours`,
			MUSIC_PUBLISHED: (date) => `Publiée le ${date}`,
			MUSIC_SHORT_DESC: `Description courte`,

            /* LOOP */

            LOOP_LOOP: (status) => `🔂 | Le mode répétition est désormais **${status}**`,
		
			/* PLAY */
			PLAY_PERM_CONNECT: `${e.no} | Je n'ais pas la permission de rejoindre le salon !`,
			PLAY_PERM_SPEAK: `${e.no} | Je n'ais pas la permission de parler dans le salon !`,
			PLAY_ERROR_COPYRIGHT: `${e.no} | Cette video ne peut être jouée car elle est soumise a des droits d'auteur !`,
			PLAY_ADDED_QUEUE: (music, user) => `${e.yes} | **${music}** a bien été ajouté a la liste d'attente par ${user} !`,
			PLAY_NOWPLAYING_COMPACT: (song) => `${e.yes} | Je vais jouer: \`${song.title}\``,

			/* PLAYLIST */
			PLAYLIST_ADDED_SONG: (song, user) => `${e.yes} | **${song.title}** a bien été ajouté a la liste de lecture par ${user}`,
			PLAYLIST_ADDED_PLAYLIST: (playlist, user, queueConstruct) => `📃 | ${user} vient d'ajouter la playlist **${playlist.title}**\n${playlist.url}\n\n${queueConstruct.songs.map((song, index) => index + 1 + ". " + song.title).join("\n")}`,
			
			/* QUEUE */
			QUEUE_SONGQUEUE: `Liste d'attente des musiques`,
			QUEUE_NOWPLAYING: `Musique actuelle`,

			/* REMOVE */

			REMOVE_NOQUEUE: `${e.no} | Il n'y a aucune musique dans la liste de lecture.`,
			REMOVE_REMOVED: (user, song) => `${e.yes} | ${user} vient de supprimer **${song.title}** de la liste de lecture.`,

			/* PAUSE */

			PAUSE_PAUSED: (user) => `⏸ | ${user} vient de mettre en pause la musique`,

			/* RESUME */

			RESUME_RESUMED: (user) => `▶ | ${user} vient de résumer la musique.`,

			/* SKIP */

			SKIP_SKIPPED: (user) => `⏭ | ${user} vient de faire passer la musique.`,

			/* STOP */

			STOP_STOPPED: (user) => `⏹ | ${user} vient de faire arrêter la musique.`,

			/* VOLUME */

			VOLUME_CURRENT: (volume) => `🔊 | Le volume actuel est **${volume}%**`,
			VOLUME_ERROR_ARGS: `${e.no} | Veuillez indiquer le pourcentage du volume a mettre !`,
			VOLUME_ERROR_VOLUME: `${e.no} | Veuillez indiquer un nombre entre 0 et 100 !`,
			VOLUME_SUCCESS: (volume) => `${e.yes} | Le volume a été mis a **${volume}%**`,

			/* PING */

            PING_PINGING: "Ping en cours, j'attend un retour...",
            PING_PONG: (hearthbeat, wsping) => `Pong !\n> Battement de mon coeur: \`${hearthbeat} ms\`\n> Latence websocket: \`${wsping} ms\``,
        
			/* RELOAD */

			RELOAD_NOCMD: (cmd) => `${e.no} | La commande \`${cmd}\` n'existe pas !`,
			RELOAD_SUCCESS: (cmd) => `${e.yes} | La commande \`${cmd}\` a bien été rechargée`,
			RELOAD_FAILED: (cmd, err) => `${e.no} | Une erreur est survenue durant le rechargement de la commande \`${cmd}\`\nerreur: ${err}`,
		
			/* CONFIG */
			CONFIG_NOTIFIER: `Configuration Notifier`,
			CONFIG_GLOBAL: `Configurations Globales`,
			CONFIG_YOUTUBER: `Youtubeur`,
			CONFIG_PREMIUM_TRUE: `✔ | Souscris !`,
			CONFIG_PREMIUM_FALSE: `❌ | Oh non, pas souscris !`,
			CONFIG_NOTIFIER_CHANNEL: `Salon`,
			CONFIG_MUSIC: "Configuration Musique",
			CONFIG_MUSIC_COMPACT: "Mode compact",
			CONFIG_INVALID_LANG: `${e.no} |  Langue invalide: french, english`,
			CONFIG_NO_INPUT: `${e.no} | Aucune clé donné/Clé invalide, executez \`${c.PREFIX}config\` pour avoir la liste des clés`,
			CONFIG_SUCCESS_LANGUAGE: (lang) => `${e.yes} | La langue a bien été mise a jour en ${lang}`,
			CONFIG_PREFIX_UNDEFINED: `${e.no} | Vous n'avez pas défini le prefix a mettre`,
			CONFIG_PREFIX_TOOLONG: `${e.no} | Le préfix ne doit pas excéder 3 caractères`,
			CONFIG_PREFIX_SUCCESS: (prefixx) => `${e.yes} | Le préfix a bien été mis a \`${prefixx}\``,
			CONFIG_PREMIUM_NEED: `${e.no} | Vous devez rejoindre le support pour pouvoir acheter youtube bot premium`,
			CONFIG_PREMIUM_ALREADY: `${e.yes} | Vous êtes deja premium :D`,
			CONFIG_TELEMETRICS_ENABLED: `${e.enabled} | les Télémetiques ont bien été activés, merci de votre support !`,
			CONFIG_TELEMETRICS_DISABLED: `${e.disabled} | les Télémetiques ont bien été désactivées, prenez en compte que nous pourrons plus vous aider si vous avez des soucis !`,
			CONFIG_NOTIFIER_CMD: `${e.no} | Vous devez utiliser la commande \`${c.PREFIX}notify\` pour modifier cela`,
			CONFIG_COMPACT_ENABLED: `${e.enabled} | Le mode compact a bien été activé.`,
			CONFIG_COMPACT_DISABLED: `${e.disabled} | Le mode compact a bien été désactivé.`,
			CONFIG_BASSBOOST_OPTIONS: `${e.no} | Options valides: \`off\`, \`low\`, \`medium\`, \`high\` & \`hard\`.`,
			CONFIG_BASSBOOST_SUCCESS: (mode) => `${e.enabled} | BassBoost mis a \`${mode}\``,
			CONFIG_MUSIC_ENABLED: (filter) => `${e.enabled} | Le filtre \`${filter}\` a bien été **activé** !\n⚠ | Les changements seront appliqués a la prochaine musique !`,
			CONFIG_MUSIC_DISABLED: (filter) => `${e.disabled} | Le filtre \`${filter}\` a bien été **désactivé**\n⚠ | Les changements seront appliqués a la prochaine musique !`,
			CONFIG_RESET_SUCCESS: (key) => `${e.yes} | La clé **${key}** a bien été reinitialisé !`,

			/* Shard */
			SHARD_WHATS: (guildsCount, usersCount) => `**YouTube Bot fonctionne grâce a des "shards" qui sont des instances de YouTube Bot démarrées en même temps qui se répartissent la tâche de vous proposer la meilleure experiance !**\n__Statistiques globales:__\n> \`${guildsCount} servers\`\n> \`${usersCount} users\``,

			
		}
    }

    /**
	 * The method to get language strings
	 * @param {string} term The string or function to look up
	 * @param {...*} args Any arguments to pass to the lookup
	 * @returns {string|Function}
	 */
	get(term, ...args) {
		//if (!this.enabled && this !== this.store.default) return this.store.default.get(term, ...args);
		const value = this.language[term];
		/* eslint-disable new-cap */
		switch (typeof value) {
			case "function": return value(...args);
			default: return value;
		}
	}

	getFullLang(){
		return langinfos.lang;
	}
	getLang(){
		return langinfos.name;
	}

	printDate(pdate, isLongDate){
        let monthNames = [
            "Janvier", "Février", "Mars",
            "Avril", "Mai", "Juin", "Juillet",
            "Août", "Septembre", "Octobre",
            "Novembre", "Décembre"
        ];
		pdate = new Date(pdate)
        let day = pdate.getDate();
        let monthIndex = pdate.getMonth();
        let year = pdate.getFullYear();
        let hour = pdate.getHours() < 10 ? "0" + pdate.getHours() : pdate.getHours();
        let minute = pdate.getMinutes() < 10 ? "0" + pdate.getMinutes() : pdate.getMinutes();

		let thedate = (isLongDate) ? day + " " + monthNames[monthIndex] + " " + year + " à " + hour + "h" + minute 
		: day + " " + monthNames[monthIndex] + " " + year;
        return thedate;
	}

	/**
	 * Parse ms and returns a string
	 * @param {number} milliseconds The amount of milliseconds
	 * @returns The parsed milliseconds
	 */
	convertMs(milliseconds){
		let roundTowardsZero = milliseconds > 0 ? Math.floor : Math.ceil;
		let days = roundTowardsZero(milliseconds / 86400000),
		hours = roundTowardsZero(milliseconds / 3600000) % 24,
		minutes = roundTowardsZero(milliseconds / 60000) % 60,
		seconds = roundTowardsZero(milliseconds / 1000) % 60;
		if(seconds === 0){
			seconds++;
		}
		let isDays = days > 0,
		isHours = hours > 0,
		isMinutes = minutes > 0;
		let pattern = 
		(!isDays ? "" : (isMinutes || isHours) ? "{days} jours, " : "{days} jours et ")+
		(!isHours ? "" : (isMinutes) ? "{hours} heures, " : "{hours} heures et ")+
		(!isMinutes ? "" : "{minutes} minutes et ")+
		("{seconds} secondes");
		let sentence = pattern
			.replace("{duration}", pattern)
			.replace("{days}", days)
			.replace("{hours}", hours)
			.replace("{minutes}", minutes)
			.replace("{seconds}", seconds);
		return sentence;
	}

}
