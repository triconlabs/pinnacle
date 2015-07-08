import Ember from 'ember';

export function ifAnswer(value) {
	console.log("value");
	console.log(value);
	
  return value;
}

export default Ember.HTMLBars.makeBoundHelper(ifAnswer);
