# 04 数据模型

## Entity 工具/平台/项目主表

字段：

```ts
type Entity = {
  id: string;
  name: string;
  literal: string;
  cn: string;
  category: string;
  type: '平台' | '软件' | '开源项目' | '协议' | '平台/Agent' | string;
  summary: string;
  value: string;
  url: string;
  githubRepo?: string;
  heatLevel: 'SSS' | 'SS' | 'S' | 'A' | 'B' | 'C' | string;
  heatNote: string;
  openSource: boolean;
  localDeploy: boolean;
  chinaUsability: '好' | '较好' | '一般' | '不稳定' | string;
  riskLevel: '低' | '中' | '高' | '未知' | string;
  riskNote: string;
  recommend: string;
}
```

## Category 分类表

```ts
type Category = {
  id: string;
  name: string;
  description: string;
  priority: 'P0' | 'P1' | 'P2';
}
```

## Scenario 场景方案

```ts
type Scenario = {
  id: string;
  name: string;
  user: string;
  stack: string[];
  difficulty: string;
  cost: string;
  localPossible: string;
  risk: string;
  path: string;
}
```

## Comparison 对比表

```ts
type Comparison = {
  id: string;
  title: string;
  a: string;
  b: string;
  bestForA: string;
  bestForB: string;
  decision: string;
}
```

## 数据去重原则

- 同一个工具只保留一个 `entity_id`。
- 多分类通过 `entity_categories` 扩展，MVP阶段先用主分类字段。
- 排行榜按 entity 去重，不按分类重复计算。
- 平台、开源项目、术语分类型，但都可以进入搜索。
