---
title: "KuaiFlow: Two-Tower Recommendation Retrieval"
date: 2026-08-14
excerpt: "A multi-stage recommendation system on KuaiRand, progressing from reproducible baselines to feature- and history-aware two-tower retrieval with FAISS.<br/><img src='/images/portfolio/kuaiflow/week2_workflow.png' alt='KuaiFlow Week 2 two-tower retrieval workflow'>"
collection: portfolio
header:
  teaser: portfolio/kuaiflow/week2_workflow.png
---

KuaiFlow is a multi-stage short-video recommendation project built on KuaiRand. After establishing strict chronological evaluation and classical baselines in Week 1, I built a learned candidate-retrieval system in Week 2: a feature- and history-aware two-tower model paired with exact and approximate nearest-neighbor search.

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

Week 3 will feed the retrieved candidates into multi-task ranking models. Later stages will add randomized-exposure bias analysis and diversity-aware reranking. The current results remain an offline warm-start evaluation on a 7,538-video catalog, so latency and ANN trade-offs will be reevaluated at larger scale.

<p><a class="btn btn--primary" href="https://github.com/shaotian-sun/kuaiflow-recsys"><i class="fab fa-fw fa-github" aria-hidden="true"></i> View project on GitHub</a></p>
