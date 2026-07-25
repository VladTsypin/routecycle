# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Routecycle is for cyclists in Estonia and nearby markets who plan unfamiliar
rides and want to understand likely surface, access restrictions, route
difficulty, and uncertainty before they start. The validation landing is
mobile-first because approximately 75% of its expected traffic is mobile.

## Product Purpose

Routecycle helps riders test and evaluate cycling routes with more context than
a route line alone. The current landing validates two user intents: trying the
interactive route prototype and confirming interest by leaving route-checking
feedback.

## Positioning

Routecycle is built around explainability. It shows the map-data signals behind
surface, access, confidence, and route-risk decisions instead of presenting a
route as unqualified truth. A route result never guarantees that a ride is
legal, open, safe, or currently passable.

## Operating Context

Visitors compare route profiles, inspect highlighted risk sections, adjust
surface and access checks, and then continue to `routecycle.com` or prepare
feedback about their city, bicycle type, and route concerns. The public
experience is bilingual in Russian and English and uses OpenStreetMap-derived
signals for the Estonia prototype.

## Capabilities and Constraints

- `routecycle.com` is the public route-planner product entry point.
- This repository builds a static Vue 3 + Vite validation landing, blog, and
  content-admin surface.
- The landing includes an interactive demonstration, not a production routing
  guarantee.
- Interest feedback currently creates a client-side email draft. It is not
  durable lead capture and must not be described as a completed submission.
- OpenStreetMap and derived research data may be incomplete or stale. Access,
  barriers, closures, forestry conditions, and surface changes require
  independent confirmation.
- Russian and English interfaces must remain semantically equivalent.
- Durable lead capture and the precise expansion order beyond Estonia remain
  open product decisions.

## Brand Commitments

The product name is Routecycle. Its voice is calm, concise, technical, and
trustworthy. Product claims must stay evidence-based, acknowledge uncertainty,
and avoid invented testimonials or safety assurances.

## Evidence on Hand

- The interactive route prototype demonstrates route profiles, map signals,
  warnings, confidence, and alternatives.
- OpenStreetMap-derived Estonia research and QA materials are stored under
  `output/` and `deliverables/`.
- The public blog explains why a route line alone is insufficient.
- No customer testimonials, published benchmarks, or verified adoption claims
  are currently available and none should be fabricated.

## Product Principles

1. Explain the reason behind every warning or confidence signal.
2. Distinguish map evidence from legal, safety, and current-condition claims.
3. Let riders test the core idea before asking for feedback.
4. Keep prototype limitations and data handling explicit.
5. Prioritize a clear, fast mobile journey.

## Accessibility & Inclusion

Primary actions and controls must remain keyboard-accessible, visibly focused,
and at least 44 by 44 pixels where touched. The interface respects reduced
motion preferences, does not rely on color alone for route status, and keeps
Russian and English interactions equivalent.
