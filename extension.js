import { InjectionManager } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as SwitcherPopup from 'resource:///org/gnome/shell/ui/switcherPopup.js';

export default class RemoveAltTabDelayExtension {
    enable() {
        this._injectionManager = new InjectionManager();
        this._injectionManager.overrideMethod(
            SwitcherPopup.SwitcherPopup.prototype,
            'show',
            originalMethod => {
                return function (...args) {
                    if (!originalMethod.apply(this, args)) return false;
                    this._showImmediately();
                    return true;
                };
            }
        );        
    }

    disable() {
        this._injectionManager.clear();
    }
}
