import re

with open('services.html', 'r', encoding='utf-8') as f:
    services = f.read()

# Extract CSS
css_match = re.search(r'(/\* -------------------------------------------------------\s*NAV - UNDERLINE REMOVED COMPLETELY\s*------------------------------------------------------- \*/.*?\.nav-ovl\.open\s*\{\s*opacity:\s*1;\s*pointer-events:\s*auto;\s*\})', services, re.DOTALL)
if not css_match:
    print('CSS not found in services.html')
    exit(1)
services_css = css_match.group(1)

# Extract HTML
html_match = re.search(r'(<nav id="nav">.*?</nav>\s*<div class="nav-ovl" id="navOvl"></div>\s*<div class="nav-drawer" id="navDrw">.*?</div>)', services, re.DOTALL)
if not html_match:
    print('HTML not found in services.html')
    exit(1)
services_html = html_match.group(1)

for file in ['privacy.html', 'terms.html']:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace CSS
    content = re.sub(r'/\* -------------------------------------------------------\s*NAV\s*------------------------------------------------------- \*/.*?\.nav-ovl\.open\s*\{\s*opacity:\s*1;\s*pointer-events:\s*auto;\s*\}', services_css, content, flags=re.DOTALL)
    
    # Replace HTML (may have comments or not)
    content = re.sub(r'<nav id="nav">.*?</nav>\s*(?:<!--.*?-->\s*)?<div class="nav-ovl" id="navOvl"></div>\s*(?:<!--.*?-->\s*)?<div class="nav-drawer" id="navDrw">.*?</div>', services_html, content, flags=re.DOTALL)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print('Success')
