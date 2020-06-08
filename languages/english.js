let langinfos = {
	lang: "English (Default)",
	name: "english",
    contributors: ["Main languuage"]
}

let c = require("../config.json");
const uptime = require("../commands/uptime");
let e = c.emojis;



module.exports = class {
    constructor() {
		this.language = {

			// Utils
			PREFIX_INFO: (prefix) => `The prefix of this server is \`${prefix}\``,
			UTILS: {
				YES: "Yes",
				NO: "No",
				USER: "User",
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
				ID: "ID",
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
			MESSAGE_ERROR_ARGS_CORRECT: (prefix, command, usage) => `${e.no} | Correct usage: ${prefix}${command} ${usage}`,
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

            /* LOOP */

            LOOP_LOOP: (status) => `🔂 | The loop mode is now **${status}**`,
		
			/* PLAY */
			PLAY_PERM_CONNECT: `${e.no} | I don't have permission to join the voice channel !`,
			PLAY_PERM_SPEAK: `${e.no} | I don't have permission to speak in this channel !`,
			PLAY_ERROR_COPYRIGHT: `${e.no} | I can't play this music because the music has copyright rights !`,
			PLAY_ADDED_QUEUE: (music, user) => `${e.yes} | **${music}** was been added to the queue by ${user} !`,
			PLAY_NOWPLAYING_COMPACT: (song, user) => `${e.yes} | Now Playing: \`${song.title}\``,
			/* PLAYLIST */
			PLAYLIST_ADDED_SONG: (song, user) => `${e.yes} | **${song.title}** was been added to the queue by ${user} !`,
			PLAYLIST_ADDED_PLAYLIST: (playlist, user, queueConstruct) => `📃 | ${user} just added the playlist **${playlist.title}**\n${playlist.url}\n\n${queueConstruct.songs.map((song, index) => index + 1 + ". " + song.title).join("\n")}`,
			
			/* QUEUE */
			QUEUE_SONGQUEUE: `Queue`,
			QUEUE_NOWPLAYING: `Current music`,

			/* REMOVE */

			REMOVE_NOQUEUE: `${e.no} | I'm playing nothing !`,
			REMOVE_REMOVED: (user, song) => `${e.yes} | ${user} just deleted **${song.title}** from the queue.`,

			/* PAUSE */

			PAUSE_PAUSED: (user) => `⏸ | ${user} just paused the music.`,

			/* RESUME */

			RESUME_RESUMED: (user) => `▶ | ${user} just resumed the music.`,

			/* SKIP */

			SKIP_SKIPPED: (user) => `⏭ | ${user} just skipped the music.`,

			/* STOP */

			STOP_STOPPED: (user) => `⏹ | ${user} just stopped the music.`,

			/* VOLUME */

			VOLUME_CURRENT: (volume) => `🔊 | The current volume is **${volume}%**`,
			VOLUME_ERROR_ARGS: `${e.no} | Please provide the volume to set !`,
			VOLUME_ERROR_VOLUME: `${e.no} | Please provide a number bethween 0 and 100 !`,
			VOLUME_SUCCESS: (volume) => `${e.yes} | The volume was correctly set to **${volume}%**`,

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
			CONFIG_PREMIUM_ALREADY: `${e.yes} | Your server is already subscribed :D !`,
			CONFIG_TELEMETRICS_ENABLED: `${e.enabled} | Telemetrics are now enabled, thanks for your support !`,
			CONFIG_TELEMETRICS_DISABLED: `${e.disabled} | Telemetrics are now disabled, take into account that we will be able to help you more if you have any concerns !`,
			CONFIG_NOTIFIER_CMD: `${e.no} | You must use \`${c.PREFIX}notify\` to edit that !`,
			CONFIG_COMPACT_ENABLED: `${e.enabled} | The compact mode is now enabled.`,
			CONFIG_COMPACT_DISABLED: `${e.disabled} | The compact mode is now disabled.`,
			CONFIG_BASSBOOST_OPTIONS: `${e.no} | Valid Options: \`off\`, \`low\`, \`medium\`, \`high\` & \`hard\`.`,
			CONFIG_BASSBOOST_SUCCESS: (mode) => `${e.enabled} | BassBoost set to \`${mode}\``,
			CONFIG_MUSIC_ENABLED: (filter) => `${e.enabled} | The Filter \`${filter}\` is now **enabled** !\n⚠ | Changes will be applied on the next music`,
			CONFIG_MUSIC_DISABLED: (filter) => `${e.disabled} | The Filter \`${filter}\` is now **disabled** !\n⚠ | Changes will be applied on the next music !`,
			CONFIG_RESET_SUCCESS: (key) => `${e.yes} | The key **${key}** was been reset !`,
			
			/* Shard */
			SHARD_WHATS: (guildsCount, usersCount) => `**YouTube Bot work with shards, shards are instances of YouTube Bot started at the same time which share the heavy task of offering you the best possible sound !**\n__Global stats:__\n> \`${guildsCount} servers\`\n> \`${usersCount} users\``,

		
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
