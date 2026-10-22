# Optional: bundles everything into ONE html file (images embedded) -> preview.html
import re, base64
h = open('index.html').read()
h = h.replace('<link rel="stylesheet" href="css/style.css">', '<style>' + open('css/style.css').read() + '</style>')
js = open('js/main.js').read()
h = h.replace('<script src="js/main.js"></script>', '<script>' + js + '</script>')
def emb(m):
    return 'data:image/jpeg;base64,' + base64.b64encode(open(m.group(1), 'rb').read()).decode()
h = re.sub(r'(assets/[\w-]+\.jpg)', emb, h)
open('preview.html', 'w').write(h)
