---
 layout: project
 title: "LicenseRec"
 date: 2022-07-30 08:00:07
 description: 'LicenseRec is an open source license recommendation tool that helps developers choose a optimal license for their OSS project.'
 github: https://github.com/osslab-pku/RecLicense
 author: Weiwei Xu
 published: true
 comments: true
---
LicenseRec is an open source license recommendation tool that helps developers choose a optimal license for their OSS project.

# LicenseRec

![avatar](https://github.com/osslab-pku/RecLicense/raw/master/frontend/src/assets/tool.png)

The tool is available at [licenserec.com](https://licenserec.com/).

Upload your project and pick the best open source license on [licenserec.com](https://licenserec.com/)!

## Introduction

LicenseRec is an open source license recommendation tool that helps developers choose a optimal license for their OSS project.
LicenseRec performs fine-grained license compatibility checks on OSS projects’ code and dependencies, and assists developers to choose the optimal license through an interactive wizard with guidelines of three aspects: personal open source style, business pattern, and community development.

## Installation

LicenseRec can be installed in two ways: using Docker or manually.

## License and Acknowledgements

LicenseRec is licensed under [Mulan PSL v2](http://license.coscl.org.cn/MulanPubL-2.0/). See [LICENSE](LICENSE) for details.

LicenseRec relies on the following open source projects:

* [scancode-tookit](https://github.com/nexB/scancode-toolkit) is licensed under [Apache-2.0](https://opensource.org/licenses/Apache-2.0).(We added and modified some detection rules.)
* [depends](https://github.com/multilang-depends/depends) is licensed under [MIT](https://opensource.org/licenses/MIT).
