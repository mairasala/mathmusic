import {ScaleConstants} from '../utils/ScaleConstants';

export class MelodyGenerator {
  constructor(props){
    this.bpms = 120;
    this.timer = null;
    this.seminimInterval = 60 / this.bpms;

    this.playHandler = props.playHandler;

    this.createNote = this.createNote.bind(this);
    this.playingNote = null;
  }
  setNotes(notes, scales){
    const updatedNotes = notes.filter((note)=> note.prob > 0);
    this.scales = ScaleConstants.getOctaves(scales);
    this.updateRandomSeed(updatedNotes);
  }
  updateRandomSeed(notes){
    this.seed = 0;
    notes.forEach((note) => {
      note.min = this.seed;
      this.seed += note.prob;
      note.max = this.seed;
    });
    this.notes = notes;
  }
  start(){
    this.createNote();
  }
  stop(){
    clearTimeout(this.timer);
    this.timer = null;
    this.playHandler({
      type:'stop',
      note: this.playingNote
    });
  }
  createNote(time){
    const seed = Math.random()*this.seed;
    const note = this.notes.find((n) => {
        if(n.min){
          return n.min < seed && n.max >= seed;
        } else {
          return n.min <= seed && n.max >= seed;
        }
      }
    );
    const scale = Math.floor(Math.random() * (this.scales.last - this.scales.first + 1)) + this.scales.first;
    this.playingNote = {
      note: note.note,
      scale: scale
    };
    this.playHandler({
      type:'play',
      note: this.playingNote
    });
    this.timer = setTimeout(int => {
      this.playHandler({
        type:'stop',
        note: this.playingNote
      });
      this.timer = null;
      this.createNote(int);
    }, this.seminimInterval*1000);
  }
}
