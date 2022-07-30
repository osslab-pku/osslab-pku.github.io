---
 layout: project
 title: "LicenseRec"
 date: 2022-07-30 08:00:07
 description: 'Licenserec is a ruby library for open source license selection, which provides functions such as license compatibility query, license compatibility check, project compatibility license screening, license term feature query, license term feature comparison, license type selection view, and interpretation of key license terms.'
 author: Weiwei Xu
 published: true
 comments: true
---
Licenserec is a ruby library for open source license selection, which provides functions such as license compatibility query, license compatibility check, project compatibility license screening, license term feature query, license term feature comparison, and interpretation of key license terms.

# Licenserec
[![Gem](https://img.shields.io/gem/v/licenserec)](https://rubygems.org/gems/licenserec)

[Licenserec](https://rubygems.org/gems/licenserec)是一个用于开源许可证选择的ruby库，提供许可证兼容性查询、许可证兼容性检查、项目兼容许可证筛选、许可证条款特征查询、许可证条款特征对比、许可证类型选择观点、许可证关键条款解读等功能。

NOTE: 本工具基于osslab-pku提供的开源许可证知识库，其提供的信息不代表律师的法律建议，若有需要请咨询专业律师。

## Installation

Install the gem and add to the application's Gemfile by executing:

    $ bundle add licenserec

If bundler is not being used to manage dependencies, install the gem by executing:

    $ gem install licenserec

## Usage
### 运行环境
Ruby2.4.5   
Perl5   
第三方工具Ninka部署：   
下载许可证识别工具[Ninka](https://github.com/osslab-pku/OSSLSelection/tree/main/OSSLSelection/ninka-tool)
并解压，将ninka-master\lib中的文件复制到C:\Strawberry\perl\lib，将ninka-master\bin中的文件复制到C:\Strawberry\perl\bin，ninka-master\comments文件夹复制到制到C:\Strawberry\perl\，cd到comments\，执行nmake；   
测试：cd到perl\bin\，执行perl ninka [filename]，查看是否filename的许可信息。

### 开源许可证范围
本工具的知识库支持63种常见开源许可证，使用SPDX短标识符表示：0BSD, AAL, AFL-3.0, AGPL-3.0, AGPL-3.0+, Apache-2.0, Artistic-2.0, BSD-1-Clause, BSD-2-Clause, BSD-2-Clause-Patent, BSD-3-Clause, BSD-3-Clause-Clear, BSD-4-Clause, BSL-1.0, CC0-1.0, CC-BY-4.0, CC-BY-SA-4.0, CDDL-1.0, CECILL-2.1, ClArtistic, CPAL-1.0, ECL-2.0, EFL-2.0, EPL-1.0, EPL-2.0, EUPL-1.1, EUPL-1.2, Fair, FSFAP, GPL-2.0, GPL-2.0+, GPL-3.0, GPL-3.0+, Imlib2, ISC, LGPL-2.1, LGPL-2.1+, LGPL-3.0, LGPL-3.0+, LiLiQ-P-1.1, LiLiQ-R-1.1, LiLiQ-Rplus-1.1, MirOS, MIT, MIT-0, MPL-2.0, MS-PL, MS-RL, MulanPSL-2.0, MulanPubL-2.0, NCSA, NOSL, NPOSL-3.0, NTP, OGTSL, OSL-3.0, RPL-1.5, Ruby, SimPL-2.0, UPL-1.0, Unlicense, WTFPL, Zlib
。  
其中广泛流行的许可证有20种：MIT, Apache-2.0, GPL-3.0, BSD-3-Clause, GPL-2.0, AGPL-3.0, MPL-2.0, LGPL-3.0, BSD-2-Clause, Unlicense, ISC, EPL-1.0, CC0-1.0, LGPL-2.1, WTFPL, Zlib, EPL-2.0, Artistic-2.0, MulanPSL-2.0, MulanPubL-2.0。  

### 开源许可证兼容性知识库
开源许可证兼容性是指将不同开源许可证下的作品（无论是否经过修改）进行组合（包括但不限于通过接口文件等方式进行链接）后合法地形成衍生作品，并合法地进行再分发的可行性。需要注意的是，通常说的许可证兼容是有方向的，许可证A授权的作品与许可证B授权的作品组合后，所产生的衍生作品可以使用许可证B进行分发，则认为A可以兼容B——但反之不一定成立。

当组合不同开源许可证授权的作品或变更某一开源项目许可证时，需要对开源许可证的兼容性进行判定：任何集成或衍生项目的许可证满足所复用的开源组件许可证或原项目许可证的要求。    
常见的兼容性场景有：
- 一是次级兼容，开源许可证A授权的作品（无论是否经过修改）与开源许可证B授权的作品组合，所产生的衍生作品整体可合法地使用开源许可证B重新授权时，则认为开源许可证A次级兼容开源许可证B。本知识库中使用‘1’表示次级兼容。   
- 二是组合兼容，开源许可证A授权的作品（无论是否经过修改）可以与开源许可证B授权的作品可以合法地组合而不违反任一开源许可证时，可以认为开源许可证A组合兼容开源许可证B。本知识库中使用‘2’表示组合兼容。
- 不满足次级兼容或组合兼容的条件时，则为不兼容。

### 开源许可证条款要素知识库
开源许可证的条款特征包括19个要素维度，具体要素名称及含义如下：  
- 基本信息(info)，是指许可证名称及版本号、发布日期、许可证版权声明及许可证原文链接地址等信息。‘1’表示明确包含该条款，‘0’表示未提及。   
- 序言(preamble)，对许可证的适用场景或适用条件、条款接受说明、以及目的宗旨等进行说明，如GPL序言。‘1’表示明确包含该条款，‘0’表示未提及。    
- 定义(define)，对许可证条款中的特定术语进行说明，便于用户理解许可证内容。‘1’表示明确包含该条款，‘0’表示未提及。    
- 版权许可(copyright)，对许可证授予的版权范围进行说明。‘-1’表示放弃版权投入公共领域，‘1’表示明确授予版权，‘0’表示模糊授予版权。。   
- 专利许可(patent)，对许可证授予的专利权范围进行说明。‘-1’表示不授予专利权，‘1’表示明确授予专利权，‘0’表示未提及。    
- 商标权说明(trademark)，对许可证不授予商标权进行说明。‘1’表示明确不授予商标权，‘0’表示未提及。   
- 分发限制性(copyleft)，一种授权条件，即衍生作品分发的再授权方式，其中“无限制”表示衍生作品可以使用其他许可证授权分发；“文件级弱限制”表示衍生作品可以使用其他许可证授权分发，只要确保衍生作品中该文件级弱限制许可证授权的文件及其修改仍然遵循该许可证，如MPL-2.0；“库级弱限制”表示衍生作品可以使用其他许可证授权分发，只要确保衍生作品中该库级弱限制许可证授权的库及其修改仍然遵循该许可证，如LGPL-2.1；“强限制”表示衍生作品的整体及其部分都必须按照该许可证授权分发。‘0’表示无限制，‘1’表示文件级弱限制，‘2’表示库级弱限制，‘3’表示强限制。   
- 网络部署(interaction)，一种授权条件，是指使用原创作品或衍生作品，通过网络向用户提供服务等行为，须按照该许可证公开源码的要求。‘1’表示明确包含该条款，‘0’表示未提及。   
- 修改声明(modification)，一种授权条件，是指分发衍生作品，须添加修改声明（如修改者、修改时间、修改内容等）的要求。‘1’表示明确包含该条款，‘0’表示未提及。   
- 保留归属(retain_attr)，一种授权条件，是指原创作品或衍生作品的分发，须保留原归属信息（如版权声明等）的要求。‘1’表示明确包含该条款，‘0’表示未提及。   
- 增强归属(enhance_attr)，一种授权条件，是指原创作品或衍生作品的分发，除了要求保留归属外，还须以某种特定的形式声明软件的版权信息和作者的要求。‘1’表示明确包含该条款，‘0’表示未提及。   
- 明确接受许可(acceptance)，一种授权条件，是指原创作品或衍生作品的分发，必须做出合理的努力，以获得接收人对该许可证条款的明确同意的要求。‘1’表示明确包含该条款，‘0’表示未提及。   
- 专利诉讼终止(patent_term)，是指禁止任何人对该许可证授权的作品发起专利诉讼（否则终止其在该作品或该许可证下的专利授权）的要求。‘1’表示明确包含该条款，‘0’表示未提及。   
- 违约终止(vio_term)，是指许可证中可能包含的因违约而终止授权的条件或补救条件。‘1’表示明确包含该条款，‘0’表示未提及。   
- 免责声明(disclaimer)，对不提供担保进行澄清声明。‘1’表示明确包含该条款，‘0’表示未提及。   
- 准据法(law)，对许可证对应的准据法进行说明，用于处理许可证的解释和争议问题。‘1’表示明确包含该条款，‘0’表示未提及。   
- 使用说明(instruction)，提供许可证应用模板及明确模板放置位置。‘1’表示包含使用说明，‘0’表示未提及。   
- 兼容版本(compatible_version)，是对于后续可能发布的更多版本的兼容性进行说明，以便用户可以在后续版本下分发许可作品和衍生作品。逗号分隔的许可证SPDX字符串。    
- 兼容次级许可证(secondary_license)，是对于现有的其他开源许可证的兼容性进行说明，以便用户可以在次级许可证下分发许可作品和衍生作品。逗号分隔的许可证SPDX字符串。    
- gpl组合兼容(gpl_combine)：是GPL类许可证中关于能否与其他GPL许可证组合的说明。逗号分隔的许可证SPDX字符串。     

### 方法&描述


| 序号 | 类 | 方法 | 描述 |
| ------ | ------ | ------ | ------ |
| 1 | CompatibilityFilter | ninka_process(filepath,ninka_path) | 第三方工具Ninka识别文件许可证，一个文件可能包含多个许可证。输入1为文件的路径(String)，输入2为ninka.pl的路径(String)；输出为许可证列表(Array)。 |  
| 2 |   | license_detection(repo_path,ninka_path) | 识别项目所包含的许可证，输入1为项目路径(String)，输入2为ninka.pl的路径(String)；输出1为文件路径及对应许可证信息的哈希表(Hash)，输出2为项目包含的许可证集合(Set)。  |  
| 3 |   | compatibility_lookup(licenseA,licenseB) | 兼容性查询，输入1为许可证A(String)，通常指项目中第三方组件的许可证，输入2为许可证B(String)，通常指项目许可证；输出为(String)，其中"0"(不兼容)、"1"(次级兼容)、"2"(组合兼容)、"1,2"(次级兼容或组合兼容)。 |   
| 4 |   | compatibility_filter(repo_path,ninka_path,recommand_scale) | 兼容许可证筛选，输入1为项目路径(String)，输入2为ninka.pl的路径(String)，输入3为许可证推荐范围(String)，其中“popular”包含MIT等20种常见开源许可证，“all”包含本知识库支持的6种开源许可证；输出1为仅满足次级兼容的许可证列表(Array)，输出2为仅满足组合兼容的许可证列表(Array)，输出3为既满足次级兼容又满足组合兼容的许可证列表(Array),输出4为项目中已检查过兼容性的许可证列表。 |   
| 5 | CompatibilityCheck | compatibilitycheck(repo_path,ninka_path) | 兼容性检查，输入1为项目路径(String)，输入2为ninka.pl路径(String)；输出1为“OK”(String)或项目种包含互不兼容许可证的提示信息的集合(Set),输出2为空(nil)或冲突对应文件路径的列表(Array)。 |
| 6 | Termschoice | important_terms_instruction() | 开源许可证关键条款及说明。 |
| 7 |   | license_term_lookup(one_license,one_term) | 查询某个开源许可证的某个条款要素的值。输入1为许可证的SPDX(String)，输入2为条款要素名称(String)；输出为要素值(String)，其中--。 |
| 8 |   | license_term_choice(one_term,recommended_licenses,term_option) | 根据条款要素值，从推荐许可证列表中，筛选符合要求的许可证，输出更新的推荐许可证列表。输入1为条款要素名称(String)，输入2为推荐许可证列表(Array)，输入3为条款要素值(String)；输出为recommand_license中符合该要素条件的许可证列表(Array)。 |
| 9 | LicensetypeGuide | os_style_guide() | 个人开源风格方面，选择开源许可证类型的观点(Hash)。 |
| 10 |   | os_business_guide() | 开源商业模式方面，选择开源许可证类型的观点(Hash)。 |
| 11 |   | os_community_guide() | 项目社区发展方面，选择开源许可证类型的观点(Hash)。 |
| 12 |   | business_model_feature() | 常见的开源商业模式及特点(Hash)。 |
| 13 | TermsCompare | licenses_term_compare(licenses_list) | 输入为许可证列表，输出列表中的许可证的条款要素值(Hash)，key为许可证SPDX(String)，value为要素值列表(Array)。 |
| 14 | LicenseSort | csv_to_hash(csv_table,header=true,i=0,j=1) | 将csv转为哈希值。输入1为csv表，输入2为是否包含首行(默认包含)，输入3为列数i(转为hash的key)，输入4为列数j(转为hash的value)；输出为哈希表。 |
| 15 |   | sortvalue_lookup(one_license,sort_hash) | 从排序哈希表中查询排序值。输入1为许可证SPDX,输入2为参照排序哈希表；输出为该许可证的排序值。 |
| 16 |   | license_sort(license_list,desc=true,sort_hash=LicenseSort.csv_to_hash(String(Pathname.new(File.dirname(__FILE__)).realpath)+"\\license_readability.csv",header=true,i=0,j=4)) | 对指定许可证列表进行排序。输入1为指定的许可证列表，输入2为升降序(默认降序)，输入3为参照排序哈希表(key为许可证SPDX,value为参照值，默认按文本复杂度)；输出排序后的许可证列表。 |



## Contributing

Bug reports and pull requests are welcome  at [https://github.com/osslab-pku/licenserec](https://github.com/osslab-pku/licenserec) or [https://www.gitlink.org.cn/zhcxww/licenserec](https://www.gitlink.org.cn/zhcxww/licenserec).
