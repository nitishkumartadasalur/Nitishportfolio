# Nitish Kumar Tadasalur — Developer Portfolio
React 19 + Vite + TypeScript + Tailwind CSS 4 + Framer Motion + Lucide.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build && npm run preview
```
## Customize
Everything (links, email, roles, stack, projects) lives in `src/data.ts`.
LeafGuard's content comes from its README; add a `demo` URL there when it's deployed.

## Deploy
**Vercel:** push to GitHub → vercel.com → New Project → import repo (Vite preset auto-detected) → Deploy.
**Netlify:** Add new site → import repo → build `npm run build`, publish `dist`.

## Contact form
None included (a static site can't receive submissions). Contact uses `mailto:`/social links. To add a form, use Formspree or Netlify Forms.

## Test checklist
- [ ] 360px, 768px, 1280px+: no horizontal scroll, mobile menu works
- [ ] All links open (SkillMap demo/repo, LeafGuard repo, LinkedIn, email, GitHub)
- [ ] Block ghchart.rshah.org → graceful fallback message shows
- [ ] Keyboard Tab order + visible focus; contrast OK
- [ ] OS "reduce motion" on → typing & animations stop
- [ ] Lighthouse: Performance/Accessibility/SEO ≥ 90

## Profile photo
Replace `public/profile.jpg` (keep ~4:5 ratio, under 200 KB). If missing, initials "NK" show instead.
