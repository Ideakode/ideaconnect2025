/**
 * @file validator.helper.ts
 * @class validatorHelper
 *
 * @description
 * Provides guard-style validation methods used at every layer boundary.
 * Each public method throws a typed error (via errorHandler.throwError) if
 * the input does not meet the expected shape. Private methods perform the
 * actual type-guard checks via duck-typing.
 *
 * @staticMethods
 * - checkPeerInStore(id, peerType, store)
 *     Verifies a peer with the given socket ID exists in the store.
 *     Throws peerANotInStore or peerSNotInStore (validatorErrorClass) if not found —
 *     these specific error names are caught by useCaseErrors.replyNotFoundIfNeeded.
 *
 * - checkIO(data)      Throws if data is not a valid Socket.IO Server instance.
 * - checkSocket(data)  Throws if data is not a valid Socket.IO Socket instance.
 * - checkStore(data, peerType)
 *     Throws if data is not a valid store of the given peer type
 *     (storeA for AGENT, storeS for STRANGER, or base store if peerType is omitted).
 *
 * - checkCommonParamsInterface(data)  Throws if data is not a valid commonParams object.
 * - checkNamespace(nspc)             Throws if nspc is not /AGENT or /STRANGER.
 * - checkPeerType(peer)              Throws if peer is not AGENT or STRANGER.
 *
 * @see errorBuilder           — provides named error factory methods
 * @see useCaseErrors          — catches validatorErrorClass for NOT_FOUND recovery
 */
import { Server as IO, Socket } from "socket.io";
import { store, storeA, storeS } from "../classes/classes.js";
import * as constants from "../constants/constants.js";
import { ICommonParams } from "../interfaces/interfaces.js";
import { errorTypes, errorHandler, errorBuilder } from "../errors/errors.js";

export class validatorHelper {
  protected static readonly errType = errorTypes.VALIDATOR;

  public static checkPeerInStore(
    id: string,
    peerType: string,
    store: storeA | storeS
  ) {
    const method = this.checkPeerInStore.name;

    try {
      this.checkPeerType(peerType);
      const peer = store.getPeer(id);
      const peerA = constants.peerTypes.AGENT;
      const peerS = constants.peerTypes.STRANGER;

      if (peer === undefined) {
        if (peerType === peerA) {
          const err = errorBuilder.peerANotInStore(this.errType, method);
          errorHandler.throwError(this.name, err, false);
        } else if (peerType === peerS) {
          const err = errorBuilder.peerSNotInStore(this.errType, method);
          errorHandler.throwError(this.name, err, false);
        } else {
          const err = errorBuilder.unkonwn(this.errType, method);
          errorHandler.throwError(this.name, err, false);
        }
      }
    } catch (error: unknown) {
      errorHandler.propagateErrorValidator(this.name, error, method);
    }
  }

  public static checkIO(data: unknown) {
    if (!this.isIO(data)) {
      const method = this.checkIO.name;
      const err = errorBuilder.ioNotvalid(this.errType, method);
      errorHandler.throwError(this.name, err);
    }
  }

  public static checkSocket(data: unknown) {
    if (!this.isSocket(data)) {
      const method = this.checkSocket.name;
      const err = errorBuilder.socketNotValid(this.errType, method);
      errorHandler.throwError(this.name, err);
    }
  }
  public static checkStore(
    data: unknown,
    peerType: string = ""
    /* storeError: storeError */
  ) {
    const method = this.checkStore.name;
    switch (peerType) {
      case constants.peerTypes.AGENT: {
        if (!this.isStoreAgent(data)) {
          const err = errorBuilder.storeANotValid(this.errType, method);
          errorHandler.throwError(this.name, err);
        }
        break;
      }
      case constants.peerTypes.STRANGER: {
        if (!this.isStoreStrager(data)) {
          const err = errorBuilder.storeSNotValid(this.errType, method);
          errorHandler.throwError(this.name, err);
        }
        break;
      }
      default: {
        if (!this.isStore(data)) {
          const err = errorBuilder.storeNotValid(this.errType, method);
          errorHandler.throwError(this.name, err);
        }
      }
    }
  }

  public static checkCommonParamsInterface(data: unknown) {
    if (!ICommonParams.isCommonParams(data)) {
      const method = this.checkCommonParamsInterface.name;
      const err = errorBuilder.ifDataNotValid(this.errType, method, data);
      errorHandler.throwError(this.name, err);
    }
  }
  public static checkNamespace(nspc: string) {
    const nspcA = constants.socketIO.namespaces.AGENT;
    const nspcS = constants.socketIO.namespaces.STRANGER;
    if (nspc !== nspcA && nspc !== nspcS) {
      const method = this.checkNamespace.name;
      const err = errorBuilder.namespaceNotValid(this.errType, method, nspc);
      errorHandler.throwError(this.name, err);
    }
  }

  public static checkPeerType(peer: string) {
    const peerA = constants.peerTypes.AGENT;
    const peerS = constants.peerTypes.STRANGER;
    if (peer !== peerA && peer !== peerS) {
      const method = this.checkPeerType.name;
      const err = errorBuilder.peerNotValid(this.errType, method, peer);
      errorHandler.throwError(this.name, err);
    }
  }

  private static isIO(data: unknown): data is IO {
    return (
      (data as IO).on !== undefined &&
      (data as IO).of !== undefined &&
      (data as IO).sockets !== undefined &&
      (data as IO).to !== undefined
    );
  }

  private static isSocket(data: unknown): data is Socket {
    return (
      (data as Socket).id !== undefined &&
      (data as Socket).conn !== undefined &&
      (data as Socket).connected !== undefined &&
      (data as Socket).disconnected !== undefined &&
      (data as Socket).nsp !== undefined
    );
  }

  private static isStore(data: unknown): data is store {
    return (data as store).peers !== undefined;
  }
  private static isStoreAgent(data: unknown): data is storeA {
    return (
      (data as storeA).peers !== undefined &&
      (data as storeA).getAvailableAgents !== undefined &&
      (data as storeA).setAgentAvailableStatus !== undefined &&
      (data as storeA).addAgent !== undefined &&
      (data as storeA).removeAgent !== undefined
    );
  }
  private static isStoreStrager(data: unknown): data is storeS {
    return (
      (data as storeS).peers !== undefined &&
      (data as storeS).addStranger !== undefined &&
      (data as storeS).getTotalStrangersConnected !== undefined &&
      (data as storeS).removeStranger !== undefined
    );
  }
}
