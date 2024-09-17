/**
 * Bus
 *
 * controls the playback of multiple sounds
 * only plays one sound at a time
 *
 * uses Howl player
 */
import { Howl } from 'howler'

export class Buss {
  /**
   * sounds
   * 
   * An object containing the howl instances
   * that handle playback,
   * indexed by padId.
   * 
   * { [padId: string]: Howl }
   */
  sounds: Record<string, Howl> = {}

  /**
   * currentSoundId
   * 
   * The id of the sound currently being played.
   */
  currentSoundId = ''

  /**
   * add
   * 
   * Add a sound to the buss,
   * indexed by padId.
   * Load it in a howl instance.
   */
  add({
    endTime,
    padId,
    src,
    startTime,
    volume,
  }: {
    endTime: number,
    padId: string,
    src?: string,
    startTime: number,
    volume: number,
  }) {
    if (!src) {
      return
    }
    
    this.sounds[padId] = new Howl({ src, volume, sprite: {
      clip: [startTime, endTime],
    }})
  }

  /**
   * remove
   * 
   * Remove a sound from the buss.
   */
  remove(padId?: string) {
    if (!padId) {
      return
    }

    if (this.currentSoundId === padId) {
      this.stop(this.currentSoundId)
    }
    
    delete this.sounds[padId]
  }

  /**
   * play
   * 
   * Play a sound
   */
  play(padId?: string) {
    /**
     * Buss accepts input from pad
     * not all pads have sounds
     */
    if (!padId) {
      return
    }

    if (this.currentSoundId) {
      this.stop(this.currentSoundId)
    }

    this.sounds[padId].once('end', () => {
      this.currentSoundId = ''
    })
    this.currentSoundId = padId
    this.sounds[padId].play('clip')
  }

  /**
   * stop
   * 
   * Stop a sound.
   * Either the one specified,
   * or default to the currently-playing one
   * if no 'padId' given.
   */
  stop(padId?: string) {
    if (padId) {
      this.sounds[padId].stop()
    } else if (this.currentSoundId) {
      this.sounds[this.currentSoundId].stop()
    }
  }
}
