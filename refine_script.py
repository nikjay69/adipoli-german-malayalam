import os
import random
import re

dir_path = 'src' # Wait, the docs are in docs/scripts
# Is the code also in src? Let's check docs/scripts first.
dir_path = 'docs/scripts'
if not os.path.exists(dir_path):
    print("No docs/scripts directory")
    exit(0)

def refine_lingo(text):
    # Variety for positive reinforcement instead of just "adipoli"
    positive_cheers = ['*Set aanu!*', '*Mass!*', '*Kidu!*', '*Poli!*', '*Adipoli!*']
    
    # "All x? Adipoli!" -> "All x? Mass!"
    text = re.sub(r'(All \w+\?)\s*\**Adipoli!\**', r'\1 *Mass!*', text, flags=re.IGNORECASE)
    text = re.sub(r'(Got all \w+\?)\s*\**Adipoli!\**', r'\1 *Set aanu!*', text, flags=re.IGNORECASE)
    
    # "— adipoli!" -> "— set!" or "— poli!"
    def replace_dash_adipoli(match):
        return match.group(0).replace('adipoli', random.choice(['set aanu', 'poli', 'mass']))
    text = re.sub(r'—\s*adipoli\b', replace_dash_adipoli, text, flags=re.IGNORECASE)
    
    # Isolated cheering "Adipoli! If you got"
    text = re.sub(r'\**Adipoli!\**\s*(If you got)', r'*Poli!* \1', text, flags=re.IGNORECASE)
    
    # Replace Machane with Bro or Makkale depending on sentence start
    text = re.sub(r'^Machane,', 'Bro,', text, flags=re.MULTILINE|re.IGNORECASE)
    text = re.sub(r'Machane (Schreiben|Lesen|Hören)', r'Guys, \1', text, flags=re.IGNORECASE)

    # Some contexts could use 'scene'
    # "Adipoli" -> "Poli", "Set", etc. when randomly sprinkled
    def replace_random_adipoli(match):
        w = match.group(0)
        # Preserve brand name "Adipoli German"
        if "Adipoli German" in w:
            return w
        # Replace standalone *Adipoli!*
        if w.lower() == '*adipoli!*' or w.lower() == 'adipoli!':
            return random.choice(['*Set aanu!*', '*Mass!*', '*Poli!*', '*Scene illa!*'])
        return w

    text = re.sub(r'\**[A-Za-z]*Adipoli[A-Za-z]*!\**', replace_random_adipoli, text)

    return text

updated_files = 0
for root, _, files in os.walk(dir_path):
    for filename in files:
        if filename.endswith('.md'):
            filepath = os.path.join(root, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = refine_lingo(content)
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {filename}")
                updated_files += 1

print(f"Total files updated: {updated_files}")
