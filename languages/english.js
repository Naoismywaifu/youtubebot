let langinfos = {
	lang: "English (Default)",
	name: "english",
	contributors: ["Main languuage"],
	enabled: true
}

let c = require("../config.json");
const uptime = require("../commands/uptime");
const { prefix } = require("../util/functions");
let e = c.emojis;



module.exports = class {
    constructor() {
		this.language = {
			CORE_ISNT_DJ: `${e.no} | You can't execute this command, you're not DJ !`,
			CORE_ISNT_STAFF: `${e.no} | You can't execute thix command, you need to have the STAFF permission if configured or have the manage server permission !`,
			CORE_ISNT_PREMIUM: `${e.no} | Oh no ! this command is only usable by premium servers, consider buying YouTube Bot Premium!`,
			
			// Utils
			PREFIX_INFO: (prefix) => `The prefix of this server is \`${prefix}\``,
			UTILS: {
				YES: "Yes",
				NO: "No",
				USER: "User",
				USERS: "Users",
				TOTAL_SERVERS: "Total servers",
				MEMBERS: "Members",
				STATUS: {
					"dnd": "Do not disturb",
					"idle": "AFK (idle)",
					"offline": "Offline",
					"online": "Online"
				},
				NO_REASON_PROVIDED: "any reason provided",
				UNDEFINED: "❌ | Undefined",
				PLEASE_WAIT: `${e.loading} | Please wait...`,
				PREFIX: "Prefix",
				ANDMORE: "**and more...**",
				TITLE: "Title",
				ADDING: "Adding",
				ADDEDAT: "Added the",
				VERSION: "Version",
				ID: "ID",
				FROM: "From",
				OWNER: "Owner",
				REGION: "Region",
				TOTAL: "Total",
				HUMANS: "Humans",
				BOTS: "Bots",
				VERIFLEVEL: "Verification Level",
				ROLES: "Roles",
				CREATIONDATE: "Creation Date",
				PREMIUM: "Premium",
				ERROR: "Error",
				CHANNELS: "Channels",
                NAME: "Name",
				ALIASES: "aliases",
				LANGUAGE: "Language",
				CURRENT: "Current",
                DESCRIPTION:"Description",
                USAGE: "Usage",
                COOLDOWN: "Cooldown",
                ON: "enabled",
                OFF: "disabled",
				AUTHOR: "Author",
				LINKS: `Links`,
				TYPE: `Type`,
				SIGN_OUT: "Log out",
				YOUR_PROFILE: "Your profile",
				UPDATE: "Update",
				SERVERS: "Servers",
				MANAGE: "Manage",
				STATS: "Stats",
                COMMANDS: "Commands",
				SECONDS: "second(s)",
				LIKES: `Likes`,
				DISLIKES: `Dislikes`,
				VIEWS: `Views`,
				HOME: "Home",
				SANCTIONS: "Sanctions",
				FRENCH: "French",
				ENGLISH: "English",
				NO_CHANNEL: "No channel",
				PROFILE: "Profile",
				KNOW_MORE: "Know more",
				SETTINGS: "Settings",
				SERVER_SETTINGS: "Server settings",
				GLOBAL_STATS: "Global stats",
				LEADERBOARD: "Leaderboard",
				COMMANDS_USAGE: "Commands usage",
				WEBSITE: "Webite",
				DISCONNECT: "Disconnect me"
			},

			FOOTER_REQUESTEDBY: (user) => `Requested by ${user}`,

			CHECK_ENABLED: `✔ | Enabled`,
			CHECK_DISABLED: `❌ | Disabled`,

			/* MESSAGE ERRORS */

			MESSAGE_ERROR_DISABLED: `${e.no} | This command is disabled !`,
			MESSAGE_ERROR_ARGS: `${e.no} | You don't have provided all arguments !`,
			MESSAGE_ERROR_ARGS_CORRECT: (prefix, command, usage) => `${e.arrow} | Correct usage: ${prefix}${command} ${usage}`,
			MESSAGE_ERROR_OWNERONLY: `${e.no} | This command is only usable by the bot's staff`,
			MESSAGE_ERROR_WAIT: (time, command) => `${e.no} | Please wait more ${time} second(s) before ran the command ${command.name}`,
			MESSAGE_ERROR_CMDEXEC: `${e.no} | Something whent wrong during the execution of the command, try again later.`,
			
			
			/* HELP */
            HELP_COMMAND_EXIST: `${e.no} | This command don't exist !`,
            HELP_DESC_TOP: (cmdsl, prefix) => `• The Server's prefix is \`${prefix}\`\nThere is the list of my commands (\`${cmdsl}\`) !\n**pro's tip:** use \`${prefix}help <command>\` to fetch informations about a command !`,
            HELP_ERROR_GENERATION: `${e.no} | Something whent wrong during the generation of the message, try again later !`,
            
            /* UPTIME */
            UPTIME_MESSAGE: (uptime) => `I'm online since ${uptime}`,

			/* MUSIC */
			
            MUSIC_NO_SAME_CHANNEL: `${e.no} | You must be on the same channel as me !`,
            MUSIC_NO_CHANNEL: `${e.no} | You must join a voice channel first !`,
            MUSIC_NO_PLAYING: `${e.no} | I'm playing nothing !`,
			MUSIC_JOIN_ERROR: (err) => `${e.no} | I can't join the voice channel !\n ${err}`,
			MUSIC_NO_EXIST: `${e.no} | It's seem the music don't exist !`,
			MUSIC_ERR_COPYRIGHT: `${e.no} | I can't play this music because the music has copyright rights !`,
			MUSIC_ERR_QUOTA: `${e.no} | I can't play this music because i have reached my daily quota !`,
			MUSIC_ENDED: `${e.no} | The queue just ended !`,
			MUSIC_NOWPLAYING: `Now playing`,
			MUSIC_PUBLISHED: (date) => `Published the ${date}`,
			MUSIC_SHORT_DESC: `Short description`,
			MUSIC_QUERY_NOT_EXIST: `${e.no} | Oops ... I don't think I found anything that matches your query, try again with a more relevant query`,
			MUSIC_ISNOT_INVOKER: `${e.no} | You need to be the invoker of the command to make that !`,
			MUSIC_SEARCHING: (search) => `${e.search} | Searching for \`${search}\`...`,
			MUSIC_RADIO_PLAYING: `${e.no} | You can't play music while i am playing radio 24/7 in a channel, please make me leaving before executing this command !`,
            /* LOOP */

            LOOP_LOOP: (status) => `🔂 | The loop mode is now **${status}**`,
		
			/* SHUFFLE */

			SHUFFLE_SONGS_LESS: `${e.no} | You can't shuffle less than 3 songs !`,
			SHUFFLE_SUCCESS: `${e.yes} | Queue shuffled`,

			/* PLAY */
			PLAY_PERM_CONNECT: `${e.no} | I don't have permission to join the voice channel !`,
			PLAY_PERM_SPEAK: `${e.no} | I don't have permission to speak in this channel !`,
			PLAY_ERROR_COPYRIGHT: `${e.no} | I can't play this music because the music has copyright rights !`,
			PLAY_ADDED_QUEUE: (music, user) => `${e.yes} | **${music}** was been added to the queue by ${user} !`,
			PLAY_NOWPLAYING_COMPACT: (song, user) => `${e.yes} | Now Playing: \`${song.title}\``,
			PLAY_ERR_PAUSED: `${e.no} | I can't play music while i'm paused, please use \`${c.PREFIX}resume\` to resume the bot !`, 
			
			/* NEWCODE */

			NEWCODE_GENERATING: `Generating...`,
			NEWCODE_CANT_DM: `${e.no} | please execute this command inside DMs !`,
			NEWCODE_SUCCESS: (code) => `There is your code,\n\`${code}\``,

			/* PLAYLIST */
			PLAYLIST_ADDED_SONG: (song, user) => `${e.yes} | **${song.title}** was been added to the queue by ${user} !`,
			PLAYLIST_ADDED_PLAYLIST: (playlist, user, queueConstruct, premium) => `📃 | ${user} just added the playlist **${playlist.title}**\n[Link](${playlist.url})\n\n${queueConstruct.songs.map((song, index) => index + 1 + ". " + song.title).join("\n")}\n ${premium ? "" : "**Note: You can up to 25 music per playlist by subscribing to __YouTube Bot Premium__**"}`,
			
			/* QUEUE */
			QUEUE_SONGQUEUE: `Queue`,
			QUEUE_NOWPLAYING: `Current music`,
			QUEUE_LONGMODE: `This message was send in longmode because the queue is too much long !`,


			/* REMOVE */

			REMOVE_NOQUEUE: `${e.no} | I'm playing nothing !`,
			REMOVE_REMOVED: (user, song) => `${e.yes} | ${user} just deleted **${song.title}** from the queue.`,

			/* PAUSE */

			PAUSE_PAUSED: (user) => `⏸ | ${user} just paused the music.`,

			/* RESUME */

			RESUME_RESUMED: (user) => `▶ | ${user} just resumed the music.`,

			/* LYRICS */

			LYRICS_SUCCESS: (song) => `📑 Lyrics for **${song}**`,
			LYRICS_NOT_FOUND: (song) => `${e.no} | No lyrics found for **${song}**`,

			/* SKIP */

			SKIP_SKIPPED: (user) => `⏭ | ${user} just skipped the music.`,

			/* STOP */

			STOP_STOPPED: (user) => `⏹ | ${user} just stopped the music.`,
			STOP_RADIO: `⏹ | I stop playing radio 24/7 in this server !`,

			/* VOLUME */

			VOLUME_CURRENT: (volume) => `🔊 | The current volume is **${volume}%**`,
			VOLUME_ERROR_ARGS: `${e.no} | Please provide the volume to set !`,
			VOLUME_ERROR_VOLUME: `${e.no} | Please provide a number bethween 0 and 100, you can up to 200% if you have YouTube Bot Premium`,
			VOLUME_ERROR_VOLUME_PREMIUM: `${e.no} | Please provide a number bethween 0 and 200 !`,
			VOLUME_SUCCESS: (volume) => `${e.yes} | The volume was correctly set to **${volume}%**`,

			/* SEARCH */

			SEARCH_COLLECTOR_ALREADY: `${e.no} | A message collector is already active in this channel.`,
			SEARCH_REPLYWITHSONGNB: `Reply with the song number which you want play`,
			SEARCH_RESULTS: (search) => `Results for: ${search}`,

			/* GETPREMIUM */
			GETPREMIUM_ALREADY: `${e.no} | This guild is already premium !`,
			GETPREMIUM_NOPREMIUM: `${e.no} | You don't have any licence on you wallet, please buy or redeem at least one !`,
			GETPREMIUM_SUCCESS: `${e.yes} | Congratulations 🎉 Your server is now premium !`,

			/* SKIPTO */

			SKIPTO_INVALID_ARG: `${e.no} | Invalid argument ! provide a valid number.`,
			SKIPTO_NOQUEUE: `${e.no} | There is no queue !`,
			SKIPTO_SUCCESS: (user, nb) => `${e.yes} | Skipped ${nb} musics by ${user}`,

			/* PING */

            PING_PINGING: "Pinging, waiting callback...",
            PING_PONG: (hearthbeat, wsping) => `Pong !\n> hearthbeat latence: \`${hearthbeat} ms\`\n> Websocket ping: \`${wsping} ms\``,
        
			/* RELOAD */

			RELOAD_NOCMD: (cmd) => `${e.no} | The command  \`${cmd}\` don't exist !`,
			RELOAD_SUCCESS: (cmd) => `${e.yes} | The command \`${cmd}\` was been reloaded !`,
			RELOAD_FAILED: (cmd, err) => `${e.no} | Something whent wrong during the reload of the command \`${cmd}\`\nError: ${err}`,

			/* CONFIG */

			CONFIG_NOTIFIER: `Notifier Configuration`,
			CONFIG_GLOBAL: `Globals Configuration`,
			CONFIG_YOUTUBER: `Youtuber`,
			CONFIG_PREMIUM_TRUE: `✔ | Subscribed !`,
			CONFIG_PREMIUM_FALSE: `❌ | Oh no, not subscribed !`,
			CONFIG_NOTIFIER_CHANNEL: `Channel`,
			CONFIG_MUSIC: "Music Configuration",
			CONFIG_MUSIC_COMPACT: "Conpact mode",
			CONFIG_INVALID_LANG: `${e.no} |  invalid language: french, english`,
			CONFIG_NO_INPUT: `${e.no} | You don't have specified any key, use \`${c.PREFIX}config\` to show the list of keys`,
			CONFIG_SUCCESS_LANGUAGE: (lang) => `${e.yes} | The language is now ${lang}`,
			CONFIG_PREFIX_UNDEFINED: `${e.no} | You don't have specified the prefix to set !`,
			CONFIG_PREFIX_TOOLONG: `${e.no} | You can't set a prefix with more than 3 characters !`,
			CONFIG_PREFIX_SUCCESS: (prefixx) => `${e.yes} | The prefix has been updated to \`${prefixx}\``,
			CONFIG_PREMIUM_NEED: `${e.no} | You need to join the YouTube Bot's support to subscribe to YouTube Bot Premium`,
			CONFIG_COMPACT_DISABLED: `${e.disabled} | The compact mode is now disabled.`,
			CONFIG_BASSBOOST_OPTIONS: `${e.no} | Valid Options: \`off\`, \`low\`, \`medium\`, \`high\` & \`hard\`.`,
			CONFIG_BASSBOOST_SUCCESS: (mode) => `${e.enabled} | BassBoost set to \`${mode}\``,
			CONFIG_MUSIC_ENABLED: (filter) => `${e.enabled} | The Filter \`${filter}\` is now **enabled** !\n⚠ | Changes will be applied on the next music`,
			CONFIG_MUSIC_DISABLED: (filter) => `${e.disabled} | The Filter \`${filter}\` is now **disabled** !\n⚠ | Changes will be applied on the next music !`,
			CONFIG_RESET_SUCCESS: (key) => `${e.yes} | The key **${key}** was been reset !`,
			
			CONFIG_NOMENTION: `${e.no} | Please provide a valid role **mention or id** !`,
			CONFIG_DJROLE_SUCCESS: `${e.yes} | I have correctly set the dj role !`,
			CONFIG_STAFFROLE_SUCCESS: `${e.yes} | I have correctly set the staff role !`,
			/* Shard */
			SHARD_WHATS: (guildsCount, usersCount) => `**YouTube Bot work with shards, shards are instances of YouTube Bot started at the same time which share the heavy task of offering you the best possible sound !**\n__Global stats:__\n> \`${guildsCount} servers\`\n> \`${usersCount} users\``,

			/* NOTIFY */
			NOTIFY_NO_CHANNEL_MENTION: `${e.no} | You don't have defined the channel !`,
			NOTIFY_INVALID_CHANNEL: `${e.no} | The channel isn't valid !`,
			NOTIFY_INVALID_YT_CHANNEL: `${e.no} | Please provide the channel name to check`,
			NOTIFY_NOT_EXIST: `${e.no} | I couldn't fetch the youtube channel provided please try again !`,
			NOTIFY_SUCCESS: `${e.yes} | Success ! the youtube channel was been saved, take note a notification can take up 30 minuts to be sended`,
			NOTIFY_CHECKING: `${e.loading} | Recherche en cours...`,
			/* NP */
			NP_CURRENT: (title, author, url) => `${e.youtube} | I'm playing **${title}** by **${author}** from **YouTube**\n[Link](${url})`,

			/* NEWS */
			NEWS_DESC: "YouTube Bot work with versions, every version add new features and improve existing features to imporove YouTube Bot",
		
			/* INFO */

			INFO_DESC: (version, shardid, shardcount, totalGuilds, totalMembers) => `YouTube Bot is running on the version \`${version}\`.
You're running in the shard \`#${shardid}\` with a total of \`${shardcount}\` shards
thanks for using YouTube Bot !
i'm powering \`${totalGuilds}\` communities with a total of \`${totalMembers}\` users
want to donate ? check [our patreon page](https://patreon.com/botyoutube)
Want to vote ? check  our [vote page](https://top.gg/bot/486948160124485642/vote)`,
		

			/* INVITE */
			INVITE_DESC: `YouTube Bot is a Disord bot completly Free with a lot of freatures.`,
			INVITE_ALL_PERMS: `Invite with all permissions (recommanded)`,
			INVITE_NO_PERMS: `Invite without permssions (not recommanded)`,
			INVITE_CLICK_ALL: `Invite`,
			INVITE_CLICK_NONE: `Invite (not recommanded)`,

			/* JOIN */
			JOIN_ALREADY_CHANNEL: `${e.no} | I'm already in a channel !`,
			JOIN_SUCCESS: (channel) => `${e.yes} | Joined the channel ${channel}`,
		
			/* PARTNERS */
			PARTNERS_DESC: `This is a list of our Partners\n**Projects with a 🌟 are projects which we support a lot !**`,
			
			/* PREMIUM */

			PREMIUM_YES_CONGRATS: `${e.yes} | Thanks for using YouTube Bot Premium !\nYour server is premium until **Life Time**`,
			PREMIUM_NO_OHNO: `${e.no} | Oh no ! you don't have any active licence on this server !`,
			PREMIUM_PURCHASE: "Purchase now",
			PREMIUM_NO_ARGUMENTS: `${e.premium} Spice'up your YouTube Bot experiance and support YouTube Bot by buying a YouTube Bot licence ! 
			> It's only ~~10€~~ 5€ lifetime !
			> To get so a lot functionalities in plus !
			**Buying a licence while the christmas preiod ?**
			> enjoy a beta tester licence in plus to test our news technologies ${e.beta_teser} !`,
			PREMIUM_WANT_PURCHASE: `Want to purchase ?`,
			PREMIUM_SUPPORT_SERVER: `Join our support server`,

			/* REDEEM */
			REDEEM_CODE_EXISTS: `${e.no} | Oops this code don't exist ! please try again with a valid code`,
			REDEEM_SUCCESS: `${e.yes} | Congratuations i just added one premium licence to your wallet, to activate it on a server make ${c.PREFIX}activate inside !`,

			/* SERVERINFO */
			SERVERINFO_PLAYING: `Playing`,

			/* BOTINFO */

			BOTINFO_ABOUT: `YouTube Bot is a bot developed with ❤ by HiiZun`,
			BOTINFO_BOT_STATS: `<:youtubebot:720657201542332528> Bot informations`,
			BOTINFO_SERVER_STATS: `<a:debian:719323036242935908> Server informations`,
			BOTINFO_SOFTWARE_STATS: `<:configuration:718448486458327070> Software informations`,
			BOTINFO_SHARD: `Shard`,
			BOTINFO_TOTAL_SERVERS: `Number of servers`,
			BOTINFO_TOTAL_USERS: `Number of members`,
			BOTINFO_SHARD_NUMBER: `Number of shards`,
			BOTINFO_SHARD_CURRENT: `Current shard`,
			BOTINFO_OS: `OS`,
			BOTINFO_ARCH: `Arch`,
			BOTINFO_RAM: `RAM usage`,
			BOTINFO_BOT_VERSION: `YouTube Bot`,
			BOTINFO_BOT_LIB: `Library`,
			BOTINFO_BOT_CORE: `Language`,
			BOTINFO_PLAYING_COUNT: "Playing on",
			BOTINFO_PREMIUM_COUNT: `Premium on`,

			/* URBAN */
			URBAN_NOTFOUND: (query) => `${e.no} | No results for ${query}`,
			URBAN_DEF: `Definition`,
			URBAN_EXAMPLE: `Example`,
			URBAN_RATING: `Rating`,

			/* RADIO */
			RADIO_EXPL: `To play a radio listed here, execute \`${prefix}radio iLoveMusic\` for example`,
			RADIO_EXISTNO: `${e.no} | This radio don't exist !`,
			RADIO_SUCCESS: (radio) => `${e.enabled} | Now i will play the radio ${radio} 24/7 in this channel !`,


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
            "January", "Febuary", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];
		pdate = new Date(pdate)
        let day = pdate.getDate();
        let monthIndex = pdate.getMonth();
        let year = pdate.getFullYear();
        let hour = pdate.getHours() < 10 ? "0" + pdate.getHours() : pdate.getHours();
        let minute = pdate.getMinutes() < 10 ? "0" + pdate.getMinutes() : pdate.getMinutes();

		let thedate = (isLongDate) ? `${day} ${monthNames[monthIndex]} ${year} at ${hour}h${minute}`
		: `${day} ${monthNames[monthIndex]} ${year}`;
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
		(!isDays ? "" : (isMinutes || isHours) ? "{days} days, " : "{days} days and ")+
		(!isHours ? "" : (isMinutes) ? "{hours} hours, " : "{hours} hours and ")+
		(!isMinutes ? "" : "{minutes} minutes and ")+
		("{seconds} seconds");
		let sentence = pattern
			.replace("{duration}", pattern)
			.replace("{days}", days)
			.replace("{hours}", hours)
			.replace("{minutes}", minutes)
			.replace("{seconds}", seconds);
		return sentence;
	}

}
