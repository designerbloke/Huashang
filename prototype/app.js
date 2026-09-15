/* Campus Ops Console - prototype behaviour.
   No backend: everything here runs against the sample records in data.js.
   State changes are kept in memory so the demo reacts like the real thing would. */

const DAYMS = 86400000;
const state = {
  lang: "en",
  view: "today",
  campus: "all",
  inboxSrc: "all",
  calMode: "month",
  tasks: TASKS.map(x => ({ ...x })),
  inbox: INBOX.map(x => ({ ...x, done: false })),
  seq: 2065
};

/* ---------------- language ---------------- */
const UI = {
  brandSub:      { en: "Operations console", zh: "运营控制台" },
  userRole:      { en: "Group operations manager", zh: "集团运营经理" },
  campusFilter:  { en: "Campus / entity", zh: "校区 / 机构" },
  protoFlag:     { en: "Prototype - sample data", zh: "原型 - 示例数据" },
  askAssistant:  { en: "Ask assistant", zh: "询问助手" },
  assistantTitle:{ en: "Operations assistant", zh: "运营助手" },
  assistantNote: { en: "Simulated responses, drawn from the sample records on this screen.", zh: "模拟回复，基于本页示例记录生成。" },
  send:          { en: "Send", zh: "发送" },
  allCampuses:   { en: "All campuses and entities", zh: "全部校区与机构" },
  group:         { en: "Group-wide", zh: "集团层面" },

  nav_today:     { en: "Today", zh: "今日" },
  nav_inbox:     { en: "Unified inbox", zh: "统一收件箱" },
  nav_approvals: { en: "Approvals", zh: "审批" },
  nav_followups: { en: "Follow-ups", zh: "跟进事项" },
  nav_campuses:  { en: "Campuses", zh: "校区" },
  nav_calendar:  { en: "Calendar", zh: "日历" },
  nav_reports:   { en: "Reports", zh: "报表" },

  todayTitle:    { en: "What needs you next", zh: "接下来需要你处理的事" },
  todaySub:      { en: "Ranked by what is late, what is stuck and who is waiting on a decision from you.", zh: "按逾期程度、卡点情况以及谁在等你决策排序。" },
  briefHead:     { en: "Morning briefing", zh: "晨间简报" },
  briefWatch:    { en: "Worth watching", zh: "值得留意" },
  attention:     { en: "Needs a decision", zh: "需要决策" },
  laterToday:    { en: "Also moving today", zh: "今日其他进行中事项" },

  k_needsYou:    { en: "Need a decision", zh: "待你决策" },
  k_overdue:     { en: "Overdue", zh: "已逾期" },
  k_awaiting:    { en: "In approval", zh: "审批中" },
  k_waiting:     { en: "Waiting on others", zh: "等待他人" },
  k_dueToday:    { en: "Due today", zh: "今日到期" },
  k_newToday:    { en: "New since yesterday", zh: "昨日以来新增" },
  k_unread:      { en: "Unprocessed", zh: "待处理" },

  inboxTitle:    { en: "Unified inbox", zh: "统一收件箱" },
  inboxSub:      { en: "WeChat, email, spreadsheets and forms in one queue. Each item is read once and turned into work.", zh: "微信、邮件、表格与表单汇入同一队列，每条信息只读一次即转为工作项。" },
  filterAll:     { en: "All sources", zh: "全部来源" },
  aiRead:        { en: "What the assistant read", zh: "助手的解读" },
  aiAction:      { en: "Suggested action", zh: "建议处理" },
  confidence:    { en: "confidence", zh: "置信度" },
  createTask:    { en: "Create task", zh: "创建任务" },
  addToTask:     { en: "Add to existing task", zh: "并入现有任务" },
  fileIt:        { en: "File, no action", zh: "归档，无需处理" },
  openTask:      { en: "Open task", zh: "打开任务" },
  processed:     { en: "Handled", zh: "已处理" },
  extracted:     { en: "Extracted from the file", zh: "从文件中提取" },

  approvalsTitle:{ en: "Approval queue", zh: "审批队列" },
  approvalsSub:  { en: "Every route is configurable. These stages are placeholders until the real approval matrix is mapped with each campus.", zh: "审批流程均可配置。在与各校区确认实际审批矩阵前，以下环节为占位设置。" },
  route:         { en: "Approval route", zh: "审批流程" },
  editRoute:     { en: "Edit route", zh: "编辑流程" },
  atStage:       { en: "At this stage", zh: "停留于本环节" },
  requester:     { en: "Requested by", zh: "申请人" },
  value:         { en: "Value", zh: "金额" },
  approveStage:  { en: "Approve this stage", zh: "通过本环节" },
  returnStage:   { en: "Return with a note", zh: "退回并说明" },
  nudge:         { en: "Nudge approver", zh: "提醒审批人" },

  followTitle:   { en: "Follow-ups", zh: "跟进事项" },
  followSub:     { en: "Work that is sitting with someone else. Sorted by how long you have been waiting.", zh: "目前在他人手上的事项，按等待时长排序。" },
  waitingOn:     { en: "Waiting on", zh: "等待对象" },
  waitingFor:    { en: "Waiting", zh: "已等待" },
  lastChased:    { en: "Last chased", zh: "上次催办" },
  neverChased:   { en: "Not chased yet", zh: "尚未催办" },
  remindWeChat:  { en: "Remind on WeChat", zh: "微信提醒" },
  remindEmail:   { en: "Remind by email", zh: "邮件提醒" },
  escalate:      { en: "Escalate", zh: "升级处理" },

  campusTitle:   { en: "Campus overview", zh: "校区概览" },
  campusSub:     { en: "The same operating picture, campus by campus.", zh: "同一套运营视图，逐校区呈现。" },
  openWork:      { en: "Open", zh: "进行中" },
  inApproval:    { en: "In approval", zh: "审批中" },

  compareTitle:  { en: "Side by side", zh: "横向对比" },
  compareSub:    { en: "The same measures for every entity, so campuses can be compared rather than described.", zh: "各机构采用同一组指标，便于横向比较而非各说各话。" },
  closedK:       { en: "Closed", zh: "已完成" },
  avgDays:       { en: "Avg days", zh: "平均天数" },
  monthView:     { en: "Month", zh: "月" },
  weekView:      { en: "Week", zh: "周" },
  missed:        { en: "Missed or overdue", zh: "已逾期" },
  calTitle:      { en: "Deadlines and diary", zh: "截止日期与日程" },
  calSub:        { en: "Task deadlines and diary entries on one grid, so nothing is agreed twice.", zh: "任务截止日期与日程集中呈现，避免重复安排。" },
  upcoming:      { en: "Next ten days", zh: "未来十天" },

  reportsTitle:  { en: "Reporting", zh: "报表" },
  reportsSub:    { en: "The numbers she is asked for each month, already assembled.", zh: "她每月被索取的数据，系统已自动汇总。" },
  chWorkload:    { en: "Open work by campus", zh: "各校区进行中事项" },
  chWorkloadSub: { en: "Current open items, overdue portion shown separately", zh: "当前进行中事项，逾期部分单独显示" },
  chWeekly:      { en: "Items completed per week", zh: "每周完成事项" },
  chWeeklySub:   { en: "Last eight weeks, dashed line is the eight week average", zh: "近八周，虚线为八周平均值" },
  chTurn:        { en: "Average turnaround by request type", zh: "各类事项平均处理时长" },
  chTurnSub:     { en: "Days from request to completion, dashed line is the seven day service target", zh: "自提出至完成的天数，虚线为七天服务目标" },
  chAge:         { en: "Approval ageing", zh: "审批时效分布" },
  chAgeSub:      { en: "How long open approvals have been sitting at their current stage", zh: "未结审批在当前环节停留的时长" },
  ageOk:         { en: "Under 4 days", zh: "4天以内" },
  ageWarn:       { en: "4 to 7 days", zh: "4至7天" },
  ageLate:       { en: "8 days or more", zh: "8天及以上" },
  recoverTitle:  { en: "Estimated time recovered", zh: "预计可回收工时" },
  recoverSub:    { en: "Estimates only, provided by the manager during the audit conversation. Not measured.", zh: "仅为估算，来自访谈中管理者的判断，未经实测。" },
  recoverCaveat: { en: "These ranges are illustrative estimates, not verified measurements. Treat them as a hypothesis to test after a pilot, not as a promise. The operational case for this system is a single view across fragmented channels; recovered time is a consequence of that, not the claim itself.", zh: "以上区间为示意性估算，并非实测结果。应视为试点后需要验证的假设，而非承诺。本系统的核心价值在于把分散渠道整合为单一视图，工时回收是随之而来的结果，而非主张本身。" },
  recoverTotal:  { en: "Estimated total, per week", zh: "每周预计合计" },
  hrsWeek:       { en: "hrs / week", zh: "小时 / 周" },

  source:        { en: "Source", zh: "来源" },
  owner:         { en: "Owner", zh: "负责人" },
  approver:      { en: "Approver", zh: "审批人" },
  campus:        { en: "Campus", zh: "校区" },
  dept:          { en: "Department", zh: "部门" },
  type:          { en: "Type", zh: "类型" },
  status:        { en: "Status", zh: "状态" },
  priority:      { en: "Priority", zh: "优先级" },
  due:           { en: "Due", zh: "截止" },
  raised:        { en: "Raised", zh: "发起" },
  nextAction:    { en: "Next action", zh: "下一步" },
  activity:      { en: "Activity", zh: "动态" },
  aiSummary:     { en: "Assistant summary", zh: "助手摘要" },
  markComplete:  { en: "Mark complete", zh: "标记完成" },
  changeStatus:  { en: "Change status", zh: "变更状态" },
  close:         { en: "Close", zh: "关闭" },

  r_overdue:     { en: "%d days overdue", zh: "逾期%d天" },
  r_dueToday:    { en: "Due today", zh: "今日到期" },
  r_dueTomorrow: { en: "Due tomorrow", zh: "明日到期" },
  r_blocked:     { en: "Blocked", zh: "受阻" },
  r_stuck:       { en: "%d days at the same stage", zh: "同一环节停留%d天" },
  r_ageing:      { en: "%d days in approval", zh: "审批中已%d天" },
  r_waitLong:    { en: "Waiting %d days", zh: "已等待%d天" },
  r_wait:        { en: "Waiting %d days", zh: "已等待%d天" },
  r_critical:    { en: "Critical", zh: "紧急" },
  r_decision:    { en: "Your decision", zh: "待你决策" },

  t_reminder:    { en: "Reminder sent", zh: "提醒已发送" },
  t_approved:    { en: "Stage approved", zh: "环节已通过" },
  t_completed:   { en: "Marked complete", zh: "已标记完成" },
  t_created:     { en: "Task created from the inbox", zh: "已从收件箱创建任务" },
  t_filed:       { en: "Filed, no action needed", zh: "已归档，无需处理" },
  t_linked:      { en: "Added to the existing task", zh: "已并入现有任务" },
  t_status:      { en: "Status updated", zh: "状态已更新" },
  t_escalated:   { en: "Escalated to the deputy principal", zh: "已上报副校长" },
  t_route:       { en: "Route editing arrives in phase two", zh: "流程编辑将在第二阶段提供" },

  emptyInbox:    { en: "Nothing left in the queue for this filter.", zh: "该筛选条件下已无待处理事项。" },
  emptyList:     { en: "Nothing here for this campus filter.", zh: "该校区筛选下暂无事项。" },
  askPlaceholder:{ en: "Ask about approvals, follow-ups or a campus", zh: "询问审批、跟进或某个校区" },
  thinking:      { en: "Reading the current records...", zh: "正在读取当前记录……" }
};

function T(key, n) {
  const s = (UI[key] && UI[key][state.lang]) || (UI[key] && UI[key].en) || key;
  if (n === undefined) return s;
  const out = s.replace("%d", n);
  return state.lang === "en" ? out.replace(/\b1 days\b/, "1 day") : out;
}
function L(obj) { if (!obj) return ""; return obj[state.lang] || obj.en || ""; }
function who(k) { return k && PEOPLE[k] ? L(PEOPLE[k].n) : ""; }
function whoRole(k) { return k && PEOPLE[k] ? L(PEOPLE[k].r) : ""; }
function campusOf(id) { return CAMPUSES.find(c => c.id === id); }
function campusName(id) { const c = campusOf(id); return c ? L(c.n) : T("group"); }
function campusShort(id) { const c = campusOf(id); return c ? c.s : "GRP"; }

/* ---------------- dates ---------------- */
const today0 = new Date(); today0.setHours(0, 0, 0, 0);
function dateOf(off) { return new Date(today0.getTime() + Math.round(off) * DAYMS); }
function fmtDate(off) {
  const d = dateOf(off);
  return state.lang === "zh"
    ? `${d.getMonth() + 1}月${d.getDate()}日`
    : d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}
function dueLabel(off) {
  if (off == null) return "-";
  const n = Math.round(off);
  if (n < 0) return state.lang === "zh" ? `逾期${-n}天` : `${-n}d overdue`;
  if (n === 0) return state.lang === "zh" ? "今天" : "Today";
  if (n === 1) return state.lang === "zh" ? "明天" : "Tomorrow";
  return state.lang === "zh" ? `${n}天后` : `in ${n}d`;
}
function agoLabel(off) {
  const n = Math.round(-off);
  if (n <= 0) return state.lang === "zh" ? "今天" : "today";
  if (n === 1) return state.lang === "zh" ? "昨天" : "yesterday";
  return state.lang === "zh" ? `${n}天前` : `${n}d ago`;
}
function listJoin(a) {
  if (state.lang === "zh") return a.join("、");
  if (a.length < 2) return a.join("");
  return a.slice(0, -1).join(", ") + " and " + a[a.length - 1];
}
function hrsLabel(h) {
  if (h < 1) return state.lang === "zh" ? `${Math.round(h * 60)}分钟前` : `${Math.round(h * 60)} min ago`;
  if (h < 24) return state.lang === "zh" ? `${Math.round(h)}小时前` : `${Math.round(h)} hr ago`;
  return state.lang === "zh" ? `${Math.round(h / 24)}天前` : `${Math.round(h / 24)}d ago`;
}

/* ---------------- derived ---------------- */
const OPEN = t => t.st !== "completed";
function inScope(t) { return state.campus === "all" || t.campus === state.campus || t.campus === "all"; }
function tasks() { return state.tasks.filter(inScope); }
function stageAge(t) { return t.stageSince != null ? Math.round(-t.stageSince) : 0; }
function mineToDecide(t) {
  return t.st === "awaiting_approval" && (t.approver === "me" || (ROUTES[t.type] && ROUTES[t.type][t.stage || 0] && ROUTES[t.type][t.stage || 0].who === "me"));
}
function reasons(t) {
  const r = [];
  if (!OPEN(t)) return r;
  if (t.due != null && t.due < 0) r.push({ lvl: "crit", txt: T("r_overdue", Math.abs(Math.round(t.due))) });
  else if (t.due === 0) r.push({ lvl: "warn", txt: T("r_dueToday") });
  else if (t.due === 1) r.push({ lvl: "warn", txt: T("r_dueTomorrow") });
  if (t.st === "blocked") r.push({ lvl: "crit", txt: T("r_blocked") });
  const age = stageAge(t);
  if (t.st === "awaiting_approval" && age >= 8) r.push({ lvl: "crit", txt: T("r_stuck", age) });
  else if (t.st === "awaiting_approval" && age >= 4) r.push({ lvl: "warn", txt: T("r_ageing", age) });
  if (t.waitDays >= 7) r.push({ lvl: "crit", txt: T("r_waitLong", t.waitDays) });
  else if (t.waitDays >= 4) r.push({ lvl: "warn", txt: T("r_wait", t.waitDays) });
  if (mineToDecide(t)) r.push({ lvl: "info", txt: T("r_decision") });
  if (t.p === "critical") r.push({ lvl: "crit", txt: T("r_critical") });
  return r;
}
function score(t) {
  const r = reasons(t);
  let s = r.reduce((a, x) => a + (x.lvl === "crit" ? 10 : x.lvl === "warn" ? 5 : 3), 0);
  s += { critical: 6, high: 4, normal: 2, low: 0 }[t.p] || 0;
  if (mineToDecide(t)) s += 4;
  return s;
}
function attention() { return tasks().filter(OPEN).map(t => ({ t, s: score(t), r: reasons(t) })).filter(x => x.s >= 10).sort((a, b) => b.s - a.s); }
function approvals() { return tasks().filter(t => t.st === "awaiting_approval").sort((a, b) => stageAge(b) - stageAge(a)); }
function followups() { return tasks().filter(t => OPEN(t) && t.waitDays > 0).sort((a, b) => b.waitDays - a.waitDays); }
function unread() { return state.inbox.filter(i => !i.done); }

/* ---------------- small builders ---------------- */
const ICON = {
  today:     '<path d="M12 7v5l3 2M21 12a9 9 0 1 1-9-9 9 9 0 0 1 9 9Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  inbox:     '<path d="M3.5 13h4l1.5 2.5h6L16.5 13h4M3.5 13 6 5h12l2.5 8v5.5a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
  approvals: '<path d="M9 12.5l2 2 4.5-4.5M6 3.5h12a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
  followups: '<path d="M4 12a8 8 0 1 0 2.5-5.8M4 4v4h4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
  campuses:  '<path d="M3 20h18M5 20V9l7-4.5L19 9v11M10 20v-5h4v5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
  calendar:  '<path d="M4.5 6.5h15v13h-15zM4.5 10.5h15M8.5 3.5v4M15.5 3.5v4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  reports:   '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  spark:     '<path d="M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9 12 3.5Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
  tick:      '<path d="M5 12.5l4.5 4.5L19 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  info:      '<path d="M12 8.2v.2m0 3.1v4.3M21 12a9 9 0 1 1-9-9 9 9 0 0 1 9 9Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  wechat:    '<path d="M9 4.5c-3.6 0-6.5 2.3-6.5 5.2 0 1.6.9 3.1 2.4 4.1l-.6 2 2.3-1.1c.7.2 1.5.3 2.4.3h.5M15 8.8c-3.2 0-5.8 2.1-5.8 4.6s2.6 4.6 5.8 4.6c.7 0 1.4-.1 2-.3l2.1 1-.5-1.8c1.3-.8 2.2-2.1 2.2-3.5 0-2.5-2.6-4.6-5.8-4.6Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>',
  email:     '<path d="M3.5 6.5h17v11h-17zM3.5 7l8.5 6 8.5-6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
  excel:     '<path d="M4.5 4.5h15v15h-15zM4.5 9.5h15M9.5 9.5v10M14.5 9.5v10M4.5 14.5h15" fill="none" stroke="currentColor" stroke-width="1.4"/>',
  form:      '<path d="M6 3.5h12v17H6zM9 8h6M9 12h6M9 16h3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
  manual:    '<path d="M4 17.5 16.5 5a2 2 0 0 1 2.8 2.8L6.8 20.3 3.5 21Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>'
};
function icon(name, size) { return `<svg viewBox="0 0 24 24" width="${size || 16}" height="${size || 16}" aria-hidden="true">${ICON[name] || ""}</svg>`; }
function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
function srcTag(src, label) {
  return `<span class="tag"><span class="src src-${src}"></span>${esc(label || L(SOURCES[src]))}</span>`;
}
function statusPill(st) { return `<span class="pill s-${st}"><span class="dot"></span>${esc(L(STATUSES[st]))}</span>`; }
function whyChip(r) {
  const cls = r.lvl === "crit" ? "" : r.lvl === "warn" ? " w-warn" : " w-info";
  return `<span class="why${cls}">${esc(r.txt)}</span>`;
}

function taskRow(t, showWhy) {
  const rs = showWhy ? reasons(t).slice(0, 2) : [];
  const late = t.due != null && t.due < 0;
  return `<button class="row" data-task="${t.id}" type="button">
    <span class="row-stripe p-${t.p}"></span>
    <span class="row-main">
      <span class="row-title">${esc(L(t.t))}</span>
      <span class="row-meta">
        ${srcTag(t.src)}
        <span>${esc(campusName(t.campus))}</span>
        <span>&middot;</span>
        <span>${esc(L(TYPES[t.type]))}</span>
        ${rs.map(whyChip).join("")}
      </span>
    </span>
    <span class="row-mid"><span class="k">${t.waitDays ? T("waitingOn") : T("nextAction")}</span>${esc(t.waitDays ? who(t.waitOn) : L(t.next))}</span>
    <span class="row-status">${statusPill(t.st)}</span>
    <span class="row-when${late ? " is-late" : ""}"><span class="k">${T("due")}</span>${esc(dueLabel(t.due))}</span>
  </button>`;
}

/* ---------------- charts ---------------- */
function hbars(rows, opts) {
  const o = Object.assign({ w: 460, rowH: 28, padL: 148, padR: 52, stacked: false, unit: "" }, opts || {});
  const max = Math.max(...rows.map(r => (r.segs ? r.segs.reduce((a, s) => a + s.v, 0) : r.v))) || 1;
  const trackW = o.w - o.padL - o.padR;
  const h = rows.length * o.rowH + 8;
  let s = `<svg viewBox="0 0 ${o.w} ${h}" role="img">`;
  rows.forEach((r, i) => {
    const y = i * o.rowH + 4;
    const by = y + 6;
    const bh = 12;
    s += `<text class="chart-label" x="${o.padL - 10}" y="${by + 10}" text-anchor="end">${esc(r.k)}</text>`;
    s += `<rect class="bar-track" x="${o.padL}" y="${by}" width="${trackW}" height="${bh}" rx="4"></rect>`;
    let x = o.padL;
    const segs = r.segs || [{ v: r.v, cls: "bar-fill" }];
    const total = segs.reduce((a, sg) => a + sg.v, 0);
    segs.forEach(sg => {
      const w = Math.max(sg.v > 0 ? 3 : 0, (sg.v / max) * trackW - (segs.length > 1 ? 2 : 0));
      if (w > 0) s += `<rect class="${sg.cls}" x="${x}" y="${by}" width="${w}" height="${bh}" rx="4" data-tip="${esc(r.k + " - " + (sg.label || "") + " " + sg.v + o.unit)}"></rect>`;
      x += w + (segs.length > 1 ? 2 : 0);
    });
    s += `<text class="chart-value" x="${o.w - o.padR + 8}" y="${by + 10}">${esc(r.vlabel != null ? r.vlabel : total + o.unit)}</text>`;
  });
  if (o.ref) {
    const rx = o.padL + (o.ref / max) * trackW;
    s += `<line class="ref-line" x1="${rx}" y1="2" x2="${rx}" y2="${h - 4}"></line>`;
  }
  return s + "</svg>";
}

function columns(rows, opts) {
  const o = Object.assign({ w: 460, h: 176, padL: 30, padR: 10, padT: 12, padB: 26 }, opts || {});
  const max = Math.ceil(Math.max(...rows.map(r => r.v)) / 5) * 5 || 5;
  const plotW = o.w - o.padL - o.padR, plotH = o.h - o.padT - o.padB;
  const step = plotW / rows.length, bw = Math.min(30, step * 0.56);
  const yOf = v => o.padT + plotH - (v / max) * plotH;
  let s = `<svg viewBox="0 0 ${o.w} ${o.h}" role="img">`;
  [0, max / 2, max].forEach(v => {
    s += `<line class="grid-line" x1="${o.padL}" y1="${yOf(v)}" x2="${o.w - o.padR}" y2="${yOf(v)}"></line>`;
    s += `<text class="chart-axis" x="${o.padL - 7}" y="${yOf(v) + 3.5}" text-anchor="end">${v}</text>`;
  });
  rows.forEach((r, i) => {
    const x = o.padL + i * step + (step - bw) / 2;
    const y = yOf(r.v);
    s += `<rect class="${r.hi ? "bar-fill-2" : "bar-fill"}" x="${x}" y="${y}" width="${bw}" height="${o.padT + plotH - y}" rx="4" data-tip="${esc(r.k + " - " + r.v)}"></rect>`;
    s += `<text class="chart-axis" x="${x + bw / 2}" y="${o.h - 9}" text-anchor="middle">${esc(r.k)}</text>`;
  });
  if (o.ref != null) {
    const ry = yOf(o.ref);
    s += `<line class="ref-line" x1="${o.padL}" y1="${ry}" x2="${o.w - o.padR}" y2="${ry}"></line>`;
    s += `<text class="chart-value" x="${o.w - o.padR}" y="${ry - 5}" text-anchor="end">${o.refLabel || o.ref}</text>`;
  }
  return s + "</svg>";
}

function legend(keys) {
  return `<div class="legend">${keys.map(k => `<span class="legend-key"><span class="legend-swatch" style="background:${k.c}"></span>${esc(k.t)}</span>`).join("")}</div>`;
}

/* ---------------- views ---------------- */
function viewToday() {
  const att = attention();
  const open = tasks().filter(OPEN);
  const mine = open.filter(mineToDecide);
  const overdue = open.filter(t => t.due != null && t.due < 0);
  const dueToday = open.filter(t => t.due === 0);
  const waiting = open.filter(t => t.waitDays > 0);
  const fresh = open.filter(t => t.created > -1.5);
  const inb = unread().filter(i => state.campus === "all" || (i.ai.fields && (i.ai.fields.campus === state.campus || i.ai.fields.campus === "all")));
  const top = att.slice(0, 6), rest = open.filter(t => !top.find(x => x.t.id === t.id)).sort((a, b) => score(b) - score(a)).slice(0, 5);

  const hour = new Date().getHours();
  const hello = state.lang === "zh"
    ? (hour < 12 ? "早上好，丽云" : hour < 18 ? "下午好，丽云" : "晚上好，丽云")
    : (hour < 12 ? "Good morning, Liyun" : hour < 18 ? "Good afternoon, Liyun" : "Good evening, Liyun");

  const oldest = approvals()[0];
  const longestWait = followups()[0];
  const brief = state.lang === "zh"
    ? `今天有 <b>${mine.length}</b> 项需要你决策，其中 <b>${overdue.length}</b> 项已逾期。审批队列中停留最久的是<b>${oldest ? L(oldest.t) : "无"}</b>${oldest ? `，已在${who(oldest.approver)}处停留${stageAge(oldest)}天` : ""}。收件箱有 <b>${inb.length}</b> 条待处理信息，助手已完成初读与归类。`
    : `You have <b>${mine.length}</b> decisions sitting with you today and <b>${overdue.length}</b> items already past their date. The longest standing approval is <b>${oldest ? L(oldest.t) : "none"}</b>${oldest ? `, ${stageAge(oldest)} days with ${who(oldest.approver)}` : ""}. <b>${inb.length}</b> new messages are waiting in the inbox, already read and sorted.`;

  const watch = [];
  if (longestWait) watch.push(state.lang === "zh"
    ? `${who(longestWait.waitOn)}已${longestWait.waitDays}天未回复<b>${L(longestWait.t)}</b>。`
    : `${who(longestWait.waitOn)} has not come back on <b>${L(longestWait.t)}</b> for ${longestWait.waitDays} days.`);
  const blocked = open.filter(t => t.st === "blocked");
  if (blocked.length) watch.push(state.lang === "zh"
    ? `${blocked.length}项事项处于受阻状态，均需他人先行决定。`
    : `${blocked.length} items are blocked, each waiting on someone else's decision first.`);
  const twoCamp = CAMPUSES.filter(c => open.filter(t => t.campus === c.id && t.due != null && t.due < 0).length > 0).map(c => L(c.n));
  if (twoCamp.length) watch.push(state.lang === "zh"
    ? `逾期事项集中在：${listJoin(twoCamp)}。`
    : `Overdue work is concentrated at ${listJoin(twoCamp)}.`);
  watch.push(state.lang === "zh"
    ? `本周已完成${WEEKLY[WEEKLY.length - 1].done}项，高于八周平均值。`
    : `${WEEKLY[WEEKLY.length - 1].done} items closed this week, above the eight week average.`);

  return `<div class="view-inner">
    <div class="page-head">
      <div>
        <div class="eyebrow">${esc(fmtDate(0))} &middot; ${esc(state.campus === "all" ? T("allCampuses") : campusName(state.campus))}</div>
        <h1 class="page-title">${esc(hello)}</h1>
        <p class="page-sub">${T("todaySub")}</p>
      </div>
    </div>

    <div class="pulse">
      <div class="pulse-cell"><span class="pulse-n">${mine.length}</span><span class="pulse-k">${T("k_needsYou")}</span></div>
      <div class="pulse-cell${overdue.length ? " is-alert" : ""}"><span class="pulse-n">${overdue.length}</span><span class="pulse-k">${T("k_overdue")}</span></div>
      <div class="pulse-cell"><span class="pulse-n">${dueToday.length}</span><span class="pulse-k">${T("k_dueToday")}</span></div>
      <div class="pulse-cell"><span class="pulse-n">${waiting.length}</span><span class="pulse-k">${T("k_waiting")}</span></div>
      <div class="pulse-cell"><span class="pulse-n">${inb.length}</span><span class="pulse-k">${T("k_unread")}</span></div>
      <div class="pulse-cell"><span class="pulse-n">${fresh.length}</span><span class="pulse-k">${T("k_newToday")}</span></div>
    </div>

    <div class="brief">
      <div class="brief-main">
        <span class="ai-tag">${icon("spark", 14)} ${T("briefHead")}</span>
        <p class="brief-text">${brief}</p>
        <span class="section-note">${T("assistantNote")}</span>
      </div>
      <div class="brief-side">
        <span class="eyebrow">${T("briefWatch")}</span>
        <div class="brief-list">
          ${watch.map(w => `<div class="brief-item"><span class="tick">${icon("tick", 13)}</span><span>${w}</span></div>`).join("")}
        </div>
      </div>
    </div>

    <section class="section">
      <div class="section-head"><h2 class="section-title">${T("attention")}</h2><span class="section-note">${att.length} ${state.lang === "zh" ? "项" : "items"}</span></div>
      <div class="rows">${top.length ? top.map(x => taskRow(x.t, true)).join("") : `<p class="empty">${T("emptyList")}</p>`}</div>
    </section>

    <section class="section">
      <div class="section-head"><h2 class="section-title">${T("laterToday")}</h2></div>
      <div class="rows">${rest.length ? rest.map(t => taskRow(t, false)).join("") : `<p class="empty">${T("emptyList")}</p>`}</div>
    </section>
  </div>`;
}

function viewInbox() {
  const srcs = ["all", "wechat", "email", "excel", "form"];
  const items = state.inbox.filter(i => state.inboxSrc === "all" || i.src === state.inboxSrc)
    .filter(i => state.campus === "all" || !i.ai.fields || i.ai.fields.campus === state.campus || i.ai.fields.campus === "all");
  return `<div class="view-inner">
    <div class="page-head">
      <div>
        <div class="eyebrow">${T("nav_inbox")}</div>
        <h1 class="page-title">${T("inboxTitle")}</h1>
        <p class="page-sub">${T("inboxSub")}</p>
      </div>
    </div>
    <div class="toolbar">
      ${srcs.map(s => `<button class="chip${state.inboxSrc === s ? " is-on" : ""}" data-src="${s}" type="button">
        ${s === "all" ? "" : `<span class="src src-${s}"></span>`}${esc(s === "all" ? T("filterAll") : L(SOURCES[s]))}
        <span style="opacity:.6">${s === "all" ? unread().length : state.inbox.filter(i => i.src === s && !i.done).length}</span>
      </button>`).join("")}
    </div>
    <div class="panel">
      ${items.length ? items.map(inboxItem).join("") : `<p class="empty">${T("emptyInbox")}</p>`}
    </div>
  </div>`;
}

function inboxItem(i) {
  const f = i.ai.fields || {};
  const linked = i.ai.link ? state.tasks.find(t => t.id === i.ai.link) : null;
  return `<article class="inbox-item${i.done ? " is-done" : ""}">
    <span class="inbox-src">${icon(i.src, 17)}</span>
    <div class="inbox-body">
      <div class="inbox-from">
        <b>${esc(who(i.from))}</b>
        ${srcTag(i.src, L(i.ref))}
        <span>${esc(hrsLabel(i.hrs))}</span>
        ${i.done ? `<span class="pill s-completed"><span class="dot"></span>${T("processed")}</span>` : ""}
      </div>
      <p class="inbox-quote">${esc(L(i.excerpt))}</p>
      <div class="ai-read">
        <span class="ai-tag">${icon("spark", 13)} ${T("aiRead")} &middot; ${i.ai.conf}% ${T("confidence")}</span>
        <div class="ai-read-line">${esc(L(i.ai.sum))}</div>
        ${i.ai.table ? aiTable(i.ai.table) : ""}
        <div class="ai-read-line"><span class="k">${T("aiAction")}</span>${esc(L(i.ai.act))}</div>
        <div class="ai-fields">
          ${f.type ? `<span class="tag">${esc(L(TYPES[f.type]))}</span>` : ""}
          ${f.campus ? `<span class="tag">${esc(f.campus === "all" ? T("group") : campusName(f.campus))}</span>` : ""}
          ${f.p ? `<span class="tag">${T("priority")}: ${esc(L(PRIORITIES[f.p]))}</span>` : ""}
          ${f.due != null ? `<span class="tag">${T("due")}: ${esc(fmtDate(f.due))}</span>` : ""}
          ${linked ? `<span class="tag">${esc(linked.id)}</span>` : ""}
        </div>
      </div>
    </div>
    <div class="inbox-actions">
      ${i.done
        ? (linked ? `<button class="quiet-btn" data-task="${linked.id}" type="button">${T("openTask")}</button>` : "")
        : (i.ai.noAction
          ? `<button class="primary-btn" data-file="${i.id}" type="button">${T("fileIt")}</button>`
          : linked
            ? `<button class="primary-btn" data-link="${i.id}" type="button">${T("addToTask")}</button>
               <button class="quiet-btn" data-task="${linked.id}" type="button">${T("openTask")}</button>`
            : `<button class="primary-btn" data-make="${i.id}" type="button">${T("createTask")}</button>
               <button class="quiet-btn" data-file="${i.id}" type="button">${T("fileIt")}</button>`)}
    </div>
  </article>`;
}

function aiTable(tb) {
  const cols = L(tb.cols), rows = tb.rows.map(r => L(r));
  return `<div class="table-wrap"><table class="data">
    <caption class="eyebrow" style="text-align:left;padding:4px 0 6px">${T("extracted")}</caption>
    <thead><tr>${cols.map(c => `<th>${esc(c)}</th>`).join("")}</tr></thead>
    <tbody>${rows.map(r => `<tr>${r.map((c, j) => `<td${j ? ' class="num"' : ""}>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody>
  </table></div>`;
}

function routeHtml(t) {
  const route = ROUTES[t.type];
  if (!route) return "";
  const cur = t.stage || 0;
  return `<div class="route">
    <div class="route-head"><span class="eyebrow">${T("route")} &middot; ${esc(L(TYPES[t.type]))}</span>
      <button class="quiet-btn" data-route="1" type="button">${T("editRoute")}</button></div>
    ${route.map((s, i) => {
      const cls = t.st === "completed" || i < cur ? "is-done" : i === cur ? "is-current" : "is-pending";
      const meta = i < cur ? agoLabel(t.stageSince != null ? t.stageSince - (cur - i) * 2 : -2)
        : i === cur && t.st === "awaiting_approval" ? `${T("atStage")} ${stageAge(t)}d` : "";
      return `<div class="stage ${cls}"><span class="stage-dot"></span>
        <span class="stage-text"><span class="stage-name">${esc(L(s.n))}</span>
        <span class="stage-meta">${esc(who(s.who))}${meta ? " &middot; " + meta : ""}</span></span></div>`;
    }).join("")}
  </div>`;
}

function viewApprovals() {
  const list = approvals();
  return `<div class="view-inner">
    <div class="page-head">
      <div>
        <div class="eyebrow">${T("nav_approvals")}</div>
        <h1 class="page-title">${T("approvalsTitle")}</h1>
        <p class="page-sub">${T("approvalsSub")}</p>
      </div>
    </div>
    <div class="stack">${list.length ? list.map(apprCard).join("") : `<p class="empty">${T("emptyList")}</p>`}</div>
  </div>`;
}

function apprCard(t) {
  const age = stageAge(t);
  const cls = age >= 8 ? " is-late" : age >= 4 ? " is-ageing" : "";
  const pct = Math.min(100, (age / 12) * 100);
  const fill = age >= 8 ? "is-late" : age >= 4 ? "" : "is-ok";
  const stageName = ROUTES[t.type] ? L(ROUTES[t.type][t.stage || 0].n) : "";
  return `<article class="appr${cls}">
    <div>
      <div class="appr-head">
        <span class="row-meta">${srcTag(t.src)} <span>${esc(campusName(t.campus))}</span> <span>&middot;</span> <span>${esc(t.id)}</span></span>
        <h3 class="appr-title">${esc(L(t.t))}</h3>
      </div>
      <div class="appr-facts">
        <span class="fact"><span class="k">${T("requester")}</span><span class="v">${esc(who(t.from))}</span></span>
        <span class="fact"><span class="k">${T("atStage")}</span><span class="v mono">${age}d &middot; ${esc(stageName)}</span></span>
        <span class="fact"><span class="k">${T("due")}</span><span class="v mono">${esc(dueLabel(t.due))}</span></span>
        ${t.value ? `<span class="fact"><span class="k">${T("value")}</span><span class="v mono">${esc(t.value)}</span></span>` : ""}
      </div>
      <div class="age-bar"><span class="age-fill ${fill}" style="width:${pct}%"></span></div>
      <div class="btn-row">
        ${mineToDecide(t)
          ? `<button class="primary-btn" data-approve="${t.id}" type="button">${icon("tick", 14)} ${T("approveStage")}</button>
             <button class="quiet-btn" data-return="${t.id}" type="button">${T("returnStage")}</button>`
          : `<button class="primary-btn" data-remind="${t.id}" data-via="wechat" type="button">${icon("wechat", 14)} ${T("nudge")}</button>
             <button class="quiet-btn" data-escalate="${t.id}" type="button">${T("escalate")}</button>`}
        <button class="quiet-btn" data-task="${t.id}" type="button">${T("openTask")}</button>
      </div>
    </div>
    ${routeHtml(t)}
  </article>`;
}

function viewFollowups() {
  const list = followups();
  return `<div class="view-inner">
    <div class="page-head">
      <div>
        <div class="eyebrow">${T("nav_followups")}</div>
        <h1 class="page-title">${T("followTitle")}</h1>
        <p class="page-sub">${T("followSub")}</p>
      </div>
    </div>
    <div class="stack">${list.length ? list.map(fuCard).join("") : `<p class="empty">${T("emptyList")}</p>`}</div>
  </div>`;
}

function fuCard(t) {
  const late = t.waitDays >= 7;
  return `<article class="appr${late ? " is-late" : t.waitDays >= 4 ? " is-ageing" : ""}">
    <div>
      <div class="appr-head">
        <span class="row-meta">${srcTag(t.src)} <span>${esc(campusName(t.campus))}</span> <span>&middot;</span> <span>${esc(t.id)}</span> ${statusPill(t.st)}</span>
        <h3 class="appr-title">${esc(L(t.t))}</h3>
      </div>
      <div class="appr-facts">
        <span class="fact"><span class="k">${T("waitingOn")}</span><span class="v">${esc(who(t.waitOn))} &middot; ${esc(whoRole(t.waitOn))}</span></span>
        <span class="fact"><span class="k">${T("waitingFor")}</span><span class="v mono">${t.waitDays}d</span></span>
        <span class="fact"><span class="k">${T("lastChased")}</span><span class="v mono">${t.fu != null ? esc(agoLabel(t.fu)) : T("neverChased")}</span></span>
        <span class="fact"><span class="k">${T("due")}</span><span class="v mono">${esc(dueLabel(t.due))}</span></span>
      </div>
      <div class="btn-row">
        <button class="primary-btn" data-remind="${t.id}" data-via="wechat" type="button">${icon("wechat", 14)} ${T("remindWeChat")}</button>
        <button class="quiet-btn" data-remind="${t.id}" data-via="email" type="button">${T("remindEmail")}</button>
        <button class="quiet-btn" data-escalate="${t.id}" type="button">${T("escalate")}</button>
        <button class="quiet-btn" data-task="${t.id}" type="button">${T("openTask")}</button>
      </div>
    </div>
    <div class="route">
      <span class="eyebrow">${T("nextAction")}</span>
      <p style="font-size:13px;margin-top:6px">${esc(L(t.next))}</p>
      <span class="eyebrow" style="margin-top:12px;display:block">${T("aiSummary")}</span>
      <p style="font-size:12.5px;color:var(--ink-2);margin-top:4px">${esc(L(t.ai))}</p>
    </div>
  </article>`;
}

function campusStats(id) {
  const all = state.tasks.filter(t => t.campus === id);
  const open = all.filter(OPEN);
  return {
    open: open.length,
    overdue: open.filter(t => t.due != null && t.due < 0).length,
    appr: open.filter(t => t.st === "awaiting_approval").length,
    wait: open.filter(t => t.waitDays > 0).length,
    done: all.filter(t => !OPEN(t)).length,
    avg: (() => {
      const cl = all.filter(t => !OPEN(t) && t.turnaround);
      return cl.length ? cl.reduce((a, t) => a + t.turnaround, 0) / cl.length : null;
    })()
  };
}

function campusCard(c) {
  const s = campusStats(c.id);
  const tot = Math.max(1, s.open);
  return `<button class="campus-card" data-campus="${c.id}" type="button">
    <div class="campus-top">
      <span><span class="campus-name">${esc(L(c.n))}</span><br><span class="campus-kind">${esc(L(c.k))}</span></span>
      <span class="tag">${esc(c.s)}</span>
    </div>
    <div class="campus-nums">
      <span class="campus-num"><span class="n">${s.open}</span><span class="k">${T("openWork")}</span></span>
      <span class="campus-num"><span class="n${s.overdue ? " is-alert" : ""}">${s.overdue}</span><span class="k">${T("k_overdue")}</span></span>
      <span class="campus-num"><span class="n">${s.appr}</span><span class="k">${T("inApproval")}</span></span>
    </div>
    <div class="mini-bar">
      <span class="mini-seg" style="width:${(s.appr / tot) * 100}%;background:var(--accent-fill)" title="${T("inApproval")}"></span>
      <span class="mini-seg" style="width:${(s.wait / tot) * 100}%;background:var(--warning-fill)" title="${T("k_waiting")}"></span>
      <span class="mini-seg" style="width:${(s.overdue / tot) * 100}%;background:var(--critical)" title="${T("k_overdue")}"></span>
    </div>
  </button>`;
}

function viewCampuses() {
  const groups = ENTITY_GROUPS.map(g => ({ g, list: CAMPUSES.filter(c => c.kind === g.key) })).filter(x => x.list.length);
  const groupWide = state.tasks.filter(t => t.campus === "all");
  const rows = CAMPUSES.map(c => ({ c, s: campusStats(c.id) }));
  const totals = rows.reduce((a, r) => ({
    open: a.open + r.s.open, overdue: a.overdue + r.s.overdue, appr: a.appr + r.s.appr,
    wait: a.wait + r.s.wait, done: a.done + r.s.done
  }), { open: 0, overdue: 0, appr: 0, wait: 0, done: 0 });

  return `<div class="view-inner">
    <div class="page-head">
      <div>
        <div class="eyebrow">${T("nav_campuses")}</div>
        <h1 class="page-title">${T("campusTitle")}</h1>
        <p class="page-sub">${T("campusSub")}</p>
      </div>
      ${legend([{ c: "var(--accent-fill)", t: T("inApproval") }, { c: "var(--warning-fill)", t: T("k_waiting") }, { c: "var(--critical)", t: T("k_overdue") }])}
    </div>

    ${groups.map(({ g, list }) => `<section class="section">
      <div class="section-head">
        <h2 class="section-title">${esc(L(g.n))}</h2>
        <span class="section-note">${list.length} ${state.lang === "zh" ? "个机构" : list.length === 1 ? "entity" : "entities"}</span>
      </div>
      <div class="grid-cards is-entities">${list.map(campusCard).join("")}</div>
    </section>`).join("")}

    <section class="section">
      <div class="section-head">
        <h2 class="section-title">${T("compareTitle")}</h2>
        <span class="section-note">${T("compareSub")}</span>
      </div>
      <div class="panel table-wrap">
        <table class="data">
          <thead><tr>
            <th>${T("campus")}</th><th>${T("type")}</th>
            <th style="text-align:right">${T("openWork")}</th>
            <th style="text-align:right">${T("k_overdue")}</th>
            <th style="text-align:right">${T("inApproval")}</th>
            <th style="text-align:right">${T("k_waiting")}</th>
            <th style="text-align:right">${T("closedK")}</th>
            <th style="text-align:right">${T("avgDays")}</th>
          </tr></thead>
          <tbody>
            ${rows.map(({ c, s }) => `<tr>
              <td><button class="quiet-btn" data-campus="${c.id}" data-jump="1" type="button">${esc(L(c.n))}</button></td>
              <td style="color:var(--ink-3)">${esc(L(c.k))}</td>
              <td class="num">${s.open}</td>
              <td class="num"${s.overdue ? ' style="color:var(--critical)"' : ""}>${s.overdue}</td>
              <td class="num">${s.appr}</td>
              <td class="num">${s.wait}</td>
              <td class="num">${s.done}</td>
              <td class="num">${s.avg == null ? "-" : s.avg.toFixed(1)}</td>
            </tr>`).join("")}
            <tr>
              <td style="color:var(--ink-3)">${T("group")}</td>
              <td style="color:var(--ink-3)">${state.lang === "zh" ? "跨校区" : "Across entities"}</td>
              <td class="num">${groupWide.filter(OPEN).length}</td>
              <td class="num">${groupWide.filter(t => OPEN(t) && t.due != null && t.due < 0).length}</td>
              <td class="num">${groupWide.filter(t => t.st === "awaiting_approval").length}</td>
              <td class="num">${groupWide.filter(t => OPEN(t) && t.waitDays > 0).length}</td>
              <td class="num">${groupWide.filter(t => !OPEN(t)).length}</td>
              <td class="num">-</td>
            </tr>
            <tr style="background:var(--surface-2)">
              <td><b style="font-weight:600">${T("allCampuses")}</b></td><td></td>
              <td class="num"><b style="font-weight:600">${totals.open}</b></td>
              <td class="num"><b style="font-weight:600">${totals.overdue}</b></td>
              <td class="num"><b style="font-weight:600">${totals.appr}</b></td>
              <td class="num"><b style="font-weight:600">${totals.wait}</b></td>
              <td class="num"><b style="font-weight:600">${totals.done}</b></td>
              <td class="num"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="section">
      <div class="section-head"><h2 class="section-title">${T("chWorkload")}</h2><span class="section-note">${T("chWorkloadSub")}</span></div>
      <div class="chart-card">
        <div class="chart chart-wrap">${hbars(CAMPUSES.map(c => {
          const s = campusStats(c.id);
          return { k: L(c.n), segs: [{ v: s.open - s.overdue, cls: "bar-fill", label: T("openWork") }, { v: s.overdue, cls: "seg-late", label: T("k_overdue") }], vlabel: String(s.open) };
        }))}</div>
        ${legend([{ c: "var(--info)", t: T("openWork") }, { c: "var(--critical)", t: T("k_overdue") }])}
      </div>
    </section>
  </div>`;
}

function viewCalendar() {
  const week = state.calMode === "week";
  const evAll = EVENTS.filter(e => state.campus === "all" || e.campus === state.campus || e.campus === "all")
    .concat(tasks().filter(t => OPEN(t) && t.due != null).map(t => ({
      on: t.due, time: "", t: t.t, campus: t.campus, task: t.id,
      k: t.due < 0 ? "deadline" : t.st === "awaiting_approval" ? "approval" : "task"
    })));
  const key = d => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  const byDay = {};
  evAll.forEach(e => { const k = key(dateOf(e.on)); (byDay[k] = byDay[k] || []).push(e); });

  const dows = state.lang === "zh" ? ["一", "二", "三", "四", "五", "六", "日"] : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const cells = [];
  if (week) {
    const startOff = -((today0.getDay() + 6) % 7);
    for (let i = 0; i < 7; i++) cells.push({ off: startOff + i });
  } else {
    const first = new Date(today0); first.setDate(1);
    const pad = (first.getDay() + 6) % 7;
    const days = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
    for (let i = 0; i < pad; i++) cells.push(null);
    for (let d = 1; d <= days; d++) cells.push({ off: Math.round((new Date(first.getFullYear(), first.getMonth(), d) - today0) / DAYMS) });
  }

  const cellHtml = c => {
    if (!c) return `<div class="cal-day is-out"></div>`;
    const d = dateOf(c.off);
    const evs = byDay[key(d)] || [];
    const shown = week ? evs : evs.slice(0, 3);
    return `<div class="cal-day${c.off === 0 ? " is-today" : ""}${week ? " is-tall" : ""}">
      <span class="cal-date">${week ? esc(fmtDate(c.off)) : d.getDate()}</span>
      ${shown.map(e => `<button class="cal-ev k-${e.k}" type="button" ${e.task ? `data-task="${e.task}"` : ""}>${e.time ? `<b>${esc(e.time)}</b> ` : ""}${esc(L(e.t))}</button>`).join("")}
      ${!week && evs.length > 3 ? `<span class="cal-date">+${evs.length - 3}</span>` : ""}
      <span class="cal-dot-row">${evs.map(e => `<span class="cal-dot k-${e.k}"></span>`).join("")}</span>
    </div>`;
  };

  const overdue = evAll.filter(e => e.on < 0).sort((a, b) => a.on - b.on);
  const agenda = evAll.filter(e => e.on >= 0 && e.on <= 10).sort((a, b) => a.on - b.on || (a.time > b.time ? 1 : -1));
  const agendaRow = e => `<div class="agenda-item">
      <span class="agenda-when${e.on < 0 ? " is-late" : ""}">${esc(fmtDate(e.on))}<br>${esc(e.time || dueLabel(e.on))}</span>
      <span class="agenda-text">
        <span class="agenda-title">${esc(L(e.t))}</span>
        <span class="row-meta"><span>${esc(e.campus === "all" ? T("group") : campusName(e.campus))}</span>
        ${e.task ? `<button class="quiet-btn" data-task="${e.task}" type="button">${esc(e.task)}</button>` : ""}</span>
      </span>
    </div>`;

  return `<div class="view-inner">
    <div class="page-head">
      <div>
        <div class="eyebrow">${T("nav_calendar")}</div>
        <h1 class="page-title">${T("calTitle")}</h1>
        <p class="page-sub">${T("calSub")}</p>
      </div>
      <div class="toolbar">
        <div class="seg" role="group">
          <button type="button" class="seg-btn${week ? "" : " is-on"}" data-cal="month">${T("monthView")}</button>
          <button type="button" class="seg-btn${week ? " is-on" : ""}" data-cal="week">${T("weekView")}</button>
        </div>
        ${legend([{ c: "var(--critical)", t: T("due") }, { c: "var(--accent-fill)", t: T("nav_approvals") }, { c: "var(--info)", t: state.lang === "zh" ? "活动" : "Events" }])}
      </div>
    </div>
    <div class="cal">
      <div class="cal-grid">
        ${dows.map(d => `<div class="cal-dow">${d}</div>`).join("")}
        ${cells.map(cellHtml).join("")}
      </div>
      <div class="panel">
        ${overdue.length ? `<div class="panel-pad" style="padding-bottom:6px"><span class="eyebrow" style="color:var(--critical)">${T("missed")}</span></div>
          <div class="agenda">${overdue.map(agendaRow).join("")}</div>` : ""}
        <div class="panel-pad" style="padding-bottom:6px"><span class="eyebrow">${T("upcoming")}</span></div>
        <div class="agenda">${agenda.length ? agenda.map(agendaRow).join("") : `<p class="empty">${T("emptyList")}</p>`}</div>
      </div>
    </div>
  </div>`;
}

function viewReports() {
  const avg = WEEKLY.reduce((a, w) => a + w.done, 0) / WEEKLY.length;
  const open = state.tasks.filter(OPEN);
  const appr = open.filter(t => t.st === "awaiting_approval");
  const ageBuckets = {};
  Object.keys(ROUTES).forEach(k => ageBuckets[k] = { ok: 0, warn: 0, late: 0 });
  appr.forEach(t => {
    const a = stageAge(t), b = ageBuckets[t.type];
    if (!b) return;
    if (a >= 8) b.late++; else if (a >= 4) b.warn++; else b.ok++;
  });
  const recTotalLo = RECOVERY.reduce((a, r) => a + r.lo, 0), recTotalHi = RECOVERY.reduce((a, r) => a + r.hi, 0);
  const done = state.tasks.filter(t => !OPEN(t));
  const avgTurn = done.length ? (done.reduce((a, t) => a + (t.turnaround || 0), 0) / done.length).toFixed(1) : "-";

  return `<div class="view-inner">
    <div class="page-head">
      <div>
        <div class="eyebrow">${T("nav_reports")}</div>
        <h1 class="page-title">${T("reportsTitle")}</h1>
        <p class="page-sub">${T("reportsSub")}</p>
      </div>
    </div>

    <div class="pulse">
      <div class="pulse-cell"><span class="pulse-n">${open.length}</span><span class="pulse-k">${T("openWork")}</span><span class="pulse-meta">${state.lang === "zh" ? "全部校区" : "all campuses"}</span></div>
      <div class="pulse-cell"><span class="pulse-n">${done.length}</span><span class="pulse-k">${state.lang === "zh" ? "本周期完成" : "Closed this cycle"}</span></div>
      <div class="pulse-cell"><span class="pulse-n">${avgTurn}</span><span class="pulse-k">${state.lang === "zh" ? "平均处理天数" : "Avg days to close"}</span><span class="pulse-meta">${state.lang === "zh" ? "目标7天" : "target 7"}</span></div>
      <div class="pulse-cell"><span class="pulse-n">${appr.length}</span><span class="pulse-k">${T("inApproval")}</span></div>
    </div>

    <div class="chart-grid">
      <div class="chart-card">
        <div class="chart-head"><h3 class="chart-title">${T("chWeekly")}</h3><span class="chart-sub">${T("chWeeklySub")}</span></div>
        <div class="chart chart-wrap">${columns(WEEKLY.map((w, i) => ({ k: w.w, v: w.done, hi: i === WEEKLY.length - 1 })), { ref: avg, refLabel: avg.toFixed(0) })}</div>
      </div>

      <div class="chart-card">
        <div class="chart-head"><h3 class="chart-title">${T("chTurn")}</h3><span class="chart-sub">${T("chTurnSub")}</span></div>
        <div class="chart chart-wrap">${hbars(TURNAROUND.map(r => ({ k: L(TYPES[r.type]), v: r.days, vlabel: r.days.toFixed(1) + "d" })), { ref: TURNAROUND_TARGET })}</div>
      </div>

      <div class="chart-card">
        <div class="chart-head"><h3 class="chart-title">${T("chWorkload")}</h3><span class="chart-sub">${T("chWorkloadSub")}</span></div>
        <div class="chart chart-wrap">${hbars(CAMPUSES.map(c => {
          const s = campusStats(c.id);
          return { k: L(c.n), segs: [{ v: s.open - s.overdue, cls: "bar-fill", label: T("openWork") }, { v: s.overdue, cls: "seg-late", label: T("k_overdue") }], vlabel: String(s.open) };
        }))}</div>
        ${legend([{ c: "var(--info)", t: T("openWork") }, { c: "var(--critical)", t: T("k_overdue") }])}
      </div>

      <div class="chart-card">
        <div class="chart-head"><h3 class="chart-title">${T("chAge")}</h3><span class="chart-sub">${T("chAgeSub")}</span></div>
        <div class="chart chart-wrap">${hbars(Object.keys(ageBuckets).filter(k => ageBuckets[k].ok + ageBuckets[k].warn + ageBuckets[k].late > 0).map(k => ({
          k: L(TYPES[k]),
          segs: [{ v: ageBuckets[k].ok, cls: "seg-good", label: T("ageOk") }, { v: ageBuckets[k].warn, cls: "seg-warn", label: T("ageWarn") }, { v: ageBuckets[k].late, cls: "seg-late", label: T("ageLate") }]
        })), { padR: 40 })}</div>
        ${legend([{ c: "var(--good)", t: T("ageOk") }, { c: "var(--warning-fill)", t: T("ageWarn") }, { c: "var(--critical)", t: T("ageLate") }])}
      </div>
    </div>

    <section class="section">
      <div class="section-head">
        <h2 class="section-title">${T("recoverTitle")}</h2>
        <span class="section-note">${T("recoverSub")}</span>
      </div>
      <div class="recover">
        ${RECOVERY.map(r => `<div class="recover-cell"><span class="recover-k">${esc(L(r.k))}</span><span class="recover-v">${r.lo}-${r.hi} ${T("hrsWeek")}</span></div>`).join("")}
        <div class="recover-cell" style="background:var(--surface-2)"><span class="recover-k"><b style="font-weight:600">${T("recoverTotal")}</b></span><span class="recover-v">${recTotalLo}-${recTotalHi} ${T("hrsWeek")}</span></div>
      </div>
      <div class="caveat">${icon("info", 15)}<span>${T("recoverCaveat")}</span></div>
    </section>
  </div>`;
}

/* ---------------- drawer ---------------- */
function openTask(id) {
  const t = state.tasks.find(x => x.id === id);
  if (!t) return;
  const rs = reasons(t);
  const d = document.getElementById("drawer");
  d.innerHTML = `
    <div class="drawer-head">
      <div>
        <span class="drawer-id">${esc(t.id)} &middot; ${esc(L(TYPES[t.type]))}</span>
        <h2 class="drawer-title">${esc(L(t.t))}</h2>
        <div class="row-meta" style="margin-top:6px">${statusPill(t.st)} ${rs.map(whyChip).join("")}</div>
      </div>
      <button class="icon-btn" data-close="1" type="button" aria-label="${T("close")}">
        <svg viewBox="0 0 24 24" width="17" height="17"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
      </button>
    </div>
    <div class="drawer-body">
      <div class="next-box"><span class="k">${T("nextAction")}</span><div class="v">${esc(L(t.next))}</div></div>

      <div class="ai-read">
        <span class="ai-tag">${icon("spark", 13)} ${T("aiSummary")}</span>
        <div class="ai-read-line">${esc(L(t.ai))}</div>
      </div>

      <div class="kv">
        <div><div class="k">${T("source")}</div><div class="v">${srcTag(t.src, L(t.ref))} <span style="color:var(--ink-3)">${esc(who(t.from))}</span></div></div>
        <div><div class="k">${T("campus")}</div><div class="v">${esc(t.campus === "all" ? T("group") : campusName(t.campus))}</div></div>
        <div><div class="k">${T("dept")}</div><div class="v">${esc(L(DEPTS[t.dept]))}</div></div>
        <div><div class="k">${T("priority")}</div><div class="v">${esc(L(PRIORITIES[t.p]))}</div></div>
        <div><div class="k">${T("owner")}</div><div class="v">${esc(who(t.owner))}</div></div>
        <div><div class="k">${T("approver")}</div><div class="v">${esc(t.approver ? who(t.approver) : "-")}</div></div>
        <div><div class="k">${T("raised")}</div><div class="v">${esc(fmtDate(t.created))} &middot; ${esc(agoLabel(t.created))}</div></div>
        <div><div class="k">${T("due")}</div><div class="v">${esc(fmtDate(t.due))} &middot; ${esc(dueLabel(t.due))}</div></div>
        ${t.waitOn ? `<div><div class="k">${T("waitingOn")}</div><div class="v">${esc(who(t.waitOn))} &middot; ${t.waitDays}d</div></div>` : ""}
        ${t.fu != null ? `<div><div class="k">${T("lastChased")}</div><div class="v">${esc(agoLabel(t.fu))}</div></div>` : ""}
        ${t.value ? `<div><div class="k">${T("value")}</div><div class="v">${esc(t.value)}</div></div>` : ""}
      </div>

      ${ROUTES[t.type] ? routeHtml(t) : ""}

      <div>
        <span class="eyebrow">${T("activity")}</span>
        <div class="log" style="margin-top:8px">
          ${(t.log || []).slice().reverse().map(l => `<div class="log-item">
            <span class="log-when">${esc(fmtDate(l.on))}</span>
            <span class="log-text"><b>${esc(who(l.who))}</b> ${esc(L(l.t))}</span>
          </div>`).join("")}
        </div>
      </div>
    </div>
    <div class="drawer-actions">
      ${mineToDecide(t) ? `<button class="primary-btn" data-approve="${t.id}" type="button">${icon("tick", 14)} ${T("approveStage")}</button>` : ""}
      ${t.waitOn ? `<button class="primary-btn" data-remind="${t.id}" data-via="wechat" type="button">${icon("wechat", 14)} ${T("remindWeChat")}</button>` : ""}
      ${OPEN(t) ? `<button class="quiet-btn" data-complete="${t.id}" type="button">${T("markComplete")}</button>` : ""}
      <select class="select" data-status="${t.id}" aria-label="${T("changeStatus")}">
        ${Object.keys(STATUSES).map(s => `<option value="${s}"${s === t.st ? " selected" : ""}>${esc(L(STATUSES[s]))}</option>`).join("")}
      </select>
    </div>`;
  d.hidden = false;
  document.getElementById("scrim").hidden = false;
}
function closeDrawer() {
  document.getElementById("drawer").hidden = true;
  if (document.getElementById("assistant").hidden) document.getElementById("scrim").hidden = true;
}

/* ---------------- actions ---------------- */
function toast(msg) {
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `<span class="ok">${icon("tick", 14)}</span><span>${esc(msg)}</span>`;
  document.getElementById("toasts").appendChild(el);
  setTimeout(() => el.remove(), 3200);
}
function logAdd(t, whoKey, text) { (t.log = t.log || []).push({ on: 0, who: whoKey, t: text }); }

function act(el) {
  const id = el.dataset.approve || el.dataset.remind || el.dataset.complete || el.dataset.escalate || el.dataset.return;
  const t = id ? state.tasks.find(x => x.id === id) : null;

  if (el.dataset.approve && t) {
    const route = ROUTES[t.type] || [];
    t.stage = (t.stage || 0) + 1;
    t.stageSince = 0;
    logAdd(t, "me", { en: "approved the stage", zh: "通过审批环节" });
    if (t.stage >= route.length) { t.st = "completed"; t.done = 0; t.turnaround = Math.round(-t.created); toast(T("t_completed")); }
    else { t.approver = route[t.stage].who; toast(T("t_approved")); }
  } else if (el.dataset.remind && t) {
    const via = el.dataset.via === "email" ? { en: "sent an email reminder", zh: "发送邮件提醒" } : { en: "sent a WeChat reminder", zh: "发送微信提醒" };
    t.fu = 0;
    logAdd(t, "me", via);
    toast(T("t_reminder") + " - " + who(t.waitOn || t.approver));
  } else if (el.dataset.complete && t) {
    t.st = "completed"; t.done = 0; t.turnaround = Math.round(-t.created);
    logAdd(t, "me", { en: "marked the task complete", zh: "标记任务完成" });
    toast(T("t_completed"));
  } else if (el.dataset.escalate && t) {
    t.p = "critical";
    logAdd(t, "me", { en: "escalated to the deputy principal", zh: "上报副校长" });
    toast(T("t_escalated"));
  } else if (el.dataset.return && t) {
    t.st = "in_progress"; t.stageSince = 0;
    logAdd(t, "me", { en: "returned the request with a note", zh: "退回申请并附说明" });
    toast(T("t_status"));
  } else if (el.dataset.make) {
    const i = state.inbox.find(x => x.id === el.dataset.make);
    if (!i) return;
    const f = i.ai.fields || {};
    const nt = {
      id: "T-" + (++state.seq), t: i.ai.sum, type: f.type || "general", campus: f.campus || "all",
      dept: "admin", st: "new", p: f.p || "normal", src: i.src, from: i.from, ref: i.ref,
      created: 0, due: f.due != null ? f.due : 3, owner: "me", next: i.ai.act, ai: i.ai.sum,
      log: [{ on: 0, who: "me", t: { en: "created from the inbox", zh: "自收件箱创建" } }]
    };
    if (ROUTES[nt.type]) { nt.st = "awaiting_approval"; nt.stage = 0; nt.stageSince = 0; nt.approver = ROUTES[nt.type][0].who; }
    state.tasks.unshift(nt);
    i.done = true;
    toast(T("t_created") + " - " + nt.id);
  } else if (el.dataset.link) {
    const i = state.inbox.find(x => x.id === el.dataset.link);
    if (!i) return;
    const lt = state.tasks.find(x => x.id === i.ai.link);
    if (lt) logAdd(lt, i.from, { en: "added a new message to this task", zh: "新增一条相关消息" });
    i.done = true;
    toast(T("t_linked") + (lt ? " - " + lt.id : ""));
  } else if (el.dataset.file) {
    const i = state.inbox.find(x => x.id === el.dataset.file);
    if (i) i.done = true;
    toast(T("t_filed"));
  } else if (el.dataset.route) {
    toast(T("t_route"));
    return;
  } else return false;

  render();
  if (!document.getElementById("drawer").hidden && t) openTask(t.id);
  return true;
}

/* ---------------- assistant ---------------- */
const PROMPTS = [
  { en: "What needs my attention today?", zh: "今天有什么需要我处理？", k: "today" },
  { en: "Which approvals are overdue?", zh: "哪些审批已经超时？", k: "appr" },
  { en: "What am I waiting for from Foshan?", zh: "佛山校区有哪些事项在等待？", k: "wait" },
  { en: "Summarise the applicant spreadsheet", zh: "总结申请人名单表格", k: "excel" },
  { en: "Draft follow-up messages for the three oldest items", zh: "为三项最久未回复的事项起草跟进消息", k: "draft" },
  { en: "How is turnaround looking this month?", zh: "本月处理时长表现如何？", k: "report" }
];

function answer(q) {
  const s = q.toLowerCase();
  const hit = w => w.some(x => s.includes(x));
  const campusHit = CAMPUSES.find(c => s.includes(c.n.en.toLowerCase().split(" ")[0]) || s.includes(c.s.toLowerCase()) || (c.n.zh && q.includes(c.n.zh.slice(0, 2))));

  if (hit(["draft", "follow-up message", "message", "起草", "拟", "跟进消息"])) {
    const list = followups().slice(0, 3);
    return `<div class="body">${state.lang === "zh" ? "以下是三条可直接发送的跟进消息，均已带上事项编号与截止日期：" : "Three follow-up messages, ready to send, each carrying the reference and the date:"}</div>
      ${list.map(t => `<div class="draft">${esc(state.lang === "zh"
        ? `${who(t.waitOn)}您好，关于「${L(t.t)}」（${t.id}），截止日期为${fmtDate(t.due)}，目前已等待${t.waitDays}天。需要您确认：${L(t.next)}。如有困难请告知，我来协调。`
        : `Hi ${who(t.waitOn)}, following up on ${L(t.t)} (${t.id}), due ${fmtDate(t.due)}. It has been with you for ${t.waitDays} days. What I need: ${L(t.next)}. If something is blocking it, tell me and I will help move it.`)}</div>`).join("")}
      <div class="body" style="color:var(--ink-3);font-size:12px">${state.lang === "zh" ? "在正式版本中，这些消息可直接发送至企业微信或邮件。" : "In a live version these would send straight to WeCom or email."}</div>`;
  }
  if (hit(["approval", "approve", "overdue approval", "审批", "超时"])) {
    const list = approvals();
    const late = list.filter(t => stageAge(t) >= 4);
    return `<div class="body">${state.lang === "zh"
      ? `共有${list.length}项审批未结，其中${late.length}项已停留4天以上：`
      : `${list.length} approvals are open, ${late.length} of them sitting four days or longer:`}</div>
      <ul>${late.map(t => `<li>${esc(L(t.t))} - ${stageAge(t)}${state.lang === "zh" ? "天，在" + who(t.approver) + "处" : "d with " + who(t.approver)} (${esc(t.id)})</li>`).join("")}</ul>
      <div class="body">${state.lang === "zh" ? "建议先处理停留最久的一项，其余可批量提醒。" : "I would clear the oldest one first, then send a single batch reminder for the rest."}</div>`;
  }
  if (hit(["waiting", "waiting for", "chase", "等待", "在等"]) || campusHit) {
    const list = followups().filter(t => !campusHit || t.campus === campusHit.id);
    const label = campusHit ? L(campusHit.n) : (state.lang === "zh" ? "全部校区" : "all campuses");
    if (!list.length) return `<div class="body">${state.lang === "zh" ? `${label}目前没有等待他人回复的事项。` : `Nothing is currently waiting on anyone at ${label}.`}</div>`;
    return `<div class="body">${state.lang === "zh" ? `${label}有${list.length}项在等待他人回复：` : `${list.length} items at ${label} are waiting on someone else:`}</div>
      <ul>${list.map(t => `<li>${esc(L(t.t))} - ${state.lang === "zh" ? `等待${who(t.waitOn)}，已${t.waitDays}天` : `${who(t.waitOn)}, ${t.waitDays} days`} (${esc(t.id)})</li>`).join("")}</ul>`;
  }
  if (hit(["excel", "spreadsheet", "file", "表格", "文件", "名单"])) {
    const i = state.inbox.find(x => x.src === "excel" && x.ai.table);
    if (i) return `<div class="body">${esc(L(i.ref))} - ${esc(L(i.ai.sum))}</div>${aiTable(i.ai.table)}
      <div class="body">${state.lang === "zh" ? "建议：" : "Suggested: "}${esc(L(i.ai.act))}</div>`;
  }
  if (hit(["turnaround", "report", "how are we", "performance", "处理时长", "报表", "表现"])) {
    const avg = (WEEKLY.reduce((a, w) => a + w.done, 0) / WEEKLY.length).toFixed(1);
    const worst = TURNAROUND.slice().sort((a, b) => b.days - a.days)[0];
    return `<div class="body">${state.lang === "zh"
      ? `近八周平均每周完成${avg}项，本周为${WEEKLY[WEEKLY.length - 1].done}项。处理最慢的类别是${L(TYPES[worst.type])}，平均${worst.days}天，超出7天服务目标。`
      : `Eight week average is ${avg} items closed per week; this week is ${WEEKLY[WEEKLY.length - 1].done}. The slowest category is ${L(TYPES[worst.type])} at ${worst.days} days on average, against a seven day target.`}</div>
      <div class="body" style="color:var(--ink-3);font-size:12px">${state.lang === "zh" ? "完整图表见报表页。" : "Full charts are on the reports page."}</div>`;
  }
  const att = attention().slice(0, 5);
  return `<div class="body">${state.lang === "zh" ? "以下是目前最需要你处理的事项：" : "Here is what is most likely to need you now:"}</div>
    <ul>${att.map(x => `<li>${esc(L(x.t.t))} - ${x.r.slice(0, 2).map(r => r.txt).join(", ")} (${esc(x.t.id)})</li>`).join("")}</ul>
    <div class="body" style="color:var(--ink-3);font-size:12px">${state.lang === "zh" ? "也可以问我：超时审批、某个校区的等待事项、表格摘要，或起草跟进消息。" : "You can also ask about overdue approvals, what a campus owes you, a spreadsheet summary, or a drafted follow-up."}</div>`;
}

function ask(q) {
  const log = document.getElementById("assistantLog");
  log.insertAdjacentHTML("beforeend", `<div class="msg me">${esc(q)}</div>`);
  const holder = document.createElement("div");
  holder.className = "msg ai";
  holder.innerHTML = `<span class="ai-tag">${icon("spark", 13)} ${T("thinking")}</span>`;
  log.appendChild(holder);
  log.scrollTop = log.scrollHeight;
  setTimeout(() => {
    holder.innerHTML = `<span class="ai-tag">${icon("spark", 13)} ${state.lang === "zh" ? "基于当前记录" : "From the current records"}</span>` + answer(q);
    log.scrollTop = log.scrollHeight;
  }, 480);
}

function openAssistant() {
  const a = document.getElementById("assistant");
  a.hidden = false;
  document.getElementById("scrim").hidden = false;
  const log = document.getElementById("assistantLog");
  if (!log.children.length) ask(state.lang === "zh" ? "今天有什么需要我处理？" : "What needs my attention today?");
  renderPrompts();
  document.getElementById("assistantInput").placeholder = T("askPlaceholder");
}
function renderPrompts() {
  document.getElementById("assistantPrompts").innerHTML =
    PROMPTS.map(p => `<button class="prompt-chip" type="button" data-ask="${esc(p[state.lang] || p.en)}">${esc(p[state.lang] || p.en)}</button>`).join("");
}

/* ---------------- render ---------------- */
const VIEWS = { today: viewToday, inbox: viewInbox, approvals: viewApprovals, followups: viewFollowups, campuses: viewCampuses, calendar: viewCalendar, reports: viewReports };

function render() {
  document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-i18n]").forEach(el => el.textContent = T(el.dataset.i18n));

  const counts = {
    today: attention().length,
    inbox: unread().length,
    approvals: approvals().length,
    followups: followups().length,
    campuses: CAMPUSES.length,
    calendar: EVENTS.filter(e => e.on >= 0 && e.on <= 7).length,
    reports: 0
  };
  const alert = { today: tasks().filter(t => OPEN(t) && t.due != null && t.due < 0).length > 0, approvals: approvals().some(t => stageAge(t) >= 8), followups: followups().some(t => t.waitDays >= 7) };
  document.getElementById("nav").innerHTML = Object.keys(VIEWS).map(k =>
    `<button class="nav-btn${state.view === k ? " is-on" : ""}" data-view="${k}" type="button">
      ${icon(k, 17)}<span class="nav-label">${T("nav_" + k)}</span>
      ${counts[k] ? `<span class="nav-count${alert[k] ? " is-alert" : ""}">${counts[k]}</span>` : ""}
    </button>`).join("");

  const sel = document.getElementById("campusFilter");
  sel.innerHTML = `<option value="all">${esc(T("allCampuses"))}</option>` +
    CAMPUSES.map(c => `<option value="${c.id}"${state.campus === c.id ? " selected" : ""}>${esc(L(c.n))} - ${esc(L(c.k))}</option>`).join("");
  sel.value = state.campus;

  document.getElementById("view").innerHTML = VIEWS[state.view]();
  document.querySelectorAll(".seg-btn[data-lang]").forEach(b => b.classList.toggle("is-on", b.dataset.lang === state.lang));
  if (!document.getElementById("assistant").hidden) renderPrompts();
}

/* ---------------- events ---------------- */
document.addEventListener("click", e => {
  const el = e.target.closest("[data-view],[data-task],[data-src],[data-cal],[data-jump],[data-campus],[data-approve],[data-remind],[data-complete],[data-escalate],[data-return],[data-make],[data-link],[data-file],[data-route],[data-close],[data-ask],[data-lang]");
  if (!el) return;

  if (el.dataset.view) { state.view = el.dataset.view; document.getElementById("rail").classList.remove("is-open"); render(); return; }
  if (el.dataset.lang) { state.lang = el.dataset.lang; render(); if (!document.getElementById("drawer").hidden) closeDrawer(); return; }
  if (el.dataset.src) { state.inboxSrc = el.dataset.src; render(); return; }
  if (el.dataset.cal) { state.calMode = el.dataset.cal; render(); return; }
  if (el.dataset.jump) { state.campus = el.dataset.campus; state.view = "today"; render(); return; }
  if (el.dataset.campus && el.classList.contains("campus-card")) { state.campus = el.dataset.campus; state.view = "today"; render(); return; }
  if (el.dataset.close) { closeDrawer(); return; }
  if (el.dataset.ask) { document.getElementById("assistantInput").value = ""; ask(el.dataset.ask); return; }
  if (el.dataset.approve || el.dataset.remind || el.dataset.complete || el.dataset.escalate || el.dataset.return || el.dataset.make || el.dataset.link || el.dataset.file || el.dataset.route) { act(el); return; }
  if (el.dataset.task) { openTask(el.dataset.task); return; }
});

document.addEventListener("change", e => {
  if (e.target.id === "campusFilter") { state.campus = e.target.value; render(); }
  if (e.target.dataset && e.target.dataset.status) {
    const t = state.tasks.find(x => x.id === e.target.dataset.status);
    if (t) { t.st = e.target.value; if (t.st === "completed") { t.turnaround = Math.round(-t.created); } logAdd(t, "me", { en: "changed the status", zh: "变更状态" }); toast(T("t_status")); render(); openTask(t.id); }
  }
});

document.getElementById("scrim").addEventListener("click", () => {
  closeDrawer();
  document.getElementById("assistant").hidden = true;
  document.getElementById("scrim").hidden = true;
});
document.getElementById("assistantBtn").addEventListener("click", openAssistant);
document.getElementById("assistantClose").addEventListener("click", () => {
  document.getElementById("assistant").hidden = true;
  if (document.getElementById("drawer").hidden) document.getElementById("scrim").hidden = true;
});
document.getElementById("assistantForm").addEventListener("submit", e => {
  e.preventDefault();
  const input = document.getElementById("assistantInput");
  if (input.value.trim()) { ask(input.value.trim()); input.value = ""; }
});
document.getElementById("menuBtn").addEventListener("click", () => document.getElementById("rail").classList.toggle("is-open"));
document.getElementById("themeBtn").addEventListener("click", () => {
  const cur = document.documentElement.getAttribute("data-theme");
  const dark = cur ? cur === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.setAttribute("data-theme", dark ? "light" : "dark");
});
document.addEventListener("keydown", e => { if (e.key === "Escape") { closeDrawer(); document.getElementById("assistant").hidden = true; document.getElementById("scrim").hidden = true; } });

/* chart tooltips */
const tip = document.getElementById("chartTip");
document.addEventListener("mousemove", e => {
  const m = e.target.closest && e.target.closest("[data-tip]");
  if (m) {
    tip.hidden = false;
    tip.innerHTML = `<span class="tv">${esc(m.dataset.tip)}</span>`;
    tip.style.left = Math.min(window.innerWidth - 230, e.clientX + 12) + "px";
    tip.style.top = (e.clientY - 34) + "px";
  } else tip.hidden = true;
});

render();
