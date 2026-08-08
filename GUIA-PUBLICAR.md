# Guía para publicar la web de Hongos del Sur (gratis con GitHub Pages)

Sigue estos pasos una sola vez. Después, actualizar la web es solo subir archivos.

---

## Paso 1 · Sube los archivos a GitHub

1. Entra a tu cuenta en https://github.com
2. Arriba a la derecha, haz clic en el **+** → **New repository**.
3. En **Repository name** escribe: `hongosdelsur`
4. Marca **Public** (público).
5. Haz clic en **Create repository**.
6. En la página que aparece, haz clic en el enlace **uploading an existing file**
   (o botón **Add file → Upload files**).
7. Arrastra TODO lo que está dentro de la carpeta `web`:
   - `index.html`
   - `styles.css`
   - `CNAME`
   - la carpeta `img` (con tus fotos dentro)
8. Abajo haz clic en **Commit changes**.

> Importante: sube el CONTENIDO de la carpeta `web`, no la carpeta `web` misma.
> El archivo `index.html` debe quedar en la raíz del repositorio.

---

## Paso 2 · Activa GitHub Pages

1. En tu repositorio, ve a **Settings** (Configuración).
2. En el menú izquierdo, haz clic en **Pages**.
3. En **Source**, elige **Deploy from a branch**.
4. En **Branch**, elige `main` y carpeta `/ (root)`. Haz clic en **Save**.
5. Espera 1–2 minutos. Aparecerá tu web en una dirección tipo:
   `https://TU-USUARIO.github.io/hongosdelsur/`

---

## Paso 3 · Conecta tu dominio hongosdelsur.cl

### 3a. En GitHub
1. En **Settings → Pages**, en **Custom domain** escribe: `hongosdelsur.cl`
2. Haz clic en **Save**.
   (El archivo `CNAME` que ya incluimos hace justamente esto.)

### 3b. Donde compraste el dominio (NIC Chile o tu proveedor)
Entra al panel de administración DNS de tu dominio y crea estos registros:

**Para que funcione hongosdelsur.cl (dominio raíz):**
Crea 4 registros tipo **A** apuntando a estas IP de GitHub:

    A   @   185.199.108.153
    A   @   185.199.109.153
    A   @   185.199.110.153
    A   @   185.199.111.153

**Para que funcione www.hongosdelsur.cl:**
Crea 1 registro tipo **CNAME**:

    CNAME   www   TU-USUARIO.github.io

(Reemplaza TU-USUARIO por tu usuario de GitHub.)

3. Guarda. Los cambios de DNS pueden tardar de 10 minutos a 24 horas.
4. De vuelta en **Settings → Pages**, marca la casilla **Enforce HTTPS**
   (aparece cuando el dominio ya está verificado). Así tu web usa candado seguro.

---

## Actualizar la web más adelante
Solo vuelve al repositorio en GitHub → **Add file → Upload files**, sube el
archivo cambiado y haz **Commit**. La web se actualiza sola en 1–2 minutos.

---

## Datos que debes reemplazar en index.html
Busca estas marcas (⚠️) dentro de `index.html` y cámbialas por tus datos:

Ya están puestos tus datos reales:
- **WhatsApp:** +56 9 3458 4090
- **Correo:** hongosparaelsur@gmail.com
- **Instagram:** @hongosdelsurosorno

Si algún día cambian, edítalos en `index.html` dentro de la sección de contacto.
