import sqlite3
import json

def dump_faqs():
    try:
        conn = sqlite3.connect('C:/Users/LA-IND-1030/Downloads/accafaqs/LakshyaACCAFaq/LakshyaACCAFaq/ACCAFAQ/db.sqlite3')
        cur = conn.cursor()
        cur.execute('SELECT category, question, answer FROM faqs_faq')
        rows = cur.fetchall()
        
        faqs = []
        for row in rows:
            faqs.append({
                'category': row[0],
                'question': row[1],
                'answer': row[2]
            })
            
        with open('faqs_dump.json', 'w', encoding='utf-8') as f:
            json.dump(faqs, f, indent=4)
            
        print(f"Successfully dumped {len(faqs)} FAQs to faqs_dump.json")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        if conn:
            conn.close()

if __name__ == "__main__":
    dump_faqs()
