import Ember from 'ember';
import layout from '../templates/components/ui-option-group';

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  layout: layout,
  tagName: 'li',

  classNames: ['ff-option-group'],

  options: computed(() => Ember.A()),

  selected: computed('options.@each.selected', function() {
    return this.get('options').isEvery('selected');
  }),

  registerOption(option) {
    this.get('options').pushObject(option);
  },

  unregisterOption(option) {
    this.get('options').removeObject(option);
  },

  actions: {
    toggle() {
      const selected = this.get('selected');
      const options = this.get('options');

      if (selected) {
        options.invoke('deselect');
      } else {
        options.invoke('select');
      }
    }
  }
});
