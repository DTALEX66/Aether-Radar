import { getCategoryName, getGithubEntities } from '../../lib/data';
import { DisclaimerBox } from '../../components/DisclaimerBox';

export default function GithubPage() {
  const items = getGithubEntities();
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-black">GitHub 开源热榜</h1>
      <p className="mt-2 max-w-3xl text-slate-600">这里展示种子库中带 GitHub 仓库的项目。商业化后会接入 GitHub API 自动更新 Stars、Forks、Issues、License、Archived、Release 和更新时间。</p>
      <div className="mt-6"><DisclaimerBox compact /></div>
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="table-cell">项目</th>
              <th className="table-cell">分类</th>
              <th className="table-cell">热度</th>
              <th className="table-cell">风险</th>
              <th className="table-cell">许可证</th>
              <th className="table-cell">维护/来源</th>
              <th className="table-cell">链接</th>
            </tr>
          </thead>
          <tbody>
            {items.map((e) => (
              <tr className="border-t border-slate-100" key={e.id}>
                <td className="table-cell"><b>{e.name}</b><br /><span className="text-slate-500">{e.githubRepo}</span></td>
                <td className="table-cell">{getCategoryName(e.category)}</td>
                <td className="table-cell"><span className="badge border-indigo-200 bg-indigo-50 text-indigo-700">{e.heatLevel}</span></td>
                <td className="table-cell"><span className="badge border-orange-200 bg-orange-50 text-orange-700">{e.riskLevel}</span></td>
                <td className="table-cell text-slate-600">{e.license}</td>
                <td className="table-cell text-slate-600">{e.reviewStatus}<br />{e.lastVerifiedAt}</td>
                <td className="table-cell"><a className="font-semibold text-blue-700" href={`https://github.com/${e.githubRepo}`} target="_blank" rel="noreferrer">GitHub</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
