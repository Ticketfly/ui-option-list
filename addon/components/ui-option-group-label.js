import Ember from 'ember';
import layout from '../templates/components/ui-option-group-label';
import UiOption from './ui-option';
import { EKMixin, EKOnFocusMixin, EKFirstResponderOnFocusMixin, keyDown } from 'ember-keyboard';

const { on } = Ember;

export default UiOption.extend(EKMixin, EKOnFocusMixin, EKFirstResponderOnFocusMixin, {
  layout: layout,
  tagName: 'span',

  registerOption: null,
  unregisterOption: null,

  toggle: on(keyDown('Enter'), keyDown(' '), function() {
    this.sendAction();
  })
});
