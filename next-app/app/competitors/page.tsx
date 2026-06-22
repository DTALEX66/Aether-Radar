import { competitors } from '../../lib/data';
import { DisclaimerBox } from '../../components/DisclaimerBox';

export default function CompetitorsPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-black">平台收录数量与灵感榜</h1>
      <p className="mt-2 max-w-3xl text-slate-600">
        这个页面用于全面看待行业：谁收录更多、谁分类更细、谁适合作为数据来源或产品灵感。但收录数量不等于质量，也不等于安全或商用可用。
      </p>
      <div className="mt-6"><DisclaimerBox compact /></div>
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="table-cell">平台</th>
              <th className="table-cell">类型</th>
              <th className="table-cell">公开规模/口径</th>
              <th className="table-cell">可借鉴点</th>
              <th className="table-cell">我们的补位</th>
              <th className="table-cell">链接</th>
            </tr>
          </thead>
          <tbody>
            {competitors.map((item) => (
              <tr className="border-t border-slate-100" key={item.name}>
                <td className="table-cell font-bold text-slate-950">{item.name}</td>
                <td className="table-cell text-slate-600">{item.type}</td>
                <td className="table-cell text-slate-600">{item.scale}</td>
                <td className="table-cell text-slate-600">{item.learn}</td>
                <td className="table-cell text-slate-600">{item.gap}</td>
                <td className="table-cell"><a className="font-semibold text-blue-700" href={item.url} target="_blank" rel="noreferrer">打开</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
