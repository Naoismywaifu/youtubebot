let langinfos = {
	lang: "French (Français)",
	name: "french",
	contributors: ["HiiZun"],
	enabled: true
}

let c = require("../config.json");
const uptime = require("../commands/uptime");
let e = c.emojis;



module.exports = class {
    constructor() {
		this.language = {

			CORE_ISNT_DJ: `${e.no} | Vous ne pouvez pas executer cette commande, vous devez être DJ !`,
			CORE_ISNT_STAFF: `${e.no} | Vous ne pouvez pas executer cette commande, vous devez avoir le role personalisé s'il est configuré ou avoir la permission de gèrer le serveur !`,
			CORE_ISNT_PREMIUM: `${e.no} | Oh non ! Cette commande est reservé aux serveurs ayant une licence YouTube Bot Premium, envisagez de payer YouTube Bot Premium.`,

			
			// Utils
			PREFIX_INFO: (prefix) => `le préfixe de ce serveur est \`${prefix}\``,
			UTILS: {
				YES: "Oui",
				NO: "Non",
				USER: "Utilisateur",
				USERS: "Utilisateurs",
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
				VERSION: "Version",
				ADDING: "Ajouts",
				ADDEDAT: "Ajouté le:",
				ID: "Identifiant",
				FROM: "Depuis",
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
				TYPE: `Type`,
                NAME: "Nom",
				ALIASES: "alias",
				LINKS: "Liens",
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
			MESSAGE_ERROR_ARGS_CORRECT: (prefix, command, usage) => `${e.arrow} | Utilisation correcte: ${prefix}${command} ${usage}`,
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
			
            MUSIC_NO_SAME_CHANNEL: `${e.no} | Vous devez rejoindre le même salon que moi !`,
            MUSIC_NO_CHANNEL: `${e.no} | Vous devez rejoindre un salon vocal avant de faire cette commande !`,
            MUSIC_NO_PLAYING: `${e.no} | Je ne joue actuellement rien !`,
			MUSIC_JOIN_ERROR: (err) => `${e.no} | Je ne peux pas rejoindre le salon !\n ${err}`,
			MUSIC_NO_EXIST: `${e.no} | Je ne peux jouer cette musique car elle n'existe pas !`,
			MUSIC_ERR_COPYRIGHT: `${e.no} | Je ne peux pas jouer cette musique car elle est soumise à des droits d'auteur !`,
			MUSIC_ERR_QUOTA: `${e.no} | Je ne peux pas jouer cette musique car j'ai éxédé mon quota quotidien !`,
			MUSIC_ENDED: `${e.no} | La liste de lecture est terminée !`,
			MUSIC_NOWPLAYING: `Lecture en cours`,
			MUSIC_PUBLISHED: (date) => `Publiée le ${date}`,
			MUSIC_SHORT_DESC: `Description courte`,
			MUSIC_QUERY_NOT_EXIST: `${e.no} | Oups... je crois n'avoir rien trouvé qui corresponde avec votre requête, re-esseyez avec une requête plus pertinente`,
			MUSIC_ISNOT_INVOKER: `${e.no} | Vous devez être l'invoquateur de la commande pour faire cela !`,
			MUSIC_SEARCHING: (search) => `${e.search} | Recherche pour \`${search}\` en cours...`,
			MUSIC_RADIO_PLAYING: `${e.no} | Vous ne pouvez pas me faire jouer de la musique quand je joue de la radio 24/7 dans un salon, faites moi quitter avant de faire cela !`,
			
			/* LOOP */

            LOOP_LOOP: (status) => `🔂 | Le mode répétition est désormais **${status}**`,

			/* SHUFFLE */

			SHUFFLE_SONGS_LESS: `${e.no} | Vous ne pouvez pas shuffle moins de 3 musiques !`,
			SHUFFLE_SUCCESS: `${e.yes} | Liste de lecture mélangée !`,


			/* PLAY */
			PLAY_PERM_CONNECT: `${e.no} | Je n'ais pas la permission de rejoindre le salon !`,
			PLAY_PERM_SPEAK: `${e.no} | Je n'ais pas la permission de parler dans le salon !`,
			PLAY_ERROR_COPYRIGHT: `${e.no} | Cette video ne peut être jouée car elle est soumise à des droits d'auteur !`,
			PLAY_ADDED_QUEUE: (music, user) => `${e.yes} | **${music}** a bien été ajouté à la liste d'attente par ${user} !`,
			PLAY_NOWPLAYING_COMPACT: (song) => `${e.yes} | Je vais jouer: \`${song.title}\``,
			PLAY_ERR_PAUSED: `${e.no} | Je ne peux pas jouer de musique quand je suis mis en pause, utilisez \`${c.PREFIX}resume\` pour résumer le bot !`, 

			/* NEWCODE */

			NEWCODE_GENERATING: `Génération...`,
			NEWCODE_CANT_DM: `${e.no} | Veuillez executer cette commande en messages privées`,
			NEWCODE_SUCCESS: (code) => `Voici votre code,\n\`${code}\``,

			/* PLAYLIST */
			PLAYLIST_ADDED_SONG: (song, user) => `${e.yes} | **${song.title}** a bien été ajouté à la liste de lecture par ${user}`,
			PLAYLIST_ADDED_PLAYLIST: (playlist, user, queueConstruct, premium) => `📃 | ${user} vient d'ajouter la playlist **${playlist.title}**\n[Lien](${playlist.url})\n\n${queueConstruct.songs.map((song, index) => index + 1 + ". " + song.title).join("\n")}\n ${premium ? "" : "**Note: Vous pouvez monter à 25 musiques par playlist en souscrivant à  __YouTube Bot Premium__**"}`,
			
			/* QUEUE */
			QUEUE_SONGQUEUE: `Liste d'attente des musiques`,
			QUEUE_NOWPLAYING: `Musique actuelle`,
			QUEUE_LONGMODE: `Ce message a été enovyé en longmode car la liste de musique est trop longue !`,

			/* REMOVE */

			REMOVE_NOQUEUE: `${e.no} | Il n'y a aucune musique dans la liste de lecture.`,
			REMOVE_REMOVED: (user, song) => `${e.yes} | ${user} vient de supprimer **${song.title}** de la liste de lecture.`,

			/* PAUSE */

			PAUSE_PAUSED: (user) => `⏸ | ${user} vient de mettre en pause la musique`,

			/* RESUME */

			RESUME_RESUMED: (user) => `▶ | ${user} vient de résumer la musique.`,

			/* LYRICS */

			LYRICS_SUCCESS: (song) => `📑 Paroles de **${song}**`,
			LYRICS_NOT_FOUND: (song) => `${e.no} | Je n'ais pas trouvé de paroles pour **${song}**`,


			/* SKIP */

			SKIP_SKIPPED: (user) => `⏭ | ${user} vient de faire passer la musique.`,

			/* STOP */

			STOP_STOPPED: (user) => `⏹ | ${user} vient de faire arrêter la musique.`,
			STOP_RADIO: `⏹ | J'arrête de jouer la radio 24/7 dans ce serveur !`,

			/* VOLUME */

			VOLUME_CURRENT: (volume) => `🔊 | Le volume actuel est **${volume}%**`,
			VOLUME_ERROR_ARGS: `${e.no} | Veuillez indiquer le pourcentage du volume a mettre !`,
			VOLUME_ERROR_VOLUME: `${e.no} | Veuillez indiquer un nombre entre 0 et 100, vous pouvez monter à 200% si votre serveur est premium`,
			VOLUME_ERROR_VOLUME_PREMIUM: `${e.no} | Veuillez indiquer un nombre entre 0 et 200 !`,
			VOLUME_SUCCESS: (volume) => `${e.yes} | Le volume a été mis à **${volume}%**`,

			/* SEARCH */

			SEARCH_COLLECTOR_ALREADY: `${e.no} | Un collecteur de messaages est déjà actif !`,
			SEARCH_REPLYWITHSONGNB: `Répondez avec le numéro de la musique que vous voulez jouer`,
			SEARCH_RESULTS: (search) => `Résultats pour: ${search}`,

			/* GETPREMIUM */
			GETPREMIUM_ALREADY: `${e.no} | Ce serveur est déjà premium !`,
			GETPREMIUM_NOPREMIUM: `${e.no} | Vous n'avez aucune licence dans votre porte feuille, veuillez en acheter une ou en gagner une !`,
			GETPREMIUM_SUCCESS: `${e.yes} | Bravo 🎉 Votre serveur est dès a présent premium !`,

			/* SKIPTO */

			SKIPTO_INVALID_ARG: `${e.no} | Arguement invalide ! Veuillez donner un nombre valide.`,
			SKIPTO_NOQUEUE: `${e.no} | Il n'y a pas de queue !`,
			SKIPTO_SUCCESS: (user, nb) => `${e.yes} | Skippé ${nb} Musiques, par ${user}.`,

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
			CONFIG_SUCCESS_LANGUAGE: (lang) => `${e.yes} | La langue a bien été mise à jour en ${lang}`,
			CONFIG_PREFIX_UNDEFINED: `${e.no} | Vous n'avez pas défini le prefix à mettre`,
			CONFIG_PREFIX_TOOLONG: `${e.no} | Le préfix ne doit pas excéder 3 caractères`,
			CONFIG_PREFIX_SUCCESS: (prefixx) => `${e.yes} | Le préfix a bien été mis à \`${prefixx}\``,
			CONFIG_PREMIUM_NEED: `${e.no} | Vous devez rejoindre le support pour pouvoir acheter youtube bot premium`,
			CONFIG_PREMIUM_ALREADY: `${e.yes} | Vous êtes deja premium :D`,
			CONFIG_TELEMETRICS_ENABLED: `${e.enabled} | les Télémetiques ont bien été activés, merci de votre support !`,
			CONFIG_TELEMETRICS_DISABLED: `${e.disabled} | les Télémetiques ont bien été désactivées, prenez en compte que nous pourrons plus vous aider si vous avez des soucis !`,
			CONFIG_NOTIFIER_CMD: `${e.no} | Vous devez utiliser la commande \`${c.PREFIX}notify\` pour modifier cela`,
			CONFIG_COMPACT_ENABLED: `${e.enabled} | Le mode compact a bien été activé.`,
			CONFIG_COMPACT_DISABLED: `${e.disabled} | Le mode compact a bien été désactivé.`,
			CONFIG_BASSBOOST_OPTIONS: `${e.no} | Options valides: \`off\`, \`low\`, \`medium\`, \`high\` & \`hard\`.`,
			CONFIG_BASSBOOST_SUCCESS: (mode) => `${e.yes} | BassBoost mis à \`${mode}\`\n⚠ | Les changements seront appliqués à la prochaine musique !`,
			CONFIG_MUSIC_ENABLED: (filter) => `${e.enabled} | Le filtre \`${filter}\` a bien été **activé** !\n⚠ | Les changements seront appliqués à la prochaine musique !`,
			CONFIG_MUSIC_DISABLED: (filter) => `${e.disabled} | Le filtre \`${filter}\` a bien été **désactivé**\n⚠ | Les changements seront appliqués à la prochaine musique !`,
			CONFIG_RESET_SUCCESS: (key) => `${e.yes} | La clé **${key}** a bien été reinitialisé !`,
			
			CONFIG_NOMENTION: `${e.no} | Veuillez donner une **mention ou un identifiant** d'un role valide !`,
			CONFIG_DJROLE_SUCCESS: `${e.yes} | J'ai correctement mis le DJ role !`,
			CONFIG_STAFFROLE_SUCCESS: `${e.yes} | J'ai correctement mis le staff role !`,
			/* Shard */
			SHARD_WHATS: (guildsCount, usersCount) => `**YouTube Bot fonctionne grâce à des "shards" qui sont des instances de YouTube Bot démarrées en même temps qui se répartissent la tâche de vous proposer la meilleure experiance !**\n__Statistiques globales:__\n> \`${guildsCount} servers\`\n> \`${usersCount} users\``,

			/* NOTIFY */
			NOTIFY_NO_CHANNEL_MENTION: `${e.no} | Vous n'avez pas défini de salon !`,
			NOTIFY_INVALID_CHANNEL: `${e.no} | Le salon n'est pas valide !`,
			NOTIFY_INVALID_YT_CHANNEL: `${e.no} | Merci de définir le nom de la chaine youtube à surveiller`,
			NOTIFY_NOT_EXIST: `${e.no} | Je n'ais pas trouvé de chaine youtube avec ce nom, merci de bien vérifier le nom !`,
			NOTIFY_SUCCESS: `${e.yes} | La chaine youtube a bien été mise en place, maintenant dès que vous allez `,
			NOTIFY_CHECKING: `${e.loading} | Résolution...`,

			/* NP */
			NP_CURRENT: (title, author, url) => `${e.youtube} | Je joue actuellement **${title}** par **${author}** depuis **YouTube**\n[Lien](${url})`,

			/* NEWS */
			NEWS_DESC: "YouTube Bot fonctionne avec des versions, elles permettent de ajouter des fonctionalités et d'en améliorer certaines",

			/* INFO */

			INFO_DESC: (version, shardid, shardcount, totalGuilds, totalMembers) => `YouTube Bot fonctionne dans la version \`${version}\`.
Vous êtes dans le shard \`#${shardid}\` avec un total de \`${shardcount}\` shards
thanks for using YouTube Bot !
Je propulse \`${totalGuilds}\` communautées pour un total de \`${totalMembers}\` membres
Envie de faire un don ou acheter YouTube Bot Premium ? utilisez [Ce site](https://donatebot.io/checkout/718419838145527910)
Envie de voter ? votez juste [ici](https://top.gg/bot/486948160124485642/vote)`,
		
			/* INVITE */
			INVITE_DESC: `YouTube Bot est un bot Disord entièrement gratuit avec beaucoup de fonctionnalités.`,
			INVITE_ALL_PERMS: `Invitation avec toutes les permissions (recommandé)`,
			INVITE_NO_PERMS: `Invitation sans permission (non recommandé)`,
			INVITE_CLICK_ALL: `Invitation`,
			INVITE_CLICK_NONE: `Invitation (non recommandé)`,

			/* JOIN */
			JOIN_ALREADY_CHANNEL: `${e.no} | Je suis déjà dans un salon !`,
			JOIN_SUCCESS: (channel) => `${e.yes} | J'ai rejoin le salon ${channel}`,
		
			/* PARTNERS */
			PARTNERS_DESC: `Ceci est une lise de nos partenaires\n**Les projets avec une 🌟 sont des projets que nous adoronts !**`,

			/* SERVERINFO */
			SERVERINFO_ISPREMIUM: `Est Premium`,
			SERVERINFO_PREMIUM: (bool) => `${bool ? `` : ``}`,

			/* PREMIUM */

			PREMIUM_YES_CONGRATS: `${e.yes} | Merci d'utiliser YouTube Bot Premium !\nVotre serveur est Premium jusqu'au **à vie**`,
			PREMIUM_NO_OHNO: `${e.no} | Oh non ! Vous n'avez aucune licence active sur ce serveur !`,
			PREMIUM_PURCHASE: "Achetez maintenant",
			PREMIUM_NO_ARGUMENTS: `${e.premium} Pimentez votre expérience YouTube Bot et soutenez YouTube Bot en achetant une licence YouTube Bot ! 
			> C'est seulement ~~10€~~ 5€ à vie !
			> Pour avoir une tonne de fonctionalitées !
			**Vous achetez la licence durant la periode de noël ?**
			> Obtenez gratuitement une licence Beta tester pour tester nos nouvelles technologies ${e.beta_teser} !`,
			PREMIUM_WANT_PURCHASE: `Envie d'acheter ?`,
			PREMIUM_SUPPORT_SERVER: `Rejoinez notre serveur de support`,

			/* REDEEM */
			REDEEM_CODE_EXISTS: `${e.no} | Oups, ce code n'existe pas! veuillez réessayer avec un code valide`,
			REDEEM_SUCCESS: `${e.yes} | Félicitations, je viens d'ajouter une licence premium à votre portefeuille, pour l'activer sur un serveur, faites ${c.PREFIX}activate à l'intérieur!`,
		
			/* SERVERINFO */
			SERVERINFO_PLAYING: `Joue`,

			/* BOTINFO */

			BOTINFO_ABOUT: `YouTube Bot est un bot developpé avec ❤ par HiiZun`,
			BOTINFO_BOT_STATS: `<:youtubebot:720657201542332528> Informations bot`,
			BOTINFO_SERVER_STATS: `<a:debian:719323036242935908> Informations serveur`,
			BOTINFO_SOFTWARE_STATS: `<:configuration:718448486458327070> Informations logiciel`,
			BOTINFO_SHARD: `Shard`,
			BOTINFO_TOTAL_SERVERS: `Nombre de serveurs`,
			BOTINFO_TOTAL_USERS: `Nombre de Membres`,
			BOTINFO_SHARD_NUMBER: `Nombre de shards`,
			BOTINFO_SHARD_CURRENT: `Shard Actuel`,
			BOTINFO_OS: `Système`,
			BOTINFO_ARCH: `Architechture`,
			BOTINFO_RAM: `Utilisation RAM`,
			BOTINFO_BOT_VERSION: `YouTube Bot`,
			BOTINFO_BOT_LIB: `Librairie`,
			BOTINFO_BOT_CORE: `Language`,
			BOTINFO_PLAYING_COUNT: "Joue sur",
			BOTINFO_PREMIUM_COUNT: `Premium sur`,

			/* URBAN */
			URBAN_NOTFOUND: (query) => `${e.no} | Pas de résultats pour ${query}`,
			URBAN_DEF: `Définition`,
			URBAN_EXAMPLE: `Exemple`,
			URBAN_RATING: `Avis`,


			/* RADIO */
			RADIO_EXPL: `Pour jouer une musique listé ici executez \`${c.PREFIX}radio iLoveMusic\` par exemple`,
			RADIO_EXISTNO: `${e.no} | Cette radio n'existe pas !`,
			RADIO_SUCCESS: (radio) => `${e.enabled} | Maintenant je vais jouer la radio ${radio} 24/7 dans ce salon !`,



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
