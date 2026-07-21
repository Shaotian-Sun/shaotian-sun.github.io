---
layout: single
title: "Can A Local Defect Influence the Macroscopic Particle System?"
date: 2026-07-19
excerpt: "Two phase transition phenonomena in Totally Asymmetric Simple Exclusive Process (TASEP)."
categories:
  - probability
tags:
  - integrable probability
  - interacting particle system
author_profile: true
read_time: true
comments: false
share: true
related: true
---

<!--
HOW TO USE THIS TEMPLATE

1. Keep this file in _drafts while you write.
2. Replace the sample text and remove any sections you do not need.
3. Preview drafts with:
   bundle exec jekyll serve --drafts -l -H localhost
4. To publish, move or copy this file to:
   _posts/YYYY-MM-DD-your-post-slug.md
5. Update "date", "title", "excerpt", "categories", and "tags" above.

TEX NOTES

- Inline math: \\(...\\)
- Display math: $$...$$
- This site uses MathJax, so write TeX expressions rather than a complete
  document. Do not add \documentclass, \usepackage, or \begin{document}.
- A line break inside an aligned display is written as \\.
-->

{% include toc title="Contents" %}

Write a short introduction that states the question and the main idea. For
example, an inline expression looks like \\(e^{i\pi}+1=0\\).

## Motivation

Explain why the problem is interesting, what is already known, and what the
reader will learn.

A useful pattern is to introduce notation in prose. Let
\\(f\colon \mathbb{R}\to\mathbb{R}\\) be a smooth function, and let
\\(x_0\in\mathbb{R}\\) be the point of interest.

## Main calculation

Use a display for an equation that deserves its own line:

$$
\sum_{n=1}^{\infty}\frac{1}{n^2}
=
\frac{\pi^2}{6}.
$$

For several aligned steps:

$$
\begin{aligned}
(a+b)^2
  &= a^2+2ab+b^2, \\
(a-b)^2
  &= a^2-2ab+b^2.
\end{aligned}
$$

Explain the meaning of a calculation immediately after it instead of making
the reader infer why it matters.

## Theorem and proof

<div class="notice--info" markdown="1">
**Theorem (Replace with a name).**
State the result clearly. For example, if \\(a\\) and \\(b\\) are real
numbers, then

$$
(a+b)^2=a^2+2ab+b^2.
$$

</div>

<div class="notice--success" markdown="1">
**Proof.**
Expand the product:

$$
(a+b)^2=(a+b)(a+b)=a^2+ab+ba+b^2.
$$

Since multiplication in \\(\mathbb{R}\\) is commutative, the two middle
terms combine to give \\(2ab\\). \\(\square\\)

</div>

## Code example (optional)

Use an ordinary fenced block when a computation supports the mathematics:

```python
def partial_sum(n):
    return sum(1 / (k * k) for k in range(1, n + 1))

print(partial_sum(10_000))
```

To show TeX source without rendering it, use a `latex` code block:

```latex
\[
\sum_{n=1}^{\infty}\frac{1}{n^2}
=
\frac{\pi^2}{6}
\]
```

<!--
OPTIONAL FIGURE

1. Put the image at images/blog/your-post-slug/figure-1.png.
2. Replace the alt text and caption.
3. Remove the opening and closing comment markers around this block.

## Figure

<figure>
  <img
    src="{{ '/images/blog/your-post-slug/figure-1.png' | relative_url }}"
    alt="Replace with a concise description of the figure."
  >
  <figcaption>
    <strong>Figure 1.</strong> Replace with the figure caption and source.
  </figcaption>
</figure>

Discuss what the reader should notice in the figure.
-->

## Conclusion

Summarize the result, its limitations, and a natural next question.

## References

1. Author, _Title_, venue or publisher, year.
2. A claim can also use a Markdown footnote.[^1]

[^1]: Replace this with the footnote text.
