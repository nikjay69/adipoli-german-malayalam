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

# Keep a counter to cycle through natural exclamations
exclamations = ['*Poli!*', '*Mass!*', '*Set aanu!*', '*Kidu!*']
excl_idx = 0

def apply_second_pass(text):
    global excl_idx
    original = text
    
    # We want to replace instances of "Adipoli!" or "*Adipoli!*" but NOT "Adipoli German"
    # Find all occurrences of Adipoli that are NOT followed by "German"
    
    def replacer(match):
        global excl_idx
        word = match.group(0)
        # Check if it's part of the brand name
        if 'german' in word.lower():
            return word
        
        # Replace the exclamation
        replacement = exclamations[excl_idx % len(exclamations)]
        excl_idx += 1
        return replacement + match.group(2) # preserve whatever punctuation or ending comes after
        
    # Regex breakdown:
    # 1. Matches optional asterisk, "Adipoli", optional punctuation, optional asterisk
    # 2. Negative lookahead to ensure it's not followed by " German"
    
    # We are matching "*Adipoli!*" or "Adipoli!" or "*Adipoli*"
    # Group 1 is the main word part we replace, Group 2 is the trailing space/punctuation if we didn't eat it
    
    # Let's use simple replace since Python's re.sub with function is easier.
    def simple_replacer(match):
        global excl_idx
        # If it's Adipoli German, return as is
        
        rep = exclamations[excl_idx % len(exclamations)]
        excl_idx += 1
        
        # Check if there were literal asterisks in the match
        has_asterisk = '*' in match.group(0)
        
        if has_asterisk:
            return rep
        else:
            return rep.replace('*', '') # return without asterisks if original didn't have them
            
    text = re.sub(r'\**Adipoli\**[!\.\*]*\s*(?!German)', simple_replacer, text, flags=re.IGNORECASE)

    # Let's fix cases where maybe the replacer messed up spacing:
    # A lot of times it was "Adipoli! Ippol..." -> "Poli!Ippol..." We need to preserve spacing.
    
    return original != text, text

# Better approach for spacing:
def safe_replace(text):
    global excl_idx
    original = text
    
    # Find all Adipoli (with optional *, !, .) NOT followed by German
    pattern = re.compile(r'(\**Adipoli[!\.\*]*\**)(?!\s*German)', re.IGNORECASE)
    
    def match_replacer(match):
        global excl_idx
        original_match = match.group(1)
        rep = exclamations[excl_idx % len(exclamations)]
        excl_idx += 1
        
        if '*' not in original_match:
            rep = rep.replace('*', '')
            
        return rep

    text = pattern.sub(match_replacer, text)
    return original != text, text

updated_count = 0
for filepath in files_to_process:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    changed, new_content = safe_replace(content)
    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        updated_count += 1
        print(f"Updated {filepath}")

print(f"Total files updated: {updated_count}")
