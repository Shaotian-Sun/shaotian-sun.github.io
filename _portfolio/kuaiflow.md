---
title: "KuaiFlow: Retrieval and Multi-Task Ranking"
date: 2026-09-07
excerpt: "An end-to-end offline recommendation pipeline on KuaiRand, combining two-tower retrieval with DeepFM and multi-task MMoE ranking.<br/><img src='/images/portfolio/kuaiflow/week3_workflow.png' alt='KuaiFlow Week 3 retrieval-to-ranking workflow'>"
collection: portfolio
header:
  teaser: portfolio/kuaiflow/week3_workflow.png
---

KuaiFlow is a multi-stage short-video recommendation project built on KuaiRand. The project now connects leakage-safe chronological data preparation, two-tower candidate retrieval, and trained ranking models in one measured offline pipeline. Week 3 adds single-task DeepFM and multi-task DeepFM + MMoE rankers that reorder the fixed top-100 candidates produced by the Week 2 FAISS retriever.

![KuaiFlow Week 3 retrieval-to-ranking workflow](/images/portfolio/kuaiflow/week3_workflow.png)

## Week 3: the first end-to-end ranking milestone

The Week 3 ranker uses only request-time-safe user, item, and content features. Candidate files are scored but never converted into training examples, and unexposed items are never mislabeled as negatives. Both models train on 1.14 million chronological impressions and are evaluated on 500,000 candidate rows for 5,000 users.

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

## Week 2: learned candidate retrieval

![KuaiFlow Week 2 two-tower retrieval workflow](/images/portfolio/kuaiflow/week2_workflow.png)

## From baselines to learned retrieval

Week 1 established a deterministic 5,000-user evaluation, removed training-seen positives, and restricted targets to warm-start items. ItemCF was the strongest baseline at `K = 20`, reaching 10.78% Recall, 27.78% HitRate, and 6.14% NDCG while recommending 3,431 unique videos.

Week 2 preserves that leakage-safe protocol while moving to 64-dimensional, L2-normalized embeddings:

- The **user tower** combines user ID, static user features, and the previous 20 clicked videos.
- The **item tower** uses video ID and metadata including author, content type, music, tags, duration, and dimensions.
- Training uses temperature-scaled dot products, in-batch softmax negatives, and duplicate-positive masking.
- Interaction history is strictly causal: targets and later events never enter a training example's history.
- Retrieval over-fetches before removing seen items, with a popularity fallback for users without learned query vectors.

## Two-tower ablation results

Four controlled variants use the same seed, embedding size, optimizer, schedule, and evaluation users. Static metadata delivers the largest individual gain, and combining it with causal history produces the best recommendation quality.

| Model | Recall@50 | Recall@100 | HitRate@100 | NDCG@100 | Coverage@100 |
|---|---:|---:|---:|---:|---:|
| ID-only | 4.09% | 7.34% | 19.48% | 2.30% | 99.99% |
| History only | 4.62% | 8.30% | 21.48% | 2.58% | 98.97% |
| Feature only | 5.47% | 9.43% | 23.78% | 3.03% | **100.00%** |
| **Feature + history** | **5.97%** | **10.13%** | **25.08%** | **3.23%** | 99.16% |

![Two-tower ablation results](/images/portfolio/kuaiflow/two_tower_ablation.png)

The combined model improves Recall@50 by **46.0%**, Recall@100 by **38.1%**, and HitRate@100 by **28.7%** relative to ID-only retrieval. It retains broad catalog reach, covering 99.16% of the training catalog at `K = 100`.

## Exact search versus FAISS

All retrieval backends reuse the same feature-and-history embeddings and over-fetch 269 candidates for a requested `K = 100`. Latency was measured on one CPU thread using a warmup followed by five measured runs.

![Exact versus FAISS retrieval latency](/images/portfolio/kuaiflow/faiss_latency.png)

| Backend | Search median (ms/user) | End-to-end median | Recall@100 | NDCG@100 |
|---|---:|---:|---:|---:|
| Exact NumPy | 0.0886 | 0.2408 | 10.13% | 3.23% |
| FAISS Flat | 0.1041 | 0.2538 | 10.13% | 3.23% |
| FAISS IVF-50/5 | 0.0313 | 0.1846 | 10.50% | 3.33% |
| **FAISS IVF-100/10** | **0.0317** | **0.1866** | **10.10%** | **3.24%** |
| FAISS IVF-200/20 | 0.0337 | 0.1886 | 10.33% | 3.28% |
| FAISS HNSW-16 | 0.0275 | 0.1819 | 10.21% | 3.24% |
| FAISS HNSW-32 | 0.0431 | 0.1985 | 10.38% | 3.30% |

Approximate search reduces candidate-search latency substantially, although embedding generation limits the end-to-end gain. IVF-100/10 makes search about **2.8× faster** and the full retrieval path about **1.3× faster** than exact NumPy search.

## Approximation fidelity matters

Similar downstream click metrics do not guarantee that an ANN index returns the true nearest neighbors. I therefore measured candidate recall and rank agreement directly against exact NumPy retrieval for 4,848 users with learned query vectors, plus final-list overlap across all 5,000 evaluation users.

![FAISS approximation fidelity](/images/portfolio/kuaiflow/ann_fidelity.png)

FAISS Flat reproduces the exact candidate set. HNSW-16 has the fastest median search, but recovers only **63.77%** of exact top-100 candidates—an important fidelity loss that is hidden by its downstream Recall and NDCG. IVF-100/10 recovers **86.49%** of exact candidates and retains **92.37%** rank-weighted candidate quality.

![FAISS speed and fidelity trade-off](/images/portfolio/kuaiflow/faiss_tradeoff.png)

## Selected operating point

**FAISS IVF with 100 lists and 10 probes is the selected Week 2 configuration.** It is the clearest stable latency–fidelity knee in the tested matrix: 0.0317 ms/user median search, 86.49% exact-candidate recovery, and no IVF training warning. HNSW-16 saves only 0.0042 ms/user while losing more than 22 percentage points of candidate recall; IVF-200/20 improves fidelity but is slower and has too few training vectors for its 200 centroids under FAISS guidance.

## Next steps

Next, I plan to compare causal target-aware sequence attention against this frozen DeepFM + MMoE baseline, tune the utility policy, benchmark ranker inference latency, and add diversity-aware reranking. The current results remain a single-seed offline warm-start evaluation rather than evidence of causal online lift, so later work will also use randomized exposure data and repeated runs to strengthen the conclusions.

<p><a class="btn btn--primary" href="https://github.com/shaotian-sun/kuaiflow-recsys"><i class="fab fa-fw fa-github" aria-hidden="true"></i> View project on GitHub</a></p>
