#!/usr/bin/gjs

/*
 * This creates an appindicator which contains all common menu items
 *
 * Requires libappindicator3 introspection data
 */
const Gtk = imports.gi.Gtk;
const AppIndicator = imports.gi.AppIndicator3;
const GLib = imports.gi.GLib;

(function() {

var app = new Gtk.Application({
    application_id: null
});

var window = null;

app.connect("activate", function(){
    window.present();
});

app.connect("startup", function() {
    window = new Gtk.ApplicationWindow({
        title: "test",
        application: app
    });
    
    var menu = new Gtk.Menu();

    var item = Gtk.MenuItem.new_with_label("A standard item");
    menu.append(item);

    item = Gtk.MenuItem.new_with_label("Foo");
    menu.append(item);
    
    item = Gtk.ImageMenuItem.new_with_label("Calculator");
    item.image = Gtk.Image.new_from_icon_name("gnome-calculator", Gtk.IconSize.MENU);
    menu.append(item);
    
    item = Gtk.CheckMenuItem.new_with_label("Check me!");
    menu.append(item);

    item = Gtk.MenuItem.new_with_label("Blub");
    let sub = new Gtk.Menu();
    item.set_submenu(sub);
    menu.append(item);

    item = Gtk.MenuItem.new_with_label("Blubdablub");
    sub.append(item);
    
    item = new Gtk.SeparatorMenuItem();
    menu.append(item);

    item = Gtk.MenuItem.new_with_label("Foo");
    menu.append(item);

    let submenu = new Gtk.Menu();
    item.set_submenu(submenu);

    item = Gtk.MenuItem.new_with_label("Hello");
    submenu.append(item);

    item = Gtk.MenuItem.new_with_label("Nested");
    submenu.append(item);

    let submenu1 = new Gtk.Menu();
    item.set_submenu(submenu1);

    item = Gtk.MenuItem.new_with_label("Another nested");
    submenu.append(item);

    let submenu2 = new Gtk.Menu();
    item.set_submenu(submenu2);

    item = Gtk.MenuItem.new_with_label("Some other item");
    submenu1.append(item);

    item = Gtk.MenuItem.new_with_label("abcdefg");
    submenu2.append(item);
    
    item = new Gtk.SeparatorMenuItem();
    menu.append(item);

    var group = [];
    
    for (let i = 0; i < 5; ++i) {
        item = Gtk.RadioMenuItem.new_with_label(group, "Example Radio "+i);
        group = Gtk.RadioMenuItem.prototype.get_group.apply(item)//.get_group();
        if (i == 1)
            item.set_active(true);
        menu.append(item);
    }

    item = new Gtk.SeparatorMenuItem();
    menu.append(item);

    item = Gtk.MenuItem.new_with_label("Set Label");
    item.connect('activate', function() {
        indicator.set_label(''+new Date().getSeconds(), 'Blub');
    });
    menu.append(item);

    item = Gtk.MenuItem.new_with_label("Unset Label");
    item.connect('activate', function() {
        indicator.set_label('', '');
    })
    menu.append(item);

    item = new Gtk.SeparatorMenuItem();
    menu.append(item);

    item = Gtk.MenuItem.new_with_label("Hide for some time");
    item.connect('activate', function() {
        indicator.set_status(AppIndicator.IndicatorStatus.PASSIVE);
        GLib.timeout_add(0, 5000, function() {
            indicator.set_status(AppIndicator.IndicatorStatus.ACTIVE);
            return false;
        });
    });
    menu.append(item);

    item = Gtk.MenuItem.new_with_label("Close in 5 seconds");
    item.connect('activate', function() {
        GLib.timeout_add(0, 5000, function() {
            app.quit();
            return false;
        });
    });
    menu.append(item);

    menu.show_all();

    var indicator = AppIndicator.Indicator.new("Hello", "indicator-test", AppIndicator.IndicatorCategory.APPLICATION_STATUS);

    indicator.set_status(AppIndicator.IndicatorStatus.ACTIVE);
    indicator.set_icon("gnome-run");
    indicator.set_menu(menu);
});
app.run(ARGV);

})();
