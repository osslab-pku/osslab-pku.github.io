---
title: Our research on Open Source License
subtitle:
layout: page-2col
permalink: /license/
show_sidebar: false
hero_height: 4
toc: true
---

## 简介

本团队(北京大学开源软件数据分析实验室)在开源许可证方面做了大量研究工作。

周明辉教授主持制定了首个中英双语开源许可证“木兰宽松许可证”并获得OSI (Open Source Initiative，开放源代码促进会) 认证，被70余万个开源代码仓采用 (据Gitee统计)；主持制定的木兰公共许可证(MulanPubL)被蚂蚁金服的OceanBase等采用；主持制定了国家标准《开源许可证框架》 (20213301-T-469)。

以此为基础，团队建立了开源许可证常见问答库、开源许可证兼容性知识库，并研发了开源许可证推荐工具，和冲突检测&消解工具。

一并在此开放共享，以期有益公众。

## 开源许可证常见问答
[开源许可证介绍、分类、常见问题解答](https://github.com/osslab-pku/OpenSourceLicense-FQA/blob/master/open-source-license-fqa.md)

## 木兰许可证相关日志
[木兰宽松许可证（MulanPSL） 和 木兰公共许可证（MulanPubL） 的日志](https://github.com/osslab-pku/mulanlicense-log)，记录其所有相关信息。 包括许可证的文本，如何使用许可证，许可证的常见问题，以及采用许可证的开源项目列表等。

## 开源许可证兼容性知识库

[开源许可证知识库](https://github.com/osslab-pku/RecLicense/tree/master/knowledge_base)包含了开源许可证兼容性矩阵、条款特征矩阵、兼容性判定方法等资料。

包括为机器阅读而建立的文件，以及为人类理解而建立的文件（具有更多的解释）。

## 开源许可证推荐工具

[LicenseRec](https://github.com/osslab-pku/RecLicense)是一个开源许可证推荐工具（是本团队开发的许可证选择工具[OSSLSelection](https://github.com/osslab-pku/OSSLSelection)的升级版），帮助开发者为他们的开源软件项目选择一个最佳许可证。 

LicenseRec对开源软件项目的代码和依赖关系进行细粒度的许可证兼容性检查，并通过一个交互式的向导来帮助开发者选择最佳的许可证，该向导有三个方面的指引：个人开放源码风格、商业模式和社区发展。

该工具可在[licenserec.com](https://licenserec.com/)使用，演示视频在[video.licenserec.com](https://video.licenserec.com/)。该工具已发表在ICSE'23的DEMO Track上，论文参见：[LicenseRec: Knowledge based Open Source License Recommendation for OSS Projects](https://ieeexplore.ieee.org/abstract/document/10172799).

## 开源许可证冲突消解工具
合规性分析与不兼容消解工具可在[https://licenserec.com/#/compliance](https://licenserec.com/#/compliance)使用。

## 论文
当您使用相应成果时，建议引用以下论文。
##### 开源许可证知识库与推荐工具：
1. 吴欣, 武健宇, 周明辉, 王志强, & 杨丽蕴. (2021). 开源许可证的选择: 挑战和影响因素. 软件学报, 33(1), 1-25.
2. W. Xu, X. Wu, R. He and M. Zhou, "LicenseRec: Knowledge based Open Source License Recommendation for OSS Projects," 2023 IEEE/ACM 45th International Conference on Software Engineering: Companion Proceedings (ICSE-Companion), Melbourne, Australia, 2023, pp. 180-183, doi: 10.1109/ICSE-Companion58688.2023.00050.

##### 开源许可证冲突消解工具：

3. W. Xu, H. He, K. Gao, and M. Zhou, "Understanding and Remediating Open-Source License Incompatibilities in the PyPI Ecosystem," in 38th IEEE/ACM International Conference on Automated Software Engineering, ASE 2023, Luxembourg, September 11-15, 2023.

