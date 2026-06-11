import json

data_map = {
    'tr': {
        "title": "Çerez Tercihleri",
        "description": "Sitemizde, kullanıcı deneyimini geliştirmek ve site trafiğini analiz etmek için çerezler kullanıyoruz.",
        "accept": "Tümünü Kabul Et",
        "decline": "Reddet"
    },
    'en': {
        "title": "Cookie Preferences",
        "description": "We use cookies on our site to enhance the user experience and analyze site traffic.",
        "accept": "Accept All",
        "decline": "Decline"
    },
    'de': {
        "title": "Cookie-Einstellungen",
        "description": "Wir verwenden Cookies auf unserer Website, um die Benutzererfahrung zu verbessern und den Datenverkehr zu analysieren.",
        "accept": "Alle akzeptieren",
        "decline": "Ablehnen"
    },
    'fr': {
        "title": "Préférences de cookies",
        "description": "Nous utilisons des cookies sur notre site pour améliorer l'expérience utilisateur et analyser le trafic.",
        "accept": "Tout accepter",
        "decline": "Refuser"
    }
}

for lang, cookie_data in data_map.items():
    filepath = f"src/app/dictionaries/{lang}.json"
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    data['cookie'] = cookie_data
    
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

print("Updated all dictionaries successfully.")
