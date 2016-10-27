import Ember from 'ember';

const { computed } = Ember;
const { reads } = computed;

export default Ember.Mixin.create({
  role: 'combobox',

  'aria-activedescendant': null,

  'aria-expanded': reads('isOpen'),

  'aria-autocomplete': 'list',

  'aria-owns': null,

  'aria-haspopup': true,

  'aria-disabled': reads('disabled'),

  'aria-labelledby': reads('labelled-by'),

  actions: {
    setActiveDescendent(id) {
      this.set('aria-activedescendant', id);
    },

    setAriaOwns(id) {
      this.set('aria-owns', id);
    }
  }
});
