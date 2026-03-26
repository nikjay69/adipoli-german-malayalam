import os
import re

dir_path = 'docs/scripts'
target_template = 'docs/VIDEO_SCRIPT_TEMPLATE.md'

files_to_process = []
if os.path.exists(dir_path):
    for root, _, files in os.walk(dir_path):
        for filename in files:
            if filename.endswith('.md'):
                files_to_process.append(os.path.join(root, filename))

if os.path.exists(target_template):
    files_to_process.append(target_template)

def apply_natural_lingo(text):
    original = text
    
    # 1. Negative consequences: "serious aanu" -> "scene aanu" (trouble)
    text = re.sub(r'Allenkil serious aanu!', r'Allenkil scene aanu!', text)
    text = re.sub(r'valiya prashnam aanu', r'valiya scene aanu', text)

    # 2. Achievement/Completing tasks: "Adipoli" -> "Set", "Set aanu"
    text = re.sub(r'(Got all \w+\?)\s*\**Adipoli!\**', r'\1 *Set aanu!*', text, flags=re.IGNORECASE)
    text = re.sub(r'(All \w+\?)\s*\**Adipoli!\**', r'\1 *Mass!*', text, flags=re.IGNORECASE)
    text = re.sub(r'(If you got \d+ or \d+ right) — adipoli!', r'\1 — set aanu!', text, flags=re.IGNORECASE)
    text = re.sub(r'\**Adipoli!\**\s*(If you got mostly)', r'*Poli!* \1', text, flags=re.IGNORECASE)
    
    # 3. Overused "Machane" as a generic "Bro" in starting sentences. "Machane" is okay but when used to address audience, young people might say "Eda", "Bro", "Guys"
    text = re.sub(r'^Machane,\s*(Schreiben|Lesen|Hören)', r'Guys, \1', text, flags=re.MULTILINE|re.IGNORECASE)
    text = re.sub(r'^Machane, it\'s simple:', r'Bro, it\'s simple:', text, flags=re.MULTILINE|re.IGNORECASE)
    
    # 4. Toning down isolated enthusiastic "Adipoli!" when a simple "Poli" or "Kidu" works better
    text = re.sub(r'\*Adipoli!\* (Ippol nee German)', r'*Poli!* \1', text, flags=re.IGNORECASE)
    text = re.sub(r'\*Adipoli! Ippol nee German(\w)\*', r'*Poli! Ippol nee German\1*', text, flags=re.IGNORECASE)
    
    # 5. Fix "Adipoli! If you got" generally
    text = re.sub(r'\**Adipoli!\**\s*(If you got [0-9]+ right)', r'*Set aanu!* \1', text, flags=re.IGNORECASE)

    # 6. Change "*Bürgeramt conquered! Adipoli!*" to "Bürgeramt conquered! Mass!"
    text = re.sub(r'conquered!\s+Adipoli!', r'conquered! Mass!', text, flags=re.IGNORECASE)
    
    # 7. Ensure no "adipoli!" is right next to a sentence casually.
    text = re.sub(r'(\w+ in German!)\s*Adipoli!', r'\1 Poli!', text, flags=re.IGNORECASE)

    return original != text, text

updated_count = 0
for filepath in files_to_process:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    changed, new_content = apply_natural_lingo(content)
    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        updated_count += 1
        print(f"Updated {filepath}")

print(f"Total files updated: {updated_count}")
