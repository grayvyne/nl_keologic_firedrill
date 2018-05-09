/** @module platform
 * @exports ApplicationServices
 * @exports SchoolServices
 */

import { ApplicationServices } from './ApplicationServices';
import { PlatformBridge } from './PlatformBridge';
import { SchoolServices } from './SchoolServices';

const bridge = new PlatformBridge();

ApplicationServices.init(bridge);
SchoolServices.init(bridge);

export { ApplicationServices, SchoolServices };
