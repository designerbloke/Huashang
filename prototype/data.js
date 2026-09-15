/* Campus Ops Console - illustrative sample data.
   Every record here is invented for demonstration. Day offsets are relative to
   today, so the prototype still reads as "live" whenever it is opened. */

const PEOPLE = {
  me:      { n: { en: "Huang Liyun",   zh: "黄丽云" }, r: { en: "Group operations manager", zh: "集团运营经理" }, i: "HL" },
  lin:     { n: { en: "Lin Meiqi",     zh: "林美琪" }, r: { en: "Marketing director",        zh: "市场总监" },   i: "LM" },
  chen:    { n: { en: "Chen Haoran",   zh: "陈浩然" }, r: { en: "Finance manager",           zh: "财务经理" },   i: "CH" },
  zhou:    { n: { en: "Zhou Yan",      zh: "周燕" },   r: { en: "Head of admissions",        zh: "招生主任" },   i: "ZY" },
  wang:    { n: { en: "Wang Lei",      zh: "王磊" },   r: { en: "Campus director",           zh: "校区主任" },   i: "WL" },
  liu:     { n: { en: "Liu Xiaoting",  zh: "刘晓婷" }, r: { en: "Registrar",                 zh: "教务注册主管" }, i: "LX" },
  guo:     { n: { en: "Guo Feng",      zh: "郭峰" },   r: { en: "Facilities manager",        zh: "后勤经理" },   i: "GF" },
  tan:     { n: { en: "Tan Weizhi",    zh: "谭伟志" }, r: { en: "Deputy principal",          zh: "副校长" },     i: "TW" },
  he:      { n: { en: "He Jing",       zh: "何静" },   r: { en: "Administration officer",    zh: "行政专员" },   i: "HJ" },
  xu:      { n: { en: "Xu Peng",       zh: "徐鹏" },   r: { en: "Student services lead",     zh: "学生事务主管" }, i: "XP" },
  agency:  { n: { en: "Sarah Ng, Brightline Creative", zh: "伍思婷，明线创意" }, r: { en: "External agency", zh: "外部代理商" }, i: "SN" },
  bureau:  { n: { en: "District education bureau", zh: "区教育局" }, r: { en: "External", zh: "外部单位" }, i: "EB" }
};

const CAMPUSES = [
  { id: "gz-main",   s: "GZ",  n: { en: "Guangzhou Main Campus",    zh: "广州主校区" },   k: { en: "University",         zh: "大学" } },
  { id: "gz-intl",   s: "GIS", n: { en: "Guangzhou International School", zh: "广州国际学校" }, k: { en: "International school", zh: "国际学校" } },
  { id: "fs-poly",   s: "FS",  n: { en: "Foshan Polytechnic Campus", zh: "佛山职院校区" }, k: { en: "Polytechnic",        zh: "职业技术学院" } },
  { id: "zh-uni",    s: "ZH",  n: { en: "Zhuhai University Campus",  zh: "珠海大学校区" }, k: { en: "University",         zh: "大学" } },
  { id: "qy-poly",   s: "QY",  n: { en: "Qingyuan Polytechnic Campus", zh: "清远职院校区" }, k: { en: "Polytechnic",      zh: "职业技术学院" } },
  { id: "sz-centre", s: "SZ",  n: { en: "Shenzhen Learning Centre",  zh: "深圳学习中心" }, k: { en: "Learning centre",    zh: "学习中心" } }
];

const DEPTS = {
  marketing:  { en: "Marketing",       zh: "市场部" },
  admissions: { en: "Admissions",      zh: "招生办" },
  admin:      { en: "Administration",  zh: "行政部" },
  finance:    { en: "Finance",         zh: "财务部" },
  academic:   { en: "Academic affairs", zh: "教务处" },
  facilities: { en: "Facilities",      zh: "后勤部" },
  student:    { en: "Student services", zh: "学生事务" }
};

const TYPES = {
  marketing_approval: { en: "Marketing approval",   zh: "市场审批" },
  admin_approval:     { en: "Admin approval",       zh: "行政审批" },
  admissions_admin:   { en: "Admissions admin",     zh: "招生事务" },
  finance_approval:   { en: "Finance approval",     zh: "财务审批" },
  campus_approval:    { en: "Campus approval",      zh: "校区审批" },
  scheduling:         { en: "Scheduling",           zh: "排期安排" },
  report:             { en: "Reporting",            zh: "报表" },
  general:            { en: "General task",         zh: "一般事务" }
};

const STATUSES = {
  new:                { en: "New",               zh: "新任务" },
  in_progress:        { en: "In progress",       zh: "处理中" },
  awaiting_approval:  { en: "Awaiting approval", zh: "等待审批" },
  waiting_on:         { en: "Waiting on others", zh: "等待他人" },
  blocked:            { en: "Blocked",           zh: "受阻" },
  completed:          { en: "Completed",         zh: "已完成" }
};

const PRIORITIES = {
  critical: { en: "Critical", zh: "紧急" },
  high:     { en: "High",     zh: "高" },
  normal:   { en: "Normal",   zh: "普通" },
  low:      { en: "Low",      zh: "低" }
};

const SOURCES = {
  wechat: { en: "WeChat / WeCom", zh: "微信 / 企业微信" },
  email:  { en: "Email",          zh: "邮件" },
  excel:  { en: "Excel",          zh: "表格" },
  form:   { en: "Online form",    zh: "在线表单" },
  manual: { en: "Entered by hand", zh: "手动录入" }
};

/* Approval routes are per request type and editable, because the group has not
   standardised them yet. Stage names are what the client will re-map later. */
const ROUTES = {
  marketing_approval: [
    { n: { en: "Department review",  zh: "部门初审" },   who: "he" },
    { n: { en: "Marketing director", zh: "市场总监" },   who: "lin" },
    { n: { en: "Brand compliance",   zh: "品牌合规" },   who: "me" },
    { n: { en: "Campus director",    zh: "校区主任" },   who: "wang" }
  ],
  admin_approval: [
    { n: { en: "Line manager",         zh: "直属主管" }, who: "he" },
    { n: { en: "Administration office", zh: "行政办公室" }, who: "me" },
    { n: { en: "Campus director",      zh: "校区主任" }, who: "wang" }
  ],
  admissions_admin: [
    { n: { en: "Admissions officer", zh: "招生专员" },  who: "he" },
    { n: { en: "Registrar",          zh: "教务注册" },  who: "liu" },
    { n: { en: "Head of admissions", zh: "招生主任" },  who: "zhou" }
  ],
  finance_approval: [
    { n: { en: "Budget holder",    zh: "预算责任人" }, who: "me" },
    { n: { en: "Finance manager",  zh: "财务经理" },   who: "chen" },
    { n: { en: "Deputy principal", zh: "副校长" },     who: "tan" }
  ],
  campus_approval: [
    { n: { en: "Campus office",   zh: "校区办公室" }, who: "he" },
    { n: { en: "Campus director", zh: "校区主任" },   who: "wang" }
  ]
};

/* t  = title, p = priority, st = status, due/created/done = day offsets,
   waitDays = how long she has been waiting, fu = days since last follow-up,
   stage = index of the current approval stage. */
const TASKS = [
  { id: "T-2064", t: { en: "Enrolment link in the Shenzhen WeChat group is broken", zh: "深圳微信群报名链接失效" },
    type: "general", campus: "sz-centre", dept: "marketing", st: "new", p: "critical",
    src: "wechat", from: "xu", ref: { en: "SZ Enquiries group", zh: "深圳咨询群" }, created: -0.2, due: 0,
    owner: "me", next: { en: "Replace the link and post a correction in the group", zh: "更换链接并在群内发布更正说明" },
    ai: { en: "Three parents reported a dead enrolment link in the past hour. The October intake campaign is still driving traffic to it.", zh: "过去一小时内有三位家长反映报名链接失效，十月招生活动仍在向该链接引流。" },
    log: [{ on: -0.2, who: "xu", t: { en: "flagged it in the group", zh: "在群内反馈" } }] },

  { id: "T-2038", t: { en: "Polytechnic recruitment video script sign-off", zh: "职院招生视频脚本审定" },
    type: "marketing_approval", campus: "fs-poly", dept: "marketing", st: "awaiting_approval", p: "critical",
    src: "email", from: "agency", ref: { en: "Brightline Creative", zh: "明线创意" }, created: -11, due: -2,
    owner: "me", approver: "lin", stage: 1, stageSince: -6, fu: -3,
    next: { en: "Chase Lin Meiqi for director sign-off, shoot date depends on it", zh: "催促林美琪完成总监审定，拍摄档期取决于此" },
    ai: { en: "Agency needs sign-off to hold the crew booking. Script has cleared department review; it has been sitting with the marketing director for six days.", zh: "代理商需要审定确认才能保留拍摄团队档期。脚本已通过部门初审，但在市场总监处已停留六天。" },
    log: [{ on: -11, who: "agency", t: { en: "sent revised script v3", zh: "发送第三版脚本" } },
          { on: -8, who: "he", t: { en: "cleared department review", zh: "完成部门初审" } },
          { on: -3, who: "me", t: { en: "sent a WeChat reminder", zh: "发送微信提醒" } }] },

  { id: "T-2041", t: { en: "Autumn open day campaign artwork - final approval", zh: "秋季开放日活动物料终审" },
    type: "marketing_approval", campus: "gz-intl", dept: "marketing", st: "awaiting_approval", p: "high",
    src: "wechat", from: "lin", ref: { en: "Marketing group", zh: "市场部群" }, created: -7, due: 1,
    owner: "me", approver: "me", stage: 2, stageSince: -4, fu: -2, value: "¥46,000",
    next: { en: "Your brand compliance check - printer needs files by tomorrow 17:00", zh: "待你完成品牌合规检查，印厂明日17:00前需要文件" },
    ai: { en: "Four artwork files, two languages. Printer deadline is tomorrow afternoon. The only outstanding stage is your own brand compliance check.", zh: "四个物料文件，两种语言。印厂截止时间为明日下午。唯一未完成的环节是你本人的品牌合规检查。" },
    log: [{ on: -7, who: "lin", t: { en: "shared artwork in the marketing group", zh: "在市场部群分享物料" } },
          { on: -5, who: "he", t: { en: "cleared department review", zh: "完成部门初审" } },
          { on: -4, who: "lin", t: { en: "approved as marketing director", zh: "市场总监审批通过" } }] },

  { id: "T-2013", t: { en: "International school prospectus reprint", zh: "国际学校招生手册重印" },
    type: "marketing_approval", campus: "gz-intl", dept: "marketing", st: "awaiting_approval", p: "high",
    src: "email", from: "tan", ref: { en: "Deputy principal", zh: "副校长" }, created: -14, due: 3,
    owner: "me", approver: "wang", stage: 3, stageSince: -6, fu: -6, value: "¥128,000",
    next: { en: "Campus director approval outstanding for six days - escalate or re-route", zh: "校区主任审批已滞留六天，需升级或改道" },
    ai: { en: "Print run of 5,000 for the spring recruitment season. Cost has cleared finance. Waiting on the campus director, who has been on inspection visits all week.", zh: "春季招生季印制5000份，费用已通过财务。目前等待校区主任审批，其本周均在外巡视。" },
    log: [{ on: -14, who: "tan", t: { en: "requested the reprint", zh: "提出重印申请" } },
          { on: -9, who: "chen", t: { en: "confirmed budget availability", zh: "确认预算可用" } },
          { on: -6, who: "lin", t: { en: "approved content", zh: "内容审批通过" } }] },

  { id: "T-2019", t: { en: "Campus signage replacement quotation", zh: "校区标识更换报价" },
    type: "finance_approval", campus: "qy-poly", dept: "facilities", st: "awaiting_approval", p: "normal",
    src: "email", from: "guo", ref: { en: "Facilities office", zh: "后勤办公室" }, created: -16, due: 2,
    owner: "me", approver: "chen", stage: 1, stageSince: -9, fu: -4, value: "¥83,500",
    next: { en: "Finance manager review, now nine days old - longest sitting approval", zh: "财务经理审核已滞留九天，为当前最久的审批" },
    ai: { en: "Three quotations attached, lowest is ¥83,500. Sitting with finance for nine days, which is the longest open approval on the board.", zh: "附三份报价，最低为83,500元。在财务处已滞留九天，为当前最久的未结审批。" },
    log: [{ on: -16, who: "guo", t: { en: "submitted three quotations", zh: "提交三份报价" } },
          { on: -12, who: "me", t: { en: "checked against last year's spend", zh: "对比去年支出" } },
          { on: -4, who: "me", t: { en: "emailed finance for an update", zh: "邮件催询财务进度" } }] },

  { id: "T-2036", t: { en: "Uniform supplier contract renewal", zh: "校服供应商合同续签" },
    type: "admin_approval", campus: "gz-intl", dept: "admin", st: "awaiting_approval", p: "normal",
    src: "form", from: "he", ref: { en: "Procurement request form", zh: "采购申请表" }, created: -6, due: 7,
    owner: "me", approver: "me", stage: 1, stageSince: -2, value: "¥215,000",
    next: { en: "Your administration office review, then campus director", zh: "待你完成行政办公室审核，再转校区主任" },
    ai: { en: "Two year renewal at a 4 percent uplift. Supplier performance notes from last year are attached.", zh: "两年续签，涨幅4%。附去年供应商履约评估。" },
    log: [{ on: -6, who: "he", t: { en: "submitted the renewal request", zh: "提交续签申请" } },
          { on: -2, who: "he", t: { en: "attached supplier performance notes", zh: "补充供应商履约评估" } }] },

  { id: "T-2021", t: { en: "Staff training day catering approval", zh: "教职工培训日餐饮审批" },
    type: "finance_approval", campus: "qy-poly", dept: "admin", st: "awaiting_approval", p: "low",
    src: "form", from: "he", ref: { en: "Expense request form", zh: "费用申请表" }, created: -3, due: 8,
    owner: "me", approver: "me", stage: 0, stageSince: -3, value: "¥12,400",
    next: { en: "Budget holder approval - yours, low value, can clear today", zh: "预算责任人审批（你本人），金额较小，今日可结" },
    ai: { en: "Catering for 96 staff. Within the departmental budget line, no escalation to the deputy principal required.", zh: "96位教职工餐饮。在部门预算内，无需上报副校长。" },
    log: [{ on: -3, who: "he", t: { en: "submitted the request", zh: "提交申请" } }] },

  { id: "T-2029", t: { en: "Timetable clash - Business faculty week 5", zh: "商学院第五周课表冲突" },
    type: "scheduling", campus: "zh-uni", dept: "academic", st: "blocked", p: "critical",
    src: "wechat", from: "liu", ref: { en: "Academic affairs group", zh: "教务处群" }, created: -4, due: -1,
    owner: "me", waitOn: "liu", waitDays: 3, fu: -1,
    next: { en: "Registrar must release two rooms before the timetable can be republished", zh: "教务注册需释放两间教室，课表方可重新发布" },
    ai: { en: "Two modules are booked into the same lecture theatre for week 5. 180 students affected. Blocked until the registrar releases alternative rooms.", zh: "两门课程在第五周被安排至同一阶梯教室，影响180名学生。需教务注册释放备用教室后方可解除。" },
    log: [{ on: -4, who: "liu", t: { en: "reported the clash", zh: "反馈冲突" } },
          { on: -2, who: "me", t: { en: "proposed two alternative rooms", zh: "提出两间备用教室方案" } },
          { on: -1, who: "me", t: { en: "sent a reminder in the academic group", zh: "在教务群发送提醒" } }] },

  { id: "T-2008", t: { en: "Library refurbishment budget variance", zh: "图书馆翻新预算差异" },
    type: "finance_approval", campus: "zh-uni", dept: "finance", st: "blocked", p: "high",
    src: "excel", from: "chen", ref: { en: "budget_variance_q3.xlsx", zh: "budget_variance_q3.xlsx" }, created: -19, due: -4,
    owner: "me", waitOn: "chen", waitDays: 6, fu: -6, value: "¥310,000",
    next: { en: "Finance must confirm which budget line absorbs the 12 percent variance", zh: "财务需确认由哪条预算科目承担12%的差异" },
    ai: { en: "Refurbishment is running 12 percent over the approved figure. Contractor has paused stage two pending written confirmation.", zh: "翻新工程超出批准金额12%。承包商已暂停第二阶段，等待书面确认。" },
    log: [{ on: -19, who: "chen", t: { en: "sent the variance workbook", zh: "发送差异表" } },
          { on: -13, who: "me", t: { en: "requested a revised forecast", zh: "要求重新预测" } },
          { on: -6, who: "me", t: { en: "escalated to the deputy principal", zh: "上报副校长" } }] },

  { id: "T-2052", t: { en: "October intake applicant list - data check", zh: "十月入学申请名单数据核对" },
    type: "admissions_admin", campus: "gz-intl", dept: "admissions", st: "in_progress", p: "high",
    src: "excel", from: "zhou", ref: { en: "october_applicants.xlsx", zh: "october_applicants.xlsx" }, created: -2, due: 2,
    owner: "me",
    next: { en: "Chase the 37 applicants with missing documents before Friday", zh: "周五前跟进37位材料缺失的申请人" },
    ai: { en: "214 applicants. 37 have missing documents and 12 still need an interview slot. Three duplicate records were found and merged.", zh: "共214位申请人。37位材料缺失，12位尚未安排面试。发现并合并三条重复记录。" },
    log: [{ on: -2, who: "zhou", t: { en: "sent the applicant workbook", zh: "发送申请人名单表" } },
          { on: -1, who: "me", t: { en: "merged three duplicate records", zh: "合并三条重复记录" } }] },

  { id: "T-2047", t: { en: "Q3 marketing spend report for the group board", zh: "第三季度市场支出报告（集团董事会）" },
    type: "report", campus: "all", dept: "marketing", st: "in_progress", p: "high",
    src: "manual", from: "me", ref: { en: "Standing monthly report", zh: "月度常规报告" }, created: -5, due: 0,
    owner: "me",
    next: { en: "Two campuses still owe their spend figures - due to the board today", zh: "两个校区仍未提交支出数据，今日需报送董事会" },
    ai: { en: "Four of six campuses have submitted. Qingyuan and Shenzhen are outstanding. Draft narrative is ready once the figures land.", zh: "六个校区中四个已提交，清远与深圳尚未提交。数据到位后即可完成文字说明。" },
    log: [{ on: -5, who: "me", t: { en: "opened the reporting cycle", zh: "启动报告周期" } },
          { on: -2, who: "lin", t: { en: "submitted Guangzhou figures", zh: "提交广州数据" } }] },

  { id: "T-2042", t: { en: "Overseas partner visit itinerary", zh: "海外合作方来访行程" },
    type: "scheduling", campus: "gz-main", dept: "academic", st: "in_progress", p: "high",
    src: "email", from: "tan", ref: { en: "International office", zh: "国际交流办" }, created: -6, due: 3,
    owner: "me",
    next: { en: "Confirm the two campus visits and the interpreter booking", zh: "确认两个校区参观安排及口译预约" },
    ai: { en: "Delegation of six arrives Monday. Two campus visits, one signing ceremony, interpreter not yet booked.", zh: "六人代表团周一抵达。两场校区参观、一场签约仪式，口译尚未预约。" },
    log: [{ on: -6, who: "tan", t: { en: "shared the delegation list", zh: "发送代表团名单" } },
          { on: -3, who: "me", t: { en: "drafted the itinerary", zh: "拟定行程草案" } }] },

  { id: "T-2044", t: { en: "Parent evening room booking and set-up", zh: "家长会场地预订与布置" },
    type: "scheduling", campus: "gz-intl", dept: "admin", st: "in_progress", p: "normal",
    src: "email", from: "tan", ref: { en: "Deputy principal", zh: "副校长" }, created: -4, due: 5,
    owner: "me",
    next: { en: "Confirm the hall against the proposed new date", zh: "按建议的新日期确认礼堂档期" },
    ai: { en: "Deputy principal has asked to move the evening one week later. The hall is provisionally held for both dates until Thursday.", zh: "副校长建议顺延一周。礼堂两个日期均暂留至周四。" },
    log: [{ on: -4, who: "tan", t: { en: "asked about moving the date", zh: "提出调整日期" } }] },

  { id: "T-2058", t: { en: "Careers fair exhibitor list confirmation", zh: "就业招聘会参展单位确认" },
    type: "general", campus: "qy-poly", dept: "student", st: "in_progress", p: "normal",
    src: "form", from: "xu", ref: { en: "Event request form", zh: "活动申请表" }, created: -8, due: 6,
    owner: "me",
    next: { en: "Confirm the final 42 exhibitors and release the floor plan", zh: "确认最终42家参展单位并发布展位图" },
    ai: { en: "42 employers confirmed out of 50 invited. Floor plan cannot be released until the list closes.", zh: "已邀请50家，确认42家。名单未截止前无法发布展位图。" },
    log: [{ on: -8, who: "xu", t: { en: "submitted the event request", zh: "提交活动申请" } }] },

  { id: "T-2026", t: { en: "Sports day contractor insurance check", zh: "运动会承包商保险核查" },
    type: "admin_approval", campus: "qy-poly", dept: "facilities", st: "in_progress", p: "normal",
    src: "form", from: "guo", ref: { en: "Vendor onboarding form", zh: "供应商准入表" }, created: -5, due: 12,
    owner: "me", approver: "me", stage: 0, stageSince: -5,
    next: { en: "Verify the public liability certificate covers the event date", zh: "核实公众责任险覆盖活动当日" },
    ai: { en: "Certificate supplied expires four days before the event. A renewal confirmation is needed from the contractor.", zh: "所提供保单在活动前四天到期，需承包商提供续保确认。" },
    log: [{ on: -5, who: "guo", t: { en: "uploaded the certificate", zh: "上传保单" } }] },

  { id: "T-2046", t: { en: "Alumni survey distribution list", zh: "校友问卷发送名单" },
    type: "general", campus: "all", dept: "marketing", st: "in_progress", p: "low",
    src: "excel", from: "lin", ref: { en: "alumni_master.xlsx", zh: "alumni_master.xlsx" }, created: -9, due: 10,
    owner: "me",
    next: { en: "De-duplicate across campuses before the send", zh: "发送前跨校区去重" },
    ai: { en: "11,400 records across six campuses with an estimated 900 duplicates. No consent flag on the 2019 cohort.", zh: "六个校区共11,400条记录，预计约900条重复。2019届缺少同意标记。" },
    log: [{ on: -9, who: "lin", t: { en: "shared the master list", zh: "分享总名单" } }] },

  { id: "T-2011", t: { en: "Student visa document batch - November", zh: "十一月学生签证材料批次" },
    type: "admissions_admin", campus: "gz-intl", dept: "admissions", st: "waiting_on", p: "high",
    src: "excel", from: "zhou", ref: { en: "visa_batch_nov.xlsx", zh: "visa_batch_nov.xlsx" }, created: -15, due: 4,
    owner: "me", waitOn: "zhou", waitDays: 8, fu: -8,
    next: { en: "Zhou Yan has not returned the signed declarations - eight days waiting", zh: "周燕尚未回传签署声明，已等待八天" },
    ai: { en: "28 of 34 declarations returned. The agent needs the full batch before the consulate appointment window closes.", zh: "34份声明已回收28份。代办机构需在领馆预约窗口关闭前收齐。" },
    log: [{ on: -15, who: "zhou", t: { en: "sent the batch workbook", zh: "发送批次表" } },
          { on: -8, who: "me", t: { en: "requested the signed declarations", zh: "索要签署声明" } }] },

  { id: "T-2033", t: { en: "Scholarship committee meeting pack", zh: "奖学金评审会材料包" },
    type: "admin_approval", campus: "gz-main", dept: "admin", st: "waiting_on", p: "normal",
    src: "form", from: "he", ref: { en: "Meeting support form", zh: "会务支持表" }, created: -12, due: 4,
    owner: "me", waitOn: "chen", waitDays: 6, fu: -3, approver: "me", stage: 1, stageSince: -6,
    next: { en: "Finance still owes the funding confirmation for two awards", zh: "财务仍未确认两项奖学金的资金来源" },
    ai: { en: "Nine of eleven award papers are complete. Two are held pending a funding confirmation from finance.", zh: "11份评审材料已完成9份，2份等待财务确认资金来源。" },
    log: [{ on: -12, who: "he", t: { en: "requested meeting support", zh: "提出会务支持申请" } },
          { on: -3, who: "me", t: { en: "chased finance by email", zh: "邮件催询财务" } }] },

  { id: "T-2017", t: { en: "Exam invigilation schedule - mid-term", zh: "期中考试监考安排" },
    type: "scheduling", campus: "zh-uni", dept: "academic", st: "waiting_on", p: "high",
    src: "excel", from: "liu", ref: { en: "invigilation_draft.xlsx", zh: "invigilation_draft.xlsx" }, created: -13, due: 2,
    owner: "me", waitOn: "liu", waitDays: 7, fu: -7,
    next: { en: "Two invigilator names outstanding, exams begin in two days", zh: "两名监考人员待定，考试两天后开始" },
    ai: { en: "38 of 40 sessions staffed. Two sessions in the Zhuhai block have no named invigilator.", zh: "40场考试中38场已排定监考，珠海考场两场尚无监考人员。" },
    log: [{ on: -13, who: "liu", t: { en: "sent the draft schedule", zh: "发送排班草案" } },
          { on: -7, who: "me", t: { en: "asked for the two missing names", zh: "询问两名待定人员" } }] },

  { id: "T-2027", t: { en: "Dormitory allocation exceptions", zh: "宿舍分配特例处理" },
    type: "admin_approval", campus: "fs-poly", dept: "student", st: "waiting_on", p: "high",
    src: "wechat", from: "xu", ref: { en: "Student services group", zh: "学生事务群" }, created: -9, due: 3,
    owner: "me", waitOn: "wang", waitDays: 4, fu: -2, approver: "wang", stage: 2, stageSince: -4,
    next: { en: "Campus director decision on seven exception cases", zh: "校区主任需对七宗特例作出决定" },
    ai: { en: "Seven students have requested allocation exceptions on medical or distance grounds. Term starts in three days.", zh: "七名学生以健康或路程为由申请调整宿舍，距开学三天。" },
    log: [{ on: -9, who: "xu", t: { en: "raised the seven cases", zh: "提出七宗个案" } },
          { on: -4, who: "he", t: { en: "verified supporting documents", zh: "核实证明材料" } },
          { on: -2, who: "me", t: { en: "sent a WeChat reminder", zh: "发送微信提醒" } }] },

  { id: "T-2024", t: { en: "Employer partnership announcement", zh: "企业合作发布稿" },
    type: "marketing_approval", campus: "fs-poly", dept: "marketing", st: "waiting_on", p: "normal",
    src: "email", from: "wang", ref: { en: "Campus director", zh: "校区主任" }, created: -10, due: 6,
    owner: "me", waitOn: "wang", waitDays: 5, fu: -5, approver: "wang", stage: 3, stageSince: -5,
    next: { en: "Partner has not confirmed the announcement date", zh: "合作方尚未确认发布日期" },
    ai: { en: "Draft is approved internally. The partner company has not confirmed a release date, which holds the WeChat schedule.", zh: "稿件已通过内部审批，合作企业未确认发布日期，微信排期因此搁置。" },
    log: [{ on: -10, who: "wang", t: { en: "proposed the announcement", zh: "提出发布计划" } },
          { on: -5, who: "me", t: { en: "asked the partner for a date", zh: "向合作方询问日期" } }] },

  { id: "T-2031", t: { en: "Transfer student assessment schedule", zh: "转学生入学测评安排" },
    type: "admissions_admin", campus: "zh-uni", dept: "admissions", st: "waiting_on", p: "normal",
    src: "email", from: "liu", ref: { en: "Registry office", zh: "教务注册办" }, created: -7, due: 5,
    owner: "me", waitOn: "liu", waitDays: 3, fu: -3,
    next: { en: "Registrar to confirm assessors for the maths papers", zh: "教务注册需确认数学科目评卷人" },
    ai: { en: "Eleven transfer applicants. Assessment rooms are held; two assessors are unconfirmed.", zh: "11名转学申请人。测评教室已预留，两名评卷人待确认。" },
    log: [{ on: -7, who: "liu", t: { en: "sent the applicant list", zh: "发送申请人名单" } }] },

  { id: "T-2055", t: { en: "Teachers Day article for the WeChat account", zh: "教师节微信公众号推文" },
    type: "marketing_approval", campus: "gz-main", dept: "marketing", st: "new", p: "normal",
    src: "wechat", from: "lin", ref: { en: "Marketing group", zh: "市场部群" }, created: -0.6, due: 3,
    owner: "me", approver: "me", stage: 0,
    next: { en: "Send the draft to department review", zh: "将草稿提交部门初审" },
    ai: { en: "Draft article and six photographs supplied. Publication is planned for Friday morning.", zh: "已提供推文草稿及六张图片，计划周五上午发布。" },
    log: [{ on: -0.6, who: "lin", t: { en: "posted the draft in the group", zh: "在群内发布草稿" } }] },

  { id: "T-2060", t: { en: "Enquiry surge at the Shenzhen centre", zh: "深圳中心咨询量激增" },
    type: "general", campus: "sz-centre", dept: "admissions", st: "new", p: "high",
    src: "wechat", from: "xu", ref: { en: "SZ Enquiries group", zh: "深圳咨询群" }, created: -0.4, due: 1,
    owner: "me",
    next: { en: "Decide whether to add weekend counsellor cover", zh: "决定是否增加周末咨询人手" },
    ai: { en: "Enquiries are running at roughly three times the usual weekday volume since the intake campaign launched. Two counsellors are covering.", zh: "招生活动上线后，咨询量约为平日的三倍，目前由两名咨询顾问应对。" },
    log: [{ on: -0.4, who: "xu", t: { en: "reported the volume", zh: "反馈咨询量" } }] },

  { id: "T-2062", t: { en: "Vendor payment query from finance", zh: "财务供应商付款查询" },
    type: "general", campus: "all", dept: "finance", st: "new", p: "high",
    src: "email", from: "chen", ref: { en: "Accounts payable", zh: "应付账款" }, created: -0.8, due: 1,
    owner: "me",
    next: { en: "Match the invoice to the approved marketing request", zh: "将发票与已批准的市场申请匹配" },
    ai: { en: "An invoice for ¥38,600 has no matching approval reference. Finance has paused the payment run.", zh: "一张38,600元发票缺少对应审批编号，财务已暂停本期付款。" },
    log: [{ on: -0.8, who: "chen", t: { en: "queried the invoice", zh: "提出发票疑问" } }] },

  { id: "T-2054", t: { en: "Open day staffing rota", zh: "开放日人员排班" },
    type: "scheduling", campus: "gz-main", dept: "admin", st: "new", p: "normal",
    src: "form", from: "he", ref: { en: "Staffing request form", zh: "人员支持申请表" }, created: -1.2, due: 2,
    owner: "me",
    next: { en: "Draft the rota and circulate for volunteers", zh: "拟定排班表并征集志愿人员" },
    ai: { en: "22 staff needed across four zones. Last year's rota is available as a starting point.", zh: "四个区域共需22名工作人员，可参考去年排班表。" },
    log: [{ on: -1.2, who: "he", t: { en: "submitted the staffing request", zh: "提交人员支持申请" } }] },

  { id: "T-2049", t: { en: "Monthly admissions funnel report", zh: "月度招生漏斗报告" },
    type: "report", campus: "all", dept: "admissions", st: "new", p: "normal",
    src: "manual", from: "me", ref: { en: "Standing monthly report", zh: "月度常规报告" }, created: -1, due: 2,
    owner: "me",
    next: { en: "Pull enquiry to enrolment figures for all six campuses", zh: "汇总六个校区的咨询至报名转化数据" },
    ai: { en: "Four campuses report through the shared tracker; two still send figures by WeChat.", zh: "四个校区通过共享表格报送，两个校区仍通过微信发送数据。" },
    log: [{ on: -1, who: "me", t: { en: "opened the reporting cycle", zh: "启动报告周期" } }] },

  { id: "T-2050", t: { en: "Short video account content plan", zh: "短视频账号内容计划" },
    type: "marketing_approval", campus: "gz-main", dept: "marketing", st: "new", p: "low",
    src: "wechat", from: "lin", ref: { en: "Marketing group", zh: "市场部群" }, created: -2, due: 9,
    owner: "me", approver: "me", stage: 0,
    next: { en: "Review the twelve week plan before department review", zh: "在部门初审前审阅十二周计划" },
    ai: { en: "Twelve week plan covering three campuses, two posts per week. No budget uplift requested.", zh: "十二周计划，覆盖三个校区，每周两条，未申请追加预算。" },
    log: [{ on: -2, who: "lin", t: { en: "shared the content plan", zh: "分享内容计划" } }] },

  { id: "T-2015", t: { en: "Campus safety drill records", zh: "校区安全演练记录" },
    type: "admin_approval", campus: "fs-poly", dept: "facilities", st: "completed", p: "normal",
    src: "form", from: "guo", ref: { en: "Compliance form", zh: "合规表单" }, created: -14, due: -3, done: -2,
    owner: "me", turnaround: 12,
    next: { en: "Closed", zh: "已结案" },
    ai: { en: "Drill completed at all four buildings. Records filed with the district bureau.", zh: "四栋楼均完成演练，记录已报区教育局备案。" },
    log: [{ on: -14, who: "guo", t: { en: "logged the drill plan", zh: "登记演练方案" } },
          { on: -2, who: "me", t: { en: "filed the records", zh: "完成备案归档" } }] },

  { id: "T-2003", t: { en: "September enrolment figures consolidation", zh: "九月报名数据汇总" },
    type: "report", campus: "all", dept: "admissions", st: "completed", p: "high",
    src: "excel", from: "zhou", ref: { en: "enrolment_sept.xlsx", zh: "enrolment_sept.xlsx" }, created: -18, due: -6, done: -5,
    owner: "me", turnaround: 13,
    next: { en: "Closed", zh: "已结案" },
    ai: { en: "Six campus workbooks consolidated into one board summary. Two campuses submitted late.", zh: "六个校区表格汇总为一份董事会摘要，两个校区延迟提交。" },
    log: [{ on: -18, who: "zhou", t: { en: "opened the cycle", zh: "启动汇总" } },
          { on: -5, who: "me", t: { en: "issued the board summary", zh: "发出董事会摘要" } }] },

  { id: "T-2009", t: { en: "Teaching quality report - polytechnic", zh: "职院教学质量报告" },
    type: "report", campus: "fs-poly", dept: "academic", st: "completed", p: "normal",
    src: "manual", from: "me", ref: { en: "Quarterly report", zh: "季度报告" }, created: -26, due: -10, done: -8,
    owner: "me", turnaround: 18,
    next: { en: "Closed", zh: "已结案" },
    ai: { en: "Student feedback and observation data for the summer term. Two departments flagged for follow-up.", zh: "夏季学期学生反馈与听课数据，两个系部需后续跟进。" },
    log: [{ on: -26, who: "me", t: { en: "started collation", zh: "开始整理" } },
          { on: -8, who: "tan", t: { en: "signed off the report", zh: "审定报告" } }] },

  { id: "T-2035", t: { en: "Kindergarten open week posters", zh: "幼儿园开放周海报" },
    type: "marketing_approval", campus: "gz-intl", dept: "marketing", st: "completed", p: "normal",
    src: "wechat", from: "lin", ref: { en: "Marketing group", zh: "市场部群" }, created: -12, due: -4, done: -3,
    owner: "me", turnaround: 9, value: "¥18,000",
    next: { en: "Closed", zh: "已结案" },
    ai: { en: "Four poster variants approved and sent to print. Delivered to campus on schedule.", zh: "四款海报审批通过并付印，已按期送达校区。" },
    log: [{ on: -12, who: "lin", t: { en: "submitted the artwork", zh: "提交物料" } },
          { on: -3, who: "me", t: { en: "released to print", zh: "放行付印" } }] }
];

/* Unified inbox - arrived, not yet turned into tasks. */
const INBOX = [
  { id: "I-118", src: "wechat", from: "lin", ref: { en: "Marketing group - 14 members", zh: "市场部群 - 14人" }, hrs: 0.5,
    excerpt: { en: "Liyun, the printer is asking for the open day files today. Can you finish the brand check this morning? They close the order at 17:00 tomorrow.",
               zh: "丽云，印厂今天就要开放日的文件。你上午能完成品牌检查吗？他们明天17:00截单。" },
    ai: { sum: { en: "Chasing the brand compliance stage on the open day artwork. Hard printer deadline tomorrow 17:00.", zh: "催促开放日物料的品牌合规环节，印厂硬性截止时间为明日17:00。" },
          act: { en: "Links to an existing approval - no new task needed", zh: "关联现有审批，无需新建任务" },
          fields: { type: "marketing_approval", campus: "gz-intl", p: "high", due: 1 }, link: "T-2041", conf: 94 } },

  { id: "I-117", src: "excel", from: "zhou", ref: { en: "october_applicants.xlsx - 214 rows, 3 sheets", zh: "october_applicants.xlsx - 214行，3个工作表" }, hrs: 2,
    excerpt: { en: "Attached is the October intake list from the agent. Please check before we confirm interview slots.",
               zh: "附件为代办机构提供的十月入学名单，请在确认面试时段前核对。" },
    ai: { sum: { en: "214 applicants. 37 missing documents, 12 without an interview slot, 3 duplicate records.", zh: "214位申请人：37位材料缺失，12位未安排面试，3条重复记录。" },
          act: { en: "Create three tasks: document chase, interview scheduling, duplicate merge", zh: "建议创建三项任务：材料催缴、面试排期、重复记录合并" },
          fields: { type: "admissions_admin", campus: "gz-intl", p: "high", due: 2 }, conf: 88,
          table: { cols: { en: ["Item", "Count", "Action"], zh: ["项目", "数量", "处理"] },
                   rows: [ { en: ["Applicants received", "214", "Checked"], zh: ["收到申请", "214", "已核对"] },
                           { en: ["Missing documents", "37", "Chase by Friday"], zh: ["材料缺失", "37", "周五前催缴"] },
                           { en: ["Interview not booked", "12", "Schedule this week"], zh: ["未安排面试", "12", "本周安排"] },
                           { en: ["Duplicate records", "3", "Merged"], zh: ["重复记录", "3", "已合并"] } ] } } },

  { id: "I-116", src: "email", from: "agency", ref: { en: "Re: recruitment video - script v3 final", zh: "回复：招生视频 - 第三版终稿" }, hrs: 4,
    excerpt: { en: "We are holding the crew for Thursday but need written sign-off by tomorrow, otherwise the booking releases and the next slot is three weeks out.",
               zh: "我们暂为周四保留拍摄团队，但需在明日前获得书面确认，否则档期释放，下一档期需三周后。" },
    ai: { sum: { en: "Agency will release the crew booking without sign-off tomorrow. Next available slot is three weeks later.", zh: "若明日未获确认，代理商将释放拍摄档期，下一可用档期为三周后。" },
          act: { en: "Escalate the approval that has sat with the marketing director for six days", zh: "升级已在市场总监处停留六天的审批" },
          fields: { type: "marketing_approval", campus: "fs-poly", p: "critical", due: 0 }, link: "T-2038", conf: 91 } },

  { id: "I-115", src: "form", from: "guo", ref: { en: "Facility request form #FR-3391", zh: "设施申请表 #FR-3391" }, hrs: 6,
    excerpt: { en: "Air conditioning failure in teaching block C, rooms 301 to 318. Requested urgency: high. Affects 9 classes per day.",
               zh: "C教学楼301至318室空调故障。紧急程度：高。每日影响9个班级。" },
    ai: { sum: { en: "Air conditioning failure affecting 18 rooms and 9 classes a day at Qingyuan.", zh: "清远校区空调故障，影响18间教室、每日9个班级。" },
          act: { en: "Create a facilities task and route to finance if repair exceeds ¥20,000", zh: "创建后勤任务，若维修超过20,000元则转财务审批" },
          fields: { type: "admin_approval", campus: "qy-poly", p: "high", due: 1 }, conf: 90 } },

  { id: "I-114", src: "wechat", from: "tan", ref: { en: "Voice message, 2 min 14 sec", zh: "语音消息，2分14秒" }, hrs: 7,
    excerpt: { en: "Transcribed: ... so if we move the parent evening to the following Thursday we avoid the exam week, but I need to know whether the hall is free and whether the invitations have gone out yet ...",
               zh: "转写：……如果家长会顺延到下周四就可以避开考试周，但我需要知道礼堂是否有空，以及邀请函是否已经发出……" },
    ai: { sum: { en: "Requests moving the parent evening one week later to avoid exam week. Two open questions: hall availability and invitation status.", zh: "建议家长会顺延一周以避开考试周，两个待确认事项：礼堂档期与邀请函状态。" },
          act: { en: "Answer both questions, then update the existing scheduling task", zh: "回复两个问题，并更新现有排期任务" },
          fields: { type: "scheduling", campus: "gz-intl", p: "normal", due: 2 }, link: "T-2044", conf: 86 } },

  { id: "I-113", src: "excel", from: "lin", ref: { en: "q3_marketing_spend.xlsx - 6 sheets", zh: "q3_marketing_spend.xlsx - 6个工作表" }, hrs: 9,
    excerpt: { en: "Four campuses filled in. Qingyuan and Shenzhen tabs are still empty.",
               zh: "四个校区已填报，清远与深圳页签仍为空白。" },
    ai: { sum: { en: "Four of six campus tabs complete. Two campuses are over the quarterly budget line; two have not reported.", zh: "六个页签中四个已填报。两个校区超出季度预算，两个校区未报送。" },
          act: { en: "Send reminders to Qingyuan and Shenzhen, flag the two overspends in the board report", zh: "提醒清远与深圳报送，并在董事会报告中标注两项超支" },
          fields: { type: "report", campus: "all", p: "high", due: 0 }, link: "T-2047", conf: 92,
          table: { cols: { en: ["Campus", "Q3 spend", "Against budget"], zh: ["校区", "三季度支出", "预算对比"] },
                   rows: [ { en: ["Guangzhou Main", "¥412,000", "-4%"], zh: ["广州主校区", "412,000元", "-4%"] },
                           { en: ["Guangzhou International", "¥286,000", "+11%"], zh: ["广州国际学校", "286,000元", "+11%"] },
                           { en: ["Foshan", "¥198,000", "-2%"], zh: ["佛山校区", "198,000元", "-2%"] },
                           { en: ["Zhuhai", "¥174,000", "+7%"], zh: ["珠海校区", "174,000元", "+7%"] },
                           { en: ["Qingyuan", "not submitted", "-"], zh: ["清远校区", "未提交", "-"] },
                           { en: ["Shenzhen", "not submitted", "-"], zh: ["深圳中心", "未提交", "-"] } ] } } },

  { id: "I-112", src: "wechat", from: "wang", ref: { en: "Direct message", zh: "私聊消息" }, hrs: 11,
    excerpt: { en: "Any news on the employer announcement? The company asked me again this morning.",
               zh: "企业合作发布稿有进展吗？对方今早又问了一次。" },
    ai: { sum: { en: "Campus director chasing the employer partnership announcement date.", zh: "校区主任催询企业合作发布稿的发布日期。" },
          act: { en: "Reply with the current status - the partner is the blocker, not us", zh: "回复当前状态：卡点在合作方，不在我方" },
          fields: { type: "marketing_approval", campus: "fs-poly", p: "normal", due: 1 }, link: "T-2024", conf: 89 } },

  { id: "I-111", src: "form", from: "xu", ref: { en: "Marketing request form #MR-2204", zh: "市场申请表 #MR-2204" }, hrs: 20,
    excerpt: { en: "Shenzhen centre requests a WeChat article for the October intake, target publication next Wednesday, photography support needed.",
               zh: "深圳中心申请发布十月入学微信推文，目标发布时间为下周三，需摄影支持。" },
    ai: { sum: { en: "New marketing request from Shenzhen: WeChat article plus photography, publication next Wednesday.", zh: "深圳中心新市场申请：微信推文及摄影支持，下周三发布。" },
          act: { en: "Create a marketing approval task on the four stage route", zh: "按四级审批流程创建市场审批任务" },
          fields: { type: "marketing_approval", campus: "sz-centre", p: "normal", due: 5 }, conf: 93 } },

  { id: "I-110", src: "email", from: "chen", ref: { en: "Invoice BL-40318 - no approval reference", zh: "发票 BL-40318 - 无审批编号" }, hrs: 22,
    excerpt: { en: "This invoice for ¥38,600 has no matching approval on file. Payment run is paused until we can match it.",
               zh: "该发票金额38,600元，系统内无对应审批记录，付款流程暂停至匹配完成。" },
    ai: { sum: { en: "Unmatched invoice of ¥38,600 has paused the payment run.", zh: "38,600元发票无法匹配审批，付款流程已暂停。" },
          act: { en: "Match against approved marketing requests from August", zh: "与八月已批准的市场申请进行匹配" },
          fields: { type: "general", campus: "all", p: "high", due: 1 }, link: "T-2062", conf: 87 } },

  { id: "I-109", src: "wechat", from: "liu", ref: { en: "Academic affairs group", zh: "教务处群" }, hrs: 26,
    excerpt: { en: "Still two invigilators short for the Zhuhai block. I am asking the department heads today.",
               zh: "珠海考场仍缺两名监考老师，我今天再问一下各系主任。" },
    ai: { sum: { en: "Invigilation still two names short, registrar is chasing department heads.", zh: "监考仍缺两人，教务注册正在向系主任催询。" },
          act: { en: "Update the follow-up and set a reminder for tomorrow morning", zh: "更新跟进记录并设置明早提醒" },
          fields: { type: "scheduling", campus: "zh-uni", p: "high", due: 2 }, link: "T-2017", conf: 90 } },

  { id: "I-108", src: "form", from: "xu", ref: { en: "Event request form #EV-1187", zh: "活动申请表 #EV-1187" }, hrs: 30,
    excerpt: { en: "Two additional employers have asked for booths at the careers fair. Requesting approval to extend the floor plan.",
               zh: "另有两家企业申请就业招聘会展位，申请扩展展位图。" },
    ai: { sum: { en: "Two extra careers fair booths requested, which changes the floor plan and the fire capacity check.", zh: "申请增加两个招聘会展位，将影响展位图与消防容量核算。" },
          act: { en: "Add to the existing careers fair task", zh: "并入现有招聘会任务" },
          fields: { type: "general", campus: "qy-poly", p: "normal", due: 4 }, link: "T-2058", conf: 85 } },

  { id: "I-107", src: "email", from: "bureau", ref: { en: "Notice: term date confirmation 2026-2027", zh: "通知：2026-2027学年校历确认" }, hrs: 34,
    excerpt: { en: "Please note the confirmed term dates for the coming academic year, attached for your records.",
               zh: "现将下一学年确认的校历随附，请查收备案。" },
    ai: { sum: { en: "Confirmed term dates for next academic year. Matches the dates already in the group calendar.", zh: "下一学年确认校历，与集团日历中已有日期一致。" },
          act: { en: "No action required - filed for reference", zh: "无需处理，已归档备查" },
          fields: { type: "general", campus: "all", p: "low", due: 14 }, conf: 96, noAction: true } }
];

/* Calendar entries the manager keeps outside the task list. */
const EVENTS = [
  { on: 0,  time: "09:30", k: "meeting",  t: { en: "Weekly operations stand-up", zh: "运营周会" }, campus: "all" },
  { on: 0,  time: "15:00", k: "deadline", t: { en: "Q3 marketing spend report to the board", zh: "三季度市场支出报告报送董事会" }, campus: "all", task: "T-2047" },
  { on: 1,  time: "17:00", k: "deadline", t: { en: "Open day artwork files to the printer", zh: "开放日物料文件交付印厂" }, campus: "gz-intl", task: "T-2041" },
  { on: 2,  time: "08:30", k: "event",    t: { en: "Mid-term exams begin", zh: "期中考试开始" }, campus: "zh-uni", task: "T-2017" },
  { on: 2,  time: "14:00", k: "approval", t: { en: "Applicant data check due", zh: "申请名单核对到期" }, campus: "gz-intl", task: "T-2052" },
  { on: 3,  time: "10:00", k: "meeting",  t: { en: "Campus directors call", zh: "校区主任例会" }, campus: "all" },
  { on: 3,  time: "16:00", k: "approval", t: { en: "Prospectus reprint decision needed", zh: "招生手册重印需决策" }, campus: "gz-intl", task: "T-2013" },
  { on: 4,  time: "09:00", k: "deadline", t: { en: "Visa declarations to the agent", zh: "签证声明交付代办机构" }, campus: "gz-intl", task: "T-2011" },
  { on: 5,  time: "18:30", k: "event",    t: { en: "Parent evening (date under review)", zh: "家长会（日期待定）" }, campus: "gz-intl", task: "T-2044" },
  { on: 6,  time: "11:00", k: "meeting",  t: { en: "Agency production call", zh: "代理商制作会议" }, campus: "fs-poly", task: "T-2038" },
  { on: 7,  time: "09:00", k: "event",    t: { en: "Overseas partner delegation arrives", zh: "海外合作方代表团抵达" }, campus: "gz-main", task: "T-2042" },
  { on: 9,  time: "10:00", k: "event",    t: { en: "Autumn open day", zh: "秋季开放日" }, campus: "gz-intl" },
  { on: 12, time: "13:00", k: "event",    t: { en: "Careers fair", zh: "就业招聘会" }, campus: "qy-poly", task: "T-2058" },
  { on: -1, time: "16:00", k: "deadline", t: { en: "Timetable republication (missed)", zh: "课表重新发布（已逾期）" }, campus: "zh-uni", task: "T-2029" }
];

/* Eight week history for the reporting view. */
const WEEKLY = [
  { w: "W31", done: 21, inb: 26 }, { w: "W32", done: 24, inb: 25 }, { w: "W33", done: 19, inb: 30 },
  { w: "W34", done: 27, inb: 28 }, { w: "W35", done: 23, inb: 33 }, { w: "W36", done: 29, inb: 31 },
  { w: "W37", done: 26, inb: 34 }, { w: "W38", done: 31, inb: 29 }
];

const TURNAROUND = [
  { type: "marketing_approval", days: 9.4 },
  { type: "admin_approval",     days: 6.1 },
  { type: "admissions_admin",   days: 4.8 },
  { type: "finance_approval",   days: 11.2 },
  { type: "scheduling",         days: 3.5 },
  { type: "report",             days: 13.0 }
];
const TURNAROUND_TARGET = 7;

/* The time estimate from the original audit. Ranges, clearly labelled as estimates. */
const RECOVERY = [
  { k: { en: "Email triage",          zh: "邮件分拣" },     lo: 4,   hi: 6 },
  { k: { en: "WeChat follow-up",      zh: "微信跟进" },     lo: 2,   hi: 3 },
  { k: { en: "Excel trackers",        zh: "表格维护" },     lo: 4,   hi: 5 },
  { k: { en: "Forms and documents",   zh: "表单与文件" },   lo: 3,   hi: 4 },
  { k: { en: "Marketing approvals",   zh: "市场审批" },     lo: 1.5, hi: 2 },
  { k: { en: "Admin approvals",       zh: "行政审批" },     lo: 1.5, hi: 2 },
  { k: { en: "Admissions admin",      zh: "招生事务" },     lo: 3,   hi: 4 },
  { k: { en: "Scheduling",            zh: "排期安排" },     lo: 1,   hi: 1.5 },
  { k: { en: "Chasing and reminders", zh: "催办与提醒" },   lo: 1,   hi: 1 },
  { k: { en: "Reporting",             zh: "报表整理" },     lo: 2,   hi: 3 }
];
