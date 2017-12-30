const ScaleConstants = {
  NOTES: ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'],
  SCALE_GRADES: {
    MAJOR:[0,2,4,5,7,9,11],
    MINOR:[0,2,3,5,7,8,10],
    MAJOR_PENTATONIC:[0,2,4,7,9],
    MINOR_PENTATONIC:[0,3,5,7,10]
  },
  REF_TONE: {
    note: 'A',
    octave: 4,
    frequency: 440
  },
  getNoteByGrade(grade, tone){
    if(this.NOTES.includes(tone.toUpperCase())){
      const positionedGrade = this.getGradeByGradeAndTone(grade, tone);
      return this.NOTES[positionedGrade];
    }
  },
  getGradeByGradeAndTone(grade, tone){
    if(this.NOTES.includes(tone.toUpperCase())){
      const dist = this.NOTES.indexOf(tone.toUpperCase());
      return (dist + grade) % this.NOTES.length;
    }
  },
  getGradeByNote(note){
    return this.NOTES.indexOf(note.toUpperCase());
  }
}

export {ScaleConstants};
