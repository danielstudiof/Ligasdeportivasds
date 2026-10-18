# La Liga de Juegos

Aplicacion de la temporada 8 con vistas publicas y edicion protegida por Supabase.

## Arranque local

1. Ejecuta `npm install` y `npm run dev`.
2. Copia `.env.example` a `.env.local` y pega la URL y la clave publishable/anon del proyecto Supabase.
3. En Supabase, abre **SQL Editor**, ejecuta `supabase/schema.sql` y crea una cuenta en **Authentication**.
4. Copia el UUID de esa cuenta desde **Authentication > Users** y ejecuta, sustituyendo el UUID:

```sql
insert into public.app_admins (user_id)
values ('UUID-DE-TU-CUENTA');
```

5. Inicia sesion desde **Admin**. Al guardar por primera vez se publica la configuracion inicial en Supabase y todos veran los mismos datos.

La cuenta de cada jugador se vincula desde **Admin > Jugadores** escribiendo su correo en “Correo de cuenta”. El jugador se registra con ese mismo correo y, desde su área personal, puede consultar las jornadas abiertas, enviar una justificación de ausencia y ver sus resultados cuando se publiquen. Si ya tenías Supabase configurado, vuelve a ejecutar `supabase/schema.sql` para crear la tabla privada de justificaciones.

Las claves `service_role` nunca deben ponerse en el navegador ni en `.env.local`. La clave publishable/anon es la que debe usarse en `VITE_SUPABASE_ANON_KEY`; RLS restringe las escrituras a los UUID incluidos en `app_admins`.

Sin credenciales configuradas, la web funciona en modo demostracion y los cambios no se guardan en la nube.
