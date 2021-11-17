import os
import requests
import bibtexparser
from yaml import load, dump
try:
    from yaml import CLoader as Loader, CDumper as Dumper
except ImportError:
    from yaml import Loader, Dumper

url = "https://dblp.org/pers/tb2/z/Zhou:Minghui.bib"
bibstr = requests.get(url, allow_redirects=True).content.decode("utf-8")
bib_database = bibtexparser.loads(bibstr)

for entry in bib_database.entries:
    if entry["ENTRYTYPE"] != "article" and entry["ENTRYTYPE"] != "inproceedings":
        continue
    if int(entry["year"]) < 2010:
        continue 
    if "doi" not in entry:
        continue
    filename = "{}-{}".format(entry["year"], entry["doi"].replace("/", "-"))
    if os.path.exists(filename):
        print("Publication entry {} already exists. Skipping...".format(filename))
        continue
    with open("_publication/{}.md".format(filename), "w") as f:
        data = {
            "title": entry["title"].replace("\n", " ").replace("{", "").replace("}", ""),
            "year": entry["year"],
            "author": entry["author"].replace("\n", " "),
            "pages": entry["pages"],
            "doi": entry["doi"],
            "timestamp": entry["timestamp"]
        }
        if entry["ENTRYTYPE"] == "article":
            data["proceeding"] = "{} {}({})".format(
                entry["journal"].replace("\n", " "), entry["volume"], entry["number"]).replace("{", "").replace("}", "")
        else:
            data["proceeding"] = entry["booktitle"].replace("\n", " ").replace("{", "").replace("}", "")
        f.write("---\n")
        f.write(dump(data, Dumper=Dumper))
        f.write("---\n")
