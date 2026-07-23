---
layout: single
title: "Simulation"
date: 2026-07-23
excerpt: "Conditioned limit shapes and an interactive geodesic simulation for exponential directed last-passage percolation."
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

{% include toc title="Contents" %}

## Introduction

Let \\(\{w_{i,j}\}\\) be independent exponential random variables with mean
one. For lattice points \\(u\preceq v\\), the last-passage time from \\(u\\) to
\\(v\\) is

$$
L(u,v)=\max_{\pi:u\to v}\sum_{z\in\pi}w_z,
$$

where the maximum is over all up-right lattice paths from \\(u\\) to \\(v\\).
The two initial conditions considered here are

$$
\mathcal L^{\mathrm{step}}(m,n)=L((0,0),(m,n))
$$

and

$$
\mathcal L^{\mathrm{flat}}(m,n)
=\max_{k\in\mathbb Z:\,(k,-k)\preceq(m,n)}
L((k,-k),(m,n)).
$$

Thus, the step model starts from a single point, while the flat model starts
from the line \\(y=-x\\).

A **large-deviation event** is an event in which a random quantity differs
from its typical macroscopic value by order \\(N\\), rather than by its usual
smaller fluctuation scale. Here we condition on the upper large-deviation event

$$
\mathcal L(N,N)\geq \ell N,\qquad \ell=5.
$$

Since the typical value of both models at \\((N,N)\\) is asymptotic to
\\(4N\\), the threshold \\(5N\\) represents an atypically large passage time.
The conditioned samples below were generated using a Markov chain Monte Carlo
method.

## Conditioned limit shapes

For either initial condition, consider the scaled macroscopic field

$$
\bar{\mathcal L}(x,y)
:=\lim_{N\to\infty}\frac{\mathcal L(xN,yN)}{N}.
$$

The following plots show empirical level curves of this field under the
conditioning \\(\mathcal L(N,N)\geq 5N\\), using \\(N=200\\). The first plot
uses step initial data and the second uses flat initial data.

<figure style="margin:1.5em 0;">
  <img
    src="{{ '/conditional_exponential_dlpp_N200_5Nx5N.png' | relative_url }}"
    alt="Empirical level curves of the conditioned exponential DLPP field with step initial condition"
    style="display:block;width:100%;height:auto;"
  >
  <figcaption style="text-align:center;font-size:0.9em;">
    Step initial condition: empirical contours of the conditioned mean field.
  </figcaption>
</figure>

<figure style="margin:1.5em 0;">
  <img
    src="{{ '/conditional_flat_exponential_dlpp_N200_5Nx5N.png' | relative_url }}"
    alt="Empirical level curves of the conditioned exponential DLPP field with flat initial condition"
    style="display:block;width:100%;height:auto;"
  >
  <figcaption style="text-align:center;font-size:0.9em;">
    Flat initial condition: empirical contours of the conditioned mean field.
  </figcaption>
</figure>

## Geodesic simulation for the flat case

The interactive figure below shows geodesics in flat exponential DLPP,
conditioned on

$$
\mathcal L^{\mathrm{flat}}(N,N)\geq \ell N,
\qquad N=400,\quad \ell=5.
$$

Choose an endpoint by clicking either panel, or enter its coordinates and
select **Simulate geodesics**. Each panel overlays 20 independent extensions
of a conditioned environment. The first shows the full domain
\\([-10,10]^2\\), while the second gives a closer view on \\([-5,5]^2\\).

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
