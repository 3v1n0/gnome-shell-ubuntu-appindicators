// -*- mode: js2; indent-tabs-mode: nil; js2-basic-offset: 4 -*-

const GObject = imports.gi.GObject;
const Gtk = imports.gi.Gtk;
const Lang = imports.lang;
const Config = imports.misc.config;
const Gio = imports.gi.Gio;

const Gettext = imports.gettext.domain('TopIcons-Plus');
const _ = Gettext.gettext;
const N_ = function(e) { return e; }

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;

function init() {
    Convenience.initTranslations();
}

const TopIconsPlusSettings = new GObject.Class({
    Name: 'TopIconsPlusPrefs',
    Extends: Gtk.Grid,

    _init: function(params) {

        this.parent(params);
        this.margin = 24;
        this.spacing = 30;
        this.row_spacing = 10;
        this._settings = Convenience.getSettings();

        let label = null
        let widget = null;
        let value = null;
        let positionSetting = null;
        let positionButton = null;
        let radio = null;
        //this._changedPermitted = false;

        // Icon opacity
        label = new Gtk.Label({
            label: _('Opacity (min: 0, max: 255)'),
            hexpand: true,
            halign: Gtk.Align.START
        });
        widget = new Gtk.SpinButton({halign: Gtk.Align.END});
        widget.set_sensitive(true);
        widget.set_range(0, 255);
        widget.set_value(this._settings.get_int('icon-opacity'));
        widget.set_increments(1, 2);
        widget.connect('value-changed', Lang.bind(this, function(w){
             value = w.get_value_as_int();
             this._settings.set_int('icon-opacity', value);
        }));
        this.attach(label, 0, 1, 1, 1);
        this.attach(widget, 1, 1, 1, 1);

        // Icon saturation
        label = new Gtk.Label({
            label: _('Desaturation (min: 0.0, max: 1.0)'),
            hexpand: true,
            halign: Gtk.Align.START
        });
        widget = new Gtk.SpinButton({halign:Gtk.Align.END, digits:1});
        widget.set_sensitive(true);
        widget.set_range(0.0, 1.0);
        widget.set_value(this._settings.get_double('icon-saturation'));
        widget.set_increments(0.1, 0.2);
        widget.connect('value-changed', Lang.bind(this, function(w){
            value = w.get_value();
            this._settings.set_double('icon-saturation', value);
         }));
        this.attach(label, 0, 2, 1, 1);
        this.attach(widget, 1, 2, 1, 1);

        // Icon brightness
        label = new Gtk.Label({
            label: _('Brightness (min: -1.0, max: 1.0)'),
            hexpand: true,
            halign: Gtk.Align.START
        });
        widget = new Gtk.SpinButton({halign:Gtk.Align.END, digits:1});
        widget.set_sensitive(true);
        widget.set_range(-1.0, 1.0);
        widget.set_value(this._settings.get_double('icon-brightness'));
        widget.set_increments(0.1, 0.2);
        widget.connect('value-changed', Lang.bind(this, function(w){
            value = w.get_value();
            this._settings.set_double('icon-brightness', value);
         }));
        this.attach(label, 0, 3, 1, 1);
        this.attach(widget, 1, 3, 1, 1);

        // Icon contrast
        label = new Gtk.Label({
            label: _('Contrast (min: -1.0, max: 1.0)'),
            hexpand: true,
            halign: Gtk.Align.START
        });
        widget = new Gtk.SpinButton({halign:Gtk.Align.END, digits:1});
        widget.set_sensitive(true);
        widget.set_range(-1.0, 1.0);
        widget.set_value(this._settings.get_double('icon-contrast'));
        widget.set_increments(0.1, 0.2);
        widget.connect('value-changed', Lang.bind(this, function(w){
            value = w.get_value();
            this._settings.set_double('icon-contrast', value);
         }));
        this.attach(label, 0, 4, 1, 1);
        this.attach(widget, 1, 4, 1, 1);

        //this._changedPermitted = true;
    },

});

function buildPrefsWidget() {
     let widget = new TopIconsPlusSettings();
     widget.show_all();

     return widget;
}
