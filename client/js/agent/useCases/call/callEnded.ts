/**
 * @file callEnded.ts
 * @class callEnded
 *
 * @description
 * Stub use case for when the agent ends an active call (e.g. clicks the
 * Finish Call button). Not yet implemented.
 *
 * @note
 * Referenced by callAccepted.ts as the `fnEndCall` callback to be passed into
 * the chat view, but the switchToChatView call is also commented out. Full
 * implementation pending view management and call teardown work.
 *
 * @see callAccepted — passes callEnded.execute as fnEndCall to the chat view
 * @see callBye      — the BYE signaling counterpart (also a stub)
 */
export class callEnded {
 public static execute( ) {
  //To Do
}}
