# Python API Integration Setup

Deze handleiding legt uit hoe je de Python FastAPI applicatie integreert met het Next.js dashboard voor AI challenge generatie.

## 📋 Vereisten

1. **Python FastAPI applicatie** moet draaien op `http://localhost:8000`
2. **Node.js** en **npm** geïnstalleerd
3. **Firebase project** opgezet (al geconfigureerd)

## 🚀 Setup Stappen

### 1. Python API opstarten

```bash
# Ga naar je Python project directory
cd /Users/kiendang/Git/green-ai

# Installeer dependencies
pip install -r requirements.txt

# Start de FastAPI server
python main.py
```

De API moet beschikbaar zijn op: `http://localhost:8000`

### 2. Environment variabelen instellen

Maak een `.env.local` bestand in de root van je Next.js project:

```env
# Python FastAPI URL
NEXT_PUBLIC_API_URL=http://localhost:8000

# Voeg hier je Python API environment variabelen toe indien nodig
# GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Next.js dashboard starten

```bash
# In je dashboard directory
npm run dev
```

## 🔧 API Endpoints

De integratie verwacht de volgende endpoints van je Python API:

### 1. Single Challenge Generator

- **Endpoint**: `GET /GenerateChallenge`
- **Parameters**: `location` (optional), `information` (optional)
- **Output**:

```json
{
  "title": string,
  "description": string,
  "category": string
}
```

### 2. Bulk Challenge Generator

- **Endpoint**: `GET /create`
- **Parameters**: `count` (number)
- **Output**:

```json
[
  {
    "title": string,
    "description": string,
    "category": string
  }
]
```

## 🎯 Functionaliteiten

### Challenge Generator

- **Aangepaste challenges**: Genereer op basis van locatie en context
- **Bulk generatie**: Maak 1, 3, of 5 challenges tegelijk
- **Direct toevoegen**: Voeg gegenereerde challenges toe aan Firestore
- **Preview**: Bekijk challenges voordat je ze toevoegt
- **Validatie**: Controleert data voor het toevoegen aan Firestore
- **Error handling**: Duidelijke foutmeldingen bij problemen

### Challenge Management

- **Accepteren**: AI suggestions worden actieve challenges
- **Afkeuren**: Verwijder ongewenste suggestions
- **Real-time**: Automatische updates via Firestore

## 🐛 Troubleshooting

### Python API niet bereikbaar

```bash
# Controleer of de Python API draait
curl http://localhost:8000

# Controleer de console output van je Python applicatie
```

### CORS problemen

Zorg ervoor dat je Python API CORS toestaat voor `http://localhost:3000`:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Firebase errors (undefined fields)

De integratie bevat nu validatie om te voorkomen dat ongeldige data naar Firestore wordt gestuurd:

- **Title en description** moeten strings zijn en mogen niet leeg zijn
- **Category** is optioneel en krijgt standaard waarde "algemeen"
- **Error messages** verschijnen als data ongeldig is

### Firestore problemen

- Controleer Firebase configuratie in `src/lib/firebase.ts`
- Zorg dat Firestore regels schrijven toestaan voor development

## 📦 Productie Deployment

Voor productie kun je Docker gebruiken:

```yaml
# docker-compose.yml
version: "3.8"
services:
  python-api:
    build: ./green-ai
    ports:
      - "8000:8000"
    environment:
      - GEMINI_API_KEY=${GEMINI_API_KEY}

  nextjs-dashboard:
    build: ./dashboard-green-ai
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://python-api:8000
    depends_on:
      - python-api
```

## 🔄 Workflow

1. **Genereer challenges** → Python AI → **Validatie** → **Preview**
2. **Toevoegen aan Firestore** → **AI suggestions lijst**
3. **Accept/Deny** → **Active challenges** of **Delete**
4. **Real-time sync** → Alle wijzigingen direct zichtbaar

## ✅ Nieuwe Features

- **Data validatie**: Voorkomt Firebase errors door ongeldige data
- **Error handling**: Duidelijke foutmeldingen voor gebruikers
- **Input sanitization**: Trim whitespace en valideer input
- **Graceful degradation**: App blijft werken ook als API niet beschikbaar is

Je Python API is nu veilig geïntegreerd in het Next.js dashboard! 🎉
