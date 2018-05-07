import { PlatformBridge } from './PlatformBridge';
import { ApplicationServices } from './ApplicationServices';
import { SchoolServices } from './SchoolServices';

const bridge = new PlatformBridge();

ApplicationServices.init(bridge);
SchoolServices.init(bridge);

export { ApplicationServices, SchoolServices };
