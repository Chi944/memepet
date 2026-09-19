# MemePet acceptance checklist

Begin with every result **NOT RUN**. Record date, commit, environment, browser, actual result and evidence in `docs/qa/`. Component previews do not prove a real transaction worked. Contract tests do not prove the user interface is integrated.

## Component / fixture checks

| ID | Check | Expected |
|---|---|---|
| U1 | Render each pet stage | Correct supplied art/placeholder, label and points |
| U2 | Render final stage | No divide-by-zero, no nonexistent next-stage target |
| U3 | Render missing art | Intentional accessible fallback |
| U4 | Care callbacks | Correct supplied callback; no component-owned progress |
| U5 | Pending/signature/submitting | Honest labels, no repeated care click or success award |
| U6 | Error and unavailable | Readable messages, correct retry/disabled behavior |
| U7 | Community zero vs unknown | Zero shown only when known; unavailable is not zero |
| U8 | Above-target / missing-target total | Fill bounded; actual count preserved; no fabricated percentage |
| U9 | Mobile and keyboard | No horizontal overflow at 390px; focus and controls usable |
| U10 | Reduced motion | Non-essential pet motion can be suppressed |

## Integrated application checks

| ID | Check | Expected |
|---|---|---|
| I1 | Visit without a wallet | Product is understandable; connection is prompted when required |
| I2 | Connect on wrong network | Clear switch action; no write to an unintended chain |
| I3 | Adopt in declared test environment | Confirmed record is read and shown |
| I4 | Refresh after adoption | Same wallet's pet persists |
| I5 | Decline adoption/care request | No false adoption, progress or community increment |
| I6 | Care when eligible | Confirmed personal and community state each update once |
| I7 | Repeat care in same UTC day | Contract rejects it; UI accurately communicates cooldown |
| I8 | Switch wallet or chain | Previous identity's cached pet is not presented as current |
| I9 | Simulate unavailable RPC/read | Clear unavailable/error state; no fixture or zero fallback |
| I10 | Confirmation succeeds but refresh fails | Transaction truth and stale/unavailable display are distinguished |
| I11 | Evolution threshold | Confirmed care count maps to correct stage; animation is not proof of a write |
| I12 | Production build opens dev routes | Not found; no reachable fictional-data demo fallback |
| I13 | Clean browser on public URL | Actual deployed core flow loads and links point to correct environment |
| I14 | Inspect code/config/log screenshots | No credentials, unauthorized packages or unverified live claims |

## Contract tests — lead owned

Duplicate adoption; invalid community; care without a pet; first care after adoption; repeated same-day care; UTC-day boundary; next-day care; independent wallets; exact personal/shared counter changes. Time travel belongs in local tests, not an undisclosed production shortcut.

## Release gate

Every core blocker is fixed or the feature is removed honestly. The lead checks the final commit and environment. Larm (Teammate B) checks the demo claims and public links. Kym (Teammate A) checks the actual release visuals. Nobody describes the prototype as audited, bot-proof or production-safe merely because tests pass.

## Demo evidence

Use prepared wallets honestly, identify the environment, and separate UI previews from live progress. Verify actual organizer requirements before choosing video length, submission deadline or deployment target.
