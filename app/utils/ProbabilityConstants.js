const ProbabilityConstants = {
  MIN_PROB:0,
  MAX_PROB:10,
  STEP: 1,
  mapGradesToProb(grades){
    return grades.map(gr => this.mapGradeToProb(gr));
  },
  mapGradeToProb(grade, prob){
    const propToApply = prob ? prob : (this.MAX_PROB + this.MIN_PROB)/2;
    return {grade: grade, prob:propToApply};
  }
}

export {ProbabilityConstants};
