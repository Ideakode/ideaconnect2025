/**
 * @file views.references.ts
 * @class viewsReferences
 *
 * @description
 * Static constants registry for all DOM IDs and CSS class names used by the
 * agent view layer. Single source of truth — prevents magic strings and enables
 * compile-time typo detection across all view files.
 *
 * @properties
 * IDs:
 *   - view_default    → "view_default"
 *   - view_chat       → "view_chat"
 *   - view_video_call → "view_video_call"  (reserved, not yet implemented)
 *   - view_audio_call → "view_audio_call"  (reserved, not yet implemented)
 *
 * classes:
 *   - view            → "view"  (base class applied to all view wrappers)
 *   - view_default    → "view_default"
 *   - view_chat       → "view_chat"
 *   - view_video_call → "view_video_call"
 *   - view_audio_call → "view_audio_call"
 *
 * @see default.view.ts — consumes view_default id and classes
 * @see chat.view.ts    — consumes view_chat id and classes
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
