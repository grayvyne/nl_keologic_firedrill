/** @module platform
 * @exports ApplicationServices
 * @exports SchoolServices
 */

import { Firebase } from '../config/firebase';
import { NLFirebaseLogger } from '../lib/NLFirebaseLogger';
import { ApplicationServices } from './ApplicationServices';
import { PlatformBridge } from './PlatformBridge';
import { SchoolServices } from './SchoolServices';

NLFirebaseLogger.setup(Firebase.Refs.root(), {});

const bridge = new PlatformBridge();

ApplicationServices.init(bridge);
SchoolServices.init(bridge);

export { ApplicationServices, SchoolServices };
