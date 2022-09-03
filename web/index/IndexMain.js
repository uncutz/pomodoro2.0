import Timer from './js/Timer.js';
import OffCanvas from './js/OffCanvas.js';
import ConfigScript from './js/ConfigScript.js';
import SettingStorage from './js/Storage.js';

import './IndexMain.less';

export class IndexMain
{
    initTimer(config)
    {
        new Timer(config);
    }

    initOffCanvas()
    {
        new OffCanvas();
    }

    initConfigScript() {
        new ConfigScript();
    }

    initSettingStorage() {
        return new SettingStorage();
    }
}