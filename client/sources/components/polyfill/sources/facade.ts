
import * as browser from './browser'
import * as electron from './electron'

let concrete = browser;

export function loadBrowser() : void {
	concrete = browser; 
}

export function loadElectron() : void {
	concrete = electron; 
}

export function openLink(url:string, blank:boolean = false) { concrete.openLink(url, blank); }