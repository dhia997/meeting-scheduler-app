# Mettre à jour l'URL Backend

## Après avoir déployé le backend sur Render:

1. **Copie ton URL Render** (exemple: `https://meeting-backend-scheduler.onrender.com`)

2. **Édite le fichier**: `frontend/.env`

3. **Change la ligne**:
   ```
   REACT_APP_API_URL=http://localhost:5001
   ```
   
   **En**:
   ```
   REACT_APP_API_URL=https://TON-URL-RENDER.onrender.com
   ```

4. **Sauvegarde le fichier**

5. **Push sur GitHub**:
   ```bash
   git add frontend/.env
   git commit -m "Update backend URL to Render"
   git push
   ```

6. **Continue avec le déploiement Vercel!**
