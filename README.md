# Guess Me in 5 — Spatial SPECS Edition (Learn AR with SPECS 2026)

This project explores a **new spatial, hand-interactive AR version** of the owner's original `Guess Me in 5` Snapchat phone quiz concept, developed for the [Learn AR with SPECS](https://learn-specs.devpost.com/) event.

- **Event:** October 15–November 9, 2026.
- **Old concept:** Five-question friendship prediction game. The older phone-specific Lens project is not copied here and is not represented as eligible new work.
- **New experience:** Table-anchored five-step question trail, pinch-selectable choices and a spatial score reveal, intended for Snap SPECS 27.

## Status

**Native SPECS scene authored and linked (2026-11-08).** The serialized scene includes a world-space quiz hierarchy, seven Text components, three collider/Interactable buttons and a wired controller. Automated source tests are provided; a native Lens Studio preview and CLAD/LEAF builds remain unverified. The event requires a new Lens, CLAD/Lens Studio MCP build, public source, and a real screen-recorded Lens Studio preview video on YouTube.

This public repository is an event-specific work area. The owner's imported source material remains private and is *not* published here.

## VM-only build

Source analysis and planning are performed from the owner-controlled `dev` Fleet Linux VM. Because Lens Studio 5.24 requires Windows 11 or macOS 12+ and a supported graphics device, the workflow in `.github/workflows/macos-vm-probe.yml` checks whether free public-repository GitHub-hosted macOS VMs can launch the required native preview, without using the owner's laptop.

## Attribution and eligibility

The quiz *idea* predates the hackathon. Any new Lens code, reused code/templates and actual tool usage must be disclosed honestly in the final submission. Do not submit a mockup or an old phone Lens as a working new SPECS Lens.
