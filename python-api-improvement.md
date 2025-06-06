# Python API Verbetering

## Voeg een root endpoint toe aan je main.py

Voeg deze code toe aan je `main.py` bestand om de API connection test te verbeteren:

```python
@app.get("/")
async def root():
    return {"message": "Green AI API is running", "status": "healthy", "version": "1.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "API is operational"}
```

Dit zorgt ervoor dat:

- De connection test werkt met de root endpoint (`/`)
- Je een dedicated health check endpoint hebt (`/health`)
- Duidelijke status informatie wordt gegeven

## Huidige Fix

De frontend is nu aangepast om het `/GenerateChallenge` endpoint te gebruiken voor connection testing, dus de API zou nu als "Verbonden" moeten worden weergegeven.

## Test de API

Je API draait correct op `http://localhost:8000` en retourneert:

```json
{
  "message": "Challenge generated successfully",
  "data": "Titel: Tilburg Bloeit!\\n\\nUitdaging: Zaai 20 zonnebloem\\nzaden langs de Reeshofvijver. Red de bijenstand! Meetwaarde: biodiversiteit.\\n"
}
```

Dit is precies wat de frontend nu verwacht!
