/**
 * @class Queue
 */
class Queue {
    /**
     * @param {import("./YouTubeBot")} client
     * @param {Object} data
     * @param {import("discord.js").TextChannel} data.textChannel
     * @param {import("discord.js").VoiceChannel} data.voiceChannel
     */
    constructor(client, data = {}) {
        this.client = client;
        this.textChannel = data.textChannel;
        this.voiceChannel = data.voiceChannel;
        this.node = data.node;
        this.player = null;
        this.songs = [];
        this.volume = 100;
        this.playing = true;
        this.loop = false;
    }

    /**
     * @param {import("lavacord").Player} player
     */
    setPlayer(player) {
        this.player = player;
    }

    async pause() {
        if (!this.playing) return false;
        await this.player.pause(true);
        this.playing = false;
        return true;
    }

    async resume() {
        if (this.playing) return false;
        await this.player.pause(false);
        this.playing = true;
        return true;
    }

    async skip() {
        return this.player.stop();
    }

    async setVolume(value) {
        if (!value || isNaN(value)) return false;
        await this.player.volume(value);
        this.volume = parseInt(value);
        return true;
    }

    async getNode() {
        return this.node;
    }

    async destroy() {
        await this.client.player.queue.delete(this.textChannel.guild.id);
        await this.client.player.manager.leave(this.textChannel.guild.id);
        await this.client.player.manager.players.delete(this.textChannel.guild.id)
        return true;
    }
}

module.exports = Queue;
