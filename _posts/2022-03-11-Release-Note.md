---
 layout: post
 title: "Writing Release Notes for Your Software: How to Get it Right"
 date: 2022-03-10 08:00:07
 description: 'Release note is important. However, there is a lack of tutorials or widely acknowledged standards about how to produce a release note. Without "the right way," release notes may cause all kinds of issues. In this article, we will provide an FAQ-style introduction on how to produce the "right" release note for your users, based on [our recent research](https://hehao98.github.io/publication/2022-release-notes) on ~1000 real release note issues in GitHub project. This is still a preliminary draft, so if you have any suggestions or critiques, feel free to comment below!'
 #image: https://www.csrhymes.com//img/static-site-generator.jpg
 #hero_image: https://www.csrhymes.com//img/static-site-generator.jpg
 #hero_height: is-large
 author: Hao He
 published: true
 comment: true
---

Release note is important. However, there is a lack of tutorials or widely acknowledged standards about how to produce a release note. Without "the right way," release notes may cause all kinds of issues. In this article, we will provide an FAQ-style introduction on how to produce the "right" release note for your users, based on [our recent research](https://hehao98.github.io/publication/2022-release-notes) on ~1000 real release note issues in GitHub project. This is still a preliminary draft, so if you have any suggestions or critiques, feel free to comment below!

## Why Producing a Release Note?

In short, release notes **convey the impact of change** to your downstream users. In the GitHub context, most often, users are others that use your code, by importing through a package manager or downloading your tool/application, etc. Without a release note, the users will not know what to do with your new version. They typically have questions like: What is the advantage of the new version? Should any part of my code/configuration/workflow be adjusted? Such questions can be answered with a well-written release note. **As long as your software project has gained a non-trivial user base and is constantly evolving, you should consider starting to provide release notes for its new releases.**

## Why Should I Learn How to Produce Release Notes?

If your release note is confusing, not understandable, or has missed important information (e.g., breaking changes), **it will greatly frustrate your users when they update**. Some users may open issues to bother you (*which is what we have observed and systematically analyzed*), but most of them will probably not. Ultimately, such negative experience may cause them to switch to other alternatives and make your project fall behind competition. It will be better if you can obtain knowledge about others' lessons before you start to work on release notes.

## What Should I Include in Release Notes?

Theoretically, **all user-visible or user-affecting changes should be included**, such as:

1. Breaking / backward-Incompatible changes (to your APIs, command-lines, etc.). If you do not tell this, it immediately frustrate some users when they update)
2. New features
3. Fixed bugs
4. Non-functional enhancements (performance, memory, etc.)
5. Documentation changes
6. Dependency or environment changes (e.g., if you increase the maximum version of a dependency, this affects people using the old version!)
7. License changes (new license may opt out some of your users)
8. Security changes (e.g., relevant security vulnerabilities and CVEs)

We found in our analysis that **breaking changes are especially likely to be missing from release notes**. One reason for this is that it has the biggest impact (e.g., program crash) while hard to detect. Unfortunately, automated detection of breaking changes remains a formidable research challenge. Thus, we suggest manually and carefully inspect whether any change will be breaking many clients in a release. For large projects, it may be desirable to distribute such workload among all developers (e.g., by using the [Angular Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.4/) to label all breaking changes upon committing). Apart from breaking changes, **dependency, license, and security-related changes are also frequently missing.**

For each of the change, it will be very useful if you can **add some supplementary information**, including:

1. For each change, links to related pull requests, issues, and commits. Some may want to refer to them for more information.
2. For any backward incompatible change, guides for migration, mitigation, or additional setup required.
3. For any intriguing new features or migration guides, code examples to explain them.
4. Known issues, if there is any, to inform users of the bad and help users decide whether to update.
5. Attributions, to acknowledge the people who have contributed to the release!

## How Should I Organize Release Notes?

Although there are a lot of changes to describe, this does not necessarily mean that you should flood your users with overwhelming and hard-to-grasp information. In fact, release note organization is very important so that users can quickly find the information they want.

**One common anti-pattern in release note production is to simply aggregate and list all commit messages or issue titles between two versions.** At minimum, these commit messages / issues need to be properly organized into different categories for others' quick reference. It will be better if you can write some text to highlight the most important changes and intrigue your users. 

**If your project is huge, you may consider further organize changes by module**. This can be that each module have its own release notes, or each module having its own sections in a release note.

## Can I Automate the Process?

Of course you can. There are a bunch of well-developed tools for your use: [Semantic Release](https://github.com/semantic-release/semantic-release), [github-changelog-generator](https://github.com/github-changelog-generator/github-changelog-generator), [Release It](https://github.com/release-it/release-it), [Release Drafter](https://github.com/release-drafter/release-drafter). You can refer to their documentation on how to integrate it with your project. All these tools requires you to **adopt some way to systematically organize all changes**, by following a commit message template, adding labels to your issues and pull requests, etc. Therefore, it is important to have some well-defined process to manage changes first before using those tools to automate the release process!

Although automation seems appealing, we found that **users frequently complain about the uninformative release notes generated**, because the commit messages, issue titles or pull request titles are not crystal clear and user-friendly at the beginning. If you want to generate good release notes, perhaps you need to also pay special attention to the quality of your generation sources!

## How to Make Release Notes (More) Accessible to My Users?

Accessibility does not come free. We found that **users frequently complain about their difficulty in accessing release notes, such as broken links, no repository files, no notification, etc.** To avoid these issues, it is important to make some effort to publicize your release notes! 

It is advised to put release notes on:

1. GitHub Release Pages
2. Project Websites
3. In-App Notification, if you are developing an app
4. Community Channels (mailing list, slack, discord, etc.), if your software has a community
5. Git Repositories, if you want collaborative editing prior to release.

You need to pay attention to **links** between them. Links tend to deteriorate quickly and a broken link can be frustrating.

## Examplars

Many popular packages do an excellent job in producing release notes. Take a look at them and see how they follow the principles mentioned in our article! 

## Additional Information

This article is based on our recent research paper [Demystifying Software Release Note Issues on GitHub](https://hehao98.github.io/publication/2022-release-notes) published in [*2022 IEEE/ACM 30th International Conference on Program Comprehension (ICPC 2022)*](https://conf.researchr.org/home/icpc-2022). 

If you find this article helpful, please consider citing our paper:

```
@inproceedings{2022ICPC-ReleaseNote,
  author    = {Jianyu Wu and
               Hao He and
               Wenxin Xiao and
               Kai Gao and
               Minghui Zhou},
  title     = {Demystifying Software Release Note Issues on GitHub},
  booktitle = {Proceedings of the 30th IEEE/ACM International Conference on Program Comprehension, ICPC 2022, Pittsburgh, USA, May 16-17, 2022},
  pages     = {},
  publisher = {{ACM}},
  year      = {2022}
}
```
