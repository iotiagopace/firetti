#!/usr/bin/env python3
"""
BIOPHARCOS - coletor para arquivamento autorizado.

Executa a coleta diretamente da origem pública e salva HTML, texto visível e mídias
encontradas dentro de https://www.maxup.com.br/bst/

Dependências:
  pip install requests beautifulsoup4

Uso:
  python baixar_originais.py
"""
from pathlib import Path
from urllib.parse import urljoin, urlparse, urldefrag
import requests, re, csv, os
from bs4 import BeautifulSoup

START = "https://www.maxup.com.br/bst/"
HOST = "www.maxup.com.br"
PREFIX = "/bst/"
OUT = Path("BIOPHARCOS_ORIGINAIS")
S = requests.Session()
S.headers.update({"User-Agent":"Mozilla/5.0"})

MEDIA_EXTS = {
".jpg",".jpeg",".png",".webp",".gif",".svg",".avif",
".mp4",".webm",".mov",".m4v",
".pdf",".zip",".doc",".docx",".xls",".xlsx",".ppt",".pptx"
}

def clean(u):
    if not u or u.startswith("data:"): return None
    return urldefrag(u.strip().strip("'\""))[0]

def internal_page(u):
    p=urlparse(u)
    return p.hostname in {"www.maxup.com.br","maxup.com.br"} and p.path.startswith(PREFIX)

def filename(u):
    name=os.path.basename(urlparse(u).path) or "arquivo"
    return re.sub(r'[^\w.\-() ]+','_',name)

def main():
    for d in ["html","texto","imagens","videos","documentos"]:
        (OUT/d).mkdir(parents=True,exist_ok=True)

    q=[START]; visited=set(); assets=set(); rows=[]
    while q:
        u=q.pop(0)
        if u in visited: continue
        visited.add(u)
        try:
            r=S.get(u,timeout=30); r.raise_for_status()
        except Exception as e:
            rows.append([u,"ERRO",str(e)]); continue
        if "text/html" not in r.headers.get("content-type",""):
            assets.add(u); continue
        soup=BeautifulSoup(r.text,"html.parser")
        slug=urlparse(u).path.strip("/").replace("/","__") or "inicio"
        if slug=="bst": slug="inicio"
        (OUT/"html"/f"{slug}.html").write_text(r.text,encoding="utf-8")
        (OUT/"texto"/f"{slug}.txt").write_text(soup.get_text("\n",strip=True),encoding="utf-8")
        rows.append([u,"OK",soup.title.get_text(" ",strip=True) if soup.title else ""])

        for tag,attr in [("img","src"),("img","data-src"),("source","src"),("video","src")]:
            for el in soup.find_all(tag):
                val=el.get(attr)
                if val: assets.add(clean(urljoin(u,val)))
        for el in soup.find_all(["img","source"]):
            for attr in ("srcset","data-srcset"):
                val=el.get(attr)
                if val:
                    for part in val.split(","):
                        assets.add(clean(urljoin(u,part.strip().split(" ")[0])))
        for a in soup.find_all("a",href=True):
            x=clean(urljoin(u,a["href"]))
            if not x: continue
            ext=Path(urlparse(x).path).suffix.lower()
            if ext in MEDIA_EXTS: assets.add(x)
            elif internal_page(x) and x not in visited and x not in q: q.append(x)

    assets={a for a in assets if a}
    dl=[]
    for u in sorted(assets):
        ext=Path(urlparse(u).path).suffix.lower()
        if ext in {".jpg",".jpeg",".png",".webp",".gif",".svg",".avif"}:
            folder=OUT/"imagens"
        elif ext in {".mp4",".webm",".mov",".m4v"}:
            folder=OUT/"videos"
        elif ext in MEDIA_EXTS:
            folder=OUT/"documentos"
        else:
            continue
        dest=folder/filename(u)
        try:
            rr=S.get(u,timeout=60); rr.raise_for_status()
            dest.write_bytes(rr.content)
            dl.append([u,str(dest),"OK",len(rr.content)])
        except Exception as e:
            dl.append([u,"","ERRO: "+str(e),""])

    with open(OUT/"paginas.csv","w",newline="",encoding="utf-8-sig") as f:
        w=csv.writer(f); w.writerow(["url","status","titulo"]); w.writerows(rows)
    with open(OUT/"downloads.csv","w",newline="",encoding="utf-8-sig") as f:
        w=csv.writer(f); w.writerow(["url","arquivo","status","bytes"]); w.writerows(dl)
    print("Concluído:", OUT.resolve())

if __name__=="__main__":
    main()
