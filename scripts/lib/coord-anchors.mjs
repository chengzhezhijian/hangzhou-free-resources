/**
 * 人工校验坐标（地理编码失败或地址过泛时的兜底）
 * id → { lat, lng, precision }
 */
export const COORD_ANCHORS = {
  "study-dangqun": { lat: 30.273015, lng: 120.487952, precision: "geocode" },
  "sport-olympic": { lat: 30.224071, lng: 120.232974, precision: "geocode" },
};
