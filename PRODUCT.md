# Product

## Register

brand

## Users
Vecinos de Azcapotzalco (San Martín Xochinahuac, CDMX) — clientela de barrio,
familias y locales cercanos a la fondita. La mayoría son clientes recurrentes que
piden a domicilio (reparto sin costo dentro de la Col. Pasteros; alrededores con costo
extra) o para llevar. Contexto de
uso: teléfono en mano, con hambre, decidiendo la comida del día. Muchos ya conocen
los platillos; los nuevos hoy no tienen forma de ver el menú.

El trabajo a resolver (job-to-be-done): **pedir comida por WhatsApp sin fricción**.
Hoy el cliente tiene que (1) conocer de memoria el menú, (2) conseguir el número de
WhatsApp — que solo se ve yendo a la fondita —, (3) redactar un pedido claro platillo
por platillo con sus notas ("que no sea dulce", "sin huevo", "mucha crema"), y
(4) avisar por adelantado si paga con tarjeta o efectivo (para que el repartidor
lleve terminal). El sitio existe para eliminar toda esa fricción.

## Product Purpose
Un sitio de una sola página que **muestra el menú, expone el número de WhatsApp y
arma el pedido por ti**. El corazón del producto es un *armador de pedidos*: tocas
los platillos, agregas notas, eliges tarjeta/efectivo y escribes tu dirección; el
sitio genera el mensaje de WhatsApp exacto y lo abre listo para enviar (deep link
`wa.me`). Éxito = un vecino que nunca ha ido a la fondita puede ver qué venden y
mandar un pedido perfectamente claro en menos de un minuto, sin errores ni idas y
vueltas.

## Brand Personality
Casera, generosa y alegre. Voz cálida, cercana y sin pretensiones — como la señora
que te atiende y te conoce. Tono en español mexicano coloquial pero cuidado ("Buen
día", "¿Qué se le antoja hoy?"). Debe evocar la comida de casa: abundante, hecha con
cariño, de barrio. Alegre sin caer en lo estridente; orgullosa de lo tradicional sin
ser museo.

## Anti-references
- **Clichés Tex-Mex de caricatura:** sombreros, cactus, chiles con cara, tipografía
  "fiesta" falsa, estética de stock de taquería genérica. Prohibido.
- **Cadena corporativa de comida rápida:** el look estéril y templado de Taco
  Bell/Chipotle — plano, sin alma, plantilla.
- **Plantilla genérica de SaaS con IA:** fondo crema, eyebrow en mayúsculas tracked,
  rejilla de tarjetas idénticas, degradados por decoración. El look "esto lo hizo una IA".
- No caer en la bandera mexicana literal (verde/blanco/rojo) como paleta.

## Design Principles
1. **El pedido es el producto.** Todo el diseño sirve a que armar y enviar un pedido
   por WhatsApp sea rápido, claro y sin errores. La belleza no puede estorbar la función.
2. **La comida es la protagonista.** Fotografía real de los platillos por encima de
   adornos gráficos. Que se antoje.
3. **De barrio, no de cadena.** La calidez viene de la comida, el color y la voz — no
   de decoración kitsch ni de minimalismo frío.
4. **Cero memoria requerida.** El cliente no debe necesitar conocer el menú de antes:
   el sitio se lo enseña y se lo arma.
5. **Claridad radical en el pedido.** Notas por platillo, método de pago y dirección
   explícitos — porque de eso depende que la comida y la terminal lleguen bien.

## Accessibility & Inclusion
WCAG 2.1 AA. Clientela de todas las edades (incluye adultos mayores): texto grande y
legible, alto contraste real (≥4.5:1 en cuerpo), objetivos táctiles ≥44px, todo
operable con teclado y lector de pantalla. Español (es-MX) como idioma del documento.
`prefers-reduced-motion` respetado en toda animación. No depender solo del color para
comunicar estado (pago seleccionado, platillo agregado).
