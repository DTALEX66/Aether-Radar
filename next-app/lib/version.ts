export const AETHER_VERSION = '3.1';
export const AETHER_RELEASE_DATE = '2026-06-22';
export const AETHER_DATA_SNAPSHOT_DATE = '2026-06-21';
export const AETHER_BUILD_PROFILE = 'v3.1 execution-verified commercial MVP';

export function buildDisclaimer(scope = '内容') {
  return `${scope}用于信息索引和选型参考，不构成法律、安全、采购、财务或商用授权建议。`;
}
