/**
 * @file totalStrangers.references.ts
 * @class totalStrangersReferences
 *
 * @description
 * Static constants registry for all DOM IDs and CSS class names used by
 * the totalStrangers component. Single source of truth — prevents magic
 * strings and enables compile-time typo detection.
 *
 * @properties
 * IDs:
 *   - stranger_total_available → "stranger_total_available"  (the live count span)
 *
 * classes:
 *   - total_strangers_container    → "stranger_current_status_container"
 *   - stranger_container_paragraph → "stranger_container_paragraph"
 *
 * @see totalStrangerElements — primary consumer of these constants
 */
export class totalStrangersReferences {
  public static readonly IDs = {
    stranger_total_available: "stranger_total_available",
  };
  public static readonly classes = {
    total_strangers_container: "stranger_current_status_container",
    stranger_container_paragraph: "stranger_container_paragraph",
  };
}
