# MemePet product scope

## Product

A meme-community companion app on X Layer. A user adopts a wallet-linked pet, completes a daily care action, sees its progress and helps a shared habitat grow.

**Core user story:** connect → adopt → care → see confirmed progress → refresh and recover the same pet.

## Rules

One pet per wallet. One care per UTC calendar day. Each confirmed care gives 10 personal growth points and increments the community care total by one. Hatchling begins at 0 points, Buddy at 20, Guardian at 50. No missed-day penalty. The lead owns the contract and UI mapping of these rules.

Show progression earned from participation, not token spending. No token approvals, token transfers, deposits, rewards with financial value or new MemePet token.

## Commit scope

One community, one mascot with three stage assets, a landing/adoption entry, pet home, daily care, persistent state, a community-progress panel, and read-only public pet/share-image pages. The actual community token/network identity is lead-verified, not inferred from a ticker or generated artwork. A read-only holder indicator may be added by the lead after the core loop works.

## Stretch scope

Accessory saving, multiple communities and market data. No marketplace, launchpad, breeding, trading, staking, chatbot, real-time 3D engine or in-app social feed.

## Architecture boundary

The lead owns contract reads/writes and supplies display-ready values and callbacks. Teammates build components with those inputs. UI preview data must never become a fallback for a failed live read.

## Visual direction

Soft collectible-pet appearance, readable text, spacious cards, consistent lighting/camera, a dominant pet scene and one obvious care action. Use approved art, not rendered financial logos or unverified token branding. The previous concept image is inspiration, not an implementation specification.

## Completion

Core transactions work in the declared environment; state survives refresh; rejected or failed transactions do not award progress; unknown community data is not shown as zero; the app works on a narrow mobile screen; the demo distinguishes live state from previews.

These are project design choices. The lead separately verifies hackathon requirements and the supported deployment environment.
