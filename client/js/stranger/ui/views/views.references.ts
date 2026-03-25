/**
 * @file views.references.ts
 * @class viewsReferences
 *
 * @description
 * Centralises DOM IDs and CSS class names for the stranger view components.
 *
 * IDs:
 * - view_default    — wrapper element for the default view
 * - view_chat       — wrapper element for the chat view
 * - view_video_call — reserved for video call view (future)
 * - view_audio_call — reserved for audio call view (future)
 *
 * Classes mirror the ID names and are applied alongside the base "view" class.
 */
export class viewsReferences {
  public static readonly IDs = {
    view_default: "view_default",
    view_chat: "view_chat",
    view_video_call: "view_video_call",
    view_audio_call: "view_audio_call",
  };
  public static readonly classes = {
    view: "view",
    view_default: "view_default",
    view_chat: "view_chat",
    view_video_call: "view_video_call",
    view_audio_call: "view_audio_call",
  };
}
