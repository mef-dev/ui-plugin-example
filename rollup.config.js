import resolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import { PLUGIN_VERSION } from "./src/environments/version";
import angular from 'rollup-plugin-angular';
import { minify as minifyHtml } from 'html-minifier';
import sass from 'sass';
import CleanCSS from 'clean-css';
import copy from "rollup-plugin-copy-assets";

const cssmin = new CleanCSS();
const htmlminOpts = {
    caseSensitive: true,
    collapseWhitespace: true,
    removeComments: true,
};

const pluginPath = `external_plugins/${PLUGIN_VERSION.name}-${PLUGIN_VERSION.version}`;

export default {
	input: "src/main.ts",
	output: {
		file: `${pluginPath}/${PLUGIN_VERSION.name}-${PLUGIN_VERSION.version}.bundle.js`,
		format: "system"
	},
	plugins: [
		angular({
			// additional replace `templateUrl` and `stylesUrls` in every `.js` file
			default: true,
			replace: false, 
			preprocessors: {
			///* uncomment for disable minify	
			template: template => minifyHtml(template, htmlminOpts),
			
			style: scss => {
				const css = sass.renderSync({ data: scss }).css;
				return cssmin.minify(css).styles;
			},
			//*/
			}
		  }),
		resolve({
			// pass custom options to the resolve plugin
			customResolveOptions: {
				moduleDirectory: "node_modules",
			},
		}),
		typescript({
			typescript: require("typescript"),
			//objectHashIgnoreUnknownHack: true,
			clean: true,
		}),
		copy({
			assets: [
			  "../assets",
			],
		  }),
		  
	],
	external: [
		"plugins-core",
		"@angular/core",
		"@angular/forms",
		"@angular/common",
		"@angular/common/http",
		"@angular/animations",
		"@angular/platform-browser",
		"@angular/platform-browser-dynamic",
		"@ngx-translate",
		"@ngx-translate/core",
		"@ngx-translate/http-loader",
		'ngx-bootstrap/tooltip',
		'ngx-bootstrap/tabs',
		'ngx-bootstrap/modal',
		'ngx-bootstrap/dropdown',
		'ngx-bootstrap/accordion',
		'ngx-bootstrap/alert',
		'ngx-bootstrap/buttons',
		'ngx-bootstrap/collapse',
		'ngx-bootstrap/tooltip',
		'ngx-bootstrap/typeahead',
		"file-saver",
		"xlsx",
		"rxjs",
		"rxjs/internal/Subject",
		"ngx-bootstrap",
		"jqwidgets-ng/jqxgrid",
		"jqwidgets-ng/jqxdatetimeinput",
		"jqwidgets-ng/jqxdropdownlist",
		"jqwidgets-ng/jqxchart",
		"jqwidgets-ng/jqxinput",
		"jqwidgets-ng/jqxcombobox",
		"jqwidgets-ng/jqxtooltip",
		"jqwidgets-ng/jqxloader",
		"jqwidgets-ng/jqxwindow",
		"jqwidgets-ng/jqxexpander",
		"angular2-draggable",
		"@angular/router"
	],
};
