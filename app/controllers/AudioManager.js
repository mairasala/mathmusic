import {ScaleConstants} from '../utils/ScaleConstants';

export class AudioManager {
  constructor() {
    this.context = new AudioContext();
    this.oscs = {};
  }
  playNote(note){
    if(this.oscs[note]) return;
    const osc = this.context.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = this.getFrequency(note);
    console.log(note + " : " + osc.frequency.value);

    const gain = this.context.createGain();
    gain.gain.value = 0.1;

    osc.connect(gain);
    gain.connect(this.context.destination);

    osc.start(0);
    this.oscs[note] = osc;
  }
  stopNote(note){
    this.oscs[note] && this.oscs[note].stop();
    this.oscs[note] = null;
  }

  getFrequency(note){
    const [noteName, octave] = note.split('-');
    const semitoneIndex = ScaleConstants.NOTES.indexOf(noteName);

    const dist = semitoneIndex - ScaleConstants.NOTES.indexOf(ScaleConstants.REF_TONE.notename);
    const freq = ScaleConstants.REF_TONE.frequency * Math.pow(Math.pow(2, dist), 1/12);
    return freq * Math.pow(2, parseInt(octave) - ScaleConstants.CENTRAL_OCTAVE);

  }
}
