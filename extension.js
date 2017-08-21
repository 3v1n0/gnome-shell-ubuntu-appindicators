/*
 * Copyright (C) 2017 Canonical Ltd
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Authored by: Marco Trevisan (Treviño) <marco.trevisan@canonical.com>
 */

const ExtensionUtils = imports.misc.extensionUtils;
const Extension = ExtensionUtils.getCurrentExtension();

const topIconsPlus = Extension.imports.topIconsPlusExtension;
const appIndicators = Extension.imports.appIndicatorsExtension;

const subExtensions = [ appIndicators, topIconsPlus ]

function foreachExtension(method)
{
  for (let extension of subExtensions)
    extension[method]();
}

function init() {
  foreachExtension("init");
}

function enable() {
  foreachExtension("enable");
}

function disable() {
  foreachExtension("disable");
}
