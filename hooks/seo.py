from pathlib import Path
from urllib.parse import urljoin
import xml.etree.ElementTree as ET


NOINDEX_URLS = set()


def _is_noindex(page) -> bool:
    meta = getattr(page, "meta", {}) or {}
    robots = str(meta.get("robots", "")).lower()
    return "noindex" in robots


def _absolute_page_url(config, page) -> str:
    site_url = (config.get("site_url") or "").rstrip("/") + "/"
    return urljoin(site_url, page.url)


def on_page_context(context, page, config, nav):
    if _is_noindex(page):
        NOINDEX_URLS.add(_absolute_page_url(config, page))
    return context


def on_post_build(config):
    sitemap_path = Path(config["site_dir"]) / "sitemap.xml"
    if not sitemap_path.exists() or not NOINDEX_URLS:
        return

    ET.register_namespace("", "http://www.sitemaps.org/schemas/sitemap/0.9")
    tree = ET.parse(sitemap_path)
    root = tree.getroot()
    namespace = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}

    for url_node in list(root.findall("sm:url", namespace)):
        loc_node = url_node.find("sm:loc", namespace)
        if loc_node is not None and (loc_node.text or "").strip() in NOINDEX_URLS:
            root.remove(url_node)

    tree.write(sitemap_path, encoding="utf-8", xml_declaration=True)
