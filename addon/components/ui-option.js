import Ember from 'ember';
import layout from '../templates/components/ui-option';
import UiOptionList from './ui-option-list';
import UiOptionGroup from './ui-option-group';
import { EKMixin, EKOnFocusMixin, EKFirstResponderOnFocusMixin, keyDown, getKey } from 'ember-keyboard';

const {
  Component,
  computed,
  on
} = Ember;

const { alias } = computed;

export default Component.extend(EKMixin, EKOnFocusMixin, EKFirstResponderOnFocusMixin, {
  layout: layout,
  tabindex: 0,
  tagName: 'li',
  unselectable: 'on',

  classNames: ['ff-option'],
  classNameBindings: ['selected'],

  attributeBindings: ['tabindex', 'unselectable', 'role'],

  role: 'option',

  selectedValues: alias('optionList.selectedValues'),

  selected: computed('value', 'selectedValues.[]', function() {
    const selectedValues = this.get('selectedValues');
    const value = this.get('value');

    return selectedValues.contains(value);
  }),

  init() {
    const optionList = this.nearestOfType(UiOptionList);
    this.set('optionList', optionList);

    this._super.apply(this, arguments);
  },

  registerOption: on('init', function() {
    const optionGroup = this.nearestOfType(UiOptionGroup);

    if (optionGroup) {
      this.set('optionGroup', optionGroup);
      optionGroup.registerOption(this);
    }
  }),

  unregisterOption: on('willDestroyElement', function() {
    const optionGroup = this.get('optionGroup');

    if (optionGroup) {
      optionGroup.unregisterOption(this);
    }
  }),

  bootstrapFocus: on('didInsertElement', function() {
    if (this.get('selected')) {
      this.$().focus();
      this.sendTemplate();
    }
  }),

  focusIn() {
    this.get('optionList').setActiveDescendent(this.element.id);
  },

  mouseEnter() {
    this.$().focus();
  },

  click() {
    this.toggle();
  },

  moveUp: on(keyDown('ArrowUp'), function() {
    const list = this.get('optionList');
    const options = list.$().find('.ff-option');
    const index = options.index(this.element);

    if (index > 0) {
      options.eq(index - 1).focus();
    } else {
      if (!list.keyboardOutOfRange()) {
        options.eq(options.length - 1).focus();
      }
    }
  }),

  moveDown: on(keyDown('ArrowDown'), function() {
    const list = this.get('optionList');
    const options = list.$().find('.ff-option');
    const index = options.index(this.element);

    if (index < options.length - 1) {
      options.eq(index + 1).focus();
    } else {
      if (!list.keyboardOutOfRange()) {
        options.eq(0).focus();
      }
    }
  }),

  toggle: on(keyDown('Enter'), keyDown(' '), function() {
    const selected = this.get('selected');

    if (selected) {
      this.deselect();
    } else {
      this.select();
    }
  }),

  handleUnregisteredKeyEvent: on(keyDown(), function(event) {
    if (!/^ArrowUp|ArrowDown|Enter|\s/.test(getKey(event))) {
      this.get('optionList').handleUnregisteredKeyEvent(event);
    }
  }),

  select() {
    const value = this.get('value');

    this.get('optionList').select(value);
    this.sendTemplate();
  },

  deselect() {
    const value = this.get('value');

    this.get('optionList').deselect(value);
  },

  sendTemplate() {
    this.get('optionList').sendTemplate(this.get('value'), this.element);
  }
});
