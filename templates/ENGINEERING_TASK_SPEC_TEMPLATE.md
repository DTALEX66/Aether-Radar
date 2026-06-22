# 工程任务说明模板

## 任务名称

## 背景

## 涉及文件

## 数据字段影响

## UI 影响

## 风险/合规影响

## 实现步骤

1.
2.
3.

## 必跑检查

```bash
python scripts/check_encoding_syntax.py
python scripts/validate_data.py
python scripts/ten_round_self_check.py
cd next-app
npm run sync:data
npm run typecheck
npm run lint
npm run build
```

## 验收标准

- [ ] 功能可用
- [ ] 数据不漂移
- [ ] 风险提示保留
- [ ] 导出/API 不破坏
- [ ] UI 符合规范
