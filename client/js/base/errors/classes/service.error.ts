/**
 * @file service.error.ts
 * @class serviceErrorClass
 *
 * @description
 * Typed error thrown when a failure occurs within the service layer (socket, store, WebRTC,
 * or UI services). Wraps and re-throws errors from deeper layers so that the originating
 * service is recorded in the error chain.
 *
 * @extends baseErrorClass
 *
 * @thrownBy
 * - socketService, storeService, webRtcService, uiService (and their agent/stranger subclasses)
 *   via errorHandler.propagateErrorService
 *
 * @see baseErrorClass  - (client/js/base/errors/classes/base.error.ts)
 * @see errorHandler.propagateErrorService / wrapErrorService
 */
import { baseErrorClass } from "./base.error.js";

export class serviceErrorClass extends baseErrorClass {}
