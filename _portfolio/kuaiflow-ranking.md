---
title: "KuaiFlow Stage 3: Ranking"
date: 2026-09-07
stage_order: 3
excerpt: "Stage 3 of KuaiFlow: DeepFM and multi-task MMoE ranking over fixed candidates from the retrieval stage.<br/><img src='/images/portfolio/kuaiflow/week3_workflow.png' alt='KuaiFlow Stage 3 retrieval-to-ranking workflow'>"
collection: portfolio
header:
  teaser: portfolio/kuaiflow/week3_workflow.png
---

KuaiFlow is a multi-stage short-video recommendation project built on KuaiRand. Stage 3 follows [Stages 1 and 2: Baselines and Retrieval](/portfolio/kuaiflow/) by training single-task DeepFM and multi-task DeepFM + MMoE rankers to reorder the fixed top-100 candidates.

![KuaiFlow Week 3 retrieval-to-ranking workflow](/images/portfolio/kuaiflow/week3_workflow.png)

## The first end-to-end ranking milestone

The ranker uses only request-time-safe user, item, and content features. Candidate files are scored but never converted into training examples, and unexposed items are never mislabeled as negatives. Both models train on 1.14 million chronological impressions and are evaluated on 500,000 candidate rows for 5,000 users.

- **DeepFM** combines first-order, factorization-machine, and deep interaction branches for click prediction.
- **DeepFM + MMoE** shares four experts across ten gated task towers for click, engagement actions, watch time, and duration-adjusted completion.
- A transparent composite utility combines the ten predictions into the final multi-objective ranking.
- Candidate membership stays fixed, making the Week 2 retrieval ceiling explicit and the ranking comparison controlled.

## Fixed-candidate ranking results

![KuaiFlow Week 3 fixed-candidate experiment results](/images/portfolio/kuaiflow/week3_results.png)

| Ordering | Recall@20 | HitRate@20 | NDCG@20 | Coverage@20 |
|---|---:|---:|---:|---:|
| Week 2 retrieval | 2.60% | 7.42% | 1.42% | **84.08%** |
| DeepFM | 3.50% | 10.40% | 1.69% | 38.66% |
| **MMoE composite** | **3.69%** | **10.64%** | **1.80%** | 41.92% |
| MMoE click head (diagnostic) | 3.86% | 11.36% | 1.95% | 41.22% |

Relative to the original retrieval order, the final MMoE composite improves **Recall@20 by 41.8%**, **HitRate@20 by 43.4%**, and **NDCG@20 by 27.1%**. Its NDCG@20 is also 6.6% higher than the single-task DeepFM ranker. The dedicated click head performs best on click ranking, but it is a diagnostic rather than the final policy because it ignores the other nine objectives.

The experiment also reveals a central trade-off: Coverage@20 drops from 84.08% in retrieval order to 41.92% after multi-objective ranking. At `K = 100`, recall, hit rate, and coverage remain identical across orderings because the ranker changes positions, not candidate membership. These results motivate an explicit diversity-aware reranking stage rather than assuming relevance optimization will preserve catalog reach.

## Pointwise prediction and task specialization

DeepFM remains slightly stronger for pointwise click classification, with test ROC-AUC 0.7195 versus 0.7150 for the MMoE click head. MMoE's value is therefore not a universal classification gain: it learns useful task-specific orderings while improving the final multi-objective ordering inside retrieved candidate sets. Its dedicated heads capture signal for click, like, long view, and profile entry, including targets with sparse positive feedback.

## Next steps

Next, I plan to compare causal target-aware sequence attention against this frozen DeepFM + MMoE baseline, tune the utility policy, benchmark ranker inference latency, and add diversity-aware reranking. The current results remain a single-seed offline warm-start evaluation rather than evidence of causal online lift, so later work will also use randomized exposure data and repeated runs to strengthen the conclusions.

<p><a class="btn btn--primary" href="/portfolio/kuaiflow/">Back to Stages 1 &amp; 2: Baselines and Retrieval</a></p>

<p><a class="btn btn--primary" href="https://github.com/shaotian-sun/kuaiflow-recsys"><i class="fab fa-fw fa-github" aria-hidden="true"></i> View project on GitHub</a></p>
