# Impeccable implementation and review workflow

Installed repository-local skill: `.agents/skills/impeccable/SKILL.md` (4.8.0).
Engine: 0.1.18. Official source: https://github.com/pbakaus/impeccable
Reviewed source commit: `7510e233b228864606888d252abacf5e7148bf87`.

## Before implementation

- Read AGENTS.md and the existing product, design, test and release documents first.
- Use the local Impeccable skill for UI work. Run `.agents/skills/impeccable/scripts/impeccable context` once per session from this repository.
- `$impeccable init` is an agent-chat command, not a terminal command. It records confirmed product facts in PRODUCT.md. PRODUCT.md records source-backed context initialized under explicit user approval. Preserve its unresolved decisions; do not invent missing facts.
- `$impeccable document` separately captures the incumbent design in DESIGN.md and `.impeccable/design.json`. Preserve existing tokens, typography, branding, content, components and authority; setup is not a redesign authorization.
- Use `$impeccable shape <target>` for a scoped UI plan when needed. Read the skill's craft-floor reference immediately before editing UI. Leave missing product facts or visual decisions unresolved until confirmed.

## Review checklist

- [ ] Review the scoped user flow with `$impeccable critique <target>` and the appropriate platform audit.
- [ ] Verify accessibility, keyboard or native navigation, focus, contrast, text scaling, reduced motion, loading, empty, error and long-content states.
- [ ] Verify supported languages, Persian RTL and mixed-direction content where applicable, plus relevant mobile/desktop or native sizes.
- [ ] Preserve URLs, redirects, canonicals, hreflang, metadata, structured data, robots/noindex policy and sitemap behavior. SEO, indexing correctness, privacy and policy requirements outrank cosmetic improvement.
- [ ] Run the existing relevant checks and release gates; Impeccable never replaces them. Distinguish detector findings from execution failures and source review from rendered/device verification.
- [ ] Keep changes scoped, preserve unrelated edits, update matching docs, and report remaining issues. Do not mass-suppress rules to manufacture a clean report.
- [ ] Preserve deployment freezes, publication review, rights restrictions, protected copy, data boundaries and device approval requirements. The setup publication approval covers these tooling/context files only; it does not authorize product publication or production deployment.

## Maintenance and activation

Run `.agents/skills/impeccable/scripts/impeccable doctor --json` and `.agents/skills/impeccable/scripts/impeccable hooks status` to inspect installation state. Doctor findings are not proof that code or product truth changed.
Open a fresh Codex session in this repository if the skill is not yet visible. Hook manifest installation is separate from execution: approve the project hook through Codex `/hooks` when offered. Never edit trust records or security settings to bypass that approval.

## Web checks

Run `.agents/skills/impeccable/scripts/impeccable detect --json <changed-ui-paths>` once after a UI change. Pass actual markup/component paths, not a CSS-only directory, generated output unrelated to the change, or the bundled skill. Review the rendered result at relevant viewports as well. Codex hook manifests are provisioned, but harness approval is still required; use the manual detector until hook execution is observed.

## Captured context and remaining verification

See PRODUCT.md for source-backed scope. Design capture status is recorded below. New landing-page/showcase build preferences remain unset; ask at the first relevant build rather than storing an assumed choice. Live servers and device sessions were not configured or started by this setup.

Source design captured; rendered appearance and component previews remain unverified.
See DESIGN.md and `.impeccable/design-source.json` for actual declarations and their scope. The sidecar contains no invented web previews or tonal ramps.

The application ESLint configuration excludes only the unmodified vendored Impeccable skill directory. Existing application lint rules and coverage are preserved.
