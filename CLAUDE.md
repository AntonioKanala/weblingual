# Clínica Lingual — Landing Page estilo AG1

## Proyecto

Landing page premium para Clínica Lingual, clínica especializada en ortodoncia lingual (brackets invisibles) ubicada en Las Condes, Santiago de Chile. El objetivo es replicar la experiencia de drinkag1.com — animaciones fluidas, diseño editorial de lujo, scroll-driven storytelling — pero aplicado al mundo de la ortodoncia lingual. Todo el contenido y textos son los de clinicalingual.cl.

## Marca

- **Nombre**: Clínica Lingual
- **Claim principal**: "La Verdadera Ortodoncia Invisible"
- **Subclaim**: "Cambia tu sonrisa sin que nadie se entere con nuestros brackets y alineadores invisibles"
- **Hashtag**: #ViveClínicaLingual
- **Stat principal**: +5,000 Tratamientos Finalizados ★★★★★
- **Ubicación**: Las Condes, Santiago, Chile
- **Web actual**: https://clinicalingual.cl/
- **URL de agenda**: https://clinicalingual.cl/agenda-tu-sonrisa-perfecta
- **Botón de pago**: https://www.webpay.cl/form-pay/106507
- **Logo**: https://assets.cdn.filesafe.space/SKKTEbSYs4aaSrh7QW9p/media/668eb72f8edd42a40ba448f2.webp

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript (strict mode, cero any)
- **Estilos**: Tailwind CSS v4 + CSS variables para design tokens
- **Animaciones**: Framer Motion (scroll-triggered reveals, parallax, staggered entries)
- **CMS**: Sanity v3 (studio embebido, GROQ queries, preview en tiempo real)
- **Video**: Videos de YouTube embebidos + videos propios en Google Cloud Storage
- **Imágenes**: next/image con Sanity CDN + formatos WebP/AVIF
- **Fuentes**: next/font/google — NO usar Inter, Roboto ni Arial
- **Formularios**: React Hook Form + Zod para validación
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics + Google Analytics 4
- **Linting**: ESLint + Prettier

## Comandos

- `pnpm dev` — Servidor de desarrollo (puerto 3000)
- `pnpm build` — Build de producción
- `pnpm lint` — Lint con ESLint
- `pnpm format` — Formatear con Prettier
- `pnpm sanity dev` — Studio de Sanity local (puerto 3333)
- `pnpm type-check` — Verificación de tipos TypeScript

## Arquitectura

```
/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx              # Homepage / Landing principal
│   │   ├── ortodoncia-lingual/   # Página "El Tratamiento"
│   │   ├── nuestro-equipo/       # Página del equipo
│   │   ├── testimonios/          # Página de testimonios completos
│   │   ├── casos-clinicos/       # Página de antes/después
│   │   └── layout.tsx            # Layout con nav + footer
│   ├── agenda-tu-sonrisa-perfecta/  # Página de agendamiento/CTA
│   ├── api/                      # Webhooks, revalidación Sanity
│   ├── studio/[[...tool]]/       # Sanity Studio embebido
│   ├── layout.tsx                # Root layout (fonts, metadata, providers)
│   └── globals.css               # Design tokens + Tailwind base
├── components/
│   ├── ui/                       # Button, Badge, Card, Accordion, etc.
│   ├── sections/                 # Hero, Benefits, Testimonials, FAQ, etc.
│   ├── layout/                   # Header, Footer, MobileNav
│   └── animations/               # FadeIn, SlideUp, Parallax, StaggerChildren
├── lib/
│   ├── sanity/                   # Cliente, queries GROQ, types
│   ├── utils.ts                  # cn(), helpers
│   └── constants.ts              # URLs, textos reutilizables
├── content/                      # Textos estáticos (si no se usa Sanity para todo)
│   ├── benefits.ts
│   ├── testimonials.ts
│   ├── faq.ts
│   └── journey-steps.ts
├── public/
│   ├── images/                   # Assets estáticos de la clínica
│   └── videos/                   # Videos locales si aplica
├── sanity/
│   ├── schemas/
│   └── sanity.config.ts
└── types/
```

## Secciones de la Landing (mapeando AG1 → Clínica Lingual)

### 1. HERO (AG1: Hero con video fullscreen)

- Video de fondo a pantalla completa (el de la clínica actual)
- **Video fuente**: https://storage.googleapis.com/msgsndr/SKKTEbSYs4aaSrh7QW9p/media/66aa72c36905e14f4095b66a.mp4
- **Headline**: "La Verdadera Ortodoncia Invisible"
- **Subheadline**: "Cambia tu sonrisa sin que nadie se entere con nuestros brackets y alineadores invisibles"
- **CTA primario**: "Empieza tu nueva sonrisa →" → link a /agenda-tu-sonrisa-perfecta
- **Badge**: "★★★★★ +5,000 Tratamientos Finalizados"
- Nav transparente sobre el video con logo + links
- **Animación**: texto aparece con stagger fade-in desde abajo

### 2. BENEFICIOS GRID (AG1: Benefits Grid de 6 tarjetas)

- **Título de sección**: "Beneficios de la Ortodoncia Lingual"
- 4 tarjetas con imagen + texto + ★★★★★:
  1. **Es totalmente invisible** — "Al estar los frenillos en la superficie lingual de los dientes, son prácticamente invisibles en el 99% de las situaciones cotidianas."
  2. **Eficaz para todos los casos** — "La ortodoncia lingual corrige casos complejos que los alineadores no pueden solucionar."
  3. **Brackets personalizados** — "La ortodoncia lingual utiliza brackets diseñados específicamente para cada paciente, asegurando un tratamiento preciso y cómodo."
  4. **No daña el esmalte frontal** — "Al estar en la superficie lingual, los frenillos no afectan el esmalte frontal de los dientes."

- Cada tarjeta incluye un mini-testimonio relevante
- **Animación**: cards aparecen con stagger al hacer scroll

### 3. BENEFICIOS EXPANDIBLES (AG1: Social Proof Carousel)

- Versión interactiva/expandible de los beneficios con acordeón tipo AG1
- Click para expandir cada beneficio con detalle completo + testimonio con quote
- **Testimonios inline**:
  - **Invisible** → Yamila R.: "Nadie se dio cuenta. De hecho cuando yo comentaba que tenía brackets, todos me decían: ¿Dónde están?"
  - **Eficaz** → Bayron H.: "Buscaba lugares donde me dijeran que no me tenía que operar a la larga. Aquí pudieron darme la solución que yo esperaba"
  - **Personalizados** → María C.: "A la semana de ponérmelos estaba cantando igual que antes"
  - **Esmalte** → Teresita D.: "En la adolescencia me puse los frenillos tradicionales y no quería lo mismo, pero si necesitaba brackets para arreglar mi mordida"

### 4. CIENCIA Y TECNOLOGÍA (AG1: Research/Science Tabs)

- **Estilo**: Tabs interactivos como AG1 (Microbiome, Nutrients, etc.)
- **Tabs adaptados**:
  1. **Basados en la Ciencia** — "Para resultados óptimos"
  2. **Materiales Premium** — "De alta calidad y duraderos"
  3. **Optimización Continua** — "Para comodidad del paciente"
  4. **Confiados por Ortodoncistas** — "Respaldo profesional"
  5. **Evolución Constante** — "Mejorados desde su introducción"
  6. **Eco-friendly** — "Ahorro de plástico sin alineadores"

- Cada tab con ícono, descripción y animación de transición

### 5. JOURNEY / PROCESO (AG1: Product CTA section)

- **Título**: "Así es como inicia tu viaje"
- 4 pasos con imagen + número + título:
  1. **Evaluación Inicial** — Primera consulta con diagnóstico 3D
  2. **Exámenes Complementarios** — Estudios adicionales necesarios
  3. **Inicia tu Tratamiento** — Colocación de brackets linguales
  4. **Comienza tu Transformación** — Seguimiento y resultados

- **Diseño**: timeline horizontal en desktop, vertical en mobile
- **Animación**: los pasos se revelan secuencialmente con scroll

### 6. TESTIMONIOS EN VIDEO (AG1: Community Reviews carousel)

- **Título**: "Mira lo que dice la gente de Clínica Lingual"
- 3 videos principales de YouTube con thumbnail + play:
  1. **Bayron** — "No tuve que operarme" (Para todos los casos) — https://youtube.com/watch?v=OAm3zlpruY0
  2. **Xiomara** — "Quería que fuera secreto" (Tratamiento Invisible) — https://youtube.com/watch?v=K24wjfBe8GE
  3. **Hao W.** — "Mil veces mejor que los normales" (Estos no se ven) — https://youtube.com/watch?v=FQRNqkHoA6c

- **CTA**: "Ver más testimonios" → /testimonios
- **Diseño**: carousel horizontal estilo AG1 con cards de video
- **Animación**: slide-in desde los lados

### 7. LOGOS / BRAND MARQUEE (AG1: marca de certificaciones)

- Marquee infinito con los logos/imágenes de las marcas de brackets que usan
- Imágenes de certificaciones/partners que ya tienen en la web actual
- **Animación**: scroll automático infinito tipo ticker

### 8. CTA STATEMENT (AG1: "Get started with AG1 today")

- **Headline grande**: "El Futuro de la Ortodoncia es Lingual"
- **Subtext**: "La ortodoncia lingual ofrece soluciones avanzadas que mejoran la apariencia y función de tu sonrisa, fortaleciendo tu salud bucal a largo plazo."
- **CTA**: "Aprender más sobre la Ortodoncia Invisible" → /ortodoncia-lingual
- **Diseño**: sección fullwidth con fondo oscuro/gradiente, texto centrado enorme
- **Animación**: parallax suave + texto con reveal

### 9. INSTAGRAM / COMUNIDAD (AG1: Morning People section)

- **Título**: "Únete al movimiento #ViveClínicaLingual"
- Grid de fotos de Instagram de pacientes y la clínica
- Cada imagen linkeada al post de Instagram correspondiente
- **Diseño**: masonry grid o carousel horizontal
- **Animación**: stagger fade-in

### 10. FAQ ACORDEÓN (AG1: FAQ section)

- **Título**: "Preguntas Frecuentes sobre la Ortodoncia Lingual"
- 8 preguntas (contenido completo en content/faq.ts):
  1. ¿Cuánto vale el tratamiento de ortodoncia lingual en Clínica Lingual?
  2. ¿El tratamiento me dificultará hablar?
  3. ¿Cómo funciona la limpieza de los brackets linguales?
  4. ¿A qué edad puedo empezar con brackets linguales en Chile?
  5. ¿La ortodoncia lingual sirve para casos complejos?
  6. ¿Cuánto dura un tratamiento de ortodoncia lingual?
  7. ¿Qué pasa después de terminar el tratamiento?
  8. ¿Por qué elegir ortodoncia lingual en vez de alineadores transparentes?

- **JSON-LD FAQPage schema obligatorio**
- **Animación**: acordeón con transición suave de altura

### 11. FOOTER

- Logo Clínica Lingual
- Columnas: Clínica | Pacientes | Contacto
- Links a redes sociales
- Copyright + disclaimer legal

## Navegación

### Desktop
```
[Logo]  Nuestra Clínica ▾  |  Testimonios  |  Casos Clínicos  |  Botón de Pago  |  [Agenda ←CTA]
           ├── El Tratamiento
           └── Nuestro Equipo
```

### Mobile

- Hamburger → slide-in desde derecha
- CTA "Agenda" sticky en bottom bar (siempre visible)
- Submenú con acordeón

## Diseño y Estética

### Dirección visual: Premium Medical + Editorial (inspirado en AG1)

- **Fondo oscuro**: `#0A0A0A` — secciones hero y statement
- **Fondo claro**: `#FAFAF8` — secciones de contenido
- **Accent primario**: `#C9A96E` → `#D4B87A` (dorado/champagne) — premium, confianza
- **Accent secundario**: `#1A6B4F` → `#2D8B6A` (verde médico elegante) — salud, frescura
- **Texto oscuro**: `#F5F5F0` sobre fondos oscuros
- **Texto claro**: `#1A1A1A` sobre fondos claros
- **Muted**: `#6B6B6B`
- **Display font**: Playfair Display o Instrument Serif (serif elegante)
- **Body font**: DM Sans o Plus Jakarta Sans (sans limpio)
- **Badges**: tracking-widest uppercase text-xs
- **Espaciado**: Mínimo py-24 lg:py-32 entre secciones
- **Border radius**: rounded-2xl o rounded-3xl en imágenes y cards
- **Estrellas**: Dorado `#C9A96E`

## Animaciones (replicar AG1)

- **Scroll reveals**: whileInView + fadeIn + translateY(30px), 700ms, easing [0.25, 0.1, 0, 1]
- **Stagger**: 0.1s entre siblings
- **Parallax**: Imágenes a 0.5x velocidad de scroll
- **Hover**: Botones scale(1.02) + shadow. Cards translateY(-4px) + shadow grow
- **Tabs**: Crossfade + slide horizontal
- **FAQ**: AnimatePresence + height auto
- **Marquee**: CSS infinite scroll, pausa en hover
- **Nav**: Backdrop blur + opacity on scroll
- **Video**: Overlay fade-out + pulse play button

## Prohibido

- Paleta celeste + blanco de clínica dental genérica
- Stock photos de sonrisas de banco de imágenes
- Gradientes morados
- Layouts planos sin jerarquía
- Templates Bootstrap/AI genéricos

## URLs de Assets Actuales

### Videos

- **Hero**: https://storage.googleapis.com/msgsndr/SKKTEbSYs4aaSrh7QW9p/media/66aa72c36905e14f4095b66a.mp4
- **Hero alt**: https://storage.googleapis.com/msgsndr/SKKTEbSYs4aaSrh7QW9p/media/668818656254fc3ab111e571.mp4

### Imágenes Beneficios

- **Invisible**: https://storage.googleapis.com/msgsndr/SKKTEbSYs4aaSrh7QW9p/media/66dd4ecfab806ec7a53a9ada.webp
- **Eficaz**: https://storage.googleapis.com/msgsndr/SKKTEbSYs4aaSrh7QW9p/media/668eb5ef66cf904b5ac0d8c4.webp
- **Salud dental**: https://storage.googleapis.com/msgsndr/SKKTEbSYs4aaSrh7QW9p/media/668eb6de8edd42cfa5a448d6.webp
- **Esmalte**: https://storage.googleapis.com/msgsndr/SKKTEbSYs4aaSrh7QW9p/media/668eb7ef22549f5498daded8.webp
- **Invisible alt**: https://storage.googleapis.com/msgsndr/SKKTEbSYs4aaSrh7QW9p/media/668eb493350bac47a8e031e2.webp
- **Esmalte alt**: https://storage.googleapis.com/msgsndr/SKKTEbSYs4aaSrh7QW9p/media/66dd4ecf766f9862f1350235.webp

### Imágenes Journey

- **Paso 1**: https://assets.cdn.filesafe.space/SKKTEbSYs4aaSrh7QW9p/media/68f149014711d54949cb49df.webp
- **Paso 2**: https://storage.googleapis.com/msgsndr/SKKTEbSYs4aaSrh7QW9p/media/66dd4ecef10da4c865ecba84.webp
- **Paso 3**: https://assets.cdn.filesafe.space/SKKTEbSYs4aaSrh7QW9p/media/68f148c9ddbd5e2bfb029f0b.webp
- **Paso 4**: https://storage.googleapis.com/msgsndr/SKKTEbSYs4aaSrh7QW9p/media/66dd4fd506b025d098118435.webp

### YouTube Testimonios

- **Bayron**: https://www.youtube.com/watch?v=OAm3zlpruY0
- **Xiomara**: https://www.youtube.com/watch?v=K24wjfBe8GE
- **Hao**: https://www.youtube.com/watch?v=FQRNqkHoA6c

### Logos/Ciencia

- **Ciencia**: https://assets.cdn.filesafe.space/SKKTEbSYs4aaSrh7QW9p/media/667d95cd0ec821a7386a9942.png
- **Materiales**: https://assets.cdn.filesafe.space/SKKTEbSYs4aaSrh7QW9p/media/667d962e96b7578b4f63c3ec.png
- **Optimización**: https://assets.cdn.filesafe.space/SKKTEbSYs4aaSrh7QW9p/media/667d967f9d31c71e063d22c3.png
- **Confianza**: https://assets.cdn.filesafe.space/SKKTEbSYs4aaSrh7QW9p/media/667d96c0d91b508f2955b9c0.png
- **Evolución**: https://assets.cdn.filesafe.space/SKKTEbSYs4aaSrh7QW9p/media/667d97730c2bc7ae6b21bce9.png
- **Eco**: https://assets.cdn.filesafe.space/SKKTEbSYs4aaSrh7QW9p/media/667d977248971adac2065d80.png

## Estilo de Código

- Named exports siempre (excepto pages Next.js)
- Arrow functions con props tipadas explícitamente
- Un componente por archivo
- Tailwind utilities; @apply solo si se repite 3+ veces
- next/image obligatorio con sizes y priority
- `<VideoPlayer>` reutilizable con lazy load y poster
- Framer Motion motion.div + whileInView
- Conventional commits

## SEO

- **Idioma**: es-CL
- **Title**: "Clínica Lingual | La Verdadera Ortodoncia Invisible en Santiago"
- **Description**: "Especialistas en ortodoncia lingual en Las Condes, Santiago. +5,000 tratamientos. Brackets invisibles personalizados con tecnología 3D."
- **Keywords**: ortodoncia lingual, brackets linguales, ortodoncia invisible, frenillos invisibles, clínica dental Las Condes
- **JSON-LD**: LocalBusiness + FAQPage + MedicalOrganization
- Sitemap automático con next-sitemap
- Canonicals en todas las páginas

## Performance

- LCP < 2.5s, CLS < 0.1, INP < 200ms
- Videos: lazy load + poster + no autoplay mobile (salvo hero muted)
- Imágenes: WebP/AVIF + responsive sizes
- Preload fuentes con display: swap
- RSC por defecto, client components solo cuando necesario
- YouTube: facade pattern (thumbnail → embed on click)

## Reglas Importantes

- NUNCA commit de .env / .env.local
- Sanity vars: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN
- Assets temporalmente hotlinkeados desde URLs actuales, migrar a Sanity después
- FAQ DEBE tener JSON-LD FAQPage
- LocalBusiness JSON-LD con dirección Las Condes
- Mobile-first desde 375px
- CTA "Agenda" SIEMPRE visible (sticky mobile)
- WCAG AA: focus visible, aria-labels, contraste

## Sanity Schemas

- **heroContent** — headline, subline, CTA text/link, video URL, badge
- **benefit** — título, desc corta, desc larga, imagen, testimonio
- **testimonial** — nombre, fecha, quote, video URL, tipo
- **journeyStep** — número, título, descripción, imagen
- **faqItem** — pregunta, respuesta (portable text)
- **teamMember** — nombre, cargo, bio, foto
- **clinicalCase** — título, descripción, fotos antes/después
- **siteSettings** — logo, teléfono, dirección, redes, meta defaults
