---
title: "KuaiFlow: Recommendation Baselines"
date: 2026-08-14
excerpt: "A reproducible recommendation benchmark on KuaiRand, comparing Popularity, ItemCF, and BPR under a strict chronological evaluation protocol.<br/><img src='/images/portfolio/kuaiflow_week1_portfolio.svg' alt='KuaiFlow Week 1 recommendation baseline results'>"
collection: portfolio
header:
  teaser: portfolio/kuaiflow_week1_portfolio.svg
---

KuaiFlow is a multi-stage short-video recommendation project built on KuaiRand. In Week 1, I established a reproducible offline evaluation foundation, implemented three implicit-feedback baselines, and measured where personalization improves on a global popularity ranking.

![KuaiFlow Week 1 recommendation baseline results](/images/portfolio/kuaiflow_week1_portfolio.svg)

## What I built

- A strict chronological train/validation/test split with timestamp-boundary cleanup.
- Deterministic evaluation over 5,000 users per future split.
- Popularity, item-based collaborative filtering (ItemCF), and Bayesian Personalized Ranking (BPR) baselines.
- Novel-item, warm-start evaluation at `K = 20`, with seen positives removed and explicit fallback behavior for users without positive training history.
- Segment analysis by user activity and item popularity, plus catalog-coverage measurement.

## Results

| Model | Recall@20 | HitRate@20 | NDCG@20 | Coverage@20 | Unique items |
|---|---:|---:|---:|---:|---:|
| Popularity | 7.20% | 20.02% | 4.15% | 0.53% | 40 |
| BPR | 10.17% | 25.84% | 5.57% | 13.44% | 1,013 |
| **ItemCF** | **10.78%** | **27.78%** | **6.14%** | **45.52%** | **3,431** |

ItemCF was the strongest overall baseline. Compared with Popularity on the test set, it improved Recall@20 by **49.7%**, HitRate@20 by **38.8%**, and NDCG@20 by **47.9%**, while expanding catalog reach from 40 to 3,431 videos.

The segment analysis also exposed the next challenges. BPR was competitive for low-activity users, while ItemCF was more consistent for medium- and high-activity users. More than 93% of ItemCF recommendation slots still went to head items, motivating diversity-aware reranking and exposure-bias analysis in later stages.

## Next steps

Week 2 extends the system with a two-tower retrieval model and efficient top-k candidate generation. Later stages will add multi-task ranking, randomized-exposure bias audits, and diversity-aware reranking.

<p><a class="btn btn--primary" href="https://github.com/shaotian-sun/kuaiflow-recsys"><i class="fab fa-fw fa-github" aria-hidden="true"></i> View project on GitHub</a></p>
