---
layout: single
title: "Interactive Geodesics Simulation for Flat Exponential DLPP"
date: 2026-07-23
excerpt: "An interactive simulation of exponential directed last-passage percolation with flat initial condition under an upper large-deviation event."
categories:
  - probability
tags:
  - integrable probability
  - large deviation
  - simulation
author_profile: true
read_time: true
comments: false
share: true
related: true
---

This interactive figure shows geodesics in exponential directed
last-passage percolation (DLPP) with the flat initial line \\(y=-x\\), conditioned
on the upper large-deviation event

$$
\mathcal{L}^{\mathrm{flat}}(N,N) \geq \ell N,
\qquad N=400,\quad \ell=5.
$$

**Markov Chain Monte Carlo Method** was used for this simulation. The function that we are considering is

$$
\widetilde{{\mathcal{L}}^{\mathrm{flat}}}(x,y) := \frac{\mathcal{L}^{\mathrm{flat}}(xN,yN)}{N}.
$$

Choose an endpoint by clicking either panel, or enter its coordinates and
select **Simulate geodesics**. Each panel overlays 20 independent extensions
of a conditioned environment. The first shows the full domain
\\([-10,10]^2\\); the second gives a closer view on \\([-5,5]^2\\).

<iframe
  src="{{ '/assets/interactive/flat-geodesics-n400/index.html' | relative_url }}"
  title="Interactive geodesics simulation for flat exponential DLPP"
  style="display:block;width:100%;height:1320px;border:1px solid #d9dde1;border-radius:8px;"
  loading="eager"
></iframe>

<p style="text-align:center;font-size:0.9em;">
  <a href="{{ '/assets/interactive/flat-geodesics-n400/index.html' | relative_url }}" target="_blank" rel="noopener">
    Open the simulation in a full page
  </a>
</p>

The heat map displays the scaled last-passage field. The colored curves are
geodesics backtracked from the selected endpoint to the flat boundary. The
overlaid guide curves mark the conditioned segment and the predicted
macroscopic transition boundaries.
