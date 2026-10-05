export const CAMPAIGN_FORM_NAME = "campaign";

export const spendBands = [
  { value: "under-5k", label: "Under £5,000" },
  { value: "5-10k", label: "£5,000 – £10,000" },
  { value: "10-25k", label: "£10,000 – £25,000" },
  { value: "25-50k", label: "£25,000 – £50,000" },
  { value: "50-100k", label: "£50,000 – £100,000" },
  { value: "over-100k", label: "Over £100,000" },
] as const;

export const spendSteps = [
  {
    id: "25k",
    label: "£25,000 in ads",
    spend: "£25,000",
    fee: "£7,500",
    spendBar: 1,
    feeBar: 0.3,
    agency: "about £8,800",
    hire: "about £8,900",
    agencyBar: 0.35,
    hireBar: 0.36,
    paused: false,
  },
  {
    id: "10k",
    label: "£10,000 in ads",
    spend: "£10,000",
    fee: "£3,000",
    spendBar: 0.4,
    feeBar: 0.12,
    agency: "about £4,300",
    hire: "about £6,600",
    agencyBar: 0.17,
    hireBar: 0.26,
    paused: false,
  },
  {
    id: "paused",
    label: "Ads paused",
    spend: "Ads paused",
    fee: "£0",
    spendBar: 0,
    feeBar: 0,
    agency: "the retainer and the contract still run",
    hire: "the salaries still run",
    agencyBar: 0,
    hireBar: 0,
    paused: true,
  },
] as const;

export type DealRow = {
  label: string;
  usual: string;
  interia: string;
  note?: string;
};

export const dealRows: DealRow[] = [
  {
    label: "Before your first lead",
    usual: "A fee, salary or subscription from day one",
    interia: "£0 fee",
    note: "A verified lead is a real person who filled in your form, not yet a buyer.",
  },
  {
    label: "Ads, pages, emails",
    usual: "Billed extra, capped, or made by you",
    interia: "Unlimited, included",
  },
  {
    label: "Contract length",
    usual: "1–12 months, or a job contract",
    interia: "None",
  },
  {
    label: "How to cancel",
    usual: "Notice period, pay out the term",
    interia: "Pause your ads. That’s it.",
  },
  {
    label: "You cut your ad spend",
    usual: "Same monthly cost",
    interia: "You pay us less",
  },
  {
    label: "No lead in 30 days",
    usual: "Paid anyway, no refund",
    interia: "Your £500 deposit back",
    note: "If you ran the agreed £1,500 of ads in your first 30 days.",
  },
];

export const processSteps = [
  {
    n: "1",
    when: "1 minute",
    title: "You send your website",
    body: "That’s all we need. No brief, no call.",
  },
  {
    n: "2",
    when: "Within a day",
    title: "We build your whole campaign",
    body: "Your ads, the pages they lead to, the follow-up emails and a call script, ready for you to see.",
  },
  {
    n: "3",
    when: "When you’re ready",
    title: "We launch and keep improving",
    body: "Put down the £500 deposit and connect your ad account. We go live and keep making it better. No fee until your first lead.",
  },
] as const;

export const funnelFaqs = [
  {
    q: "What’s the catch?",
    a: "A £500 deposit and at least £1,500 of ads in your first 30 days. The deposit counts toward your first fees. If you run those ads and no verified lead arrives within 30 days, it comes back. It also comes back if we never deliver a campaign ready to launch.",
  },
  {
    q: "Who pays for the ads?",
    a: "You do, straight to Meta or Google, from your own ad account. Our fee and the deposit are separate from that spend.",
  },
  {
    q: "Why 30% when my agency charges 15%?",
    a: "Their 15% usually covers running your ads. Making the ads, pages and emails is billed on top. Our 30% includes all of it. At £10,000 a month in ads, a typical agency costs about £4,300 in fees, an in-house team about £6,600, and we charge £3,000.",
  },
  {
    q: "I already have an agency. Why switch?",
    a: "You don’t have to switch to find out. Get your free campaign and put it next to the work you have. If ours is better, run it. There’s no contract on our side.",
  },
  {
    q: "What if ads haven’t worked for us before?",
    a: "Then the ads, the pages they lead to or the follow-up weren’t right, or weren’t fixed fast enough. We build all three, keep improving them as results come in, and charge no fee until your first verified lead.",
  },
  {
    q: "What if the leads aren’t good?",
    a: "A verified lead is a real person who filled in your form, not yet a buyer. Your form asks the questions that sort buyers from browsers. Tell us when a lead isn’t a fit, and we change the ads and the form.",
  },
  {
    q: "What do you need from me?",
    a: "Your website, to start. To launch, the deposit and access to your ad account. From there we build, run and improve everything.",
  },
  {
    q: "Which platforms do you run?",
    a: "Meta (Facebook and Instagram) and Google Search. We run ads that bring you enquiries, not online-shop sales.",
  },
  {
    q: "Spending less than £5,000 a month?",
    a: "You get the same free campaign if you’re ready to spend at least £1,500 on ads in your first 30 days. We build and run it for you, and you see it before you decide to launch.",
  },
] as const;

export const proofChapters = [
  {
    when: "The problem",
    title: "Good work. No pipeline.",
    body: "Louis was running Bespoke Building Group on referrals. No dedicated ads. No page built to take a conversation. The work was never the issue. Being found was.",
  },
  {
    when: "What we ran",
    title: "Meta, Google, one page.",
    body: "We built a page around the actual job, then pointed paid traffic at it. Clear offer. One ask. Ads in his account, not ours.",
  },
  {
    when: "What changed",
    title: "Enquiries worth ringing back.",
    body: "Not a scoreboard. Homeowners ready to talk scope and timeline. Ads, page, follow-up pointing the same way.",
  },
] as const;
