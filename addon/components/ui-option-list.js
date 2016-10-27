import Ember from 'ember';
import layout from '../templates/components/ui-option-list';

const { computed } = Ember;
const { reads } = computed;

export default Ember.Component.extend({
  layout: layout,
  tagName: 'ul',

  role: 'listbox',
  'aria-disabled': reads('disabled'),

  classNames: ['ff-option-list'],

  attributeBindings: [
    'role',
    'aria-activedescendant',
    'aria-disabled'
  ],

  options: computed(() => Ember.A()),
  selectedValues: computed(() => Ember.A()),

  didInsertElement() {
    this.sendAction('set-aria-owns', this.element.id);

    this._super.apply(this, arguments);
  },

  willDestroyElement() {
    this.sendAction('set-aria-owns', null);
    this.sendAction('set-active-descendent', null);

    this._super.apply(this, arguments);
  },

  select(value) {
    this.sendAction('on-select', value);
  },

  deselect(value) {
    this.sendAction('on-deselect', value);
  },

  sendTemplate(value, optionElement) {
    // Prevent DOM object creation unless the template should be sent
    if (this.get('on-template-change')) {
      const template = Ember.$('<div/>').append(Ember.$(optionElement).contents().clone())[0];

      this.sendAction('on-template-change', value, template);
    }
  },

  setActiveDescendent(id) {
    this.set('aria-activedescendant', id);
    this.sendAction('set-active-descendent', id);
  },

  keyboardOutOfRange() {
    if (this.get('on-keyboard-out')) {
      this.sendAction('on-keyboard-out');

      return true;
    }

    return false;
  },

  handleUnregisteredKeyEvent(event) {
    this.sendAction('on-key-down', event);
  }
});
